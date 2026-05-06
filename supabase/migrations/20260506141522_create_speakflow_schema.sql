/*
  # SpeakFlow AI - Database Schema

  1. New Tables
    - `profiles`
      - `id` (uuid, primary key, references auth.users)
      - `full_name` (text)
      - `avatar_url` (text)
      - `streak_count` (integer, default 0)
      - `total_sessions` (integer, default 0)
      - `total_practice_minutes` (integer, default 0)
      - `best_score` (integer, default 0)
      - `onboarding_completed` (boolean, default false)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

    - `sessions`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references profiles)
      - `prompt_type` (text)
      - `prompt_text` (text)
      - `duration_seconds` (integer)
      - `overall_score` (integer)
      - `confidence_score` (integer)
      - `eye_contact_score` (integer)
      - `vocal_clarity_score` (integer)
      - `engagement_score` (integer)
      - `pace_score` (integer)
      - `filler_word_count` (integer)
      - `energy_score` (integer)
      - `posture_score` (integer)
      - `ai_feedback` (jsonb)
      - `strengths` (text array)
      - `improvements` (text array)
      - `exercises` (text array)
      - `created_at` (timestamptz)

    - `achievements`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references profiles)
      - `type` (text)
      - `title` (text)
      - `description` (text)
      - `icon` (text)
      - `earned_at` (timestamptz)

    - `streaks`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references profiles)
      - `date` (date)
      - `sessions_count` (integer, default 0)

  2. Security
    - Enable RLS on all tables
    - Users can only access their own data
*/

CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name text DEFAULT '',
  avatar_url text DEFAULT '',
  streak_count integer DEFAULT 0,
  total_sessions integer DEFAULT 0,
  total_practice_minutes integer DEFAULT 0,
  best_score integer DEFAULT 0,
  onboarding_completed boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

CREATE TABLE IF NOT EXISTS sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  prompt_type text DEFAULT 'free',
  prompt_text text DEFAULT '',
  duration_seconds integer DEFAULT 0,
  overall_score integer DEFAULT 0,
  confidence_score integer DEFAULT 0,
  eye_contact_score integer DEFAULT 0,
  vocal_clarity_score integer DEFAULT 0,
  engagement_score integer DEFAULT 0,
  pace_score integer DEFAULT 0,
  filler_word_count integer DEFAULT 0,
  energy_score integer DEFAULT 0,
  posture_score integer DEFAULT 0,
  ai_feedback jsonb DEFAULT '{}'::jsonb,
  strengths text[] DEFAULT '{}'::text[],
  improvements text[] DEFAULT '{}'::text[],
  exercises text[] DEFAULT '{}'::text[],
  created_at timestamptz DEFAULT now()
);

ALTER TABLE sessions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own sessions"
  ON sessions FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own sessions"
  ON sessions FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own sessions"
  ON sessions FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE TABLE IF NOT EXISTS achievements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  type text NOT NULL,
  title text NOT NULL,
  description text DEFAULT '',
  icon text DEFAULT 'trophy',
  earned_at timestamptz DEFAULT now()
);

ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own achievements"
  ON achievements FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own achievements"
  ON achievements FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE TABLE IF NOT EXISTS streaks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  date date NOT NULL DEFAULT CURRENT_DATE,
  sessions_count integer DEFAULT 0
);

ALTER TABLE streaks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own streaks"
  ON streaks FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own streaks"
  ON streaks FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own streaks"
  ON streaks FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS idx_sessions_user_id ON sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_sessions_created_at ON sessions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_achievements_user_id ON achievements(user_id);
CREATE INDEX IF NOT EXISTS idx_streaks_user_date ON streaks(user_id, date DESC);
