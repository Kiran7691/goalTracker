/*
  # Fix profile policies

  1. Changes
    - Drop existing profile policies to avoid conflicts
    - Recreate profile policies with proper permissions
  
  2. Security
    - Maintain RLS for profiles table
    - Ensure users can only access their own profile data
    - Allow authenticated users to read, insert, and update their own profiles
*/

-- Drop existing policies if they exist
DO $$ BEGIN
    DROP POLICY IF EXISTS "Users can read own profile" ON profiles;
    DROP POLICY IF EXISTS "Users can insert own profile" ON profiles;
    DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
EXCEPTION
    WHEN undefined_object THEN
        NULL;
END $$;

-- Create or update policies
CREATE POLICY "Users can read own profile"
  ON profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);