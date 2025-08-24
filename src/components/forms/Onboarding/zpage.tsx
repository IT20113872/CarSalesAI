// import OnboardingForm from "@/components/forms/Onboarding/OnboardingForm";

// import OnboardingPage from "@/app/onboarding/page";
import { prisma } from "@/app/utils/db";
import { requireUser } from "@/app/utils/requireUser";
import { redirect } from "next/navigation";

async function checkIfOnboardingCompleted(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      onboardingCompleted: true,
    },
  });

  if (user?.onboardingCompleted === true) {
    redirect("/");
  }

  return user;

}

export default async function OnboardingForm() {
    const session = await requireUser()
  await checkIfOnboardingCompleted(session.id as string);
  return (
    <div className="min-h-screen w-screen py-10 flex flex-col items-center justify-center">
      <OnboardingForm />
    </div>
  );
}

const OnboardingPage = async () => {
  const session = await requireUser();


  return (
    <div className="min-h-screen w-screen py-10 flex flex-col items-center justify-center">
      <OnboardingForm />
    </div>
  );
};