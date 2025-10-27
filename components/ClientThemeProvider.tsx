'use client'

import { ThemeProvider } from "@/context/ThemeContext"

export function ClientThemeProvider({ children }: { children: React.ReactNode }) {
  return <ThemeProvider>{children}</ThemeProvider>
}

