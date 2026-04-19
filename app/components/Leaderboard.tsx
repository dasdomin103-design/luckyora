"use client";
import { LeaderboardEntry } from '@/types/leaderboard'
import { motion } from "framer-motion";
import { Trophy, Flame, Medal } from "lucide-react";
;

interface LeaderboardProps {
  entries: LeaderboardEntry[];
}

export default function Leaderboard({ entries }: LeaderboardProps) {
  const getBadge = (rank: number) => {
    if (rank === 1) return { icon: Trophy, color: "text-yellow-400", bg: "bg-yellow-400/20", label: "Champion" };
    if (rank <= 3) return { icon: Flame, color: "text-orange-400", bg: "bg-orange-400/20", label: "Top Player" };
    return { icon: Medal, color: "text-slate-400", bg: "bg-slate-400/20", label: "" };
  };

  return (
    <section className="py-16 bg-slate-950">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Flame className="w-8 h-8 text-orange-500" />
            <h2 className="text-3xl md:text-4xl font-bold text-white">Top Players</h2>
          </div>
          <p className="text-slate-400">The best gamers on Luckyora</p>
        </motion.div>

        {/* Leaderboard List */}
        <div className="space-y-3">
          {entries.length === 0 ? (
            <div className="text-center py-12 text-slate-500">
              No scores yet. Be the first to play!
            </div>
          ) : (
            entries.map((entry, index) => {
              const rank = index + 1;
              const badge = getBadge(rank);
              const Icon = badge.icon;

              return (
                <motion.div
                  key={entry.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`relative flex items-center gap-4 p-4 rounded-xl border ${
                    rank <= 3
                      ? "bg-gradient-to-r from-slate-900 to-slate-800 border-slate-700"
                      : "bg-slate-900/50 border-slate-800"
                  }`}
                >
                  {/* Rank */}
                  <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full bg-slate-800 font-bold text-white">
                    {rank}
                  </div>

                  {/* Avatar Placeholder */}
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold">
                    {entry.username.charAt(0).toUpperCase()}
                  </div>

                  {/* Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-white">{entry.username}</span>
                      {badge.label && (
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${badge.bg} ${badge.color}`}>
                          {badge.label}
                        </span>
                      )}
                    </div>
                    <div className="text-slate-500 text-sm">{entry.game_slug}</div>
                  </div>

                  {/* Score */}
                  <div className="text-right">
                    <div className="text-2xl font-bold text-white">{entry.score.toLocaleString()}</div>
                    <div className="text-slate-500 text-xs">points</div>
                  </div>

                  {/* Badge Icon */}
                  {rank <= 3 && (
                    <div className={`absolute -right-1 -top-1 w-8 h-8 rounded-full ${badge.bg} flex items-center justify-center`}>
                      <Icon className={`w-4 h-4 ${badge.color}`} />
                    </div>
                  )}
                </motion.div>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
}



