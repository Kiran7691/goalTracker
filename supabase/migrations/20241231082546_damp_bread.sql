/*
  # Add notes column to goals table

  1. Changes
    - Add `notes` column to `goals` table for storing goal-specific notes
    - Column is nullable to maintain compatibility with existing goals
*/

ALTER TABLE goals ADD COLUMN IF NOT EXISTS notes text;