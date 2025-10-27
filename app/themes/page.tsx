'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Check } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { StarsBackground } from '@/components/ui/stars'
import { AnimeNavBarDemo } from '@/components/ui/anime-navbar-demo'
import { useTheme } from '@/context/ThemeContext'

const themes = [
  { 
    id: 'white-black', 
    name: 'White and Black', 
    bg: 'bg-gradient-to-br from-white to-gray-100',
    stars: false
  },
  { 
    id: 'white-stars', 
    name: 'White and Stars', 
    bg: 'bg-gradient-to-br from-white via-blue-50 to-purple-50',
    stars: true,
    starColor: '#3b82f6'
  },
  { 
    id: 'black-stars', 
    name: 'Black and Stars', 
    bg: 'bg-black',
    stars: true,
    starColor: '#10b981'
  },
  { 
    id: 'dark-blue', 
    name: 'Dark Blue', 
    bg: 'bg-gradient-to-br from-slate-900 to-blue-900',
    stars: false
  },
]

export default function ThemesPage() {
  const router = useRouter()
  let theme: string = 'black-stars'
  let setThemeFunction: (newTheme: string) => void = (newTheme: string) => {
    localStorage.setItem('theme', newTheme)
    if (typeof document !== 'undefined') {
      document.documentElement.className = newTheme
    }
  }
  
  try {
    const context = useTheme()
    theme = context.theme
    setThemeFunction = context.setTheme as any
  } catch (e) {
    // Not wrapped in ThemeProvider, use defaults
    console.log('Themes page not wrapped in provider')
  }

  const handleThemeChange = (themeId: string) => {
    setThemeFunction(themeId)
    
    // Dispatch custom event to trigger re-renders
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('themechange'))
    }
    
    // Force immediate update
    setTimeout(() => {
      window.location.href = '/' // Navigate to home to see changes
    }, 100)
  }

  return (
    <StarsBackground className="min-h-screen" starColor="#10b981">
      <div className="text-white pb-24">
        {/* Header */}
        <div className="sticky top-0 bg-black/80 backdrop-blur-lg border-b border-white/10 z-50 px-4 py-3 flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="p-2 hover:bg-gray-800 rounded-full transition-colors"
          >
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-xl font-bold">Themes</h1>
        </div>

        {/* Theme Options - Circles */}
        <div className="px-4 py-8">
          <div className="grid grid-cols-2 gap-6 max-w-md mx-auto">
            {themes.map((themeOption, index) => (
              <motion.div
                key={themeOption.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => handleThemeChange(themeOption.id)}
                className="flex flex-col items-center gap-3 cursor-pointer group"
              >
                <div className="relative">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                     className={`w-24 h-24 rounded-full ${themeOption.bg} border-4 ${
                      theme === themeOption.id
                        ? 'border-green-400 shadow-lg shadow-green-400/50'
                        : 'border-gray-700 group-hover:border-gray-600'
                    } transition-all flex items-center justify-center relative overflow-hidden`}
                  >
                    {themeOption.stars && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="relative w-full h-full">
                          <div className="absolute top-2 left-3 w-1 h-1 rounded-full bg-white" />
                          <div className="absolute top-4 right-4 w-1 h-1 rounded-full bg-white" />
                          <div className="absolute bottom-5 left-5 w-0.5 h-0.5 rounded-full bg-white" />
                          <div className="absolute bottom-3 right-2 w-1 h-1 rounded-full bg-white" />
                          <div className="absolute top-1/2 right-1/4 w-0.5 h-0.5 rounded-full bg-white" />
                          <div className="absolute bottom-1/4 left-2 w-1 h-1 rounded-full bg-white" />
                        </div>
                      </div>
                    )}
                  </motion.div>
                  
                  {theme === themeOption.id && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-green-400 flex items-center justify-center shadow-lg"
                    >
                      <Check size={16} className="text-black font-bold" />
                    </motion.div>
                  )}
                </div>
                
                <div className="text-center">
                  <h3 className="text-sm font-semibold">{themeOption.name}</h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Active Theme Info */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="px-6 py-4 mx-4 bg-green-400/10 border border-green-400/30 rounded-2xl"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-green-400/20 flex items-center justify-center">
              <Check size={20} className="text-green-400" />
            </div>
            <div className="flex-1">
                <p className="text-sm text-gray-300">
                  Active theme: <span className="text-green-400 font-semibold">{themes.find(t => t.id === theme)?.name}</span>
                </p>
              <p className="text-xs text-gray-500 mt-1">Refresh to see full changes</p>
            </div>
          </div>
        </motion.div>

        {/* Add More Themes Hint */}
        <div className="px-4 py-6">
          <p className="text-center text-sm text-gray-500">
            More themes coming soon! 🎨
          </p>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 z-[9999] pointer-events-none bg-black pb-3">
        <div className="flex justify-center pointer-events-auto">
          <AnimeNavBarDemo />
        </div>
      </div>
    </StarsBackground>
  )
}
