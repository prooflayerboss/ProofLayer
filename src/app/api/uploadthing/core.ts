import { createUploadthing, type FileRouter } from "uploadthing/next";
import { apiLogger } from '@/lib/logger';

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
      apiLogger.info('Video upload complete', { url: file.url });
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
      apiLogger.info('Screenshot upload complete', { url: file.url });
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
      apiLogger.info('Logo upload complete', { url: file.url });
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
      apiLogger.info('Product image uploaded', { url: file.url });
      return { fileUrl: file.url };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
