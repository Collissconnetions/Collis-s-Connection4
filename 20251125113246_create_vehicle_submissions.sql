/*
  # Create Vehicle Submissions System

  ## Overview
  Creates a comprehensive system for users to submit vehicle information including photos, videos, and detailed vehicle data.

  ## New Tables
  
  ### 1. `vehicle_submissions`
  Stores all vehicle submission data including owner information and vehicle details.
  
  **Columns:**
  - `id` (uuid, primary key) - Unique identifier for each submission
  - `created_at` (timestamptz) - Timestamp when submission was created
  - `updated_at` (timestamptz) - Timestamp of last update
  - `status` (text) - Submission status: 'pending', 'reviewing', 'quoted', 'completed'
  
  **Contact Information:**
  - `owner_name` (text) - Full name of vehicle owner
  - `owner_email` (text) - Email address for contact
  - `owner_phone` (text) - Phone number for contact
  
  **Vehicle Information:**
  - `year` (integer) - Vehicle year
  - `make` (text) - Vehicle manufacturer
  - `model` (text) - Vehicle model
  - `trim` (text, optional) - Specific trim level
  - `mileage` (integer) - Current odometer reading
  - `vin` (text, optional) - Vehicle identification number
  - `color_exterior` (text) - Exterior color
  - `color_interior` (text, optional) - Interior color
  
  **Condition & Features:**
  - `condition` (text) - Overall condition: 'excellent', 'good', 'fair', 'poor'
  - `accident_history` (boolean) - Has vehicle been in accidents
  - `service_history` (text) - Service and maintenance history description
  - `modifications` (text, optional) - Any modifications made to vehicle
  - `issues` (text, optional) - Known issues or problems
  - `additional_notes` (text, optional) - Any additional information
  
  ### 2. `vehicle_media`
  Stores references to uploaded photos and videos for each submission.
  
  **Columns:**
  - `id` (uuid, primary key) - Unique identifier for each media item
  - `submission_id` (uuid, foreign key) - References vehicle_submissions.id
  - `media_type` (text) - Type: 'photo' or 'video'
  - `file_url` (text) - URL to the uploaded file in storage
  - `file_name` (text) - Original filename
  - `file_size` (integer) - File size in bytes
  - `uploaded_at` (timestamptz) - Upload timestamp
  - `display_order` (integer) - Order for displaying media

  ## Storage
  Creates a public storage bucket for vehicle photos and videos.

  ## Security
  - Enable RLS on all tables
  - Allow public INSERT for new submissions (anyone can submit)
  - Allow public SELECT for viewing submissions (you'll manage access)
  - Media bucket is public for easy viewing
*/

CREATE TABLE IF NOT EXISTS vehicle_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'reviewing', 'quoted', 'completed')),
  
  owner_name text NOT NULL,
  owner_email text NOT NULL,
  owner_phone text NOT NULL,
  
  year integer NOT NULL CHECK (year >= 1900 AND year <= 2100),
  make text NOT NULL,
  model text NOT NULL,
  trim text,
  mileage integer NOT NULL CHECK (mileage >= 0),
  vin text,
  color_exterior text NOT NULL,
  color_interior text,
  
  condition text NOT NULL CHECK (condition IN ('excellent', 'good', 'fair', 'poor')),
  accident_history boolean DEFAULT false,
  service_history text,
  modifications text,
  issues text,
  additional_notes text
);

CREATE TABLE IF NOT EXISTS vehicle_media (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  submission_id uuid NOT NULL REFERENCES vehicle_submissions(id) ON DELETE CASCADE,
  media_type text NOT NULL CHECK (media_type IN ('photo', 'video')),
  file_url text NOT NULL,
  file_name text NOT NULL,
  file_size integer NOT NULL,
  uploaded_at timestamptz DEFAULT now(),
  display_order integer DEFAULT 0
);

CREATE INDEX IF NOT EXISTS idx_vehicle_media_submission_id ON vehicle_media(submission_id);
CREATE INDEX IF NOT EXISTS idx_vehicle_submissions_status ON vehicle_submissions(status);
CREATE INDEX IF NOT EXISTS idx_vehicle_submissions_created_at ON vehicle_submissions(created_at DESC);

ALTER TABLE vehicle_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE vehicle_media ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can create vehicle submissions"
  ON vehicle_submissions
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Anyone can view vehicle submissions"
  ON vehicle_submissions
  FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Anyone can create vehicle media"
  ON vehicle_media
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Anyone can view vehicle media"
  ON vehicle_media
  FOR SELECT
  TO anon
  USING (true);

INSERT INTO storage.buckets (id, name, public)
VALUES ('vehicle-media', 'vehicle-media', true)
ON CONFLICT (id) DO NOTHING;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'storage' 
    AND tablename = 'objects' 
    AND policyname = 'Anyone can upload vehicle media'
  ) THEN
    CREATE POLICY "Anyone can upload vehicle media"
      ON storage.objects FOR INSERT
      TO anon
      WITH CHECK (bucket_id = 'vehicle-media');
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'storage' 
    AND tablename = 'objects' 
    AND policyname = 'Anyone can view vehicle media'
  ) THEN
    CREATE POLICY "Anyone can view vehicle media"
      ON storage.objects FOR SELECT
      TO anon
      USING (bucket_id = 'vehicle-media');
  END IF;
END $$;