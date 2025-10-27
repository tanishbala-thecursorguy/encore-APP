import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ClientThemeProvider } from "@/components/ClientThemeProvider"

const inter = Inter({ 
  subsets: ["latin"],
  display: 'swap',
  preload: true,
})

export const metadata: Metadata = {
  title: "Encore - Social Music App",
  description: "Share your music moments with the world",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientThemeProvider>
          {children}
        </ClientThemeProvider>
        {/* Smooth scroll optimization */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('scrollBehavior' in document.documentElement.style) {
                document.documentElement.style.scrollBehavior = 'smooth';
              }
            `,
          }}
        />
      </body>
    </html>
  )
}
