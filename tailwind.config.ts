import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Marker Palette
        marker: {
          teal: '#00b8c2',    // Vibrant Teal
          lime: '#ccff00',    // Electric Lime
          pink: '#ff0099',    // Hot Pink
          orange: '#ff6600',  // Marker Orange
          purple: '#6600cc',  // Deep Marker Purple
          'yellow-gold': '#ffd700', // Gold
        },
        // Legacy / Base Palette
        purple: {
          primary: '#3d2b7c',
          dark: '#2a1f5c',
          darker: '#1a1240',
          deep: '#0f0a26',
        },
        yellow: {
          accent: '#f9ed32',
          light: '#fff176',
          gold: '#ffd700',
        },
        star: {
          white: '#ffffff',
          glow: '#b8a9ff',
        },
      },
      fontFamily: {
        inter: ['var(--font-inter)', 'sans-serif'],
        syne: ['var(--font-syne)', 'sans-serif'],
        'space-grotesk': ['var(--font-space-grotesk)', 'sans-serif'],
        sans: ['var(--font-inter)', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'spin-slow': 'spin-slow 20s linear infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'twinkle': 'twinkle 3s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'glitter': 'glitter 4s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'spin-slow': {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
        'pulse-glow': {
          '0%, 100%': { filter: 'drop-shadow(0 0 5px rgba(249, 237, 50, 0.5))' },
          '50%': { filter: 'drop-shadow(0 0 15px rgba(249, 237, 50, 0.8))' },
        },
        twinkle: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.3', transform: 'scale(0.8)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
        glitter: {
          '0%, 100%': { opacity: '0', transform: 'scale(0.5) rotate(0deg)' },
          '50%': { opacity: '1', transform: 'scale(1.2) rotate(180deg)' },
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
} satisfies Config;
