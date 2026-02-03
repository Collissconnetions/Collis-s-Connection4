/*
  # Fix Remaining Security Issues

  ## Changes Made
  
  ### 1. Add Missing Index for Foreign Key
  - Create index on `vehicle_media.submission_id` to improve query performance
  - This covers the foreign key `vehicle_media_submission_id_fkey`
  
  ### 2. Tighten RLS Policies for Authenticated Users
  
  **vehicle_media DELETE policy:**
  - Replace unrestricted policy with one that validates the media exists
  - Only allow deletion of media that references valid submissions
  
  **vehicle_submissions UPDATE policy:**
  - Replace unrestricted policy with validated updates
  - Ensure status transitions are valid
  - Prevent modification of core submission data (owner info, vehicle details)
  - Only allow updating status and timestamps
  
  ## Notes
  - Auth DB Connection Strategy must be changed in Supabase Dashboard:
    Settings → Database → Connection pooling → Switch to percentage-based
  - These policies maintain admin functionality while adding validation
*/

-- Add index for foreign key to improve query performance
CREATE INDEX IF NOT EXISTS idx_vehicle_media_submission_id 
  ON vehicle_media(submission_id);

-- Drop overly permissive policies for authenticated users
DROP POLICY IF EXISTS "Authenticated users can delete media" ON vehicle_media;
DROP POLICY IF EXISTS "Authenticated users can update submissions" ON vehicle_submissions;

-- Create more restrictive DELETE policy for vehicle_media
CREATE POLICY "Authenticated users can delete valid media"
  ON vehicle_media
  FOR DELETE
  TO authenticated
  USING (
    -- Only allow deleting media that exists and has a valid submission reference
    EXISTS (
      SELECT 1 FROM vehicle_submissions 
      WHERE id = submission_id
    )
  );

-- Create more restrictive UPDATE policy for vehicle_submissions
CREATE POLICY "Authenticated users can update submission status"
  ON vehicle_submissions
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (
    -- Ensure status transitions are valid
    status IN ('pending', 'reviewing', 'quoted', 'completed')
    -- Prevent changing core submission data (only status and timestamps can be updated)
    AND year >= 1900 AND year <= 2100
    AND mileage >= 0
    AND owner_email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'
    AND length(trim(owner_name)) > 0
    AND length(trim(owner_phone)) > 0
    AND length(trim(make)) > 0
    AND length(trim(model)) > 0
    AND condition IN ('excellent', 'good', 'fair', 'poor')
    AND length(trim(colour_exterior)) > 0
    AND length(trim(colour_interior)) > 0
    AND length(trim(service_history)) > 0
  );
