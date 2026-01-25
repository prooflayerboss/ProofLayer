'use client';

import { useCallback, useState, useRef } from 'react';
import { useDropzone } from 'react-dropzone';
import { generateReactHelpers } from "@uploadthing/react";
import type { OurFileRouter } from "@/app/api/uploadthing/core";

const { useUploadThing } = generateReactHelpers<OurFileRouter>();

interface VideoUploaderProps {
  onUploadComplete: (url: string) => void;
  onUploadError: (error: string) => void;
  onUploadProgress?: (progress: number) => void;
}

export default function VideoUploader({
  onUploadComplete,
  onUploadError,
  onUploadProgress,
}: VideoUploaderProps) {
  const [mode, setMode] = useState<'select' | 'recording'>('select');
  const [isRecording, setIsRecording] = useState(false);
  const [recordedBlob, setRecordedBlob] = useState<Blob | null>(null);
  const [recordingTime, setRecordingTime] = useState(0);
  const [stream, setStream] = useState<MediaStream | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const videoPreviewRef = useRef<HTMLVideoElement | null>(null);
  const recordingIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  const { startUpload, isUploading } = useUploadThing("videoUploader", {
    onClientUploadComplete: (res) => {
      if (res && res[0]) {
        onUploadComplete(res[0].url);
      }
    },
    onUploadError: (error) => {
      onUploadError(error.message);
    },
    onUploadProgress: (progress) => {
      if (onUploadProgress) {
        onUploadProgress(progress);
      }
    },
  });

  const startRecording = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user' },
        audio: true,
      });

      setStream(mediaStream);

      if (videoPreviewRef.current) {
        videoPreviewRef.current.srcObject = mediaStream;
        videoPreviewRef.current.play();
      }

      const mediaRecorder = new MediaRecorder(mediaStream, {
        mimeType: 'video/webm;codecs=vp8,opus',
      });

      chunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'video/webm' });
        setRecordedBlob(blob);

        // Show preview of recorded video
        if (videoPreviewRef.current) {
          videoPreviewRef.current.srcObject = null;
          videoPreviewRef.current.src = URL.createObjectURL(blob);
        }
      };

      mediaRecorder.start();
      mediaRecorderRef.current = mediaRecorder;
      setIsRecording(true);
      setMode('recording');

      // Start timer
      setRecordingTime(0);
      recordingIntervalRef.current = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);
    } catch (error) {
      onUploadError('Unable to access camera. Please check permissions.');
      console.error('Error accessing media devices:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);

      // Stop all tracks
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
        setStream(null);
      }

      // Clear timer
      if (recordingIntervalRef.current) {
        clearInterval(recordingIntervalRef.current);
        recordingIntervalRef.current = null;
      }
    }
  };

  const uploadRecordedVideo = async () => {
    if (!recordedBlob) return;

    // Convert blob to file
    const file = new File([recordedBlob], 'recorded-video.webm', {
      type: 'video/webm',
    });

    // Validate file size (128MB max)
    if (file.size > 128 * 1024 * 1024) {
      onUploadError('Video must be less than 128MB. Try recording a shorter video.');
      return;
    }

    await startUpload([file]);
  };

  const cancelRecording = () => {
    if (isRecording) {
      stopRecording();
    }

    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }

    if (recordingIntervalRef.current) {
      clearInterval(recordingIntervalRef.current);
      recordingIntervalRef.current = null;
    }

    setMode('select');
    setRecordedBlob(null);
    setRecordingTime(0);
  };

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];

        // Validate file size (128MB max)
        if (file.size > 128 * 1024 * 1024) {
          onUploadError('Video must be less than 128MB');
          return;
        }

        // Validate file type
        if (!file.type.startsWith('video/')) {
          onUploadError('Please upload a valid video file');
          return;
        }

        // Start upload
        await startUpload([file]);
      }
    },
    [startUpload, onUploadError]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'video/*': ['.mp4', '.mov', '.webm', '.avi'],
    },
    maxFiles: 1,
    disabled: isUploading || mode === 'recording',
  });

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (mode === 'recording') {
    return (
      <div className="space-y-4">
        <div className="relative bg-black rounded-lg overflow-hidden">
          <video
            ref={videoPreviewRef}
            className="w-full"
            style={{ maxHeight: '400px' }}
            autoPlay
            muted={isRecording}
            playsInline
          />

          {isRecording && (
            <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded-full flex items-center gap-2">
              <div className="w-3 h-3 bg-white rounded-full animate-pulse" />
              <span className="text-sm font-medium">{formatTime(recordingTime)}</span>
            </div>
          )}
        </div>

        <div className="flex items-center justify-center gap-3">
          {isRecording ? (
            <button
              type="button"
              onClick={stopRecording}
              className="px-6 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors"
            >
              Stop Recording
            </button>
          ) : recordedBlob ? (
            <>
              <button
                type="button"
                onClick={uploadRecordedVideo}
                disabled={isUploading}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                {isUploading ? 'Uploading...' : 'Use This Video'}
              </button>
              <button
                type="button"
                onClick={startRecording}
                className="px-6 py-2 bg-gray-600 text-white rounded-lg font-medium hover:bg-gray-700 transition-colors"
              >
                Re-record
              </button>
            </>
          ) : null}

          <button
            type="button"
            onClick={cancelRecording}
            className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-400 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Option buttons */}
      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={startRecording}
          disabled={isUploading}
          className="flex flex-col items-center justify-center p-6 border-2 border-gray-300 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <svg className="w-8 h-8 text-blue-600 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
          <span className="font-semibold text-gray-900">Record Video</span>
          <span className="text-xs text-gray-500 mt-1">Use your camera</span>
        </button>

        <div
          {...getRootProps()}
          className={`flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${
            isDragActive
              ? 'border-blue-500 bg-blue-50'
              : isUploading
              ? 'border-gray-300 bg-gray-50 cursor-not-allowed'
              : 'border-gray-300 hover:border-blue-400 hover:bg-blue-50'
          }`}
        >
          <input {...getInputProps()} />
          <svg className="w-8 h-8 text-blue-600 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
          <span className="font-semibold text-gray-900">Upload Video</span>
          <span className="text-xs text-gray-500 mt-1">From your device</span>
        </div>
      </div>

      {isUploading && (
        <div className="text-center">
          <p className="text-sm text-gray-600 font-medium">Uploading video...</p>
          <p className="text-xs text-gray-500">Please wait, this may take a moment</p>
        </div>
      )}
    </div>
  );
}
