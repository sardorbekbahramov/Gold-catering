// src/components/Hero.jsx
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { brandInfo } from '@/data/menuData'

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: 'easeOut' },
})

export default function Hero() {
  const { t } = useTranslation()
  const scrollTo = (id) => document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={brandInfo.heroBg ? { backgroundImage: `url(${brandInfo.heroBg})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}>

      {!brandInfo.heroBg && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-gold-100/60 dark:bg-gold-900/20 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full bg-gold-200/40 dark:bg-gold-800/10 blur-2xl" />
        </div>
      )}
      {brandInfo.heroBg && <div className="absolute inset-0 bg-charcoal-950/65" />}

      <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
        <motion.p {...fade(0.1)} className="font-body text-xs md:text-sm tracking-[0.35em] uppercase text-gold-600 dark:text-gold-400 mb-4">
          {t('hero.preTitle')}
        </motion.p>
        <motion.h1 {...fade(0.25)} className="font-display text-5xl sm:text-6xl md:text-7xl font-bold leading-tight mb-6">
          <span className="gold-shimmer">{t('hero.title1')}</span>
          <br />
          <span className="text-charcoal-800 dark:text-cream-100">{t('hero.title2')}</span>
        </motion.h1>
        <motion.p {...fade(0.4)} className="font-body text-base md:text-lg text-charcoal-800/70 dark:text-cream-200/70 mb-10 max-w-xl mx-auto leading-relaxed">
          {t('hero.tagline')}
        </motion.p>
        <motion.div {...fade(0.55)} className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button onClick={() => scrollTo('#menu')} className="btn-gold-fill w-full sm:w-auto">{t('hero.cta1')}</button>
          <button onClick={() => scrollTo('#contact')} className="btn-gold w-full sm:w-auto">{t('hero.cta2')}</button>
        </motion.div>
        <motion.div {...fade(0.7)} className="mt-16 flex items-center justify-center gap-3">
          <div className="h-px w-16 bg-gold-500/40" />
          <span className="text-gold-500 text-sm">✦</span>
          <div className="h-px w-16 bg-gold-500/40" />
        </motion.div>
      </div>

      <button onClick={() => scrollTo('#about')} aria-label="Scroll down"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-gold-500/60 hover:text-gold-500 transition-colors duration-300 animate-bounce">
        <span className="text-xs tracking-widest uppercase font-body">{t('hero.scroll')}</span>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
    </section>
  )
}
