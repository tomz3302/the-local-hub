import { createClient } from '@supabase/supabase-js';

// Supabase setup
const supabaseUrl = 'https://hpieqtrgomxqlptriwas.supabase.co';
const supabaseKey = '<your-supabase-key>'; // Replace with your actual key or environment variable
const supabase = createClient(supabaseUrl, supabaseKey);