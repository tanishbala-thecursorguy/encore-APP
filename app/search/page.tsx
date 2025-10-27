'use client'

import { useEffect, useState } from "react"
import { StarsBackground } from "@/components/ui/stars"
import { Search, TrendingUp, Music, Users, Lock, Calendar, ArrowLeft } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { AnimeNavBarDemo } from "@/components/ui/anime-navbar-demo"

export default function SearchPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')
  const [isWhiteTheme, setIsWhiteTheme] = useState(false)

  useEffect(() => {
    const checkTheme = () => {
      if (typeof document !== 'undefined') {
        const htmlClass = document.documentElement.className
        setIsWhiteTheme(htmlClass === 'white-black' || htmlClass === 'white-stars')
      }
    }

    checkTheme()
    window.addEventListener('themechange', checkTheme)
    
    return () => window.removeEventListener('themechange', checkTheme)
  }, [])

  return (
    <StarsBackground className="min-h-screen" starColor={isWhiteTheme ? "#3b82f6" : "#10b981"}>
      <div className={`relative z-10 container mx-auto px-4 py-8 ${isWhiteTheme ? 'bg-white' : ''}`}>
        {/* Header with Back Button */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => router.back()}
            className={`${isWhiteTheme ? 'bg-gray-100 hover:bg-gray-200' : 'bg-[#024c46]/70 hover:bg-[#024c46]'} p-3 rounded-full transition-colors`}
          >
            <ArrowLeft size={20} className={isWhiteTheme ? "text-black" : "text-white"} />
          </button>
          <h1 className={`text-5xl font-bold ${isWhiteTheme ? 'text-black' : 'text-white'}`}>Discover</h1>
        </div>
        
        {/* Search Bar */}
        <div className="relative max-w-2xl mb-8">
          <Search className={`absolute left-4 top-1/2 -translate-y-1/2 ${isWhiteTheme ? 'text-[#3b82f6]' : 'text-[#10b981]'} w-5 h-5`} />
          <input
            type="text"
            placeholder="Search artists, fans, venues..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`w-full pl-12 pr-4 py-4 ${isWhiteTheme ? 'bg-gray-100 border-gray-300 text-black placeholder-gray-500' : 'bg-gray-900/80 border-gray-800 text-white placeholder-gray-400'} backdrop-blur-sm border rounded-2xl focus:outline-none focus:ring-2 ${isWhiteTheme ? 'focus:ring-blue-400' : 'focus:ring-green-400'} transition-all`}
          />
        </div>

        {/* Category Filters */}
        <div className="flex gap-3 mb-12 overflow-x-auto pb-2">
          <button className={`px-6 py-2 ${isWhiteTheme ? 'bg-[#3b82f6] text-white hover:bg-[#2563eb]' : 'bg-[#024c46] text-white hover:bg-[#02665a]'} rounded-full text-sm font-medium whitespace-nowrap transition-colors`}>
            All
          </button>
          <button className={`px-6 py-2 ${isWhiteTheme ? 'bg-gray-200 text-gray-700 hover:bg-gray-300' : 'bg-gray-900/80 text-gray-300 hover:bg-gray-800'} rounded-full text-sm font-medium whitespace-nowrap transition-colors`}>
            Music
          </button>
          <button className={`px-6 py-2 ${isWhiteTheme ? 'bg-gray-200 text-gray-700 hover:bg-gray-300' : 'bg-gray-900/80 text-gray-300 hover:bg-gray-800'} rounded-full text-sm font-medium whitespace-nowrap transition-colors`}>
            Concerts
          </button>
          <button className={`px-6 py-2 ${isWhiteTheme ? 'bg-gray-200 text-gray-700 hover:bg-gray-300' : 'bg-gray-900/80 text-gray-300 hover:bg-gray-800'} rounded-full text-sm font-medium whitespace-nowrap transition-colors`}>
            Events
          </button>
          <button className={`px-6 py-2 ${isWhiteTheme ? 'bg-gray-200 text-gray-700 hover:bg-gray-300' : 'bg-gray-900/80 text-gray-300 hover:bg-gray-800'} rounded-full text-sm font-medium whitespace-nowrap transition-colors`}>
            Communities
          </button>
        </div>

        {/* Trending Now Section */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="w-6 h-6 text-red-500" />
            <h2 className={`text-2xl font-bold ${isWhiteTheme ? 'text-black' : 'text-white'}`}>Trending Now</h2>
          </div>
          
          <div className="flex gap-3 overflow-x-auto pb-2">
            {[
              "Coachella 2025",
              "Live performances",
              "Stadium concerts",
              "Hip hop shows",
              "EDM festivals",
              "Jazz nights",
            ].map((trend, index) => (
              <div
                key={index}
                className={`flex items-center gap-2 ${isWhiteTheme ? 'bg-gray-100' : 'bg-gray-900/60'} backdrop-blur-sm px-4 py-3 rounded-xl whitespace-nowrap min-w-fit`}
              >
                <div className={`w-8 h-8 ${isWhiteTheme ? 'bg-gray-200' : 'bg-gray-800'} rounded-full flex items-center justify-center`}>
                  <span className={`${isWhiteTheme ? 'text-gray-600' : 'text-gray-400'} text-sm`}>#</span>
                </div>
                <span className={`${isWhiteTheme ? 'text-black' : 'text-white'} font-medium`}>{trend}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Trending Artists Section */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="w-6 h-6 text-red-500" />
            <h2 className={`text-2xl font-bold ${isWhiteTheme ? 'text-black' : 'text-white'}`}>Trending Artists</h2>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {artists.map((artist, index) => (
              <div
                key={index}
                className="flex flex-col items-center cursor-pointer group transition-transform hover:scale-105"
              >
                <div className="relative w-full aspect-square mb-3">
                  <Image
                    src={artist.image}
                    alt={artist.name}
                    fill
                    className="object-cover rounded-full"
                  />
                  <div className={`absolute inset-0 rounded-full border-2 border-transparent ${isWhiteTheme ? 'group-hover:border-blue-400' : 'group-hover:border-green-400'} transition-colors`} />
                </div>
                <h3 className={`text-sm font-semibold ${isWhiteTheme ? 'text-black' : 'text-white'} text-center line-clamp-1`}>{artist.name}</h3>
              </div>
            ))}
            {/* More artists button */}
            <div className="flex flex-col items-center cursor-pointer group">
              <div className={`relative w-full aspect-square mb-3 ${isWhiteTheme ? 'bg-gradient-to-br from-blue-200 to-blue-300' : 'bg-gradient-to-br from-[#024c46] to-green-900'} rounded-full flex items-center justify-center`}>
                <span className={`${isWhiteTheme ? 'text-black' : 'text-white'} text-xs font-medium text-center px-4`}>More artists you might like</span>
              </div>
            </div>
          </div>
        </div>

        {/* Top Communities Section */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <Users className={`w-6 h-6 ${isWhiteTheme ? 'text-blue-400' : 'text-green-400'}`} />
            <h2 className={`text-2xl font-bold ${isWhiteTheme ? 'text-black' : 'text-white'}`}>Top Communities</h2>
          </div>
          
          <div className="space-y-4">
            {communities.map((community, index) => (
              <div
                key={index}
                className={`flex items-center gap-4 p-5 ${isWhiteTheme ? 'bg-gray-100 hover:bg-gray-200' : 'bg-gray-900/60 hover:bg-gray-900/80'} backdrop-blur-sm rounded-2xl transition-colors cursor-pointer group`}
              >
                <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                  <div className={`w-full h-full bg-gradient-to-br ${community.gradient}`}>
                    <div className="w-full h-full flex items-center justify-center">
                      <Lock className="w-6 h-6 text-white/60" />
                    </div>
                  </div>
                </div>
                
                <div className="flex-1 min-w-0">
                  <h3 className={`text-lg font-bold ${isWhiteTheme ? 'text-black' : 'text-white'} mb-0.5`}>{community.name}</h3>
                  <p className={`text-sm ${isWhiteTheme ? 'text-gray-600' : 'text-gray-400'} mb-1`}>{community.subtitle}</p>
                  <div className={`flex items-center gap-1 text-xs ${isWhiteTheme ? 'text-gray-600' : 'text-gray-500'}`}>
                    <Users className="w-3 h-3" />
                    <span>{community.members} members</span>
                  </div>
                </div>
                
                <Link href="/community">
                  <button className={`px-6 py-2 ${isWhiteTheme ? 'bg-blue-400 hover:bg-blue-500' : 'bg-gray-800 hover:bg-green-400'} text-white hover:text-black rounded-full text-sm font-medium transition-colors whitespace-nowrap flex items-center gap-2`}>
                    View
                    <span>🚀</span>
                  </button>
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Events Section */}
        <div>
          <div className="flex items-center gap-2 mb-6">
            <Calendar className={`w-6 h-6 ${isWhiteTheme ? 'text-blue-400' : 'text-green-400'}`} />
            <h2 className={`text-2xl font-bold ${isWhiteTheme ? 'text-black' : 'text-white'}`}>Upcoming Events</h2>
          </div>
          
          <div className="space-y-4">
            {events.map((event, index) => (
              <div
                key={index}
                className={`flex items-center gap-4 p-5 ${isWhiteTheme ? 'bg-gray-100 hover:bg-gray-200' : 'bg-gray-900/60 hover:bg-gray-900/80'} backdrop-blur-sm rounded-2xl transition-colors cursor-pointer group`}
              >
                <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                  <div className={`w-full h-full bg-gradient-to-br ${event.gradient}`}>
                    <div className="w-full h-full flex items-center justify-center">
                      <Lock className="w-6 h-6 text-white/60" />
                    </div>
                  </div>
                </div>
                
                <div className="flex-1 min-w-0">
                  <h3 className={`text-lg font-bold ${isWhiteTheme ? 'text-black' : 'text-white'} mb-0.5`}>{event.title}</h3>
                  <p className={`text-sm ${isWhiteTheme ? 'text-gray-600' : 'text-gray-400'} mb-1`}>{event.artist}</p>
                  <div className={`flex items-center gap-3 text-xs ${isWhiteTheme ? 'text-gray-600' : 'text-gray-500'}`}>
                    <span>{event.date} • {event.time}</span>
                    <span>•</span>
                    <Users className="w-3 h-3 inline" />
                    <span>{event.attendees}</span>
                  </div>
                </div>
                
                <button className={`px-6 py-2 ${isWhiteTheme ? 'bg-blue-400 hover:bg-blue-500' : 'bg-gray-800 hover:bg-green-400'} text-white hover:text-black rounded-full text-sm font-medium transition-colors whitespace-nowrap flex items-center gap-2`}>
                  Unlock Access
                  <span>🚀</span>
                </button>
              </div>
            ))}
          </div>
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

const artists = [
  {
    name: "Kendrick Lamar",
    genre: "Hip Hop",
    followers: "2.5M followers",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500&q=80",
  },
  {
    name: "Taylor Swift",
    genre: "Pop",
    followers: "3.2M followers",
    image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=500&q=80",
  },
  {
    name: "Luna Eclipse",
    genre: "Electronic",
    followers: "1.8M followers",
    image: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=500&q=80",
  },
  {
    name: "NEON PULSE",
    genre: "EDM",
    followers: "2.1M followers",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&q=80",
  },
  {
    name: "The Vortex",
    genre: "Rock",
    followers: "1.5M followers",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500&q=80",
  },
  {
    name: "Midnight Vibes",
    genre: "Synthwave",
    followers: "950K followers",
    image: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=500&q=80",
  },
]

const communities = [
  {
    name: "Eclipse Crew",
    subtitle: "Luna Eclipse",
    members: "156K",
    gradient: "from-green-900/40 to-green-700/20",
  },
  {
    name: "NEON Tribe",
    subtitle: "NEON PULSE",
    members: "98K",
    gradient: "from-blue-900/40 to-purple-700/20",
  },
  {
    name: "Vortex Society",
    subtitle: "The Vortex",
    members: "234K",
    gradient: "from-cyan-900/40 to-blue-700/20",
  },
]

const events = [
  {
    title: "Luna's Midnight Release Party",
    artist: "Luna Eclipse",
    date: "Oct 25, 2025",
    time: "11:00 PM EST",
    attendees: "12.5K",
    gradient: "from-purple-900/40 to-pink-700/20",
  },
  {
    title: "NEON's Virtual Rave",
    artist: "NEON PULSE",
    date: "Oct 30, 2025",
    time: "9:00 PM EST",
    attendees: "8.9K",
    gradient: "from-blue-900/40 to-cyan-700/20",
  },
]
