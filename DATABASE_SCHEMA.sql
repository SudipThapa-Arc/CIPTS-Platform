-- CIPTS Supabase Database Schema
-- Run this entire script in your Supabase SQL Editor to set up a fresh database.

-- 1. Create custom enum types
CREATE TYPE user_role AS ENUM ('STUDENT', 'RECRUITER', 'OFFICER');
CREATE TYPE job_status AS ENUM ('OPEN', 'CLOSED', 'DRAFT');
CREATE TYPE application_status AS ENUM ('PENDING', 'SHORTLISTED', 'INTERVIEWING', 'SELECTED', 'REJECTED');

-- 2. Create the Profiles table (Base table for all users)
-- This links directly to Supabase Auth (auth.users)
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  role user_role NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- 3. Create the Students table
CREATE TABLE students (
  student_id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  roll_number TEXT UNIQUE NOT NULL,
  department TEXT NOT NULL,
  graduation_year INTEGER NOT NULL,
  gpa DECIMAL(3,2) DEFAULT 0.00,
  resume_url TEXT,
  skills TEXT[] DEFAULT '{}',
  placement_status application_status DEFAULT 'PENDING',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- 4. Create the Recruiters table
CREATE TABLE recruiters (
  recruiter_id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE UNIQUE NOT NULL,
  company_name TEXT NOT NULL,
  industry_sector TEXT,
  company_website TEXT,
  contact_person TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- 5. Create the Jobs table (Recruitment Drives)
CREATE TABLE jobs (
  job_id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  recruiter_id UUID REFERENCES recruiters(recruiter_id) ON DELETE CASCADE NOT NULL,
  role_title TEXT NOT NULL,
  job_description TEXT NOT NULL,
  min_gpa_req DECIMAL(3,2) DEFAULT 0.00,
  eligible_departments TEXT[] DEFAULT '{}',
  vacancies INTEGER DEFAULT 1,
  salary_package TEXT,
  application_deadline TIMESTAMP WITH TIME ZONE NOT NULL,
  status job_status DEFAULT 'OPEN',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- 6. Create the Applications table (Student applications to jobs)
CREATE TABLE applications (
  app_id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  job_id UUID REFERENCES jobs(job_id) ON DELETE CASCADE NOT NULL,
  student_id UUID REFERENCES students(student_id) ON DELETE CASCADE NOT NULL,
  app_status application_status DEFAULT 'PENDING',
  applied_date TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  UNIQUE(job_id, student_id) -- A student can only apply once per job
);

-- 7. Create the Audit Logs table (For Officer compliance)
CREATE TABLE audit_logs (
  log_id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  action_type TEXT NOT NULL,
  target_entity TEXT NOT NULL,
  actor_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  details JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- 8. Set up Row Level Security (RLS)
-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE students ENABLE ROW LEVEL SECURITY;
ALTER TABLE recruiters ENABLE ROW LEVEL SECURITY;
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- 9. Create RLS Policies
-- Allow anyone to create a profile (needed for registration)
CREATE POLICY "Enable insert for authentication only" ON profiles FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable insert for students" ON students FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable insert for recruiters" ON recruiters FOR INSERT WITH CHECK (true);

-- Allow users to read all profiles, students, recruiters, and jobs (simplified for demo)
CREATE POLICY "Enable read access for all users" ON profiles FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON students FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON recruiters FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON jobs FOR SELECT USING (true);

-- Allow students to manage their own applications
CREATE POLICY "Enable read access for all users" ON applications FOR SELECT USING (true);
CREATE POLICY "Enable insert for authenticated users only" ON applications FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Enable update for authenticated users only" ON applications FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Enable update for authenticated users only" ON students FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Enable update for authenticated users only" ON jobs FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Enable insert for authenticated users only" ON jobs FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- 10. Auto-trigger for Audit logs (Optional advanced setup)
-- In a real production app, you would add PostgreSQL triggers here to auto-insert into audit_logs.
