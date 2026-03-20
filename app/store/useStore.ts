import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { User } from '@supabase/supabase-js'

const DEMO_BALANCE = 1000

interface UserStats {
  totalWinnings: number
  gamesPlayed: number
}

interface AdminStats {
  totalBets: number
  totalWins: number
  totalLosses: number
  gamesPlayed: number
}

interface AppState {
  user: User | null
  setUser: (user: User | null) => void
  userStats: UserStats
  setUserStats: (stats: Partial<UserStats>) => void

  balance: number
  addBalance: (amount: number) => void
  deductBalance: (amount: number) => boolean
  setBalance: (amount: number) => void
  resetBalance: () => void

  joinedTournaments: string[]
  joinTournament: (id: string, entryFee: number) => boolean

  demoMode: boolean
  setDemoMode: (v: boolean) => void

  adminStats: AdminStats
  recordBet: (amount: number, won: boolean) => void
  resetAdminStats: () => void

  lastToast: string | null
  showToast: (message: string) => void
}

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      userStats: { totalWinnings: 0, gamesPlayed: 0 },
      setUserStats: (stats) =>
        set((s) => ({ userStats: { ...s.userStats, ...stats } })),

      balance: DEMO_BALANCE,
      addBalance: (amount) => set((s) => ({ balance: s.balance + amount })),
      deductBalance: (amount) => {
        let success = false
        set((s) => {
          if (s.balance >= amount) {
            success = true
            return { balance: s.balance - amount }
          }
          return {}
        })
        return success
      },
      setBalance: (amount) => set({ balance: amount }),
      resetBalance: () => set({ balance: DEMO_BALANCE }),

      joinedTournaments: [],
      joinTournament: (id, entryFee) => {
        let success = false
        set((s) => {
          if (s.balance >= entryFee && !s.joinedTournaments.includes(id)) {
            success = true
            return {
              balance: s.balance - entryFee,
              joinedTournaments: [...s.joinedTournaments, id],
            }
          }
          return {}
        })
        return success
      },

      demoMode: true,
      setDemoMode: (v) => set({ demoMode: v }),

      adminStats: {
        totalBets: 0,
        totalWins: 0,
        totalLosses: 0,
        gamesPlayed: 0,
      },
      recordBet: (amount, won) =>
        set((s) => ({
          adminStats: {
            ...s.adminStats,
            totalBets: s.adminStats.totalBets + amount,
            totalWins: s.adminStats.totalWins + (won ? 1 : 0),
            totalLosses: s.adminStats.totalLosses + (won ? 0 : 1),
            gamesPlayed: s.adminStats.gamesPlayed + 1,
          },
        })),
      resetAdminStats: () =>
        set({
          adminStats: {
            totalBets: 0,
            totalWins: 0,
            totalLosses: 0,
            gamesPlayed: 0,
          },
          balance: DEMO_BALANCE,
          joinedTournaments: [],
        }),

      lastToast: null,
      showToast: (message) => set({ lastToast: message }),
    }),
    {
      name: 'luckyora-storage',
      partialize: (s) => ({
        balance: s.balance,
        userStats: s.userStats,
        joinedTournaments: s.joinedTournaments,
        demoMode: s.demoMode,
        adminStats: s.adminStats,
      }),
    }
  )
)
