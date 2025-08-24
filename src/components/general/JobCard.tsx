"use client";

import Link from "next/link";
import { Card, CardHeader } from "../ui/card";
import { MapPin, User2 } from "lucide-react";
import { Badge } from "../ui/badge";
import { formatCurrency } from "@/app/utils/formatCurrency";
import Image from "next/image";
import { formatRelativeTime } from "@/app/utils/formatRelativeTime";

interface iAppProps {
  job: {
    id: string;
    jobTitle: string;
    salaryFrom: number;
    salaryTo: number;
    employmentType: string;
    location: string;
    createdAt: Date | string;
    company: {
      logo: string | null;
      name: string;
      about: string;
      location: string;
    };
  };
}

export function JobCard({ job }: iAppProps) {
  return (
    <Link
      href={`/job/${job.id}`}
      aria-label={`View details for ${job.jobTitle} at ${job.company.name}`}
    >
      <Card className="hover:shadow-md transition-all duration-200 hover:border-primary relative">
        <CardHeader className="p-4">
          <div className="flex gap-3">
            {job.company.logo ? (
              <Image
                src={job.company.logo}
                alt={job.company.name}
                width={40}
                height={40}
                className="size-10 rounded-md"
              />
            ) : (
              <div className="bg-red-500 size-10 rounded-md flex items-center justify-center">
                <User2 className="size-5 text-white" />
              </div>
            )}

            <div className="flex flex-col flex-grow">
              <h1 className="text-base md:text-lg font-semibold leading-tight">
                {job.jobTitle}
              </h1>
              <div className="flex flex-wrap items-center gap-1 text-xs text-muted-foreground">
                <span>{job.company.name}</span>
                <span>•</span>
                <Badge className="rounded-full px-2 py-0" variant="secondary">
                  {job.employmentType}
                </Badge>
                <span>•</span>
                <Badge className="rounded-full px-2 py-0">{job.location}</Badge>
                <span>•</span>
                <span>
                  {job.salaryFrom === job.salaryTo
                    ? formatCurrency(job.salaryFrom)
                    : `${formatCurrency(job.salaryFrom)} - ${formatCurrency(
                        job.salaryTo
                      )}`}
                </span>
              </div>
            </div>

            <div className="ml-auto flex flex-col items-end">
              <div className="flex items-center gap-1 text-xs">
                <MapPin className="size-3" />
                {job.location}
              </div>
              <p className="text-[11px] text-muted-foreground">
                {formatRelativeTime(new Date(job.createdAt))}
              </p>
            </div>
          </div>

          <p className="mt-2 text-xs text-muted-foreground line-clamp-2">
            {job.company.about}
          </p>
        </CardHeader>
      </Card>
    </Link>
  );
}
