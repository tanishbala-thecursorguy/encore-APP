"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface WaveformPlayerProps {
  audioSrc: string
  width?: number
  height?: number
  className?: string
}

export default function WaveformPlayer({
  audioSrc,
  width = 400,
  height = 60,
  className,
}: WaveformPlayerProps) {
  const [audio] = React.useState(new Audio(audioSrc))
  const [isPlaying, setIsPlaying] = React.useState(false)
  const [progress, setProgress] = React.useState(0)
  const [heights, setHeights] = React.useState<number[]>([])

  // Generate fixed heights on mount to prevent hydration mismatch
  React.useEffect(() => {
    setHeights(Array.from({ length: 40 }, () => 10 + Math.random() * 30))
  }, [])

  React.useEffect(() => {
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
    if (isPlaying) audio.pause()
    else audio.play()
    setIsPlaying(!isPlaying)
  }

  const handleSeek = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const clickX = e.clientX - rect.left
    const seekTime = (clickX / rect.width) * audio.duration
    audio.currentTime = seekTime
  }

  return (
    <div className={cn("flex items-center gap-3 w-full", className)}>
      <Button
        onClick={togglePlay}
        className="flex-shrink-0 w-10 h-10 rounded-full bg-green-400 hover:bg-green-500 flex items-center justify-center transition-colors"
      >
        {isPlaying ? (
          <span className="w-2 h-2 bg-black rounded-full" />
        ) : (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="ml-0.5">
            <path d="M8 5v14l11-7z" />
          </svg>
        )}
      </Button>

      <div
        className="relative w-full rounded-md cursor-pointer overflow-hidden"
        style={{ height: `${height}px` }}
        onClick={handleSeek}
      >
        {/* Background wave */}
        <div className="absolute inset-0 flex justify-between items-center px-0.5">
          {heights.map((waveHeight, idx) => {
            const barPosition = (idx / heights.length) * 100
            const isActive = barPosition <= progress
            
            return (
              <div
                key={idx}
                className={cn(
                  "rounded-sm transition-all duration-150",
                  isActive && isPlaying ? "bg-green-400 shadow-lg shadow-green-400/50" : "bg-gray-700"
                )}
                style={{
                  width: 2,
                  height: isActive && isPlaying ? `${waveHeight * 1.3}px` : `${waveHeight}px`,
                }}
              />
            )
          })}
        </div>

        {/* Progress overlay gradient */}
        <div
          className="absolute top-0 left-0 h-full opacity-30"
          style={{
            width: `${progress}%`,
            background: 'linear-gradient(90deg, transparent, rgba(34, 197, 94, 0.3))',
          }}
        />
      </div>
    </div>
  )
}
