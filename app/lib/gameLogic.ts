/**
 * Game logic for demo games - RNG-based
 */

const SUITS = ['♠', '♥', '♦', '♣']
const RANKS = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K']

export function createDeck() {
  const deck: string[] = []
  for (const suit of SUITS) {
    for (const rank of RANKS) {
      deck.push(`${rank}${suit}`)
    }
  }
  return shuffle(deck)
}

export function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export function drawCards(deck: string[], count: number): { cards: string[]; remaining: string[] } {
  const cards = deck.slice(0, count)
  const remaining = deck.slice(count)
  return { cards, remaining }
}

export function teenPattiHandRank(cards: string[]): number {
  const values = cards.map((c) => {
    const r = c.slice(0, -1)
    if (r === 'A') return 14
    if (r === 'K') return 13
    if (r === 'Q') return 12
    if (r === 'J') return 11
    return parseInt(r, 10)
  }).sort((a, b) => b - a)
  return values[0] * 10000 + values[1] * 100 + values[2]
}

export function andarBaharResult(): 'andar' | 'bahar' {
  return Math.random() < 0.5 ? 'andar' : 'bahar'
}

export function blackjackValue(cards: string[]): number {
  let total = 0
  let aces = 0
  for (const c of cards) {
    const r = c.slice(0, -1)
    if (r === 'A') {
      aces++
      total += 11
    } else if (['K', 'Q', 'J'].includes(r)) {
      total += 10
    } else {
      total += parseInt(r, 10)
    }
  }
  while (total > 21 && aces > 0) {
    total -= 10
    aces--
  }
  return total
}

export function rouletteSpin(): { number: number; color: 'red' | 'black' | 'green' } {
  const n = Math.floor(Math.random() * 37)
  if (n === 0) return { number: 0, color: 'green' }
  const reds = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36]
  return { number: n, color: reds.includes(n) ? 'red' : 'black' }
}

export function slotSpin(): string[] {
  const symbols = ['🍒', '🍋', '🍊', '7️⃣', '💰', '⭐']
  return [
    symbols[Math.floor(Math.random() * symbols.length)],
    symbols[Math.floor(Math.random() * symbols.length)],
    symbols[Math.floor(Math.random() * symbols.length)],
  ]
}

export function slotMultiplier(reels: string[]): number {
  if (reels[0] === reels[1] && reels[1] === reels[2]) {
    if (reels[0] === '7️⃣') return 10
    if (reels[0] === '💰') return 5
    if (reels[0] === '⭐') return 3
    return 2
  }
  if (reels[0] === reels[1] || reels[1] === reels[2] || reels[0] === reels[2]) return 1.5
  return 0
}

export function crashMultiplier(): number {
  return Math.max(1, Math.min(10, Math.pow(Math.random() * 5 + 1, 2)))
}

export function diceRoll(): number {
  return Math.floor(Math.random() * 6) + 1
}

export function plinkoResult(): number {
  const paths = 9
  let pos = Math.floor(paths / 2)
  for (let i = 0; i < 10; i++) {
    pos += Math.random() < 0.5 ? -1 : 1
    pos = Math.max(0, Math.min(paths - 1, pos))
  }
  const multipliers = [0.5, 1, 2, 5, 10, 5, 2, 1, 0.5]
  return multipliers[pos] ?? 1
}

export function minesResult(safeCount: number): boolean {
  return Math.random() < safeCount / 25
}
