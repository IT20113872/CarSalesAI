import { prisma } from "@/app/utils/db";
import { EmptyState } from "./EmptyState";
import { PaginationComponent } from "./PaginationComponent";
import { JobCard } from "./JobCard";
import { JobPostStatus } from "@prisma/client";

async function getJobs(
  page: number = 1,
  pageSize: number = 10,
  jobTypes: string[] = [],
  location: string = "",
  minSalary?: string,
  maxSalary?: string
) {
  const skip = (page - 1) * pageSize;

  const where = {
    status: JobPostStatus.ACTIVE,
    ...(jobTypes.length > 0 && {
      employmentType: {
        in: jobTypes,
      },
    }),
    ...(location &&
      location !== "worldwide" && {
        location: location,
      }),
    ...(minSalary && {
      salaryFrom: {
        gte: parseInt(minSalary, 10), // Greater than or equal to minSalary
      },
    }),
    ...(maxSalary && {
      salaryTo: {
        lte: parseInt(maxSalary, 10), // Less than or equal to maxSalary
      },
    }),
  };

  const [data, totalCount] = await Promise.all([
    prisma.jobPost.findMany({
      skip,
      take: pageSize,
      where,
      select: {
        jobTitle: true,
        id: true,
        salaryFrom: true,
        salaryTo: true,
        employmentType: true,
        location: true,
        createdAt: true,
        company: {
          select: {
            name: true,
            logo: true,
            location: true,
            about: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    }),
    prisma.jobPost.count({ where }),
  ]);

  return {
    jobs: data,
    totalPages: Math.ceil(totalCount / pageSize),
    currentPage: page,
  };
}

export default async function JobListings({
  currentPage,
  jobTypes,
  location,
  minSalary,
  maxSalary,
}: {
  currentPage: number;
  jobTypes: string[];
  location: string;
  minSalary?: string;
  maxSalary?: string;
}) {
  const {
    jobs,
    totalPages,
    currentPage: page,
  } = await getJobs(currentPage, 7, jobTypes, location, minSalary, maxSalary);

  return (
    <>
      {jobs.length > 0 ? (
        <div className="flex flex-col gap-6">
          {jobs.map((job, index) => (
            <JobCard job={job} key={index} />
          ))}
        </div>
      ) : (
        <EmptyState
          title="No jobs found"
          description="Try adjusting your filters or clearing them."
          buttonText="Clear all filters"
          href="/"
        />
      )}

      <div className="flex justify-center mt-6">
        <PaginationComponent totalPages={totalPages} currentPage={page} />
      </div>
    </>
  );
}