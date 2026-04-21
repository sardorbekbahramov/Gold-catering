// src/components/Footer.jsx
import { useTranslation } from 'react-i18next'
import { brandInfo } from '@/data/menuData'

const NAV_KEYS = ['home', 'about', 'services', 'menu', 'gallery', 'contact']

export default function Footer() {
  const { t } = useTranslation()
  const year = new Date().getFullYear()
  const scrollTo = (key) => document.querySelector(`#${key}`)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <footer className="bg-charcoal-900 dark:bg-charcoal-950 border-t border-gold-900/30 text-cream-200/60 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 mb-10">
          <div className="space-y-3">
            <h3 className="font-display text-2xl font-bold text-gold-400">{brandInfo.name}</h3>
            <div className="h-px w-10 bg-gold-700" />
            <p className="font-body text-sm leading-relaxed">{t('hero.tagline')}</p>
          </div>
          <div className="space-y-3">
            <h4 className="font-body text-xs tracking-[0.3em] uppercase text-gold-500 mb-4">{t('footer.quickLinks')}</h4>
            <nav className="flex flex-col gap-2">
              {NAV_KEYS.map(key => (
                <button key={key} onClick={() => scrollTo(key)}
                  className="text-left font-body text-sm hover:text-gold-400 transition-colors duration-200 w-fit">
                  {t(`nav.${key}`)}
                </button>
              ))}
            </nav>
          </div>
          <div className="space-y-3">
            <h4 className="font-body text-xs tracking-[0.3em] uppercase text-gold-500 mb-4">{t('footer.getInTouch')}</h4>
            <a href={`tel:${brandInfo.phone}`}    className="block font-body text-sm hover:text-gold-400 transition-colors">{brandInfo.phone}</a>
            <a href={`mailto:${brandInfo.email}`} className="block font-body text-sm hover:text-gold-400 transition-colors">{brandInfo.email}</a>
            <p className="font-body text-sm">{brandInfo.address}</p>
            <div className="flex gap-3 mt-4">
              <a href={brandInfo.instagram} target="_blank" rel="noopener noreferrer" className="text-xs font-body tracking-wider uppercase hover:text-gold-400 transition-colors duration-200">Instagram</a>
              <span className="text-gold-700">·</span>
              <a href={brandInfo.facebook}  target="_blank" rel="noopener noreferrer" className="text-xs font-body tracking-wider uppercase hover:text-gold-400 transition-colors duration-200">Facebook</a>
            </div>
          </div>
        </div>
        <div className="h-px w-full bg-gold-900/40 mb-6" />
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="font-body text-xs tracking-wider">© {year} {brandInfo.name}. All rights reserved.</p>
          <p className="font-body text-xs tracking-wider text-gold-700">{t('footer.crafted')}</p>
        </div>
      </div>
    </footer>
  )
}
