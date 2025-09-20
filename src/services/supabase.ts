import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://jkfizxdgzrtrlsaarzqw.supabase.co'
// const supabaseKey = process.env.SUPABASE_KEY
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY
console.log(supabaseKey)
export const supabase = createClient(supabaseUrl, supabaseKey)