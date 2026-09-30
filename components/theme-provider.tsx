'use client'

import { createContext, useContext, useEffect, useMemo, useState } from 'react'

type Theme = 'system' | 'light' | 'dark'

type ThemeContextValue = {
  theme: Theme
  setTheme: (theme: Theme) => void
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('system')

  useEffect(() => {
    const saved = window.localStorage.getItem('iplux-theme') as Theme | null
    if (saved === 'light' || saved === 'dark' || saved === 'system') setThemeState(saved)
  }, [])

  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)')
    const applyTheme = () => {
      const dark = theme === 'dark' || (theme === 'system' && media.matches)
      document.documentElement.classList.toggle('dark', dark)
      document.documentElement.classList.toggle('light', !dark)
    }
    const setTheme = () => applyTheme()
    applyTheme()
    media.addEventListener('change', setTheme)
    window.localStorage.setItem('iplux-theme', theme)
    return () => media.removeEventListener('change', setTheme)
  }, [theme])

  const value = useMemo(() => ({ theme, setTheme: setThemeState }), [theme])
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) throw new Error('useTheme must be used inside ThemeProvider')
  return context
}
