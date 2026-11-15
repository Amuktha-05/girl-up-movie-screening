-- ============================================================
-- Migration: Add participant_count and update INSERT policy
-- Table: public.chamak_challo_registrations
--
-- Run this in the Supabase SQL Editor:
-- Dashboard → SQL Editor → New query → paste → Run
--
-- IMPORTANT SAFETY CHECKS:
-- - Uses ADD COLUMN IF NOT EXISTS — safe to re-run.
-- - Existing rows are preserved (default 1 is applied).
-- - Historical records (including total_amount = 175) remain untouched.
-- - Does NOT delete or alter existing data.
-- ============================================================

-- ── Step 0: Inspect existing policies before modifying ────────────────────────
-- Run this query first if you want to inspect existing policy names:
/*
SELECT policyname, cmd, roles, qual, with_check
FROM pg_policies
WHERE schemaname = 'public'
  AND tablename  = 'chamak_challo_registrations';
*/

-- ── Step 1: Add participant_count column ──────────────────────────────────────
ALTER TABLE public.chamak_challo_registrations
  ADD COLUMN IF NOT EXISTS participant_count INTEGER NOT NULL DEFAULT 1;

-- Ensure any existing nulls are backfilled to 1
UPDATE public.chamak_challo_registrations
SET participant_count = 1
WHERE participant_count IS NULL;

-- ── Step 2: Add check constraint for participant_count (1, 2, or 3) ────────────
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints
    WHERE table_name = 'chamak_challo_registrations'
      AND constraint_name = 'chamak_challo_registrations_participant_count_check'
  ) THEN
    ALTER TABLE public.chamak_challo_registrations
      ADD CONSTRAINT chamak_challo_registrations_participant_count_check
      CHECK (participant_count IN (1, 2, 3));
  END IF;
END $$;

-- ── Step 3: Enable RLS (safe if already enabled) ──────────────────────────────
ALTER TABLE public.chamak_challo_registrations ENABLE ROW LEVEL SECURITY;

-- ── Step 4: Drop existing INSERT policies for anonymous registration ──────────
-- Drop known insert policies safely before creating the updated policy:
DROP POLICY IF EXISTS "Anon can register for chamak challo" ON public.chamak_challo_registrations;
DROP POLICY IF EXISTS "Allow anon insert chamak_challo_registrations" ON public.chamak_challo_registrations;
DROP POLICY IF EXISTS "Allow public insert chamak_challo_registrations" ON public.chamak_challo_registrations;
DROP POLICY IF EXISTS "Enable insert for anon users" ON public.chamak_challo_registrations;
DROP POLICY IF EXISTS "Public insert chamak_challo_registrations" ON public.chamak_challo_registrations;

-- ── Step 5: Create updated INSERT policy with strict plan validation ──────────
-- Permits only the 3 valid group pricing combinations:
--   - Single: participant_count = 1 AND total_amount = 199
--   - Duo   : participant_count = 2 AND total_amount = 179
--   - Trio  : participant_count = 3 AND total_amount = 159
-- And enforces initial status: payment_status = 'pending', confirmation_status = 'not_sent'
CREATE POLICY "Anon can register for chamak challo"
  ON public.chamak_challo_registrations
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    payment_status = 'pending'
    AND confirmation_status = 'not_sent'
    AND (
      (participant_count = 1 AND total_amount = 199)
      OR (participant_count = 2 AND total_amount = 179)
      OR (participant_count = 3 AND total_amount = 159)
    )
  );

-- ── Step 6: Ensure Admin SELECT and UPDATE policies exist ─────────────────────
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

-- ── Step 7: Verification Query ────────────────────────────────────────────────
SELECT
  column_name, data_type, column_default, is_nullable
FROM information_schema.columns
WHERE table_name = 'chamak_challo_registrations'
  AND column_name IN ('participant_count', 'total_amount', 'payment_status', 'confirmation_status');

SELECT
  policyname,
  cmd        AS operation,
  roles,
  qual       AS using_expression,
  with_check AS with_check_expression
FROM pg_policies
WHERE schemaname = 'public'
  AND tablename  = 'chamak_challo_registrations'
ORDER BY cmd, policyname;
