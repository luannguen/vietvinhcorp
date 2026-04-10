import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config({ path: 'f:/code duan/vietvinhcorp/backend/.env' });

const supabaseUrl = process.env.VITE_SUPABASE_URL || '';
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || '';

const supabase = createClient(supabaseUrl, supabaseKey);

async function cleanSettings() {
  const targetKeys = [
    'contact_address_de', 'contact_address_en', 'contact_address_fr', 
    'contact_address_hr', 'contact_address_ja', 'contact_address_ko', 
    'contact_address_ru', 'contact_address_sl', 'contact_address_sr', 
    'contact_address_zh'
  ];

  for (const key of targetKeys) {
    const { error } = await supabase
      .from('site_settings')
      .update({ value: '' })
      .eq('key', key);
      
    if (error) {
      console.error(`Error clearing ${key}:`, error);
    } else {
      console.log(`Cleared ${key}`);
    }
  }
}

cleanSettings();
