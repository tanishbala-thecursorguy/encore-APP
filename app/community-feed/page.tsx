'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"
import { StarsBackground } from "@/components/ui/stars"
import { AnimeNavBarDemo } from "@/components/ui/anime-navbar-demo"
import { PostCard } from '@/components/ui/post-card'

const sampleCommunities = [
  { name: 'Lo-Fi Lounge', id: 'lofi' },
  { name: 'Indie Artists', id: 'indie' },
  { name: 'Techno Underground', id: 'techno' },
  { name: 'DJ Collective', id: 'dj' },
  { name: 'Rising Stars', id: 'rising' },
]

const samplePosts = [
  {
    username: 'encore_music',
    imageUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&h=600&fit=crop',
    description: 'Vibe check 🎶✨',
    hashtags: ['music', 'encore', 'vibes'],
    userType: 'artist' as const,
    postedTime: '2h',
    audioSrc: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'
  },
  {
    username: 'dj_wave',
    imageUrl: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=800&h=600&fit=crop',
    description: 'Night at the decks 🔥',
    hashtags: ['dj', 'party', 'live'],
    userType: 'fan' as const,
    postedTime: '5h',
    audioSrc: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3'
  },
  {
    username: 'overflow.std',
    imageUrl: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=800&h=600&fit=crop',
    description: 'Making magic in the studio ✨🎵',
    hashtags: ['producer', 'beats', 'studio'],
    userType: 'artist' as const,
    postedTime: '1d',
    audioSrc: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3'
  },
]

export default function CommunityFeed() {
  const router = useRouter()
  const [selectedCommunity, setSelectedCommunity] = useState('lofi')

  return (
    <StarsBackground starColor="#10b981" className="w-full min-h-screen text-white pb-32">
      {/* Header */}
      <div className="flex items-center gap-4 px-4 py-6 pt-2">
        <button
          onClick={() => router.back()}
          className="bg-[#024c46]/70 p-3 rounded-full hover:bg-[#024c46] transition-colors"
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-3xl font-bold">Communities</h1>
      </div>
      
      {/* Tabs for selecting communities */}
      <div className="mb-6 overflow-x-auto scrollbar-hide px-4">
        <div className="flex space-x-2 min-w-max pb-2">
          {sampleCommunities.map((c) => (
            <motion.button
              key={c.id}
              onClick={() => setSelectedCommunity(c.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`rounded-full px-6 py-2.5 text-sm font-medium whitespace-nowrap transition-all ${
                selectedCommunity === c.id
                  ? "bg-green-400 text-black"
                  : "bg-[#024c46]/40 text-white hover:bg-[#024c46]/60"
              }`}
            >
              {c.name}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Feed */}
      <div className="flex flex-col">
        {samplePosts.map((post, i) => (
          <PostCard key={i} {...post} />
        ))}
      </div>

      {/* Bottom Navigation Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-[9999] pointer-events-none bg-black pb-3">
        <div className="flex justify-center pointer-events-auto">
          <AnimeNavBarDemo />
        </div>
      </div>
    </StarsBackground>
  )
}
