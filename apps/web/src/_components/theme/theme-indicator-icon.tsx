'use client'

import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'

export function ThemeIndicatorIcon() {
  const { resolvedTheme } = useTheme()

  return (
    <>
      {resolvedTheme === 'light' ? (
        <Sun className="size-4" />
      ) : (
        <Moon className="size-4" />
      )}
    </>
  )
}
