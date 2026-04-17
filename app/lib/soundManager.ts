/**
 * Casino-style sound system using Web Audio API
 * No external files - generates sounds programmatically
 */

const STORAGE_KEY = 'luckyora-sound-prefs'

export interface SoundPrefs {
  enabled: boolean
  musicVolume: number
  effectsVolume: number
}

const DEFAULT_PREFS: SoundPrefs = {
  enabled: true,
  musicVolume: 0.2,
  effectsVolume: 0.5,
}

function getPrefs(): SoundPrefs {
  if (typeof window === 'undefined') return DEFAULT_PREFS
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) return { ...DEFAULT_PREFS, ...JSON.parse(stored) }
  } catch {}
  return DEFAULT_PREFS
}

function savePrefs(prefs: SoundPrefs) {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs))
  } catch {}
}

let audioContext: AudioContext | null = null

function getContext(): AudioContext | null {
  if (typeof window === 'undefined') return null
  if (!audioContext) {
    audioContext = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)()
  }
  return audioContext
}

function playTone(
  freq: number,
  duration: number,
  type: OscillatorType = 'sine',
  volume = 0.3
) {
  const ctx = getContext()
  if (!ctx) return
  if (ctx.state === 'suspended') ctx.resume()

  const osc = ctx.createOscillator()
  const gain = ctx.createGain()

  osc.connect(gain)
  gain.connect(ctx.destination)

  osc.frequency.value = freq
  osc.type = type
  gain.gain.setValueAtTime(volume * (getPrefs().effectsVolume || 0.5), ctx.currentTime)
  gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration)

  osc.start(ctx.currentTime)
  osc.stop(ctx.currentTime + duration)
}

export const sounds = {
  click: () => playTone(800, 0.05, 'square', 0.15),
  card: () => playTone(200, 0.1, 'sine', 0.2),
  win: () => {
    playTone(523, 0.1, 'sine', 0.3)
    setTimeout(() => playTone(659, 0.1, 'sine', 0.3), 100)
    setTimeout(() => playTone(784, 0.15, 'sine', 0.35), 200)
  },
  lose: () => playTone(200, 0.2, 'sawtooth', 0.2),
  coin: () => {
    playTone(988, 0.08, 'sine', 0.25)
    setTimeout(() => playTone(1319, 0.12, 'sine', 0.2), 80)
  },
}

let bgMusic: { play: () => void; volume: (v?: number) => number; fade: (from: number, to: number, ms: number) => void } | null = null

export async function initBgMusic() {
  if (typeof window === 'undefined') return
  const musicUrl = process.env.NEXT_PUBLIC_BG_MUSIC_URL || ''
  if (!musicUrl) return
  try {
    const { Howl } = await import('howler')
    bgMusic = new Howl({
      src: [musicUrl],
      loop: true,
      volume: getPrefs().musicVolume,
      html5: true,
    }) as unknown as typeof bgMusic
  } catch {}
}

export function playBgMusic() {
  if (!getPrefs().enabled) return
  if (bgMusic) {
    bgMusic.volume(getPrefs().musicVolume)
    bgMusic.fade(0, getPrefs().musicVolume, 1000)
    bgMusic.play()
  }
}

export function stopBgMusic() {
  if (bgMusic) bgMusic.fade(bgMusic.volume(), 0, 500)
}

export function playSound(name: keyof typeof sounds) {
  if (!getPrefs().enabled) return
  sounds[name]()
}

export function getSoundPrefs() {
  return getPrefs()
}

export function setSoundPrefs(updates: Partial<SoundPrefs>) {
  const prefs = { ...getPrefs(), ...updates }
  savePrefs(prefs)
  return prefs
}
