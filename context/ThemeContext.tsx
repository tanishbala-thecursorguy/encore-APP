'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

type Theme = 'white-black' | 'white-stars' | 'black-stars' | 'dark-blue'

interface ThemeContextType {
  theme: Theme
  setTheme: (theme: Theme) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('black-stars')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    
    // Load saved theme on mount
    const savedTheme = (localStorage.getItem('theme') as Theme) || 'black-stars'
    setThemeState(savedTheme)
    
    if (typeof document !== 'undefined') {
      document.documentElement.className = savedTheme
      
      // Set star color if applicable
      if (savedTheme === 'white-stars') {
        document.documentElement.setAttribute('data-star-color', '#3b82f6')
      } else if (savedTheme === 'black-stars') {
        document.documentElement.setAttribute('data-star-color', '#10b981')
      }
    }
  }, [])

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme)
    localStorage.setItem('theme', newTheme)
    
    // Apply theme to html element
    if (typeof document !== 'undefined') {
      document.documentElement.className = newTheme
      
      // Set star color if applicable
      if (newTheme === 'white-stars') {
        document.documentElement.setAttribute('data-star-color', '#3b82f6')
      } else if (newTheme === 'black-stars') {
        document.documentElement.setAttribute('data-star-color', '#10b981')
      } else {
        document.documentElement.removeAttribute('data-star-color')
      }
    }
  }

  if (!mounted) {
    return <div className="black-stars">{children}</div>
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div className={theme}>
        {children}
      </div>
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
