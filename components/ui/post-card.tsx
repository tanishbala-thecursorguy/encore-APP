'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Music2, MessageCircle, Share2 } from 'lucide-react'
import Image from 'next/image'

interface PostProps {
  username: string
  imageUrl: string
  description: string
  hashtags: string[]
}

export function PostCard({ username, imageUrl, description, hashtags }: PostProps) {
  const [playing, setPlaying] = useState(false)
  const [showComments, setShowComments] = useState(false)
  const [paused, setPaused] = useState(false)

  const handleDoubleClick = () => {
    setPlaying(true)
    setTimeout(() => setPlaying(false), 300)
  }

  const handleSingleClick = () => {
    setPaused(!paused)
  }

  const handleShare = () => {
    if (typeof window !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href)
      alert('Link copied to clipboard!')
    }
  }

  return (
    <div className="w-full bg-black text-white border-b border-white/10 mb-2">
      <div className="flex items-center gap-3 px-4 py-3">
        <div className="size-9 rounded-full bg-gradient-to-br from-green-400 to-emerald-600" />
        <span className="font-semibold">{username}</span>
      </div>

      <motion.div
        onDoubleClick={handleDoubleClick}
        onClick={handleSingleClick}
        className="relative cursor-pointer"
        whileTap={{ scale: 0.97 }}
      >
        <Image
          src={imageUrl}
          alt={username}
          width={600}
          height={600}
          className={`object-cover w-full h-[400px] select-none ${
            paused ? 'opacity-70' : ''
          }`}
        />

        {playing && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1.5 }}
            transition={{ type: 'spring', stiffness: 200, damping: 10 }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
          >
            <Music2 size={90} className="text-green-400 opacity-90" />
          </motion.div>
        )}
      </motion.div>

      <div className="flex items-center gap-6 px-4 py-3">
        <button onClick={() => setPlaying(!playing)}>
          <Music2
            size={28}
            className={`${
              playing ? 'text-green-400' : 'text-white'
            } transition-all`}
          />
        </button>

        <button onClick={() => setShowComments(true)}>
          <MessageCircle size={28} className="text-white transition-colors" />
        </button>

        <button onClick={handleShare}>
          <Share2 size={28} className="text-white transition-colors" />
        </button>
      </div>

      <div className="px-4 pb-4">
        <p className="text-sm mb-1.5">
          <span className="font-semibold mr-2">{username}</span>
          {description}
        </p>
        <div className="flex flex-wrap gap-2 text-green-300 text-sm">
          {hashtags.map((tag) => (
            <span key={tag}>#{tag}</span>
          ))}
        </div>
      </div>

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

