'use client'

import { ThemeProvider } from "@/context/ThemeContext"
import { useEffect } from "react"

export function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Apply saved theme immediately on mount
    const savedTheme = localStorage.getItem('theme') || 'black-stars'
    if (typeof document !== 'undefined') {
      document.documentElement.className = savedTheme
      document.body.className = `theme-${savedTheme}`
    }
  }, [])

  return <ThemeProvider>{children}</ThemeProvider>
}

