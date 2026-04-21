// src/components/Services.jsx
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { services } from '@/data/menuData'

const SERVICE_ICON_KEYS = ['wedding','corporate','private','outdoor','dessert','live']
const ICONS = ['💍','🏢','🎉','🌿','🍰','👨‍🍳']

export default function Services() {
  const { t } = useTranslation()
  return (
    <section id="services" className="bg-cream-100 dark:bg-charcoal-900 transition-colors duration-300 relative z-10">
      <div className="section-wrap">
        <div className="text-center mb-14">
          <p className="font-body text-xs tracking-[0.3em] uppercase text-gold-500 mb-2">{t('services.preTitle')}</p>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-charcoal-800 dark:text-cream-100">{t('services.title')}</h2>
          <div className="gold-divider mt-4" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICE_ICON_KEYS.map((key, i) => (
            <motion.div key={key} className="card group p-6 flex flex-col gap-4"
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
              <div className="relative w-full aspect-video rounded-sm overflow-hidden bg-cream-200 dark:bg-charcoal-800 flex items-center justify-center">
                {services[i]?.image ? (
                  <img src={services[i].image} alt={t(`services.items.${key}.title`)} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                ) : services[i]?.video ? (
                  <video src={services[i].video} muted loop playsInline autoPlay className="w-full h-full object-cover" />
                ) : (
                  <span className="text-4xl">{ICONS[i]}</span>
                )}
                <div className="absolute inset-0 bg-gold-500/0 group-hover:bg-gold-500/10 transition-colors duration-300" />
              </div>
              <div>
                <h3 className="font-display text-lg font-semibold text-charcoal-800 dark:text-cream-100 mb-2">{t(`services.items.${key}.title`)}</h3>
                <p className="font-body text-sm text-charcoal-800/60 dark:text-cream-200/50 leading-relaxed">{t(`services.items.${key}.desc`)}</p>
              </div>
              <div className="mt-auto h-px w-0 group-hover:w-full bg-gold-500/50 transition-all duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
