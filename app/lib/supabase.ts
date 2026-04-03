import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Missing Supabase environment variables. Please check your .env.local file.'
  )
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
})

// Optional: Database types for better TypeScript support
export type Database = {
  public: {
    Tables: {
      user_stats: {
        Row: {
          id: string
          user_id: string
          games_played: number
          total_wins: number
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          games_played?: number
          total_wins?: number
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          games_played?: number
          total_wins?: number
          created_at?: string
        }
      }
    }
  }
}