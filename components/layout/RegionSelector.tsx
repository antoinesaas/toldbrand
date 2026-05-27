'use client'

import { useState } from 'react'
import { REGIONS, useLocaleStore } from '@/lib/locale-store'
import { useI18n } from '@/lib/i18n/use-i18n'
import { LANGUAGE_LABELS } from '@/lib/i18n/language-labels'

interface Props {
  onSelect?: () => void
  compact?: boolean
  light?: boolean
}

export default function RegionSelector({ onSelect, compact = false, light = false }: Props) {
  const { t, language } = useI18n()
  const { country, currency, setRegion } = useLocaleStore()
  const [open, setOpen] = useState(false)
  const current = REGIONS.find((r) => r.country === country) ?? REGIONS[0]

  function pick(code: typeof country) {
    setRegion(code)
    setOpen(false)
    onSelect?.()
  }

  const triggerClass = compact
    ? `inline-flex items-center gap-2 text-xs tracking-[0.12em] uppercase rounded-full border px-3 py-1.5 transition-colors ${
        light
          ? 'border-white/40 text-white hover:bg-white/10'
          : 'border-neutral-200 text-black hover:bg-neutral-50'
      }`
    : ''

  if (compact) {
    return (
      <div className="relative flex items-center gap-2">
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className={triggerClass}
          aria-expanded={open}
          aria-label={t.region.label}
        >
          <span className="font-medium">{LANGUAGE_LABELS[language]}</span>
          <span className={light ? 'text-white/50' : 'text-neutral-300'}>|</span>
          <span>{currency}</span>
        </button>
        {open && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
            <ul className="absolute right-0 top-full mt-2 z-50 min-w-[220px] bg-white border border-neutral-200 shadow-xl rounded-2xl py-2 overflow-hidden">
              {REGIONS.map((r) => (
                <li key={r.country}>
                  <button
                    type="button"
                    onClick={() => pick(r.country)}
                    className={`w-full text-left px-4 py-2.5 text-xs hover:bg-neutral-50 ${
                      r.country === country ? 'font-semibold bg-neutral-50' : ''
                    }`}
                  >
                    <span className="font-medium mr-2">{LANGUAGE_LABELS[r.language]}</span>
                    {r.label}
                  </button>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    )
  }

  return (
    <div>
      <p className="text-[10px] tracking-[0.2em] uppercase text-neutral-400 mb-3">{t.region.label}</p>
      <p className="text-sm mb-2">
        {LANGUAGE_LABELS[language]} · {current.label}
      </p>
      <ul className="space-y-1 max-h-48 overflow-y-auto">
        {REGIONS.map((r) => (
          <li key={r.country}>
            <button
              type="button"
              onClick={() => pick(r.country)}
              className={`w-full text-left text-sm py-2 rounded-lg px-2 ${
                r.country === country ? 'font-semibold underline' : 'text-neutral-600 hover:text-black hover:bg-neutral-50'
              }`}
            >
              <span className="font-medium mr-2">{LANGUAGE_LABELS[r.language]}</span>
              {r.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
