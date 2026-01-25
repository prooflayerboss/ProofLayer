'use client';

import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { UploadButton } from '@/lib/uploadthing-utils';

interface ScreenshotUploaderProps {
  onUploadComplete: (url: string) => void;
  onUploadError: (error: string) => void;
  onUploadProgress?: (progress: number) => void;
}

export default function ScreenshotUploader({
  onUploadComplete,
  onUploadError,
  onUploadProgress,
}: ScreenshotUploaderProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;

    const file = acceptedFiles[0];

    // Validate file size (4MB max)
    if (file.size > 4 * 1024 * 1024) {
      onUploadError('File size must be less than 4MB');
      return;
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      onUploadError('Only image files are allowed');
      return;
    }

    // Create preview
    const reader = new FileReader();
    reader.onload = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  }, [onUploadError]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/png': ['.png'],
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/webp': ['.webp'],
    },
    maxFiles: 1,
    multiple: false,
  });

  const handleRemove = () => {
    setPreview(null);
    setUploadProgress(0);
  };

  return (
    <div className="space-y-4">
      {!preview ? (
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
            isDragActive
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-300 hover:border-gray-400'
          }`}
        >
          <input {...getInputProps()} />
          <div className="space-y-2">
            <svg
              className="w-12 h-12 mx-auto text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <div>
              {isDragActive ? (
                <p className="text-blue-600 font-medium">Drop screenshot here...</p>
              ) : (
                <>
                  <p className="text-gray-700 font-medium">
                    Drag & drop a screenshot, or click to select
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    PNG, JPG, or WebP • Max 4MB
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="relative rounded-lg overflow-hidden border border-gray-200">
            <img
              src={preview}
              alt="Screenshot preview"
              className="w-full h-auto max-h-96 object-contain bg-gray-50"
            />
            {!isUploading && (
              <button
                onClick={handleRemove}
                className="absolute top-2 right-2 bg-red-600 text-white p-2 rounded-full hover:bg-red-700 transition-colors shadow-lg"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            )}
          </div>

          {!isUploading && (
            <UploadButton
              endpoint="screenshotUploader"
              onClientUploadComplete={(res) => {
                if (res && res[0]) {
                  onUploadComplete(res[0].url);
                  setIsUploading(false);
                }
              }}
              onUploadError={(error: Error) => {
                console.error('Screenshot upload error:', error);
                onUploadError(error.message);
                setIsUploading(false);
              }}
              onUploadBegin={() => {
                setIsUploading(true);
                setUploadProgress(0);
              }}
              onUploadProgress={(progress) => {
                setUploadProgress(progress);
                if (onUploadProgress) {
                  onUploadProgress(progress);
                }
              }}
              appearance={{
                button:
                  'w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium',
                allowedContent: 'hidden',
              }}
            />
          )}

          {isUploading && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Uploading screenshot...</span>
                <span>{uploadProgress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-blue-600 h-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
