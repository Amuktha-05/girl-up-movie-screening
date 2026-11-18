-- ============================================================
-- Migration: Close All Online Registrations for VIBRANCE 2026
-- Event Day Update: 18 November 2026
-- Table: public.chamak_challo_registrations
--
-- PURPOSE:
--   Immediately disable public/anonymous online registration inserts
--   while fully preserving existing registration records and maintaining
--   uninterrupted admin dashboard read/update access.
--
-- HOW TO RUN:
--   1. Go to Supabase Dashboard (https://supabase.com/dashboard)
--   2. Select your project -> SQL Editor -> New query
--   3. Paste this script and click Run
--
-- SAFETY & COMPLIANCE GUARANTEES:
--   - Does NOT delete, truncate or alter any existing registration records.
--   - Does NOT alter database schema or table structures.
--   - Does NOT affect Admin login, session authentication, or dashboard stats.
--   - Preserves authenticated admin SELECT and UPDATE policies.
-- ============================================================

-- ── Step 1: Ensure Row Level Security (RLS) is active ─────────
ALTER TABLE public.chamak_challo_registrations ENABLE ROW LEVEL SECURITY;

-- ── Step 2: Drop all public and anonymous INSERT policies ──────
-- When RLS is enabled and no INSERT policy exists for anon,
-- all public insert attempts are rejected by Supabase by default.
DROP POLICY IF EXISTS "Anon can register for chamak challo" ON public.chamak_challo_registrations;
DROP POLICY IF EXISTS "Allow anon insert chamak_challo_registrations" ON public.chamak_challo_registrations;
DROP POLICY IF EXISTS "Allow public insert chamak_challo_registrations" ON public.chamak_challo_registrations;
DROP POLICY IF EXISTS "Enable insert for anon users" ON public.chamak_challo_registrations;
DROP POLICY IF EXISTS "Public insert chamak_challo_registrations" ON public.chamak_challo_registrations;
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON public.chamak_challo_registrations;

-- Also apply to legacy registrations table if present in public schema
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.tables
    WHERE table_schema = 'public' AND table_name = 'registrations'
  ) THEN
    ALTER TABLE public.registrations ENABLE ROW LEVEL SECURITY;
    DROP POLICY IF EXISTS "Allow anon insert registrations" ON public.registrations;
    DROP POLICY IF EXISTS "Allow public insert registrations" ON public.registrations;
    DROP POLICY IF EXISTS "Enable insert for anon users" ON public.registrations;
    DROP POLICY IF EXISTS "Public insert registrations" ON public.registrations;
  END IF;
END $$;

-- ── Step 3: Ensure Admin SELECT and UPDATE policies remain active 
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'chamak_challo_registrations'
      AND policyname = 'Admin can read chamak_challo_registrations'
  ) THEN
    CREATE POLICY "Admin can read chamak_challo_registrations"
      ON public.chamak_challo_registrations
      FOR SELECT
      TO authenticated
      USING (true);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'chamak_challo_registrations'
      AND policyname = 'Admin can update chamak_challo_registrations'
  ) THEN
    CREATE POLICY "Admin can update chamak_challo_registrations"
      ON public.chamak_challo_registrations
      FOR UPDATE
      TO authenticated
      USING (true)
      WITH CHECK (true);
  END IF;
END $$;

-- ── Step 4: Verification ───────────────────────────────────────
-- Run this query to inspect the active policies.
-- Expected output:
-- Only SELECT and UPDATE operations for authenticated roles.
-- 0 INSERT policies.
SELECT
  tablename,
  policyname,
  cmd AS operation,
  roles,
  qual AS using_expression,
  with_check AS with_check_expression
FROM pg_policies
WHERE schemaname = 'public'
  AND tablename IN ('chamak_challo_registrations', 'registrations')
ORDER BY tablename, cmd, policyname;
