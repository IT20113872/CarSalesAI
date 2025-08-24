import { auth } from "@/app/utils/auth";
import { requireUser } from "@/app/utils/requireUser";
import { redirect } from "next/navigation";
// import { redirect } from "next/dist/server/api-utils";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

// const auth = (req: Request) => ({ id: "fakeId" }); // Fake auth function

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  imageUploader: f({
    image: {
      maxFileSize: "2MB",
      maxFileCount: 1,
    },
  })
    .middleware(async () => {
      const session = await requireUser();
      if (!session.id) throw new UploadThingError("Unauthorized");
      return { userId: session.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Image upload complete for userId:", metadata.userId);
      console.log("File URL:", file.ufsUrl);
      return { uploadedBy: metadata.userId };
    }),

  // Resume uploader (PDF only)
  resumeUploader: f({
    "application/pdf": {
      maxFileSize: "4MB", // adjust size if needed
      maxFileCount: 1,
    },
  })
    .middleware(async () => {
      const session = await requireUser();
      if (!session.id) throw new UploadThingError("Unauthorized");
      return { userId: session.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Resume upload complete for userId:", metadata.userId);
      console.log("File URL:", file.ufsUrl);
      return { uploadedBy: metadata.userId };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
