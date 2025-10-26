import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#01302e",
          foreground: "#ffffff",
        },
        background: "#000000",
        foreground: "#ffffff",
        border: "rgba(255, 255, 255, 0.1)",
        muted: {
          DEFAULT: "#024c46",
          foreground: "rgba(255, 255, 255, 0.7)",
        },
        accent: {
          DEFAULT: "#10b981",
          foreground: "#ffffff",
        },
      },
      keyframes: {
        shine: {
          '0%': { transform: 'translateX(-100%)' },
          '50%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        "pulse-slow": {
          '0%, 100%': { transform: 'translateX(-100%)' },
          '50%': { transform: 'translateX(100%)' },
        },
      },
      animation: {
        shine: "shine 3s ease-in-out infinite",
        "pulse-slow": "pulse-slow 3s ease-in-out infinite",
      },
    },
  },
  plugins: [],
}

export default config

