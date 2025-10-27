'use client'

import React, { useRef } from 'react'

interface HolographicCardProps {
  imageUrl: string
  children?: React.ReactNode
  width?: string
  height?: string
  glowColor?: string
  holoColor1?: string
  holoColor2?: string
}

const HolographicCard: React.FC<HolographicCardProps> = ({
  imageUrl,
  children,
  width = '100%',
  height = '100%',
  glowColor = 'rgba(34, 197, 94, 0.3)',
  holoColor1 = 'rgba(34, 197, 94, 0.2)',
  holoColor2 = 'rgba(16, 185, 129, 0.1)'
}) => {
  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return
    const card = cardRef.current
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const rotateX = (y - centerY) / 20
    const rotateY = (centerX - x) / 20

    card.style.setProperty('--x', `${x}px`)
    card.style.setProperty('--y', `${y}px`)
    card.style.setProperty('--bg-x', `${(x / rect.width) * 100}%`)
    card.style.setProperty('--bg-y', `${(y / rect.height) * 100}%`)
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
  }

  const handleMouseLeave = () => {
    if (!cardRef.current) return
    const card = cardRef.current
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)'
    card.style.setProperty('--x', '50%')
    card.style.setProperty('--y', '50%')
    card.style.setProperty('--bg-x', '50%')
    card.style.setProperty('--bg-y', '50%')
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative rounded-3xl overflow-hidden"
      style={{
        width,
        height,
        transform: 'perspective(1000px)',
        transition: 'transform 0.1s',
      }}
    >
      {/* Holographic gradient overlay */}
      <div 
        className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity pointer-events-none"
        style={{
          background: `radial-gradient(circle at var(--bg-x, 50%) var(--bg-y, 50%), ${glowColor} 0%, ${holoColor1} 40%, ${holoColor2} 60%, transparent 80%)`,
        }}
      />
      
      {/* Holo shine effect */}
      <div 
        className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity pointer-events-none"
        style={{
          background: `linear-gradient(105deg, transparent 40%, rgba(255, 255, 255, 0.2) 50%, transparent 60%)`,
          backgroundSize: '200% 200%',
          animation: 'shine 3s ease-in-out infinite',
        }}
      />

      {/* Content */}
      <div className="relative z-10">
        {children || (
          <img
            src={imageUrl}
            alt="Holographic content"
            className="w-full h-full object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement
              target.onerror = null
              target.src = 'https://placehold.co/300x300/1a1a1a/ffffff?text=Image+Not+Found'
            }}
          />
        )}
      </div>

      {/* Glow effect */}
      <div 
        className="absolute inset-0 blur-xl opacity-0 hover:opacity-50 transition-opacity pointer-events-none"
        style={{
          background: glowColor,
          transform: 'scale(1.2)',
        }}
      />
    </div>
  )
}

export default HolographicCard

