import { createClient } from '@supabase/supabase-js'
export const supabaseUrl = 'https://jkfizxdgzrtrlsaarzqw.supabase.co'
// const supabaseKey = process.env.SUPABASE_KEY
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY
export const supabase = createClient(supabaseUrl, supabaseKey)