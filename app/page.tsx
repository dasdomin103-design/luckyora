"use client";
import { LeaderboardEntry } from '@/types/leaderboard'
import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import Hero from "./components/Hero";
import CategoryFilter from "./components/CategoryFilter";
import TrendingSection from "./components/TrendingSection";
import GameCard from "./components/GameCard";
import Leaderboard from "./components/Leaderboard";
import Features from "./components/Features";
import AdBanner from "./components/AdBanner";
import Footer from "./components/Footer";
import ChatBot from "./components/ChatBot";
import { games, Category } from "./data/games";


// Mock leaderboard data (replace with real Supabase data)
const mockLeaderboard: LeaderboardEntry[] = [
  { id: "1", username: "ProGamer123", score: 999999, game_slug: "2048", created_at: new Date().toISOString() },
  { id: "2", username: "SpeedRunner", score: 875000, game_slug: "Tetris", created_at: new Date().toISOString() },
  { id: "3", username: "PuzzleMaster", score: 750000, game_slug: "Sudoku", created_at: new Date().toISOString() },
  { id: "4", username: "ArcadeKing", score: 620000, game_slug: "Pac-Man", created_at: new Date().toISOString() },
  { id: "5", username: "StrategyPro", score: 580000, game_slug: "Chess", created_at: new Date().toISOString() },
];

export default function Home() {
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredGames = useMemo(() => {
    return games.filter((game) => {
      const matchesCategory = activeCategory === "All" || game.category === activeCategory;
      const matchesSearch = game.title.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-slate-950"
    >
      <Hero />

      <TrendingSection />

      <AdBanner />

      {/* Games Section */}
      <section id="games-section" className="py-12 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              All Games
            </h2>
            <p className="text-slate-400">
              Browse our collection of {games.length}+ free games
            </p>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-md mx-auto mb-8"
          >
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
              <input
                type="text"
                placeholder="Search games..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-slate-900/50 border border-slate-800 rounded-full text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
              />
            </div>
          </motion.div>

          <CategoryFilter
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />

          {/* Games Grid */}
          <div className="mt-8">
            {filteredGames.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredGames.map((game, index) => (
                  <GameCard key={game.slug} game={game} index={index} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-slate-500 text-lg">No games found matching your criteria.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      <Leaderboard entries={mockLeaderboard} />

      <Features />

      <AdBanner />

      <Footer />

      <ChatBot />
    </motion.main>
  );
}
import type { LeaderboardEntry } from "../lib/types";



