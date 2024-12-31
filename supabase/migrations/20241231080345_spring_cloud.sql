/*
  # Fix profiles table policies

  1. Changes
    - Add INSERT policy for profiles table
    - Update existing policies to handle upsert operations
*/

-- Add INSERT policy for profiles
CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Update existing policies to be more permissive for upsert operations
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);