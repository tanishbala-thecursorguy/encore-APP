'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Bell, Lock, Shield, HelpCircle, Info } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { StarsBackground } from '@/components/ui/stars'
import { AnimeNavBarDemo } from '@/components/ui/anime-navbar-demo'
import Link from 'next/link'

const settings = [
  { id: 'notifications', icon: Bell, title: 'Notifications', desc: 'Manage notification settings' },
  { id: 'privacy', icon: Lock, title: 'Privacy', desc: 'Control your privacy settings' },
  { id: 'security', icon: Shield, title: 'Security', desc: 'Two-factor authentication' },
  { id: 'themes', icon: Bell, title: 'Themes', desc: 'Customize app appearance' },
  { id: 'help', icon: HelpCircle, title: 'Help & Support', desc: 'Get help' },
  { id: 'about', icon: Info, title: 'About', desc: 'Version 1.0.0' },
]

export default function SettingsPage() {
  const router = useRouter()

  return (
    <StarsBackground className="min-h-screen" starColor="#10b981">
      <div className="text-white pb-24">
        {/* Header */}
        <div className="sticky top-0 bg-black/80 backdrop-blur-lg border-b border-white/10 z-50 px-4 py-3 flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="p-2 hover:bg-gray-800 rounded-full transition-colors"
          >
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-xl font-bold">Settings</h1>
        </div>

        {/* Settings List */}
        <div className="px-4 py-6 space-y-2">
          {settings.map((setting, index) => (
            <motion.div
              key={setting.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => {
                if (setting.id === 'themes') {
                  router.push('/themes')
                }
              }}
              className="p-4 rounded-xl bg-gray-900/50 hover:bg-gray-800 cursor-pointer transition-all border border-gray-800"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-green-400/10 flex items-center justify-center">
                  <setting.icon size={24} className="text-green-400" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold">{setting.title}</h3>
                  <p className="text-sm text-gray-400">{setting.desc}</p>
                </div>
                {setting.id === 'themes' && (
                  <span className="text-gray-400">›</span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 z-[9999] pointer-events-none bg-black pb-3">
        <div className="flex justify-center pointer-events-auto">
          <AnimeNavBarDemo />
        </div>
      </div>
    </StarsBackground>
  )
}

