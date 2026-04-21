// src/hooks/useTheme.js
// Persists user's dark/light preference in localStorage.
// Applies/removes the 'dark' class on <html> so Tailwind's dark: variants work.

import { useState, useEffect } from 'react'

export function useTheme() {
  const [isDark, setIsDark] = useState(() => {
    // 1. Check saved preference
    const saved = localStorage.getItem('gc-theme')
    if (saved) return saved === 'dark'
    // 2. Fall back to OS preference
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  })

  useEffect(() => {
    const root = document.documentElement
    if (isDark) {
      root.classList.add('dark')
      localStorage.setItem('gc-theme', 'dark')
    } else {
      root.classList.remove('dark')
      localStorage.setItem('gc-theme', 'light')
    }
  }, [isDark])

  const toggleTheme = () => setIsDark(prev => !prev)

  return { isDark, toggleTheme }
}
