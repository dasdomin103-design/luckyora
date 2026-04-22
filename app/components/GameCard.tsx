"use client";
import { motion } from "framer-motion";
import { Play, Users, TrendingUp } from "lucide-react";
import Link from "next/link";
import { Game } from "../data/games";
import Image from "next/image";

interface GameCardProps {
  game: Game;
  index?: number;
}

export default function GameCard({ game, index = 0 }: GameCardProps) {
  const formatPlayers = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(0)}K`;
    return num.toString();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="group relative"
    >
      <Link href={`/game/${game.slug}`}>
        <div className="relative bg-slate-900/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-slate-800/50 hover:border-blue-500/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(59,130,246,0.2)]">
          {/* Thumbnail */}
          <div className="relative aspect-[4/3] overflow-hidden">
            <Image
              src={game.thumbnail}
              alt={game.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              sizes="(max-width: 768px) 50vw, 25vw"
            />
            
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60" />
            
            {/* Trending Badge */}
            {game.trending && (
              <div className="absolute top-3 left-3 flex items-center gap-1 px-2 py-1 bg-gradient-to-r from-orange-500 to-red-500 rounded-full text-xs font-bold text-white">
                <TrendingUp className="w-3 h-3" />
                Trending
              </div>
            )}
            
            {/* Play Button Overlay */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-slate-950/60">
              <motion.div
                initial={{ scale: 0.8 }}
                whileHover={{ scale: 1.1 }}
                className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center shadow-lg"
              >
                <Play className="w-7 h-7 text-white ml-1" fill="white" />
              </motion.div>
            </div>
          </div>

          {/* Content */}
          <div className="p-4">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className="font-bold text-white text-lg mb-1 group-hover:text-blue-400 transition-colors">
                  {game.title}
                </h3>
                <p className="text-slate-400 text-sm line-clamp-1">{game.description}</p>
              </div>
            </div>

            <div className="flex items-center justify-between mt-3">
              <span className="px-3 py-1 bg-slate-800/80 rounded-full text-xs font-medium text-slate-300">
                {game.category}
              </span>
              <div className="flex items-center gap-1 text-slate-500 text-sm">
                <Users className="w-4 h-4" />
                {formatPlayers(game.players)}
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}


