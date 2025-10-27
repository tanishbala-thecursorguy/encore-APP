'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function EntryPage() {
  const router = useRouter()

  useEffect(() => {
    // Check if user has seen the loading animation before
    const hasSeenLoading = sessionStorage.getItem('hasSeenLoading')
    
    if (!hasSeenLoading) {
      // First time - show loading animation
      router.push('/loading')
    } else {
      // Already seen it - go directly to home
      router.push('/home')
    }
  }, [router])

  return null
}

