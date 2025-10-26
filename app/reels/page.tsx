'use client'

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Heart, ArrowLeft, Volume2, VolumeX, MessageCircle, Share2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { AnimeNavBarDemo } from "@/components/ui/anime-navbar-demo"

const reels = [
  {
    id: 1,
    videoUrl: "https://videos.pexels.com/video-files/856998/856998-hd_1920_1080_25fps.mp4",
    caption: "Vibes and lights 🎧✨",
    user: "dj_wave",
  },
  {
    id: 2,
    videoUrl: "https://videos.pexels.com/video-files/854959/854959-hd_1920_1080_25fps.mp4",
    caption: "Sound is energy ⚡️",
    user: "encore_music",
  },
  {
    id: 3,
    videoUrl: "https://videos.pexels.com/video-files/856982/856982-hd_1920_1080_25fps.mp4",
    caption: "When the drop hits 🎵",
    user: "live_session",
  },
  {
    id: 4,
    videoUrl: "https://videos.pexels.com/video-files/3843433/3843433-hd_1920_1080_30fps.mp4",
    caption: "Studio vibes 🎹",
    user: "producer_life",
  },
]

export default function ReelsPage() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [liked, setLiked] = useState<number | null>(null)
  const [muted, setMuted] = useState(true)
  const [showComments, setShowComments] = useState(false)
  const router = useRouter()
  const containerRef = useRef<HTMLDivElement>(null)
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])

  const handleScroll = () => {
    const scrollTop = containerRef.current?.scrollTop || 0
    const height = window.innerHeight
    const index = Math.round(scrollTop / height)
    if (index !== currentIndex) {
      setCurrentIndex(index)
    }
  }

  const handleDoubleClick = (index: number) => {
    setLiked(index)
    setTimeout(() => setLiked(null), 1000)
  }

  const handleShare = () => {
    if (typeof window !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href)
      alert('Link copied to clipboard!')
    }
  }

  // Play/pause videos based on current index
  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (video) {
        if (index === currentIndex) {
          video.play()
        } else {
          video.pause()
        }
      }
    })
  }, [currentIndex])

  return (
    <div
      ref={containerRef}
      onScroll={handleScroll}
      className="w-full h-screen overflow-y-scroll snap-y snap-mandatory bg-black relative"
      style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
    >
      {/* Back button */}
      <button
        onClick={() => router.push('/')}
        className="fixed top-6 left-4 z-50 bg-[#024c46]/80 backdrop-blur-sm p-3 rounded-full text-white hover:bg-[#024c46] transition-colors"
      >
        <ArrowLeft size={24} />
      </button>

      {/* Mute/Unmute button */}
      <button
        onClick={() => setMuted(!muted)}
        className="fixed top-6 right-4 z-50 bg-[#024c46]/80 backdrop-blur-sm p-3 rounded-full text-white hover:bg-[#024c46] transition-colors"
      >
        {muted ? <VolumeX size={24} /> : <Volume2 size={24} />}
      </button>

      {reels.map((reel, index) => (
        <div
          key={reel.id}
          onDoubleClick={() => handleDoubleClick(index)}
          className="relative w-full h-screen flex items-center justify-center snap-start snap-always"
        >
          <video
            ref={(el) => {
              videoRefs.current[index] = el
            }}
            src={reel.videoUrl}
            className="absolute inset-0 w-full h-full object-cover"
            loop
            muted={muted}
            playsInline
            preload="metadata"
          />

          {/* Dark overlay for better text visibility */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60" />

          {/* Like animation */}
          <AnimatePresence>
            {liked === index && (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1.5, opacity: 0.9 }}
                exit={{ scale: 2, opacity: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="absolute inset-0 flex items-center justify-center pointer-events-none z-10"
              >
                <Heart size={120} className="text-green-400 fill-green-400" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* User info and caption */}
          <div className="absolute bottom-20 left-4 right-4 text-white space-y-2 z-20">
            <p className="font-bold text-lg">@{reel.user}</p>
            <p className="max-w-xs text-sm text-neutral-200">{reel.caption}</p>
          </div>

          {/* Right side actions */}
          <div className="absolute bottom-32 right-4 flex flex-col gap-6 z-20">
            {/* Like Button */}
            <motion.button
              whileTap={{ scale: 0.8 }}
              onClick={() => handleDoubleClick(index)}
              className="flex flex-col items-center"
            >
              <div className="bg-[#024c46]/60 backdrop-blur-sm p-3 rounded-full">
                <Heart
                  size={28}
                  className={liked === index ? "text-green-400 fill-green-400" : "text-white"}
                />
              </div>
              <span className="text-xs text-white mt-1">49.3K</span>
            </motion.button>

            {/* Comment Button */}
            <motion.button
              whileTap={{ scale: 0.8 }}
              onClick={() => setShowComments(true)}
              className="flex flex-col items-center"
            >
              <div className="bg-[#024c46]/60 backdrop-blur-sm p-3 rounded-full">
                <MessageCircle size={28} className="text-white" />
              </div>
              <span className="text-xs text-white mt-1">200</span>
            </motion.button>

            {/* Share Button */}
            <motion.button
              whileTap={{ scale: 0.8 }}
              onClick={handleShare}
              className="flex flex-col items-center"
            >
              <div className="bg-[#024c46]/60 backdrop-blur-sm p-3 rounded-full">
                <Share2 size={28} className="text-white" />
              </div>
              <span className="text-xs text-white mt-1">934</span>
            </motion.button>
          </div>

          {/* Scroll indicator */}
          {index < reels.length - 1 && (
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/50 text-xs z-20"
            >
              Swipe up
            </motion.div>
          )}
        </div>
      ))}

      {/* Comment Modal */}
      <AnimatePresence>
        {showComments && (
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

      <style jsx>{`
        div::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  )
}

