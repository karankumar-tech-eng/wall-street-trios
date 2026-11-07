/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0f7ff',
          100: '#e0effe',
          500: '#0066ff',
          600: '#0052cc',
          700: '#003d99',
        },
        dark: {
          bg: '#0B0E14',         // Dark trading main background
          card: '#151A23',       // Card background
          cardHover: '#1C2330',
          border: '#232B3B',     // Border line color
          muted: '#8A99AD',      // Secondary text color
        },
        trade: {
          win: '#10B981',        // Green for Profit/Win
          winBg: '#10B98115',
          loss: '#EF4444',       // Red for Loss
          lossBg: '#EF444415',
          be: '#6B7280',         // Gray for Breakeven
          beBg: '#6B728015',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      }
    },
  },
  plugins: [],
}