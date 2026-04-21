// src/components/LanguageSwitcher.jsx
// Compact 3-button language switcher: UZ | RU | EN

import { useTranslation } from 'react-i18next'

const LANGS = ['uz', 'ru', 'en']

export default function LanguageSwitcher() {
  const { i18n, t } = useTranslation()
  const current = i18n.language?.slice(0, 2)

  return (
    <div className="flex items-center gap-1 rounded-sm overflow-hidden border border-cream-200 dark:border-gold-900/40">
      {LANGS.map((lng) => (
        <button
          key={lng}
          onClick={() => i18n.changeLanguage(lng)}
          className={`
            px-2 py-1 text-xs font-body font-bold tracking-wider uppercase
            transition-colors duration-200
            ${current === lng
              ? 'bg-gold-500 text-charcoal-900'
              : 'text-charcoal-800/60 dark:text-cream-200/50 hover:text-gold-500 dark:hover:text-gold-400'}
          `}
        >
          {t(`lang.${lng}`)}
        </button>
      ))}
    </div>
  )
}
