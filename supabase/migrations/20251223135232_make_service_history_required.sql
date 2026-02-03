/*
  # Make Service History Required

  ## Changes
  - Alters the `vehicle_submissions` table to make the `service_history` column NOT NULL
  - Updates any existing records with empty service history to have a default value
  - This ensures all vehicle submissions must include service history information
  
  ## Notes
  - First updates any existing NULL values to prevent constraint violation
  - Then adds the NOT NULL constraint to the column
*/

-- Update any existing NULL service_history values to a default placeholder
UPDATE vehicle_submissions 
SET service_history = 'Not provided' 
WHERE service_history IS NULL OR service_history = '';

-- Make the service_history column NOT NULL
ALTER TABLE vehicle_submissions 
ALTER COLUMN service_history SET NOT NULL;