'use client'

import Link from 'next/link'
import type { Game } from '@/app/lib/games-data'

interface GameCardProps {
  game: Game
  size?: 'sm' | 'md' | 'lg'
}

export function GameCard({ game, size = 'md' }: GameCardProps) {
  const sizeClasses = {
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6',
  }
  const iconSizes = {
    sm: 'text-2xl',
    md: 'text-4xl',
    lg: 'text-5xl',
  }

  return (
    <Link href={`/game/${game.slug}`}>
      <div
        className={`group bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl border border-gray-700 ${sizeClasses[size]} 
          hover:from-yellow-600/20 hover:to-purple-600/20 hover:border-yellow-500/50 
          hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer shadow-lg`}
      >
        <div
          className={`${iconSizes[size]} mb-2 transition-transform group-hover:scale-110`}
        >
          {game.icon}
        </div>
        <h3 className="font-semibold text-white group-hover:text-yellow-400 transition-colors truncate">
          {game.name}
        </h3>
        <span className="inline-block mt-2 text-sm bg-yellow-500/20 text-yellow-400 px-3 py-1 rounded-full group-hover:bg-yellow-500/30 transition-colors">
          Play Now
        </span>
      </div>
    </Link>
  )
}
