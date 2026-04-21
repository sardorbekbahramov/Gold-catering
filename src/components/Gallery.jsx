// src/components/Gallery.jsx
// Grid gallery. Each card has a "View Details" button → navigates to /gallery/:id
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { galleryImages } from '@/data/menuData'

export default function Gallery() {
  const { t } = useTranslation()
  const navigate = useNavigate()

  return (
    <section id="gallery" className="bg-cream-100 dark:bg-charcoal-900 transition-colors duration-300 relative z-10">
      <div className="section-wrap">
        <div className="text-center mb-14">
          <p className="font-body text-xs tracking-[0.3em] uppercase text-gold-500 mb-2">{t('gallery.preTitle')}</p>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-charcoal-800 dark:text-cream-100">{t('gallery.title')}</h2>
          <div className="gold-divider mt-4" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {galleryImages.map((img, idx) => (
            <motion.div key={img.id}
              initial={{ opacity: 0, scale: 0.96 }} whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }} transition={{ delay: idx * 0.07 }}
              className="relative overflow-hidden rounded-sm bg-cream-200 dark:bg-charcoal-800 flex items-center justify-center group cursor-pointer aspect-square">
              {img.image ? (
                <img src={img.image} alt={t(`gallery.alts.${img.id}`)}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              ) : (
                <div className="text-center space-y-2 p-4">
                  <span className="text-4xl opacity-30">🖼️</span>
                  <p className="text-xs font-body text-charcoal-800/30 dark:text-cream-200/20 tracking-wider">{t(`gallery.alts.${img.id}`)}</p>
                </div>
              )}
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-charcoal-950/0 group-hover:bg-charcoal-950/50 flex flex-col items-center justify-end p-5 transition-all duration-300">
                <p className="font-body text-xs text-white tracking-wider uppercase translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 mb-3">
                  {t(`gallery.alts.${img.id}`)}
                </p>
                <button
                  onClick={() => navigate(`/gallery/${img.id}`)}
                  className="opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300 btn-gold-fill text-xs px-4 py-2">
                  {t('gallery.more')}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
