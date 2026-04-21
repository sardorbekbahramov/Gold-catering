/** @type {import('tailwindcss').Config} */
export default {
  // 'class' strategy: dark mode is toggled by adding/removing the 'dark' class on <html>
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // ── Gold Catering Brand Colors ──────────────────────────────────────
      colors: {
        gold: {
          50:  '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',   // primary gold
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        },
        cream: {
          50:  '#fdfcf7',
          100: '#faf7ed',
          200: '#f5efda',
        },
        charcoal: {
          800: '#1a1a1a',
          900: '#111111',
          950: '#0a0a0a',
        },
      },
      // ── Custom Fonts ─────────────────────────────────────────────────────
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        body:    ['"Lato"', 'sans-serif'],
      },
      // ── Animations ───────────────────────────────────────────────────────
      keyframes: {
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
      },
      animation: {
        'fade-up':  'fadeUp 0.6s ease-out both',
        'shimmer':  'shimmer 3s linear infinite',
      },
    },
  },
  plugins: [],
}
