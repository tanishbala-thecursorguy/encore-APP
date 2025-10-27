"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Play, Pause } from 'lucide-react'

interface WaveformPlayerProps {
  audioSrc: string
  width?: number
  height?: number
  className?: string
}

export default function WaveformPlayer({
  audioSrc,
  width = 400,
  height = 40,
  className,
}: WaveformPlayerProps) {
  const [audio] = React.useState(() => typeof Audio !== 'undefined' ? new Audio(audioSrc) : null)
  const [isPlaying, setIsPlaying] = React.useState(false)
  const [progress, setProgress] = React.useState(0)
  const [heights, setHeights] = React.useState<number[]>([])

  // Generate fixed heights on mount to prevent hydration mismatch
  React.useEffect(() => {
    setHeights(Array.from({ length: 50 }, () => 10 + Math.random() * 30))
  }, [])

  React.useEffect(() => {
    if (!audio) return

    const handleTimeUpdate = () => {
      setProgress((audio.currentTime / audio.duration) * 100)
    }

    const handleEnded = () => {
      setIsPlaying(false)
      setProgress(0)
    }

    audio.addEventListener("timeupdate", handleTimeUpdate)
    audio.addEventListener("ended", handleEnded)
    
    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate)
      audio.removeEventListener("ended", handleEnded)
      audio.pause()
    }
  }, [audio])

  const togglePlay = () => {
    if (!audio) return
    if (isPlaying) {
      audio.pause()
    } else {
      audio.play()
    }
    setIsPlaying(!isPlaying)
  }

  const handleSeek = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!audio) return
    const rect = e.currentTarget.getBoundingClientRect()
    const clickX = e.clientX - rect.left
    const seekTime = (clickX / rect.width) * audio.duration
    audio.currentTime = seekTime
  }

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <button
        onClick={togglePlay}
        className="flex-shrink-0 w-10 h-10 rounded-full bg-green-400 hover:bg-green-500 flex items-center justify-center transition-colors"
      >
        {isPlaying ? (
          <Pause size={18} className="text-black" />
        ) : (
          <Play size={18} className="text-black ml-0.5" />
        )}
      </button>

      <div
        className="relative w-full rounded-md cursor-pointer overflow-hidden"
        style={{ height: `${height}px` }}
        onClick={handleSeek}
      >
        {/* Background wave */}
        <div className="absolute inset-0 flex justify-between items-center px-0.5">
          {heights.map((waveHeight, idx) => (
            <div
              key={idx}
              className="rounded-sm bg-gray-700"
              style={{
                width: 2,
                height: `${waveHeight}px`,
              }}
            />
          ))}
        </div>

        {/* Progress overlay */}
        <div
          className="absolute top-0 left-0 h-full bg-green-400"
          style={{
            width: `${progress}%`,
          }}
        />
      </div>
    </div>
  )
}

