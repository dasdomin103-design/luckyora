"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Maximize2, Loader2 } from "lucide-react";
import { games } from "../../data/games";

export default function GamePage() {
  const params = useParams();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const game = games.find((g) => g.slug === params.slug);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (!game) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Game Not Found</h1>
          <button
            onClick={() => router.push("/")}
            className="px-6 py-3 bg-blue-600 rounded-full text-white font-medium hover:bg-blue-700 transition-colors"
          >
            Back to Games
          </button>
        </div>
      </div>
    );
  }

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950">
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur-xl border-b border-slate-800/50"
      >
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.push("/")}
              className="p-2 rounded-full bg-slate-800/50 hover:bg-slate-700 text-slate-300 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-xl font-bold text-white">{game.title}</h1>
              <p className="text-slate-400 text-sm">{game.category}</p>
            </div>
          </div>

          <button
            onClick={toggleFullscreen}
            className="p-2 rounded-full bg-slate-800/50 hover:bg-slate-700 text-slate-300 transition-colors"
          >
            <Maximize2 className="w-5 h-5" />
          </button>
        </div>
      </motion.header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="relative aspect-video bg-slate-900 rounded-2xl overflow-hidden border border-slate-800">
          {isLoading ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <Loader2 className="w-12 h-12 text-blue-500 animate-spin mb-4" />
              <p className="text-slate-400">Loading {game.title}...</p>
            </div>
          ) : (
            <motion.iframe
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              src={game.url}
              title={game.title}
              className="absolute inset-0 w-full h-full"
              allow="fullscreen"
              sandbox="allow-scripts allow-same-origin allow-popups"
            />
          )}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <div className="md:col-span-2">
            <h2 className="text-2xl font-bold text-white mb-2">About {game.title}</h2>
            <p className="text-slate-400">{game.description}</p>
          </div>

          <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-800">
            <div className="space-y-4">
              <div>
                <span className="text-slate-500 text-sm">Category</span>
                <p className="text-white font-medium">{game.category}</p>
              </div>
              <div>
                <span className="text-slate-500 text-sm">Players</span>
                <p className="text-white font-medium">{game.players.toLocaleString()}</p>
              </div>
              {game.trending && (
                <div className="inline-flex items-center gap-1 px-3 py-1 bg-orange-500/20 rounded-full text-orange-400 text-sm font-medium">
                  🔥 Trending
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}