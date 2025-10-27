'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Music2, MessageCircle, Share2, Bookmark } from 'lucide-react'
import Image from 'next/image'
import WaveformPlayer from './waveform-player'
import HolographicCard from './holo-card'

interface PostProps {
  username: string
  imageUrl: string
  description: string
  hashtags: string[]
  userType?: 'artist' | 'fan'
  postedTime?: string
  audioSrc?: string
}

export function PostCard({ username, imageUrl, description, hashtags, userType = 'artist', postedTime = '2h', audioSrc }: PostProps) {
  const [playing, setPlaying] = useState(false)
  const [showComments, setShowComments] = useState(false)
  const [saved, setSaved] = useState(false)
  const [isWhiteTheme, setIsWhiteTheme] = useState(false)

  useEffect(() => {
    const checkTheme = () => {
      if (typeof document !== 'undefined') {
        const htmlClass = document.documentElement.className
        setIsWhiteTheme(htmlClass === 'white-black' || htmlClass === 'white-stars')
      }
    }

    checkTheme()
    window.addEventListener('themechange', checkTheme)
    
    return () => window.removeEventListener('themechange', checkTheme)
  }, [])

  const handleDoubleClick = () => {
    setPlaying(true)
    setTimeout(() => setPlaying(false), 300)
  }

  const handleShare = () => {
    if (typeof window !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href)
      alert('Link copied to clipboard!')
    }
  }

  return (
    <div className={`w-full ${isWhiteTheme ? 'bg-white text-black' : 'bg-black text-white'} border-b ${isWhiteTheme ? 'border-black/10' : 'border-white/10'}`}>
      {/* Top Section - Profile, Type, Time */}
      <div className={`flex items-center gap-3 px-4 py-3 border-b ${isWhiteTheme ? 'border-black/5' : 'border-white/5'}`}>
        <div className="size-12 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 flex-shrink-0" />
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-0.5">
            <span className="font-semibold text-base">{username}</span>
            <span className="text-xs px-2 py-0.5 bg-[#01302e] rounded-full text-green-400 font-medium capitalize">
              {userType}
            </span>
            <span className={`text-xs ${isWhiteTheme ? 'text-gray-600' : 'text-gray-500'}`}>{postedTime}</span>
          </div>
        </div>
      </div>

      {/* Description and Hashtags */}
      <div className="px-4 py-3 space-y-2">
        <p className={`text-sm ${isWhiteTheme ? 'text-gray-900' : 'text-gray-100'}`}>{description}</p>
        <div className="flex flex-wrap gap-1.5">
          {hashtags.map((tag) => (
            <span key={tag} className="text-xs text-green-400">#{tag}</span>
          ))}
        </div>
      </div>

      {/* Post Image with Holographic Effect */}
      <motion.div
        onDoubleClick={handleDoubleClick}
        className={`relative cursor-pointer ${isWhiteTheme ? 'bg-white' : 'bg-black'}`}
        whileTap={{ scale: 0.98 }}
      >
        <div className="px-2 py-2">
          <HolographicCard
            imageUrl={imageUrl}
            width="100%"
            height="400px"
            glowColor="rgba(34, 197, 94, 0.4)"
            holoColor1="rgba(34, 197, 94, 0.2)"
            holoColor2="rgba(16, 185, 129, 0.1)"
          >
            <Image
              src={imageUrl}
              alt={username}
              width={600}
              height={600}
              className="object-cover w-full h-[400px] select-none"
            />
          </HolographicCard>
        </div>

        {playing && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1.5 }}
            transition={{ type: 'spring', stiffness: 200, damping: 10 }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none z-10"
          >
            <Music2 size={90} className="text-green-400 opacity-90" />
          </motion.div>
        )}
      </motion.div>

      {/* Waveform Player */}
      {audioSrc && (
        <div className="px-4 py-2">
          <WaveformPlayer audioSrc={audioSrc} />
        </div>
      )}

      {/* Interaction Buttons */}
      <div className="flex items-center gap-4 px-4 py-3">
        <button onClick={() => setPlaying(!playing)} className="flex items-center gap-2">
          <Music2
            size={28}
            className={`transition-all ${
              playing ? 'text-green-400' : isWhiteTheme ? 'text-black' : 'text-white'
            }`}
          />
          <span className={`text-sm ${isWhiteTheme ? 'text-black' : 'text-white'}`}>49.3K</span>
        </button>

        <button onClick={() => setShowComments(true)} className="flex items-center gap-2">
          <MessageCircle size={28} className={`${isWhiteTheme ? 'text-black' : 'text-white'} transition-colors`} />
          <span className={`text-sm ${isWhiteTheme ? 'text-black' : 'text-white'}`}>234</span>
        </button>

        <button onClick={handleShare} className="flex items-center gap-2">
          <Share2 size={28} className={`${isWhiteTheme ? 'text-black' : 'text-white'} transition-colors`} />
          <span className={`text-sm ${isWhiteTheme ? 'text-black' : 'text-white'}`}>Share</span>
        </button>

        <button 
          onClick={() => setSaved(!saved)} 
          className="ml-auto"
        >
          <Bookmark
            size={28}
            className={`transition-all ${
              saved ? (isWhiteTheme ? 'fill-black text-black' : 'fill-white text-white') : (isWhiteTheme ? 'text-black' : 'text-white')
            }`}
          />
        </button>
      </div>

      {/* Comment Modal */}
      {showComments && (
        <div 
          className="fixed inset-0 bg-black/80 flex items-end justify-center z-[10000]"
          onClick={() => setShowComments(false)}
        >
          <motion.div 
            className="bg-[#01302e] w-full max-w-md rounded-t-2xl p-4"
            initial={{ y: 300 }}
            animate={{ y: 0 }}
            transition={{ type: 'spring', damping: 30 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between mb-3">
              <h2 className="font-semibold">Comments</h2>
              <button 
                onClick={() => setShowComments(false)}
                className="text-white/70 hover:text-white"
              >
                ✕
              </button>
            </div>
            <div className="h-48 overflow-y-auto text-white/50 text-center py-8">
              No comments yet...
            </div>
            <input
              placeholder="Add a comment..."
              className="w-full mt-3 p-2 bg-[#024c46] rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </motion.div>
        </div>
      )}
    </div>
  )
}
