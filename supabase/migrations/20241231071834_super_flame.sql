/*
  # Initial Schema Setup for Goal Tracker

  1. New Tables
    - goals
      - id (uuid, primary key)
      - user_id (uuid, references auth.users)
      - title (text)
      - description (text)
      - category (text)
      - priority (text)
      - status (text)
      - due_date (timestamptz)
      - created_at (timestamptz)
      - updated_at (timestamptz)
    
    - milestones
      - id (uuid, primary key)
      - goal_id (uuid, references goals)
      - title (text)
      - completed (boolean)
      - due_date (timestamptz)
      - created_at (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Add policies for CRUD operations
*/

-- Create enum types
CREATE TYPE goal_category AS ENUM ('Personal', 'Professional', 'Health', 'Financial');
CREATE TYPE goal_priority AS ENUM ('High', 'Medium', 'Low');
CREATE TYPE goal_status AS ENUM ('Not Started', 'In Progress', 'Completed');

-- Create goals table
CREATE TABLE IF NOT EXISTS goals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  title text NOT NULL,
  description text,
  category goal_category NOT NULL,
  priority goal_priority NOT NULL DEFAULT 'Medium',
  status goal_status NOT NULL DEFAULT 'Not Started',
  due_date timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create milestones table
CREATE TABLE IF NOT EXISTS milestones (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  goal_id uuid REFERENCES goals ON DELETE CASCADE NOT NULL,
  title text NOT NULL,
  completed boolean DEFAULT false,
  due_date timestamptz,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE goals ENABLE ROW LEVEL SECURITY;
ALTER TABLE milestones ENABLE ROW LEVEL SECURITY;

-- Create policies for goals
CREATE POLICY "Users can view their own goals"
  ON goals FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own goals"
  ON goals FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own goals"
  ON goals FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own goals"
  ON goals FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create policies for milestones
CREATE POLICY "Users can view milestones of their goals"
  ON milestones FOR SELECT
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM goals
    WHERE goals.id = milestones.goal_id
    AND goals.user_id = auth.uid()
  ));

CREATE POLICY "Users can create milestones for their goals"
  ON milestones FOR INSERT
  TO authenticated
  WITH CHECK (EXISTS (
    SELECT 1 FROM goals
    WHERE goals.id = milestones.goal_id
    AND goals.user_id = auth.uid()
  ));

CREATE POLICY "Users can update milestones of their goals"
  ON milestones FOR UPDATE
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM goals
    WHERE goals.id = milestones.goal_id
    AND goals.user_id = auth.uid()
  ));

CREATE POLICY "Users can delete milestones of their goals"
  ON milestones FOR DELETE
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM goals
    WHERE goals.id = milestones.goal_id
    AND goals.user_id = auth.uid()
  ));