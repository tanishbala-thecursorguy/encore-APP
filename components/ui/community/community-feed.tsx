'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Music2, MessageCircle, Share2, ArrowLeft } from "lucide-react"
import Image from 'next/image'
import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"
import { StarsBackground } from "@/components/ui/stars"
import { AnimeNavBarDemo } from "@/components/ui/anime-navbar-demo"

interface Post {
  id: number
  user: string
  avatar: string
  type: 'image' | 'video'
  content: string
  caption: string
  hashtags: string[]
  likes: string
  comments: string
}

const sampleCommunities = [
  { name: 'Lo-Fi Lounge', id: 'lofi' },
  { name: 'Indie Artists', id: 'indie' },
  { name: 'Techno Underground', id: 'techno' },
  { name: 'DJ Collective', id: 'dj' },
  { name: 'Rising Stars', id: 'rising' },
]

const samplePosts: Post[] = [
  {
    id: 1,
    user: 'encore_music',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop',
    type: 'image',
    content: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&h=600&fit=crop',
    caption: 'Vibe check 🎶✨',
    hashtags: ['music', 'encore', 'vibes'],
    likes: '12.4K',
    comments: '234'
  },
  {
    id: 2,
    user: 'dj_wave',
    avatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=100&h=100&fit=crop',
    type: 'video',
    content: 'https://videos.pexels.com/video-files/856998/856998-hd_1920_1080_25fps.mp4',
    caption: 'Weekend drops 🔥🎧',
    hashtags: ['techno', 'party', 'dj'],
    likes: '8.9K',
    comments: '156'
  },
  {
    id: 3,
    user: 'indie_artist',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    type: 'image',
    content: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=600&fit=crop',
    caption: 'Studio session vibes 🎹',
    hashtags: ['indie', 'music', 'studio'],
    likes: '6.2K',
    comments: '89'
  },
  {
    id: 4,
    user: 'techno_master',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
    type: 'video',
    content: 'https://videos.pexels.com/video-files/854959/854959-hd_1920_1080_25fps.mp4',
    caption: 'Dark basslines all night 🌃',
    hashtags: ['techno', 'underground', 'bass'],
    likes: '15.7K',
    comments: '421'
  },
  {
    id: 5,
    user: 'live_session',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    type: 'video',
    content: 'https://videos.pexels.com/video-files/856982/856982-hd_1920_1080_25fps.mp4',
    caption: 'Live from the stage 🎤⚡',
    hashtags: ['live', 'concert', 'energy'],
    likes: '22.1K',
    comments: '567'
  },
  {
    id: 6,
    user: 'producer_beats',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
    type: 'image',
    content: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&h=600&fit=crop',
    caption: 'Making magic in the studio ✨🎵',
    hashtags: ['producer', 'beats', 'studio'],
    likes: '9.3K',
    comments: '178'
  },
]

export function CommunityFeed() {
  const [selectedCommunity, setSelectedCommunity] = useState('lofi')
  const [likedPosts, setLikedPosts] = useState<number[]>([])
  const [showComments, setShowComments] = useState(false)
  const [currentPost, setCurrentPost] = useState<Post | null>(null)
  const router = useRouter()

  const toggleLike = (postId: number) => {
    setLikedPosts(prev =>
      prev.includes(postId) ? prev.filter(id => id !== postId) : [...prev, postId]
    )
  }

  const handleShare = () => {
    if (typeof window !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href)
      alert('Link copied to clipboard!')
    }
  }

  const openComments = (post: Post) => {
    setCurrentPost(post)
    setShowComments(true)
  }

  return (
    <StarsBackground starColor="#10b981" className="w-full min-h-screen text-white px-4 py-6 pb-32">
      {/* Header */}
      <div className="flex items-center mb-6 pt-2">
        <button
          onClick={() => router.back()}
          className="mr-4 bg-[#024c46]/70 p-3 rounded-full hover:bg-[#024c46] transition-colors"
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-3xl font-bold">Communities</h1>
      </div>
      
      {/* Tabs for selecting communities */}
      <div className="mb-6 overflow-x-auto scrollbar-hide">
        <div className="flex space-x-2 min-w-max pb-2">
          {sampleCommunities.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedCommunity(c.id)}
              className={cn(
                "rounded-full px-6 py-2.5 text-sm font-medium whitespace-nowrap transition-all",
                selectedCommunity === c.id
                  ? "bg-green-400 text-black"
                  : "bg-[#024c46]/40 text-white hover:bg-[#024c46]/60"
              )}
            >
              {c.name}
            </button>
          ))}
        </div>
      </div>

      {/* Feed */}
      <div className="flex flex-col gap-6 max-w-2xl mx-auto">
        {samplePosts.map((post, index) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-[#012624] border border-[#024c46]/30 rounded-2xl overflow-hidden"
          >
            {/* User Header */}
            <div className="flex items-center gap-3 p-4">
              <div 
                className="w-10 h-10 rounded-full bg-cover bg-center"
                style={{ backgroundImage: `url(${post.avatar})` }}
              />
              <div className="flex flex-col flex-1">
                <span className="font-semibold">{post.user}</span>
                <span className="text-xs text-gray-400">in {selectedCommunity}</span>
              </div>
            </div>

            {/* Media Section */}
            <div className="relative">
              {post.type === 'image' ? (
                <Image 
                  src={post.content} 
                  alt="Post content" 
                  width={800} 
                  height={600} 
                  className="w-full h-[400px] object-cover"
                />
              ) : (
                <video
                  src={post.content}
                  className="w-full h-[500px] object-cover bg-black"
                  controls
                  loop
                  playsInline
                  preload="metadata"
                />
              )}
            </div>

            {/* Post Footer */}
            <div className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex gap-4">
                  <button 
                    onClick={() => toggleLike(post.id)}
                    className="flex items-center gap-1.5"
                  >
                    <Music2
                      size={24}
                      className={cn(
                        "transition-all",
                        likedPosts.includes(post.id)
                          ? "fill-green-400 text-green-400"
                          : "text-white hover:text-green-400"
                      )}
                    />
                    <span className="text-sm">{post.likes}</span>
                  </button>

                  <button 
                    onClick={() => openComments(post)}
                    className="flex items-center gap-1.5 hover:text-green-400 transition-colors"
                  >
                    <MessageCircle size={24} />
                    <span className="text-sm">{post.comments}</span>
                  </button>

                  <button 
                    onClick={handleShare}
                    className="hover:text-green-400 transition-colors"
                  >
                    <Share2 size={24} />
                  </button>
                </div>
              </div>

              <div className="text-sm">
                <p className="mb-2">
                  <span className="font-semibold mr-2">{post.user}</span>
                  {post.caption}
                </p>
                <div className="flex flex-wrap gap-2 text-green-300">
                  {post.hashtags.map((tag, idx) => (
                    <span key={idx}>#{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Comment Modal */}
      <AnimatePresence>
        {showComments && currentPost && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 flex items-end justify-center z-[10000]"
            onClick={() => setShowComments(false)}
          >
            <motion.div
              initial={{ y: 400 }}
              animate={{ y: 0 }}
              exit={{ y: 400 }}
              transition={{ type: "spring", damping: 30 }}
              className="bg-[#01302e] w-full max-w-md rounded-t-3xl p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-white">Comments</h2>
                <button
                  onClick={() => setShowComments(false)}
                  className="text-white/70 hover:text-white transition-colors"
                >
                  <span className="text-2xl">&times;</span>
                </button>
              </div>

              <div className="h-64 overflow-y-auto text-white/50 text-center py-8 mb-4">
                No comments yet...
              </div>

              <div className="flex gap-2">
                <input
                  placeholder="Add a comment..."
                  className="flex-1 p-3 bg-[#024c46] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                />
                <button className="px-6 py-3 bg-green-400 text-black font-semibold rounded-lg hover:bg-green-500 transition-colors">
                  Post
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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

