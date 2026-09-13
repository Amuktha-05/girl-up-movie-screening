import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';

const env = fs.readFileSync('.env', 'utf8');
const url = env.match(/VITE_SUPABASE_URL=(.*)/)[1].trim();
const key = env.match(/VITE_SUPABASE_(?:ANON_KEY|PUBLISHABLE_KEY)=(.*)/)[1].trim();

const supabase = createClient(url, key);

async function checkColumns() {
  const { data, error } = await supabase.from('registrations').select('*').limit(1);
  console.log('Columns test empty select:', { data, error });
}
checkColumns();
