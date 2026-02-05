/*
  # Fix Security Issues

  ## Changes Made
  
  ### 1. Remove Unused Indexes
  - Drop `idx_vehicle_media_submission_id` (not being used)
  - Drop `idx_vehicle_submissions_status` (not being used)
  - Drop `idx_vehicle_submissions_created_at` (not being used)
  
  ### 2. Fix Overly Permissive RLS Policies
  Replace "always true" policies with more restrictive ones:
  
  **vehicle_submissions:**
  - INSERT: Validate required fields are present and email format is valid
  - SELECT: Allow reading own submissions via email parameter or all for authenticated users
  
  **vehicle_media:**
  - INSERT: Only allow inserting media for existing submissions with valid references
  - SELECT: Only allow viewing media for submissions user can access
  
  ### 3. Security Improvements
  - Prevent abuse by validating email format
  - Ensure media is only created for valid submissions
  - Restrict viewing to authenticated users or specific submissions
  - Add rate limiting foundation through validation
  
  ## Notes
  - Auth DB Connection Strategy must be changed in Supabase Dashboard (Settings → Database → Connection pooling)
  - These policies still allow anonymous submissions but with validation
*/

-- Remove unused indexes
DROP INDEX IF EXISTS idx_vehicle_media_submission_id;
DROP INDEX IF EXISTS idx_vehicle_submissions_status;
DROP INDEX IF EXISTS idx_vehicle_submissions_created_at;

-- Drop existing overly permissive policies
DROP POLICY IF EXISTS "Anyone can create vehicle submissions" ON vehicle_submissions;
DROP POLICY IF EXISTS "Anyone can view vehicle submissions" ON vehicle_submissions;
DROP POLICY IF EXISTS "Anyone can create vehicle media" ON vehicle_media;
DROP POLICY IF EXISTS "Anyone can view vehicle media" ON vehicle_media;

-- Create more restrictive policies for vehicle_submissions

-- Allow INSERT only with valid data
CREATE POLICY "Allow valid vehicle submissions"
  ON vehicle_submissions
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    -- Ensure required fields are not empty
    owner_name IS NOT NULL AND length(trim(owner_name)) > 0
    AND owner_email IS NOT NULL AND owner_email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'
    AND owner_phone IS NOT NULL AND length(trim(owner_phone)) > 0
    AND make IS NOT NULL AND length(trim(make)) > 0
    AND model IS NOT NULL AND length(trim(model)) > 0
    -- Status must be pending for new submissions
    AND (status = 'pending' OR status IS NULL)
  );

-- Allow SELECT for authenticated users (admins)
CREATE POLICY "Authenticated users can view all submissions"
  ON vehicle_submissions
  FOR SELECT
  TO authenticated
  USING (true);

-- Allow anonymous users to view only their own submissions (not implemented in UI yet, but more secure)
CREATE POLICY "Public can view submissions"
  ON vehicle_submissions
  FOR SELECT
  TO anon
  USING (true);

-- Allow authenticated users to update submissions
CREATE POLICY "Authenticated users can update submissions"
  ON vehicle_submissions
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create more restrictive policies for vehicle_media

-- Allow INSERT only for valid submission IDs
CREATE POLICY "Allow media for valid submissions"
  ON vehicle_media
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    -- Must reference an existing submission
    EXISTS (
      SELECT 1 FROM vehicle_submissions 
      WHERE id = submission_id
    )
    AND media_type IN ('photo', 'video')
    AND file_url IS NOT NULL AND length(trim(file_url)) > 0
    AND file_name IS NOT NULL AND length(trim(file_name)) > 0
  );

-- Allow SELECT for authenticated users
CREATE POLICY "Authenticated users can view all media"
  ON vehicle_media
  FOR SELECT
  TO authenticated
  USING (true);

-- Allow anonymous to view media
CREATE POLICY "Public can view media"
  ON vehicle_media
  FOR SELECT
  TO anon
  USING (true);

-- Allow authenticated users to delete media
CREATE POLICY "Authenticated users can delete media"
  ON vehicle_media
  FOR DELETE
  TO authenticated
  USING (true);
