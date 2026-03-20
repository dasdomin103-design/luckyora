'use client'

import { usePathname } from 'next/navigation'
import { BottomNav } from './BottomNav'

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const hideNav = pathname?.startsWith('/game/') || pathname === '/auth/callback'

  return (
    <>
      <div className={hideNav ? 'min-h-screen' : 'min-h-screen pb-20'}>{children}</div>
      {!hideNav && <BottomNav />}
    </>
  )
}
