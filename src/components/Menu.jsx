// src/components/Menu.jsx
// Tabbed menu. If a category has > 6 items, uses horizontal scroll instead of grid wrap.
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { menuCategories } from '@/data/menuData'
import MenuCard from '@/components/MenuCard'

const CAT_KEYS = ['starters', 'mains', 'desserts', 'drinks']

export default function Menu() {
  const { t } = useTranslation()
  const [activeTab, setActiveTab] = useState(menuCategories[0].id)
  const current = menuCategories.find(c => c.id === activeTab)
  const useScroll = current?.items.length > 6

  return (
    <section id="menu" className="section-wrap relative z-10">
      <div className="text-center mb-10">
        <p className="font-body text-xs tracking-[0.3em] uppercase text-gold-500 mb-2">{t('menu.preTitle')}</p>
        <h2 className="font-display text-3xl md:text-5xl font-bold text-charcoal-800 dark:text-cream-100">{t('menu.title')}</h2>
        <div className="gold-divider mt-4" />
      </div>

      {/* Category tabs */}
      <div className="flex flex-wrap justify-center gap-2 mb-10">
        {CAT_KEYS.map(key => (
          <button key={key} onClick={() => setActiveTab(key)}
            className={`font-body text-xs tracking-widest uppercase px-5 py-2 rounded-sm border transition-all duration-200
              ${activeTab === key
                ? 'bg-gold-500 text-charcoal-900 border-gold-500 font-bold'
                : 'border-cream-200 dark:border-gold-900/30 text-charcoal-800/60 dark:text-cream-200/50 hover:border-gold-400 hover:text-gold-600 dark:hover:text-gold-400'}`}>
            {t(`menu.categories.${key}`)}
          </button>
        ))}
      </div>

      {/* Grid (≤6 items) OR horizontal scroll (>6 items) */}
      {useScroll ? (
        <div className="flex gap-4 overflow-x-auto pb-4 menu-scroll-container">
          {current.items.map(item => (
            <div key={item.id} className="flex-none w-64">
              <MenuCard itemId={String(item.id)} price={item.price} image={item.image} />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {current?.items.map(item => (
            <MenuCard key={item.id} itemId={String(item.id)} price={item.price} image={item.image} />
          ))}
        </div>
      )}
    </section>
  )
}
