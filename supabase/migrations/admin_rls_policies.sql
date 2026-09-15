-- ============================================================
-- RLS Policies: Secure admin-only access to registrations
--
-- Run this in the Supabase SQL Editor:
-- Dashboard → SQL Editor → New query → paste → Run
--
-- What this script does:
--   1. Enables RLS on public.registrations (safe if already enabled)
--   2. Removes any known overly-permissive SELECT policies for anon
--   3. Adds SELECT policy — authenticated users only (admin dashboard)
--   4. Adds UPDATE policy — authenticated users only (admin dashboard)
--
-- What this script does NOT do:
--   - Does NOT drop or touch any INSERT policies
--   - Does NOT modify the reserve_seats_and_register RPC
--   - Does NOT touch the payment-screenshots Storage bucket or its policies
--   - Does NOT make any bucket public
--
-- NOTES:
--   The reserve_seats_and_register RPC is SECURITY DEFINER, meaning it
--   runs as the Supabase service role and bypasses RLS entirely. Your
--   existing public registration INSERT flow is therefore unaffected by
--   these policies.
--
--   The admin dashboard uses supabase.storage.createSignedUrl() to view
--   payment screenshots — signed URLs work with the anon key + an
--   authenticated session and do not require any Storage policy changes.
-- ============================================================


-- ── Step 1: Enable RLS ────────────────────────────────────────────────────────
-- Safe to re-run; does nothing if RLS is already enabled.

ALTER TABLE public.registrations ENABLE ROW LEVEL SECURITY;


-- ── Step 2: Remove known overly-permissive SELECT-for-anon policies ───────────
-- These DROP IF EXISTS calls are safe — they silently do nothing if the
-- named policy does not exist. Adjust the names if yours differ.
-- Run the verify query at the bottom first if you want to check existing names.

DROP POLICY IF EXISTS "Allow public read registrations"  ON public.registrations;
DROP POLICY IF EXISTS "Allow anon select registrations"  ON public.registrations;
DROP POLICY IF EXISTS "Allow all select registrations"   ON public.registrations;
DROP POLICY IF EXISTS "Enable read access for all users" ON public.registrations;


-- ── Step 3: SELECT — authenticated users only ────────────────────────────────
-- Allows the admin dashboard (signed-in Supabase Auth user) to read all rows.
-- Anonymous visitors to the public registration site cannot SELECT any rows.

CREATE POLICY "Admin can read registrations"
  ON public.registrations
  FOR SELECT
  TO authenticated
  USING (true);


-- ── Step 4: UPDATE — authenticated users only ────────────────────────────────
-- Allows the admin dashboard to update payment_status and confirmation_status.
-- Anonymous users cannot UPDATE any row.

CREATE POLICY "Admin can update registrations"
  ON public.registrations
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);


-- ── Step 5: Verify — inspect resulting policies ───────────────────────────────
-- Review this output to confirm the policies look correct before testing.

SELECT
  policyname,
  cmd        AS operation,
  roles,
  qual       AS using_expression,
  with_check AS with_check_expression
FROM pg_policies
WHERE schemaname = 'public'
  AND tablename  = 'registrations'
ORDER BY cmd, policyname;

