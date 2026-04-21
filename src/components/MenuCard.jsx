// src/components/MenuCard.jsx
import { useTranslation } from 'react-i18next'

export default function MenuCard({ itemId, price, image }) {
  const { t } = useTranslation()
  const name = t(`menu.items.${itemId}.name`)
  const desc = t(`menu.items.${itemId}.desc`)

  return (
    <div className="card group flex flex-col">
      <div className="relative w-full aspect-video overflow-hidden bg-cream-200 dark:bg-charcoal-800 flex items-center justify-center">
        {image ? (
          <img src={image} alt={name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        ) : (
          <span className="text-3xl opacity-40">🍽️</span>
        )}
      </div>
      <div className="p-4 flex flex-col gap-1 flex-1">
        <div className="flex items-start justify-between gap-2">
          <h4 className="font-display text-base font-semibold text-charcoal-800 dark:text-cream-100 leading-snug">{name}</h4>
          <span className="shrink-0 font-body text-xs font-bold tracking-wider text-gold-700 dark:text-gold-400 bg-gold-50 dark:bg-gold-900/30 border border-gold-200 dark:border-gold-800/40 px-2 py-0.5 rounded-sm">
            {price} {t('menu.currency')}
          </span>
        </div>
        <p className="font-body text-xs text-charcoal-800/55 dark:text-cream-200/45 leading-relaxed mt-1">{desc}</p>
      </div>
    </div>
  )
}
