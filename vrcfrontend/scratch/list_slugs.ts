
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';

// Load env from both possible locations
dotenv.config({ path: path.resolve(process.cwd(), '.env') });
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase credentials in .env or .env.local");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function listSlugs() {
  const { data, error } = await supabase
    .from('static_pages')
    .select('slug, title')
    .eq('is_active', true);

  if (error) {
    console.error("Error fetching slugs:", error);
  } else {
    console.log("Active slugs:", JSON.stringify(data, null, 2));
  }
}

listSlugs();
