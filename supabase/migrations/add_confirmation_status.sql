-- ============================================================
-- Migration: Add confirmation_status column to registrations
-- 
-- Run this once in the Supabase SQL Editor:
-- Dashboard → SQL Editor → New query → paste → Run
--
-- Safe: uses ADD COLUMN IF NOT EXISTS — will not fail if the
-- column already exists and will not modify any existing rows.
-- ============================================================

ALTER TABLE public.registrations
  ADD COLUMN IF NOT EXISTS confirmation_status text NOT NULL DEFAULT 'not_sent';

-- Optional: add a check constraint to enforce valid values
-- (run this only if the column was just added — skip if it already had the constraint)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints
    WHERE table_name = 'registrations'
      AND constraint_name = 'registrations_confirmation_status_check'
  ) THEN
    ALTER TABLE public.registrations
      ADD CONSTRAINT registrations_confirmation_status_check
      CHECK (confirmation_status IN ('not_sent', 'sent'));
  END IF;
END $$;

-- Verify:
SELECT column_name, data_type, column_default, is_nullable
FROM information_schema.columns
WHERE table_name = 'registrations'
  AND column_name = 'confirmation_status';
