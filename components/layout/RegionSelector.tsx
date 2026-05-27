'use client'

import { useState } from 'react'
import { REGIONS, useLocaleStore } from '@/lib/locale-store'
import { useI18n } from '@/lib/i18n/use-i18n'

interface Props {
  onSelect?: () => void
  compact?: boolean
}

export default function RegionSelector({ onSelect, compact = false }: Props) {
  const { t } = useI18n()
  const { country, currency, setRegion } = useLocaleStore()
  const [open, setOpen] = useState(false)
  const current = REGIONS.find((r) => r.country === country) ?? REGIONS[0]

  function pick(code: typeof country) {
    setRegion(code)
    setOpen(false)
    onSelect?.()
  }

  if (compact) {
    return (
      <div className="relative">
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="text-xs tracking-[0.15em] uppercase hover:opacity-70"
          aria-expanded={open}
        >
          {currency}
        </button>
        {open && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
            <ul className="absolute right-0 top-full mt-2 z-50 min-w-[200px] bg-white border border-neutral-200 shadow-lg py-1">
              {REGIONS.map((r) => (
                <li key={r.country}>
                  <button
                    type="button"
                    onClick={() => pick(r.country)}
                    className={`w-full text-left px-4 py-2 text-xs hover:bg-neutral-50 ${
                      r.country === country ? 'font-semibold' : ''
                    }`}
                  >
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
      <p className="text-[10px] tracking-[0.2em] uppercase text-neutral-400 mb-3">
        {t.region.label}
      </p>
      <p className="text-sm mb-2">
        {current.label}
      </p>
      <ul className="space-y-1 max-h-48 overflow-y-auto">
        {REGIONS.map((r) => (
          <li key={r.country}>
            <button
              type="button"
              onClick={() => pick(r.country)}
              className={`w-full text-left text-sm py-2 ${
                r.country === country ? 'font-semibold underline' : 'text-neutral-600 hover:text-black'
              }`}
            >
              {r.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
