/*
  # Create Contact Submissions Table

  ## Overview
  This migration creates the database structure for storing contact form submissions from the Revelro Cars website.

  ## 1. New Tables
    - `contact_submissions`
      - `id` (uuid, primary key) - Unique identifier for each submission
      - `name` (text) - Full name of the person submitting the form
      - `email` (text) - Email address for contact
      - `phone` (text, nullable) - Optional phone number
      - `service` (text, nullable) - Service they're interested in
      - `message` (text) - Their message or inquiry
      - `status` (text) - Status of the submission (new, contacted, resolved)
      - `created_at` (timestamptz) - When the submission was created
      - `updated_at` (timestamptz) - When the submission was last updated
      - `ip_address` (text, nullable) - IP address of submitter for spam prevention

  ## 2. Indexes
    - Index on email for faster lookups
    - Index on created_at for sorting and filtering
    - Index on status for filtering by submission status

  ## 3. Security
    - Enable RLS on `contact_submissions` table
    - Public INSERT policy: Allow anyone to submit contact forms
    - Admin-only SELECT policy: Only authenticated users can view submissions
    - Admin-only UPDATE policy: Only authenticated users can update status

  ## 4. Important Notes
    - Contact forms are publicly accessible (no authentication required to submit)
    - Viewing and managing submissions requires authentication (for future admin panel)
    - Includes basic spam prevention with IP tracking
*/

-- Create contact_submissions table
CREATE TABLE IF NOT EXISTS contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  service text,
  message text NOT NULL,
  status text DEFAULT 'new' NOT NULL,
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL,
  ip_address text,
  CONSTRAINT valid_status CHECK (status IN ('new', 'contacted', 'resolved', 'spam'))
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_contact_submissions_email ON contact_submissions(email);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_created_at ON contact_submissions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_status ON contact_submissions(status);

-- Add updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for updated_at
DROP TRIGGER IF EXISTS update_contact_submissions_updated_at ON contact_submissions;
CREATE TRIGGER update_contact_submissions_updated_at
  BEFORE UPDATE ON contact_submissions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Policy: Allow anyone to insert contact form submissions (public form)
CREATE POLICY "Anyone can submit contact forms"
  ON contact_submissions
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Policy: Only authenticated users can view submissions (for future admin panel)
CREATE POLICY "Authenticated users can view all submissions"
  ON contact_submissions
  FOR SELECT
  TO authenticated
  USING (true);

-- Policy: Only authenticated users can update submissions (for managing status)
CREATE POLICY "Authenticated users can update submissions"
  ON contact_submissions
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Policy: Only authenticated users can delete submissions (spam removal)
CREATE POLICY "Authenticated users can delete submissions"
  ON contact_submissions
  FOR DELETE
  TO authenticated
  USING (true);