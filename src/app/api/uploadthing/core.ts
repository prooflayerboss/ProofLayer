import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

export const ourFileRouter = {
  videoUploader: f({
    video: {
      maxFileSize: "128MB",
      maxFileCount: 1,
    },
  })
    .middleware(async ({ req }) => {
      // Allow public uploads to forms
      return { uploadedBy: "public" };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Video upload complete:", file.url);
      return { fileUrl: file.url };
    }),

  screenshotUploader: f({
    image: {
      maxFileSize: "4MB",
      maxFileCount: 1,
    },
  })
    .middleware(async ({ req }) => {
      // Allow public uploads to forms
      return { uploadedBy: "public" };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Screenshot upload complete:", file.url);
      return { fileUrl: file.url };
    }),

  logoUploader: f({
    image: {
      maxFileSize: "8MB",
      maxFileCount: 1,
    },
  })
    .middleware(async ({ req }) => {
      // Allow authenticated users to upload logos
      return { uploadedBy: "user" };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Logo upload complete:", file.url);
      return { fileUrl: file.url };
    }),

  productImageUploader: f({
    image: {
      maxFileSize: "4MB",
      maxFileCount: 5,
    },
  })
    .middleware(async ({ req }) => {
      // Allow authenticated users to upload product images
      return { uploadedBy: "user" };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Product image uploaded:", file.url);
      return { fileUrl: file.url };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
