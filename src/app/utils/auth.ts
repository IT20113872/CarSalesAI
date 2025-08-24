// import NextAuth from "next-auth"
// import GitHub from "next-auth/providers/github"
// import { PrismaAdapter } from "@auth/prisma-adapter"
// import { prisma } from "./db"
// import Google from "next-auth/providers/google"



// export const { handlers, signIn, signOut, auth } = NextAuth({
//   adapter: PrismaAdapter(prisma),
//   providers: [GitHub,Google],
// }),

// events: {
//     async createUser({ user }) {
//       // use Gmail username as company name
//       const emailName = user.email ? user.email.split("@")[0] : "newuser"

//       await prisma.company.create({
//         data: {
//           name: emailName,
//           location: "Default Location",
//           about: "Default about text",
//           logo: "/logo.png",               // placeholder logo
//           website: "https://example.com",  // you can also use emailName if you want
//           userId: user.id,
//         },
//       })
//     },

import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "./db"

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
// events: {
//   async createUser({ user }) {
//     if (!user.email) return; // safety check

//     const emailName = user.email.split("@")[0];

//     await prisma.company.create({
//       data: {
//         name: emailName,
//         location: "Default Location",
//         about: "Default about text",
//         logo: "/logo.png",
//         website: `https://${emailName}.com`,
//         userId: user.id!, // 👈 assert user.id is defined
//       },
//     });
//   },
// },
// })

events: {
    // Runs only the first time a user is created in DB
    async createUser({ user }) {
      if (!user.email) return

      const emailName = user.email.split("@")[0]

      try {
        // Create default company for new user
        await prisma.company.create({
          data: {
            userId: user.id!,
            name: emailName,
            location: "Default Location",
            about: "Default about text",
            logo: "/logo.png",
            website: `https://${emailName}.com`,
          },
        })

        // Mark onboarding as completed immediately
        await prisma.user.update({
          where: { id: user.id },
          data: { onboardingCompleted: true },
        })
      } catch (err) {
        console.error("Error creating default company:", err)
      }
    },
  },

  callbacks: {
    async session({ session, user }) {
      // Attach extra info to session
      if (session.user) {
        session.user.id = user.id
        session.user.userType = user.userType
        session.user.onboardingCompleted = user.onboardingCompleted
      }
      return session
    },
  },
})