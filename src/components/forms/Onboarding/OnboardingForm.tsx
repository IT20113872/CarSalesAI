"use client";

import Image from "next/image";
import Logo from '/public/logo.png'
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";
import UserTypeSelection from "./UserTypeForm";
import { CompanyForm } from "./CompanyForm";
import { JobSeekerForm } from "./JobSeekerForm";
// import JobSeekerForm from "./JobSeekerForm";

type UserSelectionType = "company" | "jobSeeker" | null;

export default function OnboardingForm() {
  const [step, setStep] = useState(1);
  const [userType, setUserType] = useState<UserSelectionType>(null);

  function handleUserTypeSelect(type: Exclude<UserSelectionType, null>) {
    setUserType(type);
    setStep(2);
  }

  const renderStep = () => {
    switch (step) {
      case 1:
        return <UserTypeSelection onSelect={handleUserTypeSelect} />;
      case 2:
        return userType === "company" ? (
          <CompanyForm />
        ) : (
          <JobSeekerForm />
        );
      default:
        return null;
    }
  };

  return (
    <>
      <div className="flex items-center gap-4 mb-10">
        <Image src="/logo.png" alt="SikuruHathe Logo" width={50} height={50} />
        <span className="text-4xl font-bold">
          sikuru<span className="text-primary">Hathe</span>
        </span>
      </div>
      <Card className="w-full max-w-lg">
        <CardContent className="p-6">{renderStep()}</CardContent>
      </Card>
    </>
  );
}