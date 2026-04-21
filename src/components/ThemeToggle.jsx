// src/components/ThemeToggle.jsx
// Accessible sun/moon toggle button for dark/light mode.

export default function ThemeToggle({ isDark, toggleTheme }) {
  return (
    <button
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className="
        relative w-12 h-6 rounded-full transition-colors duration-300 focus:outline-none
        focus-visible:ring-2 focus-visible:ring-gold-500
        bg-cream-200 dark:bg-charcoal-800
        border border-gold-300 dark:border-gold-700
      "
    >
      {/* Sliding knob */}
      <span
        className={`
          absolute top-0.5 w-5 h-5 rounded-full flex items-center justify-center
          text-xs transition-all duration-300 shadow-sm
          bg-gold-500 dark:bg-gold-400
          ${isDark ? 'left-[calc(100%-1.375rem)]' : 'left-0.5'}
        `}
      >
        {isDark ? '🌙' : '☀️'}
      </span>
    </button>
  )
}
