'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function EntryPage() {
  const router = useRouter()

  useEffect(() => {
    // Check if user has seen the loading animation before
    const hasSeenLoading = sessionStorage.getItem('hasSeenLoading')
    
    // Prefetch the target route immediately
    router.prefetch(hasSeenLoading ? '/home' : '/loading')
    
    // Small delay to ensure smooth transition
    const timer = setTimeout(() => {
      if (!hasSeenLoading) {
        router.push('/loading')
      } else {
        router.push('/home')
      }
    }, 10)
    
    return () => clearTimeout(timer)
  }, [router])

  return null
}

