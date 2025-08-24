"use server"

import { requireUser } from "./utils/requireUser"
import {z} from "zod"
import { companySchema, jobSchema, jobSeekerSchema } from "./utils/zodSchemas";
import { prisma } from "./utils/db";
// import { redirect } from "next/dist/server/api-utils";
import { redirect } from "next/navigation";
import arcjet, { detectBot, shield } from "./utils/arcjet";
import { request } from "@arcjet/next";
import { stripe } from "./utils/stripe";
import { jobListingDurationPricing } from "./utils/pricingTiers";

const aj = arcjet
  .withRule(
    shield({
      mode: "LIVE",
    })
  )
  .withRule(
    detectBot({
      mode: "LIVE",
      allow: [
        "CATEGORY:SEARCH_ENGINE", // Google, Bing, etc
        // Uncomment to allow these other common bot categories
        // See the full list at https://arcjet.com/bot-list
        //"CATEGORY:MONITOR", // Uptime monitoring services
        //"CATEGORY:PREVIEW", // Link previews e.g. Slack, Discord
      ],
    })
  );

export async function createCompany(data: z.infer<typeof companySchema>) {
    
    const session = await requireUser();

    // Access the request object so Arcjet can analyze it
    const req = await request();
    // Call Arcjet protect
    const decision = await aj.protect(req);

    if (decision.isDenied()) {
      throw new Error("Forbidden");
    }

    const validateData = companySchema.parse(data)
    await prisma.user.update({
        where: {
            id : session.id,
        },
        data: {
            onboardingCompleted: true,
            userType: "Company",
            Company: {
                create: {
                  ...validateData, //zod+scema shulde have same names
                },

            },
        },
    });
    return redirect("/")
}

export async function createJobSeeker(data: z.infer<typeof jobSeekerSchema>) {
  const user = await requireUser();

      // Access the request object so Arcjet can analyze it
  const req = await request();
    // Call Arcjet protect
  const decision = await aj.protect(req);

  if (decision.isDenied()) {
      throw new Error("Forbidden");
  }

  const validatedData = jobSeekerSchema.parse(data);

  await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      onboardingCompleted: true,
      userType: "JobSeeker",
      JobSeeker: {
        create: {
          ...validatedData,
        },
      },
    },
  });
  return redirect("/");
}

export async function createJob(data: z.infer<typeof jobSchema>) {
  const user = await requireUser();

  // const validatedData = jobSchema.parse(data);
  const req = await request();
  const decision = await aj.protect(req);

  if (decision.isDenied()) {
    throw new Error("Forbidden");
  }

  const validatedData = jobSchema.parse(data);

  const company = await prisma.company.findUnique({
    where:{
      userId:user.id
    },
    select:{
      id:true,
      user:{
        select:{
          stripeCustomerID: true,
        }
      }
    }
  })

  if (!company?.id) {
    return redirect("/");
  }

  let stripeCustomerID = company.user.stripeCustomerID;

  if (!stripeCustomerID) {
    const customer = await stripe.customers.create({
      email: user.email as string,
      name: user.name as string,
    });
    
    stripeCustomerID = customer.id;

    // Update user with Stripe customer ID
    await prisma.user.update({
      where: { id: user.id },
      data: { stripeCustomerID: customer.id },
    });

  }

    const jobPost = await prisma.jobPost.create({
      data: {
        companyId: company.id,
        jobDescription: validatedData.jobDescription,
        jobTitle: validatedData.Title,
        employmentType: validatedData.Condition,
        location: validatedData.location,
        salaryFrom: validatedData.salaryFrom,
        salaryTo: validatedData.salaryTo,
        listingDuration: validatedData.listingDuration,
        benefits: validatedData.benefits,
      },
      select:{
        id : true,
      },
  });

  
  // Get price from pricing tiers based on duration
  const pricingTier = jobListingDurationPricing.find(
    (tier) => tier.days === validatedData.listingDuration
  );

  if (!pricingTier) {
    throw new Error("Invalid listing duration selected");
  }

  const session = await stripe.checkout.sessions.create({
    customer: stripeCustomerID,
    line_items: [
      {
        price_data: {
          product_data: {
            name: `Job Posting - ${pricingTier.days} Days`,
            description: pricingTier.description,
            images: [
              "https://pve1u6tfz1.ufs.sh/f/Ae8VfpRqE7c0gFltIEOxhiBIFftvV4DTM8a13LU5EyzGb2SQ",
            ],
          },
          currency: "USD",
          unit_amount: pricingTier.price * 100, // Convert to cents for Stripe
        },
        quantity: 1,
      },
    ],
metadata:{
  jobId: jobPost.id,
},

    mode: "payment",
    // metadata: {
    //   jobId: jobPost.id,
    // },
    success_url: `${process.env.NEXT_PUBLIC_URL}/payment/success`,
    cancel_url: `${process.env.NEXT_PUBLIC_URL}/payment/cancel`,
  });

  return redirect(session.url as string);

}