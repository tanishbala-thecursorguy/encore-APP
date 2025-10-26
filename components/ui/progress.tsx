"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number
}

const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  ({ className, value = 0, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "relative h-2 w-full overflow-hidden rounded-full bg-gray-700",
        className
      )}
      {...props}
    >
      <div
        className="h-full bg-green-400 transition-all duration-300"
        style={{ width: `${value}%` }}
      />
    </div>
  )
)
Progress.displayName = "Progress"

export { Progress }

