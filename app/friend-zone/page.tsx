'use client'

import { useState } from 'react'
import { Music2, MessageCircle, Share2, Send, ArrowLeft, UserPlus } from 'lucide-react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { StarsBackground } from '@/components/ui/stars'
import { AnimeNavBarDemo } from "@/components/ui/anime-navbar-demo"
import { PostCard } from '@/components/ui/post-card'

// Sample friend list for the top stories bar
const friends = [
  { id: 1, name: 'Ava', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop' },
  { id: 2, name: 'Liam', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop' },
  { id: 3, name: 'Noah', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop' },
  { id: 4, name: 'Zoe', img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop' },
  { id: 5, name: 'Mila', img: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop' },
]

// Sample posts
const posts = [
  {
    username: 'Ava',
    imageUrl: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=600&h=600&fit=crop',
    description: 'Best night ever 🌙✨',
    hashtags: ['LoFi', 'Friends'],
    userType: 'fan' as const,
    postedTime: '2h',
    audioSrc: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'
  },
  {
    username: 'Liam',
    imageUrl: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=600&h=600&fit=crop',
    description: 'Chill jam with the crew 🎧🔥',
    hashtags: ['music', 'jam'],
    userType: 'artist' as const,
    postedTime: '5h'
  },
  {
    username: 'Noah',
    imageUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&h=600&fit=crop',
    description: 'Studio sessions hit different 🎹✨',
    hashtags: ['studio', 'session'],
    userType: 'fan' as const,
    postedTime: '1d'
  },
]

const stickers = ['🔥', '💫', '🎧', '🎉', '❤️', '😎', '✨', '🎵']

export default function FriendZonePage() {
  const router = useRouter()

  return (
    <StarsBackground starColor="#10b981" className="min-h-screen w-full text-white pb-32">
      {/* Top bar */}
      <div className="p-4 pb-0 flex justify-between items-center sticky top-0 bg-[#0a0f10]/80 backdrop-blur-lg z-10">
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.push("/")}
            className="bg-[#024c46]/70 p-2 rounded-full hover:bg-[#024c46] transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-2xl font-bold">Friend Zone</h1>
        </div>
        <button className="flex items-center gap-2 bg-green-400 text-black px-4 py-2 rounded-full text-sm font-semibold hover:bg-green-500 transition-colors">
          <UserPlus size={16} />
          Add Friend
        </button>
      </div>

      {/* Stories / Friends Row */}
      <div className="flex overflow-x-auto gap-4 p-4 scrollbar-hide">
        {friends.map((f, index) => (
          <motion.div
            key={f.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex flex-col items-center space-y-2 min-w-[70px]"
          >
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="w-16 h-16 rounded-full bg-gradient-to-tr from-green-400 to-emerald-600 p-[3px] cursor-pointer"
            >
              <div className="bg-[#0f1618] rounded-full w-full h-full flex items-center justify-center overflow-hidden">
                <div 
                  className="w-full h-full bg-cover bg-center rounded-full"
                  style={{ backgroundImage: `url(${f.img})` }}
                />
              </div>
            </motion.div>
            <p className="text-xs text-gray-300 font-medium">{f.name}</p>
          </motion.div>
        ))}
      </div>

      {/* Feed Section */}
      <div className="flex flex-col pb-32">
        {posts.map((post, i) => (
          <PostCard key={i} {...post} />
        ))}
      </div>


      {/* Bottom Navigation Bar with Anime Mascot */}
      <div className="fixed bottom-0 left-0 right-0 z-[9999] pointer-events-none bg-black pb-3">
        <div className="flex justify-center pointer-events-auto">
          <AnimeNavBarDemo />
        </div>
      </div>

      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </StarsBackground>
  )
}

