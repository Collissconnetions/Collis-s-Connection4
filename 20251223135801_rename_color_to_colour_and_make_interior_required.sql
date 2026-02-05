/*
  # Rename color columns to colour and make interior colour required

  ## Changes
  1. Column Renames
    - Rename `color_exterior` to `colour_exterior`
    - Rename `color_interior` to `colour_interior`
  
  2. Schema Changes
    - Make `colour_interior` a required field (NOT NULL)
    - Add default empty string for existing records during migration
  
  ## Notes
  - Uses ALTER TABLE to rename columns safely
  - Ensures data integrity during column rename
  - Makes interior colour mandatory for all future submissions
*/

DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'vehicle_submissions' 
    AND column_name = 'color_exterior'
  ) THEN
    ALTER TABLE vehicle_submissions 
    RENAME COLUMN color_exterior TO colour_exterior;
  END IF;
END $$;

DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'vehicle_submissions' 
    AND column_name = 'color_interior'
  ) THEN
    ALTER TABLE vehicle_submissions 
    RENAME COLUMN color_interior TO colour_interior;
  END IF;
END $$;

DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'vehicle_submissions' 
    AND column_name = 'colour_interior'
    AND is_nullable = 'YES'
  ) THEN
    UPDATE vehicle_submissions 
    SET colour_interior = '' 
    WHERE colour_interior IS NULL;
    
    ALTER TABLE vehicle_submissions 
    ALTER COLUMN colour_interior SET NOT NULL;
  END IF;
END $$;