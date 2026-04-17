export interface Game {
  id: string
  name: string
  slug: string
  category: 'card' | 'casino' | 'slots' | 'arcade' | 'live'
  icon: string
  featured?: boolean
  trending?: boolean
}

export const GAMES: Game[] = [
  // Card Games
  { id: '1', name: 'Teen Patti', slug: 'teen-patti', category: 'card', icon: '🃏', featured: true, trending: true },
  { id: '2', name: 'Poker (Texas Hold\'em)', slug: 'poker-texas-holdem', category: 'card', icon: '♠️' },
  { id: '3', name: 'Andar Bahar', slug: 'andar-bahar', category: 'card', icon: '🃏', trending: true },
  { id: '4', name: 'Rummy', slug: 'rummy', category: 'card', icon: '🃏' },
  { id: '5', name: 'Baccarat', slug: 'baccarat', category: 'card', icon: '🃏' },
  // Casino
  { id: '6', name: 'Blackjack', slug: 'blackjack', category: 'casino', icon: '🂡', featured: true },
  { id: '7', name: 'Roulette (European)', slug: 'roulette-european', category: 'casino', icon: '🎡' },
  { id: '8', name: 'Roulette (American)', slug: 'roulette-american', category: 'casino', icon: '🎡' },
  { id: '9', name: 'Sic Bo', slug: 'sic-bo', category: 'casino', icon: '🎲' },
  { id: '10', name: 'Dragon Tiger', slug: 'dragon-tiger', category: 'casino', icon: '🐉' },
  // Slots
  { id: '11', name: 'Mega Spin', slug: 'mega-spin', category: 'slots', icon: '🎰', trending: true },
  { id: '12', name: 'Fruit Slots', slug: 'fruit-slots', category: 'slots', icon: '🍒' },
  { id: '13', name: 'Lucky 777', slug: 'lucky-777', category: 'slots', icon: '7️⃣' },
  { id: '14', name: 'Wild Spin', slug: 'wild-spin', category: 'slots', icon: '🎰' },
  { id: '15', name: 'Jackpot Slots', slug: 'jackpot-slots', category: 'slots', icon: '💰', featured: true },
  // Arcade / Casual
  { id: '16', name: 'Aviator', slug: 'aviator', category: 'arcade', icon: '✈️', trending: true },
  { id: '17', name: 'Mines', slug: 'mines', category: 'arcade', icon: '💣' },
  { id: '18', name: 'Crash Game', slug: 'crash-game', category: 'arcade', icon: '📈', trending: true },
  { id: '19', name: 'Dice Roll', slug: 'dice-roll', category: 'arcade', icon: '🎲' },
  { id: '20', name: 'Plinko', slug: 'plinko', category: 'arcade', icon: '⚪' },
  // Live Games
  { id: '21', name: 'Live Teen Patti', slug: 'live-teen-patti', category: 'live', icon: '🎴', featured: true },
  { id: '22', name: 'Live Blackjack', slug: 'live-blackjack', category: 'live', icon: '🂡' },
  { id: '23', name: 'Live Roulette', slug: 'live-roulette', category: 'live', icon: '🎡' },
]

export const getGameBySlug = (slug: string) => GAMES.find((g) => g.slug === slug)
export const getFeaturedGames = () => GAMES.filter((g) => g.featured)
export const getTrendingGames = () => GAMES.filter((g) => g.trending)
export const getGamesByCategory = (category: Game['category']) =>
  GAMES.filter((g) => g.category === category)

export const CATEGORY_LABELS: Record<Game['category'], string> = {
  card: 'Card Games',
  casino: 'Casino',
  slots: 'Slots',
  arcade: 'Arcade / Casual',
  live: 'Live Games',
}
