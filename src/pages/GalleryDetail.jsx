// src/pages/GalleryDetail.jsx
// Detail page: 50% image | 50% content. Reached via /gallery/:id
// Has sticky footer and "Back to Gallery" button.
import { useParams, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { galleryImages, brandInfo } from '@/data/menuData'

// Extra detail data per gallery item
const DETAILS = {
  1: { guests: '120',  duration: '6 hours',  cuisine: 'International', location: 'Tashkent' },
  2: { guests: '80',   duration: '4 hours',  cuisine: 'European',      location: 'Samarkand' },
  3: { guests: '350',  duration: '8 hours',  cuisine: 'Mixed',         location: 'Tashkent' },
  4: { guests: '200',  duration: '5 hours',  cuisine: 'Asian Fusion',  location: 'Bukhara' },
  5: { guests: '150',  duration: '3 hours',  cuisine: 'Pastry',        location: 'Tashkent' },
  6: { guests: '400',  duration: '7 hours',  cuisine: 'Uzbek & Euro',  location: 'Fergana' },
}

export default function GalleryDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { t } = useTranslation()

  const img     = galleryImages.find(g => String(g.id) === id)
  const details = DETAILS[Number(id)] || DETAILS[1]

  if (!img) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center space-y-4">
        <p className="font-display text-2xl text-charcoal-800 dark:text-cream-100">Item not found</p>
        <button onClick={() => navigate('/')} className="btn-gold">{t('galleryDetail.back')}</button>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen flex flex-col bg-cream-50 dark:bg-charcoal-950">
      {/* ── Main split layout ─────────────────────────────────────────── */}
      <main className="flex-1 flex flex-col md:flex-row">

        {/* Left — 50% image */}
        <motion.div className="w-full md:w-1/2 min-h-[40vh] md:min-h-screen relative bg-cream-200 dark:bg-charcoal-800 flex items-center justify-center"
          initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
          {img.image ? (
            <img src={img.image} alt={t(`gallery.alts.${img.id}`)} className="w-full h-full object-cover absolute inset-0" />
          ) : (
            <div className="text-center space-y-3">
              <span className="text-8xl opacity-20">🖼️</span>
              <p className="text-xs font-body text-charcoal-800/30 dark:text-cream-200/20 tracking-widest uppercase">Add image to<br/>/public/images/gallery-{id}.jpg</p>
            </div>
          )}
          {/* Gold corner accents */}
          <span className="absolute top-6 left-6 w-10 h-10 border-t-2 border-l-2 border-gold-500/60 z-10" />
          <span className="absolute bottom-6 right-6 w-10 h-10 border-b-2 border-r-2 border-gold-500/60 z-10" />
        </motion.div>

        {/* Right — 50% content */}
        <motion.div className="w-full md:w-1/2 flex flex-col justify-center px-8 md:px-16 py-16 gap-8"
          initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>

          {/* Back button */}
          <button onClick={() => navigate(-1)}
            className="self-start flex items-center gap-2 font-body text-xs tracking-widest uppercase text-gold-500 hover:text-gold-600 dark:hover:text-gold-400 transition-colors duration-200">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            {t('galleryDetail.back')}
          </button>

          {/* Title */}
          <div>
            <p className="font-body text-xs tracking-[0.3em] uppercase text-gold-500 mb-2">{brandInfo.name}</p>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-charcoal-800 dark:text-cream-100 mb-3">
              {t(`gallery.alts.${img.id}`)}
            </h1>
            <div className="h-px w-12 bg-gold-500" />
          </div>

          {/* Detail cards */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: t('galleryDetail.guests'),   value: details.guests   },
              { label: t('galleryDetail.duration'),  value: details.duration  },
              { label: t('galleryDetail.cuisine'),   value: details.cuisine   },
              { label: t('galleryDetail.location'),  value: details.location  },
            ].map(({ label, value }) => (
              <div key={label} className="card p-4">
                <p className="font-body text-xs tracking-widest uppercase text-gold-500 mb-1">{label}</p>
                <p className="font-display text-lg font-semibold text-charcoal-800 dark:text-cream-100">{value}</p>
              </div>
            ))}
          </div>

          <p className="font-body text-sm text-charcoal-800/60 dark:text-cream-200/50 leading-relaxed">
            This event showcased the finest culinary craftsmanship by our team. Every dish was
            prepared with premium locally-sourced ingredients and presented with impeccable attention
            to detail, creating an unforgettable dining experience for every guest.
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <button onClick={() => navigate('/#contact')} className="btn-gold-fill">{t('hero.cta2')}</button>
            <button onClick={() => navigate(-1)} className="btn-gold">{t('galleryDetail.back')}</button>
          </div>
        </motion.div>
      </main>

      {/* ── Sticky footer ─────────────────────────────────────────────── */}
      <footer className="bg-charcoal-900 dark:bg-charcoal-950 border-t border-gold-900/30 py-5 px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <span className="font-display text-lg font-bold text-gold-400">{brandInfo.name}</span>
          <span className="font-body text-xs text-cream-200/40 tracking-wider">
            © {new Date().getFullYear()} {brandInfo.name}. All rights reserved.
          </span>
          <div className="flex gap-4 font-body text-xs text-cream-200/50">
            <a href={`tel:${brandInfo.phone}`} className="hover:text-gold-400 transition-colors">{brandInfo.phone}</a>
            <a href={`mailto:${brandInfo.email}`} className="hover:text-gold-400 transition-colors">{brandInfo.email}</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
