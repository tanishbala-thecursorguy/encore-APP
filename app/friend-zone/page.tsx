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
  const [activePost, setActivePost] = useState<number | null>(null)
  const [comment, setComment] = useState('')
  const [showStickerPicker, setShowStickerPicker] = useState<number | null>(null)
  const [selectedSticker, setSelectedSticker] = useState<{postId: number, sticker: string} | null>(null)
  const [likedPosts, setLikedPosts] = useState<number[]>([])
  const [showCommentsModal, setShowCommentsModal] = useState(false)
  const [currentPostId, setCurrentPostId] = useState<number | null>(null)
  const router = useRouter()

  const toggleLike = (postId: number) => {
    setLikedPosts(prev =>
      prev.includes(postId) ? prev.filter(id => id !== postId) : [...prev, postId]
    )
  }

  const handleStickerSelect = (postId: number, sticker: string) => {
    setSelectedSticker({ postId, sticker })
    setTimeout(() => setSelectedSticker(null), 2000)
    setShowStickerPicker(null)
  }

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
      <div className="flex flex-col gap-6 px-4 pb-16 max-w-2xl mx-auto">
        {posts.map((post, index) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.15 }}
            className="bg-[#121a1c] border border-gray-700/40 rounded-2xl overflow-hidden shadow-lg"
          >
            {/* Post Header */}
            <div className="flex items-center gap-3 p-4">
              <div 
                className="w-10 h-10 rounded-full bg-cover bg-center"
                style={{ backgroundImage: `url(${post.user.img})` }}
              />
              <p className="font-semibold">{post.user.name}</p>
            </div>

            {/* Media */}
            {post.type === 'photo' ? (
              <div className={`grid ${post.media.length > 1 ? 'grid-cols-2' : 'grid-cols-1'} gap-1`}>
                {post.media.map((m, i) => (
                  <Image
                    key={i}
                    src={m}
                    width={600}
                    height={400}
                    alt="Post"
                    className="object-cover w-full h-[280px]"
                  />
                ))}
              </div>
            ) : (
              <video
                src={post.media[0]}
                className="w-full h-[360px] object-cover bg-black"
                controls
                loop
                playsInline
                preload="metadata"
              />
            )}

            {/* Caption & Actions */}
            <div className="p-4 space-y-3">
              <p className="text-sm text-gray-300">{post.caption}</p>

              {/* Buttons */}
              <div className="flex justify-between items-center text-gray-400 pt-2">
                <div className="flex gap-5">
                  <button 
                    onClick={() => toggleLike(post.id)}
                    className="flex items-center gap-1.5 transition-colors"
                  >
                    <Music2 
                      size={22} 
                      className={likedPosts.includes(post.id) ? "fill-pink-500 text-pink-500" : "hover:text-pink-500"}
                    />
                    <span className="text-sm">{post.likes}</span>
                  </button>
                  
                  <button 
                    onClick={() => {
                      setCurrentPostId(post.id)
                      setShowCommentsModal(true)
                    }}
                    className="flex items-center gap-1.5 hover:text-green-400 transition-colors"
                  >
                    <MessageCircle size={22} />
                    <span className="text-sm">{post.comments}</span>
                  </button>
                  
                  <button className="hover:text-blue-400 transition-colors">
                    <Share2 size={22} />
                  </button>
                </div>
                
                <button
                  onClick={() => setShowStickerPicker(showStickerPicker === post.id ? null : post.id)}
                  className="bg-green-400/10 hover:bg-green-400/20 text-green-400 px-4 py-1.5 rounded-full text-sm font-semibold transition-colors"
                >
                  Push
                </button>
              </div>

              {/* Sticker Picker */}
              <AnimatePresence>
                {showStickerPicker === post.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="flex gap-2 flex-wrap pt-2"
                  >
                    {stickers.map((st) => (
                      <motion.button
                        key={st}
                        onClick={() => handleStickerSelect(post.id, st)}
                        whileTap={{ scale: 0.9 }}
                        whileHover={{ scale: 1.1 }}
                        className="text-2xl p-2 rounded-lg bg-[#1b2426] hover:bg-[#263033] transition-colors"
                      >
                        {st}
                      </motion.button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Sticker Display */}
              <AnimatePresence>
                {selectedSticker?.postId === post.id && (
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    exit={{ scale: 0, rotate: 180 }}
                    className="text-6xl text-center py-4"
                  >
                    {selectedSticker.sticker}
                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          </motion.div>
        ))}
      </div>

      {/* Comment Modal */}
      <AnimatePresence>
        {showCommentsModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 flex items-end justify-center z-[10000]"
            onClick={() => setShowCommentsModal(false)}
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
                  onClick={() => setShowCommentsModal(false)}
                  className="text-white/70 hover:text-white transition-colors"
                >
                  <span className="text-2xl">&times;</span>
                </button>
              </div>

              <div className="h-64 overflow-y-auto text-white/50 text-center py-8 mb-4">
                No comments yet...
              </div>

              <div className="flex gap-2">
                <textarea
                  placeholder="Add a comment..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="flex-1 p-3 bg-[#024c46] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 resize-none"
                  rows={2}
                />
                <button 
                  onClick={() => {
                    setComment('')
                    alert('Comment added!')
                    setShowCommentsModal(false)
                  }}
                  className="px-6 py-3 bg-green-400 text-black font-semibold rounded-lg hover:bg-green-500 transition-colors"
                >
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

