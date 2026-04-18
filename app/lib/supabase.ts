import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function getLeaderboard(limit = 10) {
  const cookieStore = cookies()

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get: (name) => cookieStore.get(name)?.value,
      },
    }
  )

  const { data, error } = await supabase
    .from('leaderboard')
    .select('*')
    .limit(limit)

  if (error) return []

  return data
}
