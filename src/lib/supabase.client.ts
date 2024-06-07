import { createClient } from '@supabase/supabase-js'
import type { Database } from '@/types/supabase.db'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY as string

const supabase = createClient<Database>(supabaseUrl, supabaseKey)

const isAuthenticated = async () => {
  const {
    data: { user }
  } = await supabase.auth.getUser()

  return user?.aud === 'authenticated' || false
}

export { supabase, isAuthenticated }
