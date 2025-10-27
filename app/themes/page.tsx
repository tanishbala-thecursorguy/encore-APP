'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Check, Sun, Moon, Sparkles } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { StarsBackground } from '@/components/ui/stars'
import { AnimeNavBarDemo } from '@/components/ui/anime-navbar-demo'

const themes = [
  { 
    id: 'white-black', 
    name: 'White and Black', 
    desc: 'Classic light theme',
    bg: 'bg-white',
    preview: <Sun size={32} className="text-yellow-500" />
  },
  { 
    id: 'white-stars', 
    name: 'White and Stars', 
    desc: 'Light theme with stars',
    bg: 'bg-gradient-to-br from-white to-gray-100',
    preview: <Sparkles size={32} className="text-blue-500" />
  },
  { 
    id: 'black-stars', 
    name: 'Black and Stars', 
    desc: 'Dark theme with stars',
    bg: 'bg-black',
    preview: <StarsBackground starColor="#10b981" className="w-16 h-16" />
  },
]

export default function ThemesPage() {
  const router = useRouter()
  const [selectedTheme, setSelectedTheme] = useState('black-stars')

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

        {/* Theme Options */}
        <div className="px-4 py-6 space-y-4">
          {themes.map((theme, index) => (
            <motion.div
              key={theme.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setSelectedTheme(theme.id)}
              className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                selectedTheme === theme.id
                  ? 'border-green-400 bg-green-400/10'
                  : 'border-gray-800 bg-gray-900/50 hover:bg-gray-800'
              }`}
            >
              <div className="flex items-center gap-4">
                <div className={`w-16 h-16 rounded-lg ${theme.bg} flex items-center justify-center`}>
                  {theme.id !== 'black-stars' && theme.preview}
                  {theme.id === 'black-stars' && (
                    <div className="relative w-full h-full">
                      <Sparkles className="absolute top-2 left-2 text-green-400" size={16} />
                      <Sparkles className="absolute top-4 right-3 text-green-400" size={12} />
                      <Sparkles className="absolute bottom-3 left-3 text-green-400" size={14} />
                    </div>
                  )}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold">{theme.name}</h3>
                      <p className="text-sm text-gray-400">{theme.desc}</p>
                    </div>
                    {selectedTheme === theme.id && (
                      <div className="w-6 h-6 rounded-full bg-green-400 flex items-center justify-center">
                        <Check size={16} className="text-black" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Info */}
        <div className="px-4 py-4 bg-green-400/10 border border-green-400/30 rounded-xl mx-4">
          <p className="text-sm text-gray-300">
            🌙 Selected theme: <span className="text-green-400 font-semibold">{themes.find(t => t.id === selectedTheme)?.name}</span>
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

