'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function EntryPage() {
  const router = useRouter()
  const [shouldRedirect, setShouldRedirect] = useState(false)

  useEffect(() => {
    // Check if user has seen the loading animation before
    const hasSeenLoading = sessionStorage.getItem('hasSeenLoading')
    
    if (!hasSeenLoading) {
      // First time - show loading animation
      router.push('/loading')
    } else {
      // Already seen it - go directly to home
      setShouldRedirect(true)
      router.push('/home')
    }
  }, [router])

  useEffect(() => {
    // Mark as seen after a short delay
    if (shouldRedirect) {
      sessionStorage.setItem('hasSeenLoading', 'true')
    }
  }, [shouldRedirect])

  return <div className="min-h-screen bg-black flex items-center justify-center">
    <div className="text-green-400 text-4xl font-bold animate-pulse">Loading...</div>
  </div>
}
