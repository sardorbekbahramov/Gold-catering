// src/components/Navbar.jsx
// Responsive navigation with i18n, language switcher, and theme toggle.
//   Mobile  → top bar + hamburger → full-screen slide-in
//   lg+     → sticky left sidebar

import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import ThemeToggle from '@/components/ThemeToggle'
import LanguageSwitcher from '@/components/LanguageSwitcher'
import { brandInfo } from '@/data/menuData'

const NAV_KEYS = ['home', 'about', 'services', 'menu', 'gallery', 'contact']

export default function Navbar({ isDark, toggleTheme }) {
  const { t } = useTranslation()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [active,     setActive]     = useState('home')
  const [scrolled,   setScrolled]   = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)')
    const h = (e) => { if (e.matches) setMobileOpen(false) }
    mq.addEventListener('change', h)
    return () => mq.removeEventListener('change', h)
  }, [])

  const handleNav = (key) => {
    setActive(key)
    setMobileOpen(false)
    document.querySelector(`#${key}`)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      {/* ── Mobile top bar ──────────────────────────────────────────── */}
      <header className={`
        lg:hidden fixed top-0 left-0 right-0 z-50
        flex items-center justify-between px-4 h-14
        bg-cream-50/95 dark:bg-charcoal-950/95 backdrop-blur-sm
        border-b border-cream-200 dark:border-gold-900/40
        transition-shadow duration-200 ${scrolled ? 'shadow-md' : ''}
      `}>
        <button onClick={() => handleNav('home')}
          className="font-display text-xl font-bold text-gold-600 dark:text-gold-400 tracking-wide">
          {brandInfo.name}
        </button>
        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <ThemeToggle isDark={isDark} toggleTheme={toggleTheme} />
          <button onClick={() => setMobileOpen(o => !o)} aria-label="Toggle menu"
            aria-expanded={mobileOpen}
            className="w-9 h-9 flex flex-col justify-center items-center gap-1.5 focus:outline-none ml-1">
            <span className={`block w-6 h-0.5 bg-charcoal-800 dark:bg-cream-100 rounded transition-all duration-300 ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block w-6 h-0.5 bg-charcoal-800 dark:bg-cream-100 rounded transition-all duration-300 ${mobileOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-6 h-0.5 bg-charcoal-800 dark:bg-cream-100 rounded transition-all duration-300 ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </header>

      {/* ── Mobile slide-in overlay ─────────────────────────────────── */}
      <div className={`lg:hidden fixed inset-0 z-40 transition-all duration-300 ${mobileOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}>
        <div onClick={() => setMobileOpen(false)}
          className={`absolute inset-0 bg-charcoal-950/60 backdrop-blur-sm transition-opacity duration-300 ${mobileOpen ? 'opacity-100' : 'opacity-0'}`} />
        <nav className={`
          absolute right-0 top-0 bottom-0 w-72
          bg-cream-50 dark:bg-charcoal-900
          border-l border-cream-200 dark:border-gold-900/30
          flex flex-col pt-20 pb-8 px-8 gap-2
          transition-transform duration-300
          ${mobileOpen ? 'translate-x-0' : 'translate-x-full'}
        `}>
          <div className="gold-divider mx-0 mb-6" />
          {NAV_KEYS.map(key => (
            <button key={key} onClick={() => handleNav(key)}
              className={`text-left py-2.5 text-base font-body tracking-widest uppercase
                border-b border-cream-200 dark:border-gold-900/20 transition-colors duration-200
                ${active === key ? 'text-gold-500 font-bold' : 'text-charcoal-800 dark:text-cream-200 hover:text-gold-500 dark:hover:text-gold-400'}`}>
              {t(`nav.${key}`)}
            </button>
          ))}
        </nav>
      </div>

      {/* ── Desktop sticky sidebar ──────────────────────────────────── */}
      <aside className="
        hidden lg:flex flex-col fixed left-0 top-0 bottom-0 z-50
        w-20 xl:w-56
        bg-cream-50/95 dark:bg-charcoal-950/95 backdrop-blur-sm
        border-r border-cream-200 dark:border-gold-900/40
        items-center xl:items-start py-8 px-2 xl:px-6
      ">
        <button onClick={() => handleNav('home')} className="mb-6 block">
          <span className="font-display font-bold text-gold-600 dark:text-gold-400 hidden xl:block text-lg leading-tight tracking-wide">
            {brandInfo.name}
          </span>
          <span className="xl:hidden text-2xl">✦</span>
        </button>

        <div className="gold-divider w-10 xl:w-full mx-0 mb-4" />

        <nav className="flex flex-col gap-1 w-full flex-1">
          {NAV_KEYS.map(key => (
            <button key={key} onClick={() => handleNav(key)} title={t(`nav.${key}`)}
              className={`
                w-full flex items-center justify-center xl:justify-start
                gap-3 py-2.5 px-2 xl:px-3 rounded-sm
                text-xs xl:text-sm tracking-widest uppercase font-body
                transition-all duration-200
                ${active === key
                  ? 'text-gold-500 bg-gold-50 dark:bg-gold-900/20 font-bold'
                  : 'text-charcoal-800 dark:text-cream-200 hover:text-gold-500 dark:hover:text-gold-400 hover:bg-gold-50/50 dark:hover:bg-gold-900/10'}
              `}>
              <span className="xl:hidden text-base">{t(`nav.${key}`).charAt(0)}</span>
              <span className="hidden xl:inline">{t(`nav.${key}`)}</span>
            </button>
          ))}
        </nav>

        {/* Language + theme at bottom */}
        <div className="mt-auto flex flex-col items-center xl:items-start gap-3 w-full">
          <div className="xl:w-full">
            <LanguageSwitcher />
          </div>
          <ThemeToggle isDark={isDark} toggleTheme={toggleTheme} />
          <span className="hidden xl:block text-xs text-charcoal-800/40 dark:text-cream-200/30 tracking-wider">
            {isDark ? t('theme.dark') : t('theme.light')}
          </span>
        </div>
      </aside>
    </>
  )
}
