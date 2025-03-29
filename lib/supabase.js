import { createClient } from '@supabase/supabase-js';

let supabase;

if (typeof window !== 'undefined') {
  // Client-side
  supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
  );
} else {
  // Server-side
  supabase = createClient(
    process.env.SUPABASE_URL || '',
    process.env.SUPABASE_KEY || ''
  );
}

export { supabase };