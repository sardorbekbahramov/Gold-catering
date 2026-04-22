// src/components/Contact.jsx
// Web3Forms integration — sends emails to sardorbahramov04@gmail.com
// Get your free access key at: https://web3forms.com
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { brandInfo } from '@/data/menuData'

// ── Web3Forms access key ─────────────────────────────────────────────────────
// 1. Go to https://web3forms.com
// 2. Enter sardorbahramov04@gmail.com and click "Create Access Key"
// 3. Copy the key and paste it below
const WEB3FORMS_KEY = '40fccd3c-b700-4709-ba38-337819498d80'
// ─────────────────────────────────────────────────────────────────────────────

const INITIAL = { name: '', email: '', phone: '', service: '', message: '' }

export default function Contact() {
  const { t } = useTranslation()
  const [form,   setForm]   = useState(INITIAL)
  const [status, setStatus] = useState(null)  // null | 'sending' | 'sent' | 'error'
  const [errors, setErrors] = useState({})

  const validate = () => {
    const e = {}
    if (!form.name.trim())    e.name    = t('contact.errors.name')
    if (!form.email.trim())   e.email   = t('contact.errors.email')
    if (!form.message.trim()) e.message = t('contact.errors.message')
    return e
  }

  const handleChange = (e) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
    setErrors(er => ({ ...er, [e.target.name]: undefined }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setStatus('sending')

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `Gold Catering Enquiry from ${form.name}`,
          from_name: 'Gold Catering Website',
          ...form,
        }),
      })
      const data = await res.json()
      if (data.success) {
        setStatus('sent')
        setForm(INITIAL)
      } else {
        setStatus('error')
      }
    } catch {
      // Fallback: open mail client if Web3Forms key not set
      const subject = encodeURIComponent(`Catering Enquiry from ${form.name}`)
      const body    = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}\nService: ${form.service}\n\n${form.message}`)
      window.location.href = `mailto:${brandInfo.email}?subject=${subject}&body=${body}`
      setStatus('sent')
      setForm(INITIAL)
    }
  }

  const SVC_KEYS = ['wedding','corporate','private','outdoor','dessert','live','other']

  return (
    <section id="contact" className="section-wrap relative z-10">
      <div className="text-center mb-14">
        <p className="font-body text-xs tracking-[0.3em] uppercase text-gold-500 mb-2">{t('contact.preTitle')}</p>
        <h2 className="font-display text-3xl md:text-5xl font-bold text-charcoal-800 dark:text-cream-100">{t('contact.title')}</h2>
        <div className="gold-divider mt-4" />
      </div>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Info column */}
        <div className="space-y-8">
          <p className="font-body text-sm md:text-base text-charcoal-800/70 dark:text-cream-200/60 leading-relaxed">{t('contact.intro')}</p>
          <div className="flex items-start gap-4">
            <span className="text-2xl">📞</span>
            <div>
              <p className="font-body text-xs tracking-widest uppercase text-gold-500 mb-0.5">{t('contact.phone')}</p>
              <a href={`tel:${brandInfo.phone}`} className="font-body text-sm text-charcoal-800/80 dark:text-cream-200/70 hover:text-gold-500 transition-colors">{brandInfo.phone}</a>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <span className="text-2xl">✉️</span>
            <div>
              <p className="font-body text-xs tracking-widest uppercase text-gold-500 mb-0.5">{t('contact.email')}</p>
              <a href={`mailto:${brandInfo.email}`} className="font-body text-sm text-charcoal-800/80 dark:text-cream-200/70 hover:text-gold-500 transition-colors">{brandInfo.email}</a>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <span className="text-2xl">📍</span>
            <div>
              <p className="font-body text-xs tracking-widest uppercase text-gold-500 mb-0.5">{t('contact.address')}</p>
              <p className="font-body text-sm text-charcoal-800/80 dark:text-cream-200/70">{brandInfo.address}</p>
            </div>
          </div>
          {/* WhatsApp button */}
          <a href="https://wa.me/998991226960" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-sm font-body text-sm font-bold tracking-wider uppercase transition-colors duration-200">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            WhatsApp
          </a>
          <div className="flex gap-3">
            <a href={brandInfo.instagram} target="_blank" rel="noopener noreferrer" className="btn-gold text-xs px-4 py-2">Instagram</a>
            <a href={brandInfo.facebook}  target="_blank" rel="noopener noreferrer" className="btn-gold text-xs px-4 py-2">Facebook</a>
          </div>
        </div>

        {/* Form column */}
        <div className="card p-6 md:p-8">
          {status === 'sent' ? (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center h-full gap-4 py-12 text-center">
              <span className="text-5xl">✅</span>
              <h3 className="font-display text-xl text-charcoal-800 dark:text-cream-100">{t('contact.success.title')}</h3>
              <p className="font-body text-sm text-charcoal-800/60 dark:text-cream-200/50">{t('contact.success.desc')}</p>
              <button onClick={() => setStatus(null)} className="btn-gold mt-4">{t('contact.success.again')}</button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label={t('contact.form.nameReq')}  name="name"  type="text"  value={form.name}  onChange={handleChange} error={errors.name}  placeholder="Your name" t={t} />
                <Field label={t('contact.form.emailReq')} name="email" type="email" value={form.email} onChange={handleChange} error={errors.email} placeholder="your@email.com" t={t} />
              </div>
              <Field label={t('contact.form.phone')} name="phone" type="tel" value={form.phone} onChange={handleChange} placeholder="+998 99 122 69 60" t={t} />
              <div className="flex flex-col gap-1">
                <label className="font-body text-xs tracking-widest uppercase text-charcoal-800/50 dark:text-cream-200/40">{t('contact.form.service')}</label>
                <select name="service" value={form.service} onChange={handleChange}
                  className="bg-cream-50 dark:bg-charcoal-900 border border-cream-200 dark:border-gold-900/30 text-charcoal-800 dark:text-cream-100 font-body text-sm px-3 py-2.5 rounded-sm focus:outline-none focus:border-gold-500 transition-colors duration-200">
                  <option value="">{t('contact.form.selectSvc')}</option>
                  {SVC_KEYS.map(k => <option key={k}>{t(`contact.form.services.${k}`)}</option>)}
                </select>
              </div>
              <div className="flex flex-col gap-1">
                <label className="font-body text-xs tracking-widest uppercase text-charcoal-800/50 dark:text-cream-200/40">{t('contact.form.messageReq')}</label>
                <textarea name="message" rows={4} value={form.message} onChange={handleChange}
                  placeholder={t('contact.form.message') + '…'}
                  className={`bg-cream-50 dark:bg-charcoal-900 border font-body text-sm px-3 py-2.5 rounded-sm resize-none text-charcoal-800 dark:text-cream-100 focus:outline-none focus:border-gold-500 transition-colors duration-200 ${errors.message ? 'border-red-400' : 'border-cream-200 dark:border-gold-900/30'}`} />
                {errors.message && <p className="text-red-500 text-xs">{errors.message}</p>}
              </div>
              <button type="submit" disabled={status === 'sending'}
                className="btn-gold-fill w-full justify-center mt-2 disabled:opacity-60">
                {status === 'sending' ? t('contact.form.sending') : t('contact.form.submit')}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}

function Field({ label, name, type, value, onChange, error, placeholder }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="font-body text-xs tracking-widest uppercase text-charcoal-800/50 dark:text-cream-200/40">{label}</label>
      <input type={type} name={name} value={value} onChange={onChange} placeholder={placeholder}
        className={`bg-cream-50 dark:bg-charcoal-900 border font-body text-sm px-3 py-2.5 rounded-sm text-charcoal-800 dark:text-cream-100 focus:outline-none focus:border-gold-500 transition-colors duration-200 placeholder:text-charcoal-800/30 dark:placeholder:text-cream-200/20 ${error ? 'border-red-400' : 'border-cream-200 dark:border-gold-900/30'}`} />
      {error && <p className="text-red-500 text-xs">{error}</p>}
    </div>
  )
}
