"use client";

import { motion } from "framer-motion";
import { Flame, ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";
import { games } from "../data/games";
import GameCard from "./GameCard";

export default function TrendingSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const trendingGames = games.filter((game) => game.trending);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 320;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="py-12 bg-gradient-to-b from-slate-950 to-slate-900">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
              <Flame className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-white">
                Trending Now
              </h2>
              <p className="text-slate-400 text-sm">
                Most played games this week
              </p>
            </div>
          </motion.div>

          {/* Navigation Arrows */}
          <div className="flex gap-2">
            <button
              onClick={() => scroll("left")}
              className="p-2 rounded-full bg-slate-800/50 hover:bg-slate-700 text-slate-300 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="p-2 rounded-full bg-slate-800/50 hover:bg-slate-700 text-slate-300 transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Horizontal Scroll Container */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto scrollbar-hide pb-4 -mx-4 px-4"
          style={{ scrollSnapType: "x mandatory" }}
        >
          {trendingGames.map((game, index) => (
            <div
              key={game.slug}
              className="flex-shrink-0 w-[280px] md:w-[300px]"
              style={{ scrollSnapAlign: "start" }}
            >
              <GameCard game={game} index={index} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
