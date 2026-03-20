import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export async function GET(request: Request) {
  const authHeader = request.headers.get('Authorization')
  const token = authHeader?.replace('Bearer ', '')

  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const supabase = createClient(supabaseUrl, supabaseAnonKey)
  const { data: { user }, error: authError } = await supabase.auth.getUser(token)

  if (authError || !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // Try to fetch from Supabase 'games' table; fallback to default games if table doesn't exist
  const { data: games, error } = await supabase.from('games').select('*')

  if (error) {
    // Table might not exist yet – return default games
    const defaultGames = [
      { id: 1, name: 'Teen Patti' },
      { id: 2, name: 'Puzzle' },
      { id: 3, name: 'Arcade' },
      { id: 4, name: 'Card Game' },
    ]
    return NextResponse.json(defaultGames)
  }

  return NextResponse.json(games ?? [])
}
