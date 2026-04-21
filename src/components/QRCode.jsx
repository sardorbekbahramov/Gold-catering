// src/components/QRCode.jsx
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { brandInfo } from '@/data/menuData'

const QR_URL = `https://wa.me/998991226960`

export default function QRCode() {
  const { t } = useTranslation()
  const [size, setSize] = useState(200)

  const qrSrc     = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(QR_URL)}&color=1a1a1a&bgcolor=fdfcf7&margin=10`
  const qrSrcDark = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(QR_URL)}&color=fbbf24&bgcolor=111111&margin=10`

  return (
    <section id="qr" className="bg-cream-100 dark:bg-charcoal-900 transition-colors duration-300 relative z-10">
      <div className="section-wrap">
        <div className="text-center mb-14">
          <p className="font-body text-xs tracking-[0.3em] uppercase text-gold-500 mb-2">{t('qr.preTitle')}</p>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-charcoal-800 dark:text-cream-100">{t('qr.title')}</h2>
          <div className="gold-divider mt-4" />
        </div>
        <div className="flex flex-col md:flex-row items-center justify-center gap-12">
          <div className="card p-6 flex flex-col items-center gap-4">
            <img src={qrSrc}     alt="QR Code Light" width={size} height={size} className="block dark:hidden rounded-sm" />
            <img src={qrSrcDark} alt="QR Code Dark"  width={size} height={size} className="hidden dark:block rounded-sm" />
            <p className="font-body text-xs tracking-wider text-charcoal-800/50 dark:text-cream-200/40 uppercase">{t('qr.label')}</p>
            <div className="flex items-center gap-3 w-full mt-1">
              <span className="text-xs font-body text-charcoal-800/40 dark:text-cream-200/30">{t('qr.small')}</span>
              <input type="range" min="120" max="300" step="20" value={size}
                onChange={(e) => setSize(Number(e.target.value))} className="flex-1 accent-gold-500" />
              <span className="text-xs font-body text-charcoal-800/40 dark:text-cream-200/30">{t('qr.large')}</span>
            </div>
          </div>
          <div className="max-w-xs text-center md:text-left space-y-4">
            <h3 className="font-display text-2xl font-semibold text-charcoal-800 dark:text-cream-100">{t('qr.heading')}</h3>
            <p className="font-body text-sm text-charcoal-800/60 dark:text-cream-200/50 leading-relaxed">{t('qr.desc')}</p>
            <div className="space-y-2 text-sm font-body">
              <a href={`tel:${brandInfo.phone}`} className="block text-charcoal-800/70 dark:text-cream-200/60 hover:text-gold-500 transition-colors">
                <span className="text-gold-500 font-bold">📱 </span>{brandInfo.phone}
              </a>
              <a href={`mailto:${brandInfo.email}`} className="block text-charcoal-800/70 dark:text-cream-200/60 hover:text-gold-500 transition-colors">
                <span className="text-gold-500 font-bold">✉️ </span>{brandInfo.email}
              </a>
              <p className="text-charcoal-800/70 dark:text-cream-200/60">
                <span className="text-gold-500 font-bold">📍 </span>{brandInfo.address}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <a href={QR_URL} target="_blank" rel="noopener noreferrer" className="btn-gold-fill text-center">{t('qr.whatsapp')}</a>
              <a href={qrSrc} download="gold-catering-qr.png" className="btn-gold text-center">{t('qr.download')}</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
