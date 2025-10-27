'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  MessageSquare, 
  Bell, 
  AlertCircle, 
  CheckCircle, 
  Users, 
  ChevronRight,
  Star,
  Plus,
  UserPlus,
  MoreVertical,
  TrendingUp,
  ArrowLeft,
  Copy,
  Video,
  Trophy,
  ShoppingCart
} from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { AnimeNavBarDemo } from '@/components/ui/anime-navbar-demo'

const communities = [
  { id: 1, name: 'KickScope', logo: '🎯', rating: 0, online: 1, color: 'red', tagline: 'KICKSCOPE' },
  { id: 2, name: 'Learn German', logo: '🇩🇪', rating: 0, online: 1, color: 'orange', tagline: 'Deutsch lernen' },
  { id: 3, name: 'Avelior', logo: '🤖', rating: 4.9, online: 1250, color: 'blue', tagline: 'AI Community' },
  { id: 4, name: 'GOB Agency', logo: '🚀', rating: 4.7, online: 750, color: 'yellow', tagline: 'Build Together' },
]

const channels = [
  { name: 'Announcements', icon: Bell, subItems: [] },
  { name: 'Livestreams', icon: Video, subItems: [] },
]

const chatChannels = [
  { name: 'Chat DE', icon: MessageSquare, color: 'orange' },
  { name: 'Chat EN', icon: MessageSquare, color: 'orange' },
  { name: 'Wins', icon: Trophy, color: 'yellow' },
]

const integrations = [
  { name: 'Discord Free', icon: '💜', logo: '💜' },
]

const playChannels = [
  { name: 'KickScope Wheel', icon: '🎰', color: 'red' },
]

export default function WhopStylePage() {
  const router = useRouter()
  const [selectedCommunity, setSelectedCommunity] = useState(communities[0])
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({})
  const [activeTab, setActiveTab] = useState('Recent activity')

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  return (
    <div className="flex h-screen bg-black text-white overflow-hidden">
      {/* Left Sidebar - Communities */}
      <div className="w-16 border-r border-gray-800 bg-black flex flex-col items-center py-4 gap-3 fixed left-0 top-0 bottom-0 z-30">
        {communities.map((community) => (
          <motion.button
            key={community.id}
            onClick={() => setSelectedCommunity(community)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className={`relative w-12 h-12 rounded-lg flex items-center justify-center text-xl transition-all ${
              selectedCommunity.id === community.id
                ? 'bg-gray-900 border-2 border-white'
                : 'hover:bg-gray-900'
            }`}
          >
            {community.logo}
            {selectedCommunity.id === community.id && (
              <div className="absolute -left-1 w-1 h-8 bg-white rounded-full" />
            )}
          </motion.button>
        ))}
        
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="w-12 h-12 rounded-lg bg-gray-900 hover:bg-gray-800 flex items-center justify-center text-white mt-2"
        >
          <Plus size={24} />
        </motion.button>
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-16 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-gray-800">
          <div className="flex items-center gap-4 mb-4">
            <ArrowLeft 
              size={20} 
              className="cursor-pointer hover:text-green-400 transition-colors"
              onClick={() => router.push('/')}
            />
            <div className="w-12 h-12 rounded-lg bg-gray-900 flex items-center justify-center text-2xl">
              {selectedCommunity.logo}
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold">{selectedCommunity.name}</h2>
              <div className="flex items-center gap-3 text-sm text-gray-400 mt-1">
                <div className="flex items-center gap-1">
                  <Star size={14} className="fill-yellow-400 text-yellow-400" />
                  <span>0,00 (0)</span>
                </div>
                <div className="flex items-center gap-1 text-green-400">
                  <div className="w-2 h-2 bg-green-400 rounded-full" />
                  <span>1 online</span>
                </div>
              </div>
            </div>
            <MoreVertical className="text-gray-400 hover:text-white cursor-pointer" />
          </div>

          {/* Tagline */}
          <div className={`text-4xl font-black ${selectedCommunity.color === 'red' ? 'text-red-500' : selectedCommunity.color === 'orange' ? 'text-orange-500' : 'text-green-400'}`}>
            {selectedCommunity.tagline}
          </div>

          {/* Copy Link Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="mt-4 w-full bg-gray-800 hover:bg-gray-700 text-white px-4 py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors"
          >
            <Copy size={18} />
            Copy link
          </motion.button>
        </div>

        {/* Expandable Sections */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-2">
          {/* Support */}
          <div className="border border-gray-800 rounded-lg overflow-hidden">
            <button
              onClick={() => toggleSection('support')}
              className="w-full flex items-center justify-between p-4 hover:bg-gray-900 transition-colors"
            >
              <span className="font-semibold">Support</span>
              <ChevronRight 
                size={20} 
                className={`text-gray-400 transition-transform ${expandedSections.support ? 'rotate-90' : ''}`}
              />
            </button>
            {expandedSections.support && (
              <div className="p-4 bg-gray-900/50">
                <button className="w-full flex items-center gap-3 text-left hover:text-green-400 transition-colors">
                  <Bell size={18} />
                  <span>Start support chat</span>
                </button>
              </div>
            )}
          </div>

          {/* Rate this community */}
          <div className="border border-gray-800 rounded-lg overflow-hidden">
            <button
              onClick={() => toggleSection('rate')}
              className="w-full flex items-center justify-between p-4 hover:bg-gray-900 transition-colors"
            >
              <span className="font-semibold">Rate this community</span>
              <ChevronRight 
                size={20} 
                className={`text-gray-400 transition-transform ${expandedSections.rate ? 'rotate-90' : ''}`}
              />
            </button>
            {expandedSections.rate && (
              <div className="p-4 bg-gray-900/50 flex items-center gap-2">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={20} className="text-gray-400" />
                  ))}
                </div>
                <span className="text-sm text-gray-400">0 ratings</span>
              </div>
            )}
          </div>

          {/* Home / Channels */}
          <div className="border border-gray-800 rounded-lg overflow-hidden">
            <button
              onClick={() => toggleSection('home')}
              className="w-full flex items-center justify-between p-4 hover:bg-gray-900 transition-colors"
            >
              <span className="font-semibold">Home</span>
              <ChevronRight 
                size={20} 
                className={`text-gray-400 transition-transform ${expandedSections.home ? 'rotate-90' : ''}`}
              />
            </button>
            {expandedSections.home && (
              <div className="bg-gray-900/50 space-y-1">
                {channels.map((channel) => (
                  <button
                    key={channel.name}
                    className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-800 transition-colors"
                  >
                    <channel.icon size={18} />
                    <span>{channel.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Chat */}
          <div className="border border-gray-800 rounded-lg overflow-hidden">
            <button
              onClick={() => toggleSection('chat')}
              className="w-full flex items-center justify-between p-4 hover:bg-gray-900 transition-colors"
            >
              <span className="font-semibold">Chat</span>
              <ChevronRight 
                size={20} 
                className={`text-gray-400 transition-transform ${expandedSections.chat ? 'rotate-90' : ''}`}
              />
            </button>
            {expandedSections.chat && (
              <div className="bg-gray-900/50 space-y-1">
                {chatChannels.map((channel) => (
                  <button
                    key={channel.name}
                    className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-800 transition-colors"
                  >
                    <MessageSquare size={18} className={channel.color === 'orange' ? 'text-orange-400' : 'text-yellow-400'} />
                    <span>{channel.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Integrations */}
          <div className="border border-gray-800 rounded-lg overflow-hidden">
            <button
              onClick={() => toggleSection('integrations')}
              className="w-full flex items-center justify-between p-4 hover:bg-gray-900 transition-colors"
            >
              <span className="font-semibold">Integrations</span>
              <ChevronRight 
                size={20} 
                className={`text-gray-400 transition-transform ${expandedSections.integrations ? 'rotate-90' : ''}`}
              />
            </button>
            {expandedSections.integrations && (
              <div className="bg-gray-900/50 space-y-1">
                {integrations.map((integration) => (
                  <button
                    key={integration.name}
                    className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-800 transition-colors"
                  >
                    <span className="text-2xl">{integration.logo}</span>
                    <span>{integration.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Play / Games */}
          <div className="border border-gray-800 rounded-lg overflow-hidden">
            <button
              onClick={() => toggleSection('play')}
              className="w-full flex items-center justify-between p-4 hover:bg-gray-900 transition-colors"
            >
              <span className="font-semibold">Play</span>
              <ChevronRight 
                size={20} 
                className={`text-gray-400 transition-transform ${expandedSections.play ? 'rotate-90' : ''}`}
              />
            </button>
            {expandedSections.play && (
              <div className="bg-gray-900/50 space-y-1">
                {playChannels.map((channel) => (
                  <button
                    key={channel.name}
                    className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-800 transition-colors"
                  >
                    <span className="text-2xl">{channel.icon}</span>
                    <span>{channel.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Navigation Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-[9999] pointer-events-none bg-black pb-3">
        <div className="flex justify-center pointer-events-auto">
          <AnimeNavBarDemo />
        </div>
      </div>
    </div>
  )
}
