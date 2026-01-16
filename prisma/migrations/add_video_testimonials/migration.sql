-- Add video testimonial support to Submissions and Forms

-- Add new submission type enum
CREATE TYPE "SubmissionType" AS ENUM ('TEXT', 'VIDEO');

-- Add video fields to submissions table
ALTER TABLE submissions ADD COLUMN video_url TEXT;
ALTER TABLE submissions ADD COLUMN video_thumbnail TEXT;
ALTER TABLE submissions ADD COLUMN video_duration INTEGER;
ALTER TABLE submissions ADD COLUMN submission_type "SubmissionType" NOT NULL DEFAULT 'TEXT';

-- Add form collection settings
ALTER TABLE forms ADD COLUMN allow_text BOOLEAN NOT NULL DEFAULT true;
ALTER TABLE forms ADD COLUMN allow_video BOOLEAN NOT NULL DEFAULT false;
