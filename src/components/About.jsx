// src/components/About.jsx
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { stats } from '@/data/menuData'
import { brandInfo } from '@/data/menuData'

const STAT_KEYS = ['events', 'experience', 'satisfaction', 'chefs']
const STAT_VALUES = ['500+', '12', '98%', '40+']

export default function About() {
  const { t } = useTranslation()
  return (
    <section id="about" className="section-wrap relative z-10">
      <div className="text-center mb-14">
        <p className="font-body text-xs tracking-[0.3em] uppercase text-gold-500 mb-2">{t('about.preTitle')}</p>
        <h2 className="font-display text-3xl md:text-5xl font-bold text-charcoal-800 dark:text-cream-100">{t('about.title')}</h2>
        <div className="gold-divider mt-4" />
      </div>
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-5">
          <h3 className="font-display text-2xl md:text-3xl font-semibold text-charcoal-800 dark:text-cream-100 italic">"{t('about.headline')}"</h3>
          <p className="font-body text-sm md:text-base text-charcoal-800/70 dark:text-cream-200/60 leading-relaxed">{t('about.p1')}</p>
          <p className="font-body text-sm md:text-base text-charcoal-800/70 dark:text-cream-200/60 leading-relaxed">{t('about.p2')}</p>
          <button onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })} className="btn-gold mt-2">{t('about.cta')}</button>
        </div>
        <div className="relative aspect-[4/3] rounded-sm overflow-hidden bg-cream-200 dark:bg-charcoal-800 flex items-center justify-center border border-cream-200 dark:border-gold-900/20">
          <div className="text-center space-y-2">
            <div className="text-5xl">👨‍🍳</div>
            <p className="text-xs font-body text-charcoal-800/40 dark:text-cream-200/30 tracking-wider uppercase">{t('about.placeholder')}</p>
            <p className="text-xs font-body text-gold-500/60 tracking-wider">/public/images/about.jpg</p>
          </div>
          <span className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 border-gold-500/50" />
          <span className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 border-gold-500/50" />
        </div>
      </div>
      <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
        {STAT_KEYS.map((key, i) => (
          <motion.div key={key} className="card text-center p-6"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
            <p className="font-display text-3xl md:text-4xl font-bold gold-shimmer mb-1">{STAT_VALUES[i]}</p>
            <p className="font-body text-xs tracking-widest uppercase text-charcoal-800/60 dark:text-cream-200/50">{t(`about.stats.${key}`)}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
