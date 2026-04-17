'use client'

import dynamic from 'next/dynamic'
import { DefaultDemo } from './DefaultDemo'

const TeenPattiDemo = dynamic(() => import('./TeenPattiDemo').then((m) => ({ default: m.TeenPattiDemo })), { ssr: false })
const AndarBaharDemo = dynamic(() => import('./AndarBaharDemo').then((m) => ({ default: m.AndarBaharDemo })), { ssr: false })
const BlackjackDemo = dynamic(() => import('./BlackjackDemo').then((m) => ({ default: m.BlackjackDemo })), { ssr: false })
const RouletteDemo = dynamic(() => import('./RouletteDemo').then((m) => ({ default: m.RouletteDemo })), { ssr: false })
const SlotsDemo = dynamic(() => import('./SlotsDemo').then((m) => ({ default: m.SlotsDemo })), { ssr: false })
const CrashDemo = dynamic(() => import('./CrashDemo').then((m) => ({ default: m.CrashDemo })), { ssr: false })
const DiceDemo = dynamic(() => import('./DiceDemo').then((m) => ({ default: m.DiceDemo })), { ssr: false })
const PlinkoDemo = dynamic(() => import('./PlinkoDemo').then((m) => ({ default: m.PlinkoDemo })), { ssr: false })
const MinesDemo = dynamic(() => import('./MinesDemo').then((m) => ({ default: m.MinesDemo })), { ssr: false })

const GAME_MAP: Record<string, React.ComponentType<{ title?: string; icon?: string }>> = {
  'teen-patti': TeenPattiDemo,
  'live-teen-patti': TeenPattiDemo,
  'andar-bahar': AndarBaharDemo,
  blackjack: BlackjackDemo,
  'live-blackjack': BlackjackDemo,
  'roulette-european': RouletteDemo,
  'roulette-american': RouletteDemo,
  'live-roulette': RouletteDemo,
  'mega-spin': SlotsDemo,
  'fruit-slots': SlotsDemo,
  'lucky-777': SlotsDemo,
  'wild-spin': SlotsDemo,
  'jackpot-slots': SlotsDemo,
  aviator: CrashDemo,
  'crash-game': CrashDemo,
  'dice-roll': DiceDemo,
  plinko: PlinkoDemo,
  mines: MinesDemo,
}

export function GameDemo({ slug, title, icon }: { slug: string; title: string; icon: string }) {
  const Game = GAME_MAP[slug]
  if (Game) return <Game />
  return <DefaultDemo title={title} icon={icon} />
}
