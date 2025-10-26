'use client'

import { PostCard } from "@/components/ui/post-card"
import { AnimeNavBarDemo } from "@/components/ui/anime-navbar-demo"
import { StarsBackground } from "@/components/ui/stars"
import { Home, UserPlus, Plus, Video, Users } from "lucide-react"
import Link from "next/link"

export default function HomePage() {

  const posts = [
    {
      username: "encore_music",
      imageUrl: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&h=600&fit=crop",
      description: "Vibe check 🎶✨",
      hashtags: ["music", "encore", "vibes"],
    },
    {
      username: "dj_wave",
      imageUrl: "https://images.unsplash.com/photo-1507874457470-272b3c8d8ee2?w=600&h=600&fit=crop",
      description: "Night at the decks 🔥",
      hashtags: ["dj", "party", "live"],
    },
    {
      username: "overflow.std",
      imageUrl: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=600&h=600&fit=crop",
      description: "Lorem ipsum dolor sit amet",
      hashtags: ["music", "studio", "production"],
    },
    {
      username: "the_vortex",
      imageUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=600&fit=crop",
      description: "Live performance tonight! 🎤",
      hashtags: ["live", "concert", "music"],
    },
  ]

  return (
    <StarsBackground starColor="#10b981" className="min-h-screen text-white relative pb-24">
      {/* Top App Bar */}
      <div className="sticky top-0 bg-black/80 backdrop-blur-lg border-b border-white/10 z-50 px-4 py-3">
        <h1 className="text-2xl font-bold">Encore</h1>
      </div>

      {/* Features Section - Scrolls with content */}
      <div className="bg-black/95 backdrop-blur-sm border-b border-white/10">
        <div className="flex overflow-x-auto gap-4 px-4 py-3 scrollbar-hide">
          <Link href="/post" className="flex flex-col items-center gap-1 min-w-[70px]">
            <div className="w-16 h-16 rounded-full p-[2px] bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-500">
              <div className="w-full h-full bg-black rounded-full p-[3px]">
                <div className="w-full h-full rounded-full bg-[#024c46] flex items-center justify-center">
                  <Plus size={24} className="text-white" />
                </div>
              </div>
            </div>
            <span className="text-xs text-gray-300">Create Post</span>
          </Link>
          
          <Link href="/friend-zone" className="flex flex-col items-center gap-1 min-w-[70px]">
            <div className="w-16 h-16 rounded-full p-[2px] bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-500">
              <div className="w-full h-full bg-black rounded-full p-[3px]">
                <div className="w-full h-full rounded-full bg-[#024c46] flex items-center justify-center">
                  <UserPlus size={24} className="text-white" />
                </div>
              </div>
            </div>
            <span className="text-xs text-gray-300">Friend Zone</span>
          </Link>
          
          <Link href="/reels" className="flex flex-col items-center gap-1 min-w-[70px]">
            <div className="w-16 h-16 rounded-full p-[2px] bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-500">
              <div className="w-full h-full bg-black rounded-full p-[3px]">
                <div className="w-full h-full rounded-full bg-[#024c46] flex items-center justify-center">
                  <Video size={24} className="text-white" />
                </div>
              </div>
            </div>
            <span className="text-xs text-gray-300">Reels</span>
          </Link>
          
          <Link href="/community" className="flex flex-col items-center gap-1 min-w-[70px]">
            <div className="w-16 h-16 rounded-full p-[2px] bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-500">
              <div className="w-full h-full bg-black rounded-full p-[3px]">
                <div className="w-full h-full rounded-full bg-[#024c46] flex items-center justify-center">
                  <Users size={24} className="text-white" />
                </div>
              </div>
            </div>
            <span className="text-xs text-gray-300">Community</span>
          </Link>
        </div>
      </div>
      
      {/* Feed */}
      <div className="flex flex-col items-center px-4 pt-4 pb-32">
        {posts.map((post, i) => (
          <PostCard key={i} {...post} />
        ))}
      </div>

      {/* Bottom Navigation Bar - Instagram Style */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-black border-t border-white/10">
        <div className="flex items-center justify-around py-3 px-4">
          <Link href="/" className="flex flex-col items-center gap-1 text-white">
            <Home size={26} strokeWidth={2} />
          </Link>
          
          <Link href="#search" className="flex flex-col items-center gap-1 text-white/70">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.35-4.35"></path>
            </svg>
          </Link>
          
          <Link href="/community" className="flex flex-col items-center gap-1 text-white/70">
            <Users size={26} strokeWidth={2} />
          </Link>
          
          <Link href="#profile" className="flex flex-col items-center gap-1 text-white/70">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </Link>
          
          <Link href="#wallet" className="flex flex-col items-center gap-1 text-white/70">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="2" y="4" width="20" height="16" rx="2"></rect>
              <path d="M7 15h.01M2 9.5h20"></path>
            </svg>
          </Link>
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

