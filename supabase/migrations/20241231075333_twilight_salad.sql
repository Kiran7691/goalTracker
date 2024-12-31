/*
  # Add Motivational Quotes

  1. New Tables
    - `quotes`
      - `id` (uuid, primary key)
      - `content` (text, the quote text)
      - `author` (text, quote author)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on `quotes` table
    - Add policy for authenticated users to read quotes
*/

-- Create quotes table
CREATE TABLE IF NOT EXISTS quotes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  content text NOT NULL,
  author text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE quotes ENABLE ROW LEVEL SECURITY;

-- Create policy for reading quotes
CREATE POLICY "Anyone can read quotes"
  ON quotes FOR SELECT
  TO authenticated
  USING (true);

-- Insert sample quotes
INSERT INTO quotes (content, author) VALUES
  ('Success is not final, failure is not fatal: it is the courage to continue that counts.', 'Winston Churchill'),
  ('The only way to do great work is to love what you do.', 'Steve Jobs'),
  ('Believe you can and you''re halfway there.', 'Theodore Roosevelt'),
  ('The future belongs to those who believe in the beauty of their dreams.', 'Eleanor Roosevelt'),
  ('It does not matter how slowly you go as long as you do not stop.', 'Confucius');