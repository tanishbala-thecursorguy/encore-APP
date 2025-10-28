import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Providers } from "./providers"

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
    <html lang="en" className="overflow-x-hidden">
      <body className={`${inter.className} overflow-x-hidden`}>
        <Providers>
          {children}
        </Providers>
        {/* Smooth scroll optimization */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('scrollBehavior' in document.documentElement.style) {
                document.documentElement.style.scrollBehavior = 'smooth';
              }
              // Reset overflow styles on page load
              document.body.style.overflow = 'auto';
              document.documentElement.style.overflow = 'auto';
            `,
          }}
        />
      </body>
    </html>
  )
}
