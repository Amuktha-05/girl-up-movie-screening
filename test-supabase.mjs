import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';

const env = fs.readFileSync('.env', 'utf8');
const urlMatch = env.match(/VITE_SUPABASE_URL=(.*)/);
const keyMatch = env.match(/VITE_SUPABASE_(?:ANON_KEY|PUBLISHABLE_KEY)=(.*)/);
const url = urlMatch ? urlMatch[1].trim() : '';
const key = keyMatch ? keyMatch[1].trim() : '';

console.log('Testing with URL:', url);
console.log('Testing with Key prefix:', key.substring(0, 15));

const supabase = createClient(url, key);

async function run() {
  try {
    const { data, error } = await supabase.from('registrations').select('*').limit(5);
    console.log('Select registrations result:', { data, error });

    const { data: buckets, error: bErr } = await supabase.storage.listBuckets();
    console.log('List buckets result:', { buckets, bErr });

    const { data: files, error: fErr } = await supabase.storage.from('payment-screenshots').list();
    console.log('List payment-screenshots bucket files:', { files, fErr });
  } catch (err) {
    console.error('Error in run:', err);
  }
}

run();
