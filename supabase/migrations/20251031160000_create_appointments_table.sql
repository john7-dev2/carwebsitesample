/*
  # Create Appointments Table

  ## Overview
  This migration creates the database structure for storing appointment bookings from the Revelro Cars website.

  ## 1. New Tables
    - `appointments`
      - `id` (uuid, primary key) - Unique identifier for each appointment
      - `customer_name` (text) - Full name of the customer
      - `customer_email` (text) - Email address for contact
      - `customer_phone` (text) - Phone number
      - `service_type` (text) - Type of service booked
      - `car_make` (text) - Make of the car
      - `car_model` (text) - Model of the car
      - `car_year` (text, nullable) - Year of the car
      - `preferred_date` (date) - Preferred appointment date
      - `preferred_time` (text) - Preferred time slot
      - `additional_notes` (text, nullable) - Any additional notes
      - `status` (text) - Status of the appointment (pending, confirmed, completed, cancelled)
      - `created_at` (timestamptz) - When the appointment was created
      - `updated_at` (timestamptz) - When the appointment was last updated
      - `ip_address` (text, nullable) - IP address of customer for spam prevention

    - `admin_devices`
      - `id` (uuid, primary key) - Unique identifier
      - `device_token` (text) - Push notification device token
      - `device_type` (text) - Type of device (ios, android, web)
      - `user_id` (uuid, nullable) - Associated user ID if authenticated
      - `is_active` (boolean) - Whether device is active
      - `created_at` (timestamptz) - When device was registered
      - `updated_at` (timestamptz) - When device was last updated

  ## 2. Indexes
    - Index on customer_email for faster lookups
    - Index on preferred_date for date-based queries
    - Index on status for filtering by appointment status
    - Index on created_at for sorting

  ## 3. Security
    - Enable RLS on both tables
    - Public INSERT policy for appointments: Allow anyone to book
    - Admin-only SELECT/UPDATE policies for appointments
    - Admin-only policies for admin_devices table
*/

-- Create appointments table
CREATE TABLE IF NOT EXISTS appointments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name text NOT NULL,
  customer_email text NOT NULL,
  customer_phone text NOT NULL,
  service_type text NOT NULL,
  car_make text NOT NULL,
  car_model text NOT NULL,
  car_year text,
  preferred_date date NOT NULL,
  preferred_time text NOT NULL,
  additional_notes text,
  status text DEFAULT 'pending' NOT NULL,
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL,
  ip_address text,
  CONSTRAINT valid_appointment_status CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled'))
);

-- Create admin_devices table for push notifications
CREATE TABLE IF NOT EXISTS admin_devices (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  device_token text NOT NULL UNIQUE,
  device_type text NOT NULL,
  user_id uuid,
  is_active boolean DEFAULT true NOT NULL,
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL,
  CONSTRAINT valid_device_type CHECK (device_type IN ('ios', 'android', 'web'))
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_appointments_email ON appointments(customer_email);
CREATE INDEX IF NOT EXISTS idx_appointments_date ON appointments(preferred_date);
CREATE INDEX IF NOT EXISTS idx_appointments_status ON appointments(status);
CREATE INDEX IF NOT EXISTS idx_appointments_created_at ON appointments(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_admin_devices_token ON admin_devices(device_token);
CREATE INDEX IF NOT EXISTS idx_admin_devices_active ON admin_devices(is_active) WHERE is_active = true;

-- Create or replace the updated_at trigger function (if it doesn't exist from previous migration)
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for appointments updated_at
DROP TRIGGER IF EXISTS update_appointments_updated_at ON appointments;
CREATE TRIGGER update_appointments_updated_at
  BEFORE UPDATE ON appointments
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Create trigger for admin_devices updated_at
DROP TRIGGER IF EXISTS update_admin_devices_updated_at ON admin_devices;
CREATE TRIGGER update_admin_devices_updated_at
  BEFORE UPDATE ON admin_devices
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_devices ENABLE ROW LEVEL SECURITY;

-- Appointments Policies
-- Policy: Allow anyone to insert appointments (public booking)
CREATE POLICY "Anyone can book appointments"
  ON appointments
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Policy: Only authenticated users can view appointments
CREATE POLICY "Authenticated users can view all appointments"
  ON appointments
  FOR SELECT
  TO authenticated
  USING (true);

-- Policy: Only authenticated users can update appointments
CREATE POLICY "Authenticated users can update appointments"
  ON appointments
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Policy: Only authenticated users can delete appointments
CREATE POLICY "Authenticated users can delete appointments"
  ON appointments
  FOR DELETE
  TO authenticated
  USING (true);

-- Admin Devices Policies
-- Policy: Only authenticated users can manage admin devices
CREATE POLICY "Authenticated users can view admin devices"
  ON admin_devices
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert admin devices"
  ON admin_devices
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update admin devices"
  ON admin_devices
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete admin devices"
  ON admin_devices
  FOR DELETE
  TO authenticated
  USING (true);
