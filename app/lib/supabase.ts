import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseKey);

export interface LeaderboardEntry {
  id: string;
  username: string;
  score: number;
  game_slug: string;
  created_at: string;
}

export async function getLeaderboard(limit: number = 10): Promise<LeaderboardEntry[]> {
  const { data, error } = await supabase
    .from('leaderboard')
    .select('*')
    .order('score', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('Error fetching leaderboard:', error);
    return [];
  }

  return data || [];
}

export async function submitScore(username: string, score: number, gameSlug: string): Promise<boolean> {
  const { error } = await supabase
    .from('leaderboard')
    .insert([{ username, score, game_slug: gameSlug }]);

  if (error) {
    console.error('Error submitting score:', error);
    return false;
  }

  return true;
}
