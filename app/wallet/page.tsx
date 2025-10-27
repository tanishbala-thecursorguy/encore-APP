'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, ArrowDown, Gift, ArrowUpLeft, ArrowDownRight, Settings, ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { StarsBackground } from '@/components/ui/stars'
import { AnimeNavBarDemo } from '@/components/ui/anime-navbar-demo'

const bonusTiers = [
  { amount: '$5', bonus: '10% Bonus XP' },
  { amount: '$20', bonus: '15% Bonus XP' },
  { amount: '$50', bonus: '20% Bonus XP + Exclusive Badge' },
  { amount: '$100', bonus: '30% Bonus XP + Premium Access' },
]

const recentActivity = [
  { type: 'Added Funds', date: 'Oct 27, 2025 • 9:43 AM', amount: '+$50.00', icon: ArrowDownRight },
  { type: 'Tip to Artist', date: 'Oct 26, 2025 • 2:15 PM', amount: '-$10.00', icon: ArrowUpLeft },
  { type: 'Bonus Claimed', date: 'Oct 25, 2025 • 11:30 AM', amount: '+$5.00', icon: Gift },
]

export default function WalletPage() {
  const router = useRouter()
  const [balance] = useState('0.00')

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
          <h1 className="text-2xl font-bold">Wallet</h1>
          <button className="p-2 hover:bg-gray-800 rounded-full transition-colors ml-auto">
            <Settings size={24} />
          </button>
        </div>

        <div className="px-6 pt-6 space-y-6">
          {/* Subtitle */}
          <p className="text-gray-400 text-sm">Manage your funds and support artists</p>

          {/* Balance Section */}
          <div className="text-center space-y-4 py-6">
            <p className="text-gray-400 text-sm">Available Balance</p>
            <h2 className="text-5xl font-bold text-white">${balance}</h2>
            
            <div className="flex gap-3 mt-6">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 bg-green-400 text-black font-semibold py-3 rounded-xl hover:bg-green-500 transition-colors flex items-center justify-center gap-2"
              >
                <Plus size={20} />
                Add Funds
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 bg-gray-800 hover:bg-gray-700 text-white font-semibold py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                <ArrowDown size={20} />
                Withdraw
              </motion.button>
            </div>
          </div>

          {/* Bonus Tiers */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 mb-4">
              <Gift size={20} className="text-green-400" />
              <h3 className="text-lg font-semibold">Bonus Tiers</h3>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              {bonusTiers.map((tier, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.02 }}
                  className="bg-gray-900/50 border border-gray-800 rounded-xl p-4 hover:border-green-400 transition-colors"
                >
                  <p className="text-xl font-bold text-white">{tier.amount}</p>
                  <p className="text-sm text-gray-400 mt-1">{tier.bonus}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Recent Activity</h3>
            
            <div className="space-y-3">
              {recentActivity.map((activity, index) => {
                const Icon = activity.icon
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-3 bg-gray-900/50 border border-gray-800 rounded-xl p-4 hover:bg-gray-900/70 transition-colors"
                  >
                    <div className="bg-green-400/20 p-2 rounded-lg">
                      <Icon size={20} className="text-green-400" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-white">{activity.type}</p>
                      <p className="text-sm text-gray-400">{activity.date}</p>
                    </div>
                    <p className={`font-bold ${activity.amount.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                      {activity.amount}
                    </p>
                  </motion.div>
                )
              })}
            </div>
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

