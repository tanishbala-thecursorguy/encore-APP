'use client'

import { useState } from 'react'
import { Search, TrendingUp, Music, Users, Lock, Calendar } from 'lucide-react'
import { StarsBackground } from '@/components/ui/stars'
import Link from 'next/link'

export default function SearchPage() {
  return (
    <StarsBackground starColor="#10b981" className="min-h-screen text-white">
      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-5xl font-bold text-white mb-6">Discover</h1>
          
          {/* Search Bar */}
          <div className="relative max-w-2xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#10b981] w-5 h-5" />
            <input
              type="text"
              placeholder="Search artists, fans, venues..."
              className="w-full pl-12 pr-4 py-4 bg-gray-900/80 backdrop-blur-sm border border-gray-800 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#10b981] transition-all"
            />
          </div>

          {/* Category Filters */}
          <div className="flex gap-3 mt-4 overflow-x-auto pb-2">
            <button className="px-6 py-2 bg-[#10b981] text-white rounded-full text-sm font-medium whitespace-nowrap">
              All
            </button>
            <button className="px-6 py-2 bg-gray-900/80 text-gray-300 rounded-full text-sm font-medium whitespace-nowrap hover:bg-gray-800 transition-colors">
              Music
            </button>
            <button className="px-6 py-2 bg-gray-900/80 text-gray-300 rounded-full text-sm font-medium whitespace-nowrap hover:bg-gray-800 transition-colors">
              Concerts
            </button>
            <button className="px-6 py-2 bg-gray-900/80 text-gray-300 rounded-full text-sm font-medium whitespace-nowrap hover:bg-gray-800 transition-colors">
              Events
            </button>
            <button className="px-6 py-2 bg-gray-900/80 text-gray-300 rounded-full text-sm font-medium whitespace-nowrap hover:bg-gray-800 transition-colors">
              Communities
            </button>
          </div>
        </div>

        {/* Trending Now Section */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="w-6 h-6 text-red-500" />
            <h2 className="text-2xl font-bold text-white">Trending Now</h2>
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
                className="flex items-center gap-2 bg-gray-900/60 backdrop-blur-sm px-4 py-3 rounded-xl whitespace-nowrap min-w-fit"
              >
                <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center">
                  <span className="text-gray-400 text-sm">#</span>
                </div>
                <span className="text-white font-medium">{trend}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Trending Artists Section */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="w-6 h-6 text-red-500" />
            <h2 className="text-2xl font-bold text-white">Trending Artists</h2>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {artists.map((artist, index) => (
              <div
                key={index}
                className="flex flex-col items-center cursor-pointer group transition-transform hover:scale-105"
              >
                <div className="relative w-full aspect-square mb-3 overflow-hidden rounded-full">
                  <img
                    src={artist.image}
                    alt={artist.name}
                    className="object-cover w-full h-full"
                  />
                  <div className="absolute inset-0 rounded-full border-2 border-transparent group-hover:border-[#10b981] transition-colors" />
                </div>
                <h3 className="text-sm font-semibold text-white text-center line-clamp-1">{artist.name}</h3>
              </div>
            ))}
            {/* More artists button */}
            <div className="flex flex-col items-center cursor-pointer group">
              <div className="relative w-full aspect-square mb-3 bg-gradient-to-br from-[#10b981] to-green-900 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-medium text-center px-4">More artists you might like</span>
              </div>
            </div>
          </div>
        </div>

        {/* Top Communities Section */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <Users className="w-6 h-6 text-[#10b981]" />
            <h2 className="text-2xl font-bold text-white">Top Communities</h2>
          </div>
          
          <div className="space-y-4">
            {communities.map((community, index) => (
              <div
                key={index}
                className="flex items-center gap-4 p-5 bg-gray-900/60 backdrop-blur-sm rounded-2xl hover:bg-gray-900/80 transition-colors cursor-pointer group"
              >
                <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                  <div className={`w-full h-full bg-gradient-to-br ${community.gradient}`}>
                    <div className="w-full h-full flex items-center justify-center">
                      <Lock className="w-6 h-6 text-white/60" />
                    </div>
                  </div>
                </div>
                
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-bold text-white mb-0.5">{community.name}</h3>
                  <p className="text-sm text-gray-400 mb-1">{community.subtitle}</p>
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <Users className="w-3 h-3" />
                    <span>{community.members} members</span>
                  </div>
                </div>
                
                <button className="px-6 py-2 bg-gray-800 hover:bg-[#10b981] text-white rounded-full text-sm font-medium transition-colors whitespace-nowrap flex items-center gap-2">
                  Unlock
                  <span>🚀</span>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Events Section */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <Calendar className="w-6 h-6 text-[#10b981]" />
            <h2 className="text-2xl font-bold text-white">Upcoming Events</h2>
          </div>
          
          <div className="space-y-4">
            {events.map((event, index) => (
              <div
                key={index}
                className="flex items-center gap-4 p-5 bg-gray-900/60 backdrop-blur-sm rounded-2xl hover:bg-gray-900/80 transition-colors cursor-pointer group"
              >
                <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                  <div className={`w-full h-full bg-gradient-to-br ${event.gradient}`}>
                    <div className="w-full h-full flex items-center justify-center">
                      <Lock className="w-6 h-6 text-white/60" />
                    </div>
                  </div>
                </div>
                
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-bold text-white mb-0.5">{event.title}</h3>
                  <p className="text-sm text-gray-400 mb-1">{event.artist}</p>
                  <div className="flex items-center gap-3 text-xs text-gray-500">
                    <span>{event.date} • {event.time}</span>
                    <span>•</span>
                    <Users className="w-3 h-3 inline" />
                    <span>{event.attendees}</span>
                  </div>
                </div>
                
                <button className="px-6 py-2 bg-gray-800 hover:bg-[#10b981] text-white rounded-full text-sm font-medium transition-colors whitespace-nowrap flex items-center gap-2">
                  Unlock Access
                  <span>🚀</span>
                </button>
              </div>
            ))}
          </div>
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
