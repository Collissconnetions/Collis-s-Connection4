/*
  # Fix Security Vulnerabilities

  ## Changes Made
  
  ### 1. Remove Unused Index
  - Drop unused index `idx_vehicle_media_submission_id` on `vehicle_media` table
  - This index was reported as never being used by the query planner
  
  ### 2. Fix RLS Policy with Always-True USING Clause
  - Drop the `Authenticated users can update submission status` policy on `vehicle_submissions`
  - This policy had `USING (true)` which allowed ANY authenticated user to update ANY submission
  - This is a critical security flaw as it bypasses row-level security
  - Admin updates should be performed using service role key or through a secure Edge Function
  
  ## Important Notes
  
  ### Auth DB Connection Strategy (Manual Fix Required)
  The Auth DB Connection Strategy issue cannot be fixed via migration. You must:
  1. Go to your Supabase Dashboard
  2. Navigate to Settings → Database → Connection Pooling
  3. Switch from fixed connection count to percentage-based allocation
  4. This allows the Auth server to scale connections based on instance size
  
  ### Admin Functionality
  After this migration, authenticated users will no longer be able to update submissions via RLS.
  To maintain admin functionality, you should either:
  - Use the service role key in a secure server-side context
  - Create an Edge Function that validates admin permissions and uses service role
  - Implement a proper admin role system with auth metadata
*/

-- Remove unused index
DROP INDEX IF EXISTS idx_vehicle_media_submission_id;

-- Drop the insecure policy that allows unrestricted updates
DROP POLICY IF EXISTS "Authenticated users can update submission status" ON vehicle_submissions;
