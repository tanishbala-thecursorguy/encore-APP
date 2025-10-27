'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Settings, 
  Share2, 
  Music2, 
  Video, 
  Image as ImageIcon, 
  Calendar,
  Users,
  MapPin,
  Camera,
  Edit2,
  Heart,
  MessageCircle,
  Share,
  Bookmark,
  ArrowLeft,
  MoreVertical
} from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { StarsBackground } from '@/components/ui/stars'
import { AnimeNavBarDemo } from '@/components/ui/anime-navbar-demo'
import Link from 'next/link'

const tabs = ['Posts', 'Reels', 'Tagged']

const profilePosts = [
  {
    id: 1,
    type: 'image',
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&h=400&fit=crop',
    likes: 234,
    comments: 45
  },
  {
    id: 2,
    type: 'image',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop',
    likes: 189,
    comments: 32
  },
  {
    id: 3,
    type: 'image',
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=400&fit=crop',
    likes: 456,
    comments: 67
  },
  {
    id: 4,
    type: 'image',
    image: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=400&h=400&fit=crop',
    likes: 312,
    comments: 89
  },
  {
    id: 5,
    type: 'image',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    likes: 567,
    comments: 123
  },
  {
    id: 6,
    type: 'image',
    image: 'https://images.unsplash.com/photo-1507874457470-272b3c8d8ee2?w=400&h=400&fit=crop',
    likes: 198,
    comments: 34
  },
]

export default function ProfilePage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('Posts')

  return (
    <StarsBackground className="min-h-screen" starColor="#10b981">
      <div className="text-white pb-24">
        {/* Header with Back Button */}
        <div className="sticky top-0 bg-black/80 backdrop-blur-lg border-b border-white/10 z-50 px-4 py-3 flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="p-2 hover:bg-gray-800 rounded-full transition-colors"
          >
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-xl font-bold">Profile</h1>
          <div className="ml-auto flex gap-2">
            <button className="p-2 hover:bg-gray-800 rounded-full transition-colors">
              <Share2 size={24} />
            </button>
            <button className="p-2 hover:bg-gray-800 rounded-full transition-colors">
              <MoreVertical size={24} />
            </button>
          </div>
        </div>

        {/* Profile Header */}
        <div className="px-6 py-6 space-y-4">
          {/* Profile Info */}
          <div className="flex items-start gap-6">
            {/* Avatar */}
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center">
                <span className="text-3xl">👤</span>
              </div>
              <button className="absolute bottom-0 right-0 bg-black border-2 border-green-400 p-2 rounded-full hover:bg-green-400 transition-colors">
                <Camera size={16} />
              </button>
            </div>

            {/* Stats */}
            <div className="flex-1 flex items-center justify-around">
              <div className="text-center">
                <p className="text-2xl font-bold">120</p>
                <p className="text-sm text-gray-400">Posts</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold">2.4K</p>
                <p className="text-sm text-gray-400">Followers</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold">890</p>
                <p className="text-sm text-gray-400">Following</p>
              </div>
            </div>
          </div>

          {/* Bio */}
          <div className="space-y-2">
            <h2 className="text-lg font-bold">Encore Music</h2>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <Music2 size={16} />
              <span>Artist</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <MapPin size={16} />
              <span>Los Angeles, CA</span>
            </div>
            <p className="text-sm text-gray-200 mt-2">
              Creating vibes and sharing music ✨🎵
            </p>
            <div className="flex flex-wrap gap-1 mt-2">
              <span className="text-xs bg-green-400/20 text-green-400 px-2 py-1 rounded-full">#music</span>
              <span className="text-xs bg-green-400/20 text-green-400 px-2 py-1 rounded-full">#artist</span>
              <span className="text-xs bg-green-400/20 text-green-400 px-2 py-1 rounded-full">#vibes</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1 bg-green-400 text-black font-semibold py-2.5 rounded-lg hover:bg-green-500 transition-colors"
            >
              Follow
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-4 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
            >
              <Edit2 size={20} />
            </motion.button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-t border-white/10">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-4 text-sm font-medium relative ${
                activeTab === tab ? 'text-white' : 'text-gray-400'
              }`}
            >
              {tab}
              {activeTab === tab && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-green-400"
                />
              )}
            </button>
          ))}
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-3 gap-1 p-1">
          {profilePosts.map((post) => (
            <motion.div
              key={post.id}
              whileHover={{ scale: 0.95 }}
              className="relative aspect-square cursor-pointer group"
            >
              <Image
                src={post.image}
                alt="Post"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                <div className="flex items-center gap-6 text-white">
                  <div className="flex items-center gap-1">
                    <Heart size={20} />
                    <span className="font-semibold">{post.likes}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageCircle size={20} />
                    <span className="font-semibold">{post.comments}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom Navigation Bar with Anime Mascot */}
      <div className="fixed bottom-0 left-0 right-0 z-[9999] pointer-events-none bg-black pb-3">
        <div className="flex justify-center pointer-events-auto">
          <AnimeNavBarDemo />
        </div>
      </div>
    </StarsBackground>
  )
}

