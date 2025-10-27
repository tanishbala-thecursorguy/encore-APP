'use client'

import { PostCard } from "@/components/ui/post-card"
import { AnimeNavBarDemo } from "@/components/ui/anime-navbar-demo"
import { StarsBackground } from "@/components/ui/stars"
import { Home, UserPlus, Plus, Video, Users } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

export default function HomePage() {

  const posts = [
    {
      username: "encore_music",
      imageUrl: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&h=600&fit=crop",
      description: "Vibe check 🎶✨",
      hashtags: ["music", "encore", "vibes"],
      userType: "artist" as const,
      postedTime: "2h",
      audioSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    },
    {
      username: "dj_wave",
      imageUrl: "https://images.unsplash.com/photo-1507874457470-272b3c8d8ee2?w=600&h=600&fit=crop",
      description: "Night at the decks 🔥",
      hashtags: ["dj", "party", "live"],
      userType: "fan" as const,
      postedTime: "5h",
      audioSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    },
    {
      username: "overflow.std",
      imageUrl: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=600&h=600&fit=crop",
      description: "Lorem ipsum dolor sit amet",
      hashtags: ["music", "studio", "production"],
      userType: "artist" as const,
      postedTime: "1d",
    },
    {
      username: "the_vortex",
      imageUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=600&fit=crop",
      description: "Live performance tonight! 🎤",
      hashtags: ["live", "concert", "music"],
      userType: "fan" as const,
      postedTime: "3h",
      audioSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    },
  ]

  return (
    <StarsBackground starColor="#10b981" className="min-h-screen text-white relative pb-24">
      {/* Top App Bar */}
      <div className="sticky top-0 bg-black/80 backdrop-blur-lg border-b border-white/10 z-50 px-4 py-3">
        <h1 className="text-2xl font-bold">Encore</h1>
      </div>

      {/* Features Section - Music themed */}
      <div className="bg-black/95 backdrop-blur-sm border-b border-white/10">
        <div className="flex justify-center overflow-x-auto gap-4 px-4 py-3 scrollbar-hide">
          <Link href="/post" className="flex flex-col items-center gap-1.5 min-w-[55px] group">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              className="w-11 h-11 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center shadow-lg shadow-green-500/30"
            >
              <Plus size={22} className="text-black font-bold" />
            </motion.div>
            <span className="text-[11px] text-gray-300 font-medium">Create</span>
          </Link>
          
          <Link href="/friend-zone" className="flex flex-col items-center gap-1.5 min-w-[55px] group">
            <motion.div
              whileHover={{ scale: 1.1, rotate: -5 }}
              whileTap={{ scale: 0.95 }}
              className="w-11 h-11 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/30"
            >
              <UserPlus size={22} className="text-white font-bold" />
            </motion.div>
            <span className="text-[11px] text-gray-300 font-medium">Friends</span>
          </Link>

          <Link href="/reels" className="flex flex-col items-center gap-1.5 min-w-[55px] group">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              className="w-11 h-11 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center shadow-lg shadow-purple-500/30"
            >
              <Video size={22} className="text-white font-bold" />
            </motion.div>
            <span className="text-[11px] text-gray-300 font-medium">Reels</span>
          </Link>

          <Link href="/community-feed" className="flex flex-col items-center gap-1.5 min-w-[55px] group">
            <motion.div
              whileHover={{ scale: 1.1, rotate: -5 }}
              whileTap={{ scale: 0.95 }}
              className="w-11 h-11 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-cyan-500/30"
            >
              <Users size={22} className="text-white font-bold" />
            </motion.div>
            <span className="text-[11px] text-gray-300 font-medium">Community</span>
          </Link>
        </div>
      </div>
      
      {/* Feed */}
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

