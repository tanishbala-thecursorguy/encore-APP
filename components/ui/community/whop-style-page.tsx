'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  MessageSquare, 
  Bell, 
  AlertCircle, 
  CheckCircle, 
  Users, 
  Video, 
  Image as ImageIcon, 
  Newspaper,
  Star,
  Plus,
  UserPlus,
  MoreVertical,
  TrendingUp,
  ArrowLeft
} from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

const communities = [
  { id: 1, name: 'Avelior', logo: '🤖', rating: 4.9, online: 1250 },
  { id: 2, name: 'Encore', logo: '🎵', rating: 4.8, online: 980 },
  { id: 3, name: 'GOB Agency', logo: '🚀', rating: 4.7, online: 750 },
  { id: 4, name: 'Builders Club', logo: '🏗️', rating: 4.9, online: 1100 },
  { id: 5, name: 'Creators Lounge', logo: '✨', rating: 4.6, online: 890 },
  { id: 6, name: 'Alpha Chat', logo: '💬', rating: 4.8, online: 650 },
]

const channels = [
  { name: 'Chat', icon: MessageSquare, unread: 3 },
  { name: 'Announcements', icon: Bell, unread: 1 },
  { name: 'Feedback', icon: AlertCircle, unread: 0 },
  { name: 'Wins', icon: CheckCircle, unread: 0 },
  { name: 'Discussion', icon: Users, unread: 5 },
]

const tabs = ['Chat', 'Feed', 'News', 'Videos', 'Pictures']

const mockPosts = [
  {
    id: 1,
    username: 'dj_wave',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    time: '2h',
    content: 'Just dropped a new track! Check it out 🎧',
    likes: 234,
    comments: 45,
    type: 'text'
  },
  {
    id: 2,
    username: 'encore_music',
    avatar: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=100&h=100&fit=crop',
    time: '5h',
    content: 'Live performance tonight at 8pm EST',
    likes: 189,
    comments: 32,
    type: 'text'
  },
  {
    id: 3,
    username: 'producer_life',
    avatar: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=100&h=100&fit=crop',
    time: '1d',
    content: 'New studio setup complete! 🎹',
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&h=600&fit=crop',
    likes: 456,
    comments: 67,
    type: 'image'
  },
]

export default function WhopStylePage() {
  const router = useRouter()
  const [selectedCommunity, setSelectedCommunity] = useState(communities[1])
  const [selectedChannel, setSelectedChannel] = useState(channels[0])
  const [activeTab, setActiveTab] = useState('Chat')

  return (
    <div className="flex h-screen bg-black text-white overflow-hidden">
      {/* Left Sidebar */}
      <div className="w-20 border-r border-[#01302E]/30 bg-black/50 backdrop-blur-sm flex flex-col items-center py-6 gap-4 fixed left-0 top-0 bottom-0">
        {communities.map((community) => (
          <motion.button
            key={community.id}
            onClick={() => setSelectedCommunity(community)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className={`relative w-14 h-14 rounded-full flex items-center justify-center text-2xl transition-all ${
              selectedCommunity.id === community.id
                ? 'bg-[#01302E] border-2 border-green-400 shadow-lg shadow-green-400/20'
                : 'bg-gray-900 hover:bg-gray-800 border border-gray-700'
            }`}
          >
            {community.logo}
            {selectedCommunity.id === community.id && (
              <motion.div
                layoutId="communityIndicator"
                className="absolute -bottom-1 w-8 h-1 bg-green-400 rounded-full"
              />
            )}
          </motion.button>
        ))}
        
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="w-14 h-14 rounded-full bg-[#01302E] border-2 border-green-400/30 flex items-center justify-center text-green-400 hover:border-green-400 transition-all"
        >
          <Plus size={24} />
        </motion.button>
      </div>

      {/* Middle Panel */}
      <div className="w-80 border-r border-[#01302E]/30 bg-black/50 backdrop-blur-sm flex flex-col overflow-hidden fixed left-20 top-0 bottom-0">
        {/* Community Header */}
        <div className="p-6 space-y-4 border-b border-[#01302E]/30">
          <div className="flex items-center gap-2">
            <ArrowLeft 
              size={20} 
              className="cursor-pointer hover:text-green-400 transition-colors"
              onClick={() => router.push('/')}
            />
            <h2 className="text-2xl font-bold">{selectedCommunity.name}</h2>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 text-yellow-400">
              <Star size={18} className="fill-yellow-400" />
              <span className="text-sm">{selectedCommunity.rating}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full" />
              <span className="text-sm text-gray-400">{selectedCommunity.online} online</span>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-[#01302E] hover:bg-[#024c46] text-white px-4 py-2.5 rounded-xl font-semibold flex items-center justify-center gap-2 transition-colors"
          >
            <UserPlus size={18} />
            Invite Members
          </motion.button>
        </div>

        {/* Support Section */}
        <div className="p-6 border-b border-[#01302E]/30">
          <h3 className="text-xs font-semibold text-gray-400 uppercase mb-3">Support</h3>
          <div className="space-y-2">
            <button className="w-full text-left px-3 py-2 hover:bg-[#01302E]/20 rounded-lg transition-colors">
              Support Chat
            </button>
            <button className="w-full text-left px-3 py-2 hover:bg-[#01302E]/20 rounded-lg transition-colors">
              Rate this community
            </button>
          </div>
        </div>

        {/* Channels */}
        <div className="flex-1 overflow-y-auto p-6 space-y-2">
          <h3 className="text-xs font-semibold text-gray-400 uppercase mb-3">Community Channels</h3>
          {channels.map((channel) => (
            <motion.button
              key={channel.name}
              onClick={() => setSelectedChannel(channel)}
              whileHover={{ x: 4 }}
              className={`w-full text-left px-3 py-2.5 rounded-lg transition-colors flex items-center justify-between ${
                selectedChannel.name === channel.name
                  ? 'bg-[#01302E] text-green-400'
                  : 'hover:bg-gray-900'
              }`}
            >
              <div className="flex items-center gap-2">
                <channel.icon size={18} />
                <span>{channel.name}</span>
              </div>
              {channel.unread > 0 && (
                <span className="bg-green-400 text-black text-xs px-2 py-0.5 rounded-full font-bold">
                  {channel.unread}
                </span>
              )}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Right Feed Panel */}
      <div className="flex-1 ml-[400px] flex flex-col overflow-hidden">
        {/* Tabs */}
        <div className="flex items-center gap-1 px-6 pt-6 border-b border-[#01302E]/30">
          {tabs.map((tab) => (
            <motion.button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`relative px-4 py-3 text-sm font-medium transition-colors ${
                activeTab === tab ? 'text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              {tab}
              {activeTab === tab && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-green-400"
                />
              )}
            </motion.button>
          ))}
        </div>

        {/* Feed Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {mockPosts.map((post) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-[#01302E]/10 backdrop-blur-sm border border-[#01302E]/30 rounded-2xl p-5 hover:bg-[#01302E]/20 transition-all"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                  <Image
                    src={post.avatar}
                    alt={post.username}
                    width={48}
                    height={48}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-semibold">{post.username}</span>
                    <span className="text-xs text-gray-400">{post.time}</span>
                    <MoreVertical size={16} className="text-gray-500 ml-auto" />
                  </div>
                  
                  <p className="text-gray-200 mb-3">{post.content}</p>
                  
                  {post.type === 'image' && (
                    <div className="w-full h-64 rounded-xl overflow-hidden mb-3">
                      <Image
                        src={post.image}
                        alt="Post"
                        width={600}
                        height={400}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  
                  <div className="flex items-center gap-6 text-gray-400">
                    <button className="flex items-center gap-2 hover:text-green-400 transition-colors">
                      <TrendingUp size={18} />
                      <span className="text-sm">{post.likes}</span>
                    </button>
                    <button className="flex items-center gap-2 hover:text-green-400 transition-colors">
                      <MessageSquare size={18} />
                      <span className="text-sm">{post.comments}</span>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom Navigation Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-[9999] pointer-events-none bg-black pb-3">
        <div className="flex justify-center pointer-events-auto ml-20">
          {/* This will be the nav bar from AnimeNavBarDemo */}
        </div>
      </div>
    </div>
  )
}

