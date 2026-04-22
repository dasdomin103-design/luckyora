export const dynamic = "force-dynamic";

import { getLeaderboard } from "../lib/supabase";
import Leaderboard from "../components/Leaderboard";

export default async function LeaderboardPage() {
  const entries = await getLeaderboard(10);

  return (
    <div className="min-h-screen bg-slate-950 pt-20">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Global Leaderboard
          </h1>
          <p className="text-slate-400">
            Compete with players worldwide and climb the ranks
          </p>
        </div>

        <Leaderboard
          entries={
            entries.length > 0
              ? entries
              : [
                  { id: "1", username: "ProGamer123", score: 999999, game_slug: "2048", created_at: new Date().toISOString() },
                  { id: "2", username: "SpeedRunner", score: 875000, game_slug: "Tetris", created_at: new Date().toISOString() },
                  { id: "3", username: "PuzzleMaster", score: 750000, game_slug: "Sudoku", created_at: new Date().toISOString() },
                  { id: "4", username: "ArcadeKing", score: 620000, game_slug: "Pac-Man", created_at: new Date().toISOString() },
                  { id: "5", username: "StrategyPro", score: 580000, game_slug: "Chess", created_at: new Date().toISOString() },
                ]
          }
        />
      </div>
    </div>
  );
}
