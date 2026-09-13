import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';

const env = fs.readFileSync('.env', 'utf8');
const urlMatch = env.match(/VITE_SUPABASE_URL=(.*)/);
const keyMatch = env.match(/VITE_SUPABASE_(?:ANON_KEY|PUBLISHABLE_KEY)=(.*)/);
const url = urlMatch ? urlMatch[1].trim() : '';
const key = keyMatch ? keyMatch[1].trim() : '';

const supabase = createClient(url, key);

async function testInsertAndUpload() {
  console.log('Testing upload...');
  const dummyBuffer = Buffer.from('test screenshot content ' + Date.now());
  const fileName = `test_${Date.now()}.png`;
  const uploadRes = await supabase.storage.from('payment-screenshots').upload(fileName, dummyBuffer, {
    contentType: 'image/png'
  });
  console.log('Upload result:', uploadRes);

  console.log('Testing insert...');
  const testRecord = {
    name: 'Test User',
    email: 'test@example.com',
    phone: '9876543210',
    ticket_type: 'Student Ticket',
    ticket_quantity: 1,
    popcorn_quantity: 1,
    soft_drink_quantity: 0,
    combo_quantity: 0,
    total_amount: 150,
    payment_screenshot: uploadRes.data ? uploadRes.data.path : fileName,
    payment_status: 'pending',
    created_at: new Date().toISOString()
  };

  const insertRes = await supabase.from('registrations').insert([testRecord]).select();
  console.log('Insert result:', insertRes);

  if (insertRes.data && insertRes.data.length > 0) {
    const id = insertRes.data[0].id;
    console.log('Inserted record ID:', id, 'Record:', insertRes.data[0]);
    // Clean up test record and file
    await supabase.from('registrations').delete().eq('id', id);
    console.log('Cleaned up test record');
  }
  if (uploadRes.data) {
    await supabase.storage.from('payment-screenshots').remove([uploadRes.data.path]);
    console.log('Cleaned up test upload');
  }
}

testInsertAndUpload();
