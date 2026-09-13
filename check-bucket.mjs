import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';

const env = fs.readFileSync('.env', 'utf8');
const urlMatch = env.match(/VITE_SUPABASE_URL=(.*)/);
const keyMatch = env.match(/VITE_SUPABASE_(?:ANON_KEY|PUBLISHABLE_KEY)=(.*)/);
const url = urlMatch ? urlMatch[1].trim() : '';
const key = keyMatch ? keyMatch[1].trim() : '';

const supabase = createClient(url, key);

async function checkStorage() {
  const { data: bucket, error: bErr } = await supabase.storage.getBucket('payment-screenshots');
  console.log('getBucket payment-screenshots:', { bucket, bErr });
}

checkStorage();
