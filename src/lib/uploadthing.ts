import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Video upload route for testimonials
  videoUploader: f({
    video: {
      maxFileSize: "128MB",
      maxFileCount: 1,
    },
  })
    // Set permissions and metadata
    .middleware(async ({ req }) => {
      // This code runs on the server before upload
      // You can add authentication here if needed

      // For now, we'll allow anyone to upload to public forms
      // Later you can add auth checks
      return { uploadedBy: "public" };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // This code runs on the server after upload completes
      console.log("Upload complete for:", metadata.uploadedBy);
      console.log("File URL:", file.url);

      // Return data that will be sent to the client
      return { uploadedBy: metadata.uploadedBy, fileUrl: file.url };
    }),

  // Product images uploader
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
