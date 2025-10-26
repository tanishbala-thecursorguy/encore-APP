'use client'

import { motion } from "framer-motion"
import { Plus, LucideIcon } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"
import Link from "next/link"

interface SocialIcon {
  Icon: LucideIcon
  href?: string
  className?: string
}

interface AnimatedSocialIconsProps {
  icons: SocialIcon[]
  className?: string
  iconSize?: number
}

export function AnimatedSocialIcons({ 
  icons, 
  className,
  iconSize = 20
}: AnimatedSocialIconsProps) {
  const [active, setActive] = useState(false)

  const buttonSize = "size-10 sm:size-16" 

  return (
    <div className={cn("w-full relative flex items-start justify-start sm:justify-center", className)}>
      <div className="flex items-center justify-center relative gap-4">
        <motion.div
          className="absolute left-0 w-full rounded-full z-10"
          animate={{
            x: active ? "calc(100% + 16px)" : 0,
          }}
          transition={{ type: "ease-in", duration: 0.5 }}
        >
          <motion.button
            className={cn(
              buttonSize,
              "rounded-full flex items-center justify-center",
              "bg-[#10b981] hover:bg-[#10b981]/90 transition-colors shadow-lg"
            )}
            onClick={() => setActive(!active)}
            animate={{ rotate: active ? 45 : 0 }}
            transition={{
              type: "ease-in",
              duration: 0.5,
            }}
          >
            <Plus 
              size={iconSize} 
              strokeWidth={3} 
              className="text-white" 
            />
          </motion.button>
        </motion.div>
        
        {icons.map(({ Icon, href, className }, index) => (
          <motion.div
            key={index}
            className={cn(
              buttonSize,
              "rounded-full flex items-center justify-center",
              "bg-[#024c46] shadow-lg hover:shadow-xl",
              "border border-white/10",
              className
            )}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: active ? 1 : 0,
              scale: active ? 1 : 0,
              rotate: active ? 0 : 45,
            }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
              delay: active ? index * 0.1 : 0,
            }}
            style={{ pointerEvents: active ? "auto" : "none" }}
          >
            {href ? (
              href.startsWith("http") ? (
                <a 
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-full h-full"
                >
                  <Icon 
                    size={iconSize}
                    className="text-white transition-all hover:text-[#10b981] hover:scale-110" 
                  />
                </a>
              ) : (
                <Link 
                  href={href}
                  className="flex items-center justify-center w-full h-full"
                >
                  <Icon 
                    size={iconSize}
                    className="text-white transition-all hover:text-[#10b981] hover:scale-110" 
                  />
                </Link>
              )
            ) : (
              <Icon 
                size={iconSize}
                className="text-white transition-all hover:text-[#10b981] hover:scale-110" 
              />
            )}
          </motion.div>
        ))}
      </div>
    </div>
  )
}

