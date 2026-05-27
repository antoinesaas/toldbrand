import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Language } from '@/lib/i18n/translations'

export type Currency = 'EUR' | 'GBP' | 'USD'
export type CountryCode = 'FR' | 'DE' | 'GB' | 'US' | 'IT' | 'ES' | 'BE' | 'CH'

export const REGIONS: {
  country: CountryCode
  currency: Currency
  language: Language
  label: string
  locale: string
}[] = [
  { country: 'FR', currency: 'EUR', language: 'fr', label: 'France (EUR)', locale: 'fr-FR' },
  { country: 'DE', currency: 'EUR', language: 'de', label: 'Deutschland (EUR)', locale: 'de-DE' },
  { country: 'IT', currency: 'EUR', language: 'it', label: 'Italia (EUR)', locale: 'it-IT' },
  { country: 'ES', currency: 'EUR', language: 'es', label: 'España (EUR)', locale: 'es-ES' },
  { country: 'BE', currency: 'EUR', language: 'fr', label: 'Belgique (EUR)', locale: 'fr-BE' },
  { country: 'CH', currency: 'EUR', language: 'de', label: 'Schweiz (EUR)', locale: 'de-CH' },
  { country: 'GB', currency: 'GBP', language: 'en', label: 'United Kingdom (GBP)', locale: 'en-GB' },
  { country: 'US', currency: 'USD', language: 'en', label: 'United States (USD)', locale: 'en-US' },
]

interface LocaleStore {
  country: CountryCode
  currency: Currency
  language: Language
  locale: string
  setRegion: (country: CountryCode) => void
}

export const useLocaleStore = create<LocaleStore>()(
  persist(
    (set) => ({
      country: 'FR',
      currency: 'EUR',
      language: 'fr',
      locale: 'fr-FR',
      setRegion: (country) => {
        const region = REGIONS.find((r) => r.country === country) ?? REGIONS[0]
        set({
          country: region.country,
          currency: region.currency,
          language: region.language,
          locale: region.locale,
        })
      },
    }),
    { name: 'told-locale' }
  )
)

export function formatPriceForCurrency(cents: number, currency: Currency, locale: string): string {
  return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(cents / 100)
}
