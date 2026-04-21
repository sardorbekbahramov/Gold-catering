// src/components/Testimonials.jsx
// Swipeable horizontal carousel — drag with mouse or touch.
import { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'

const TESTIMONIAL_KEYS = [
  { id: 1, name: 'Aziza Karimova',  roleKey: 'bride',   rating: 5 },
  { id: 2, name: 'Timur Rashidov',  roleKey: 'ceo',     rating: 5 },
  { id: 3, name: 'Dilnoza Yusupova',roleKey: 'planner', rating: 5 },
  { id: 4, name: 'Bekzod Mirzayev', roleKey: 'bride',   rating: 5 },
  { id: 5, name: 'Nodira Hasanova', roleKey: 'planner', rating: 5 },
]

export default function Testimonials() {
  const { t } = useTranslation()
  const trackRef   = useRef(null)
  const isDragging = useRef(false)
  const startX     = useRef(0)
  const scrollLeft = useRef(0)

  const onMouseDown = (e) => {
    isDragging.current = true
    startX.current     = e.pageX - trackRef.current.offsetLeft
    scrollLeft.current = trackRef.current.scrollLeft
    trackRef.current.style.cursor = 'grabbing'
  }
  const onMouseUp   = ()  => { isDragging.current = false; trackRef.current.style.cursor = 'grab' }
  const onMouseMove = (e) => {
    if (!isDragging.current) return
    e.preventDefault()
    const x    = e.pageX - trackRef.current.offsetLeft
    const walk = (x - startX.current) * 1.5
    trackRef.current.scrollLeft = scrollLeft.current - walk
  }

  return (
    <section className="section-wrap relative z-10">
      <div className="text-center mb-14">
        <p className="font-body text-xs tracking-[0.3em] uppercase text-gold-500 mb-2">{t('testimonials.preTitle')}</p>
        <h2 className="font-display text-3xl md:text-5xl font-bold text-charcoal-800 dark:text-cream-100">{t('testimonials.title')}</h2>
        <div className="gold-divider mt-4" />
      </div>

      {/* Carousel track */}
      <div
        ref={trackRef}
        className="flex gap-5 overflow-x-auto pb-4 cursor-grab select-none testimonial-scroll"
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        onMouseMove={onMouseMove}
      >
        {TESTIMONIAL_KEYS.map((item, i) => {
          const textKey = item.id <= 3 ? String(item.id) : String((item.id % 3) + 1)
          return (
            <motion.div key={item.id}
              className="flex-none w-80 md:w-96 card p-6 flex flex-col gap-4"
              initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
              <div className="flex gap-1">
                {Array.from({ length: item.rating }).map((_, j) => (
                  <span key={j} className="text-gold-400 text-sm">★</span>
                ))}
              </div>
              <p className="font-body text-sm text-charcoal-800/70 dark:text-cream-200/60 leading-relaxed italic flex-1">
                "{t(`testimonials.texts.${textKey}`)}"
              </p>
              <div className="border-t border-cream-200 dark:border-gold-900/20 pt-4 flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gold-100 dark:bg-gold-900/30 flex items-center justify-center text-gold-600 dark:text-gold-400 font-display font-bold text-sm">
                  {item.name.charAt(0)}
                </div>
                <div>
                  <p className="font-body text-sm font-bold text-charcoal-800 dark:text-cream-100">{item.name}</p>
                  <p className="font-body text-xs text-charcoal-800/40 dark:text-cream-200/35 tracking-wider">{t(`testimonials.roles.${item.roleKey}`)}</p>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Hint */}
      <p className="text-center mt-3 font-body text-xs text-charcoal-800/30 dark:text-cream-200/25 tracking-wider">
        ← drag to scroll →
      </p>
    </section>
  )
}
