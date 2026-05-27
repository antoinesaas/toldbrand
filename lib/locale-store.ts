import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type Currency = 'EUR' | 'GBP' | 'USD'
export type CountryCode = 'FR' | 'DE' | 'GB' | 'US' | 'IT' | 'ES' | 'BE' | 'CH'

export const REGIONS: {
  country: CountryCode
  currency: Currency
  label: string
  locale: string
}[] = [
  { country: 'FR', currency: 'EUR', label: 'France (EUR)', locale: 'fr-FR' },
  { country: 'DE', currency: 'EUR', label: 'Germany (EUR)', locale: 'de-DE' },
  { country: 'IT', currency: 'EUR', label: 'Italy (EUR)', locale: 'it-IT' },
  { country: 'ES', currency: 'EUR', label: 'Spain (EUR)', locale: 'es-ES' },
  { country: 'BE', currency: 'EUR', label: 'Belgium (EUR)', locale: 'fr-BE' },
  { country: 'CH', currency: 'EUR', label: 'Switzerland (EUR)', locale: 'de-CH' },
  { country: 'GB', currency: 'GBP', label: 'United Kingdom (GBP)', locale: 'en-GB' },
  { country: 'US', currency: 'USD', label: 'United States (USD)', locale: 'en-US' },
]

interface LocaleStore {
  country: CountryCode
  currency: Currency
  locale: string
  setRegion: (country: CountryCode) => void
}

export const useLocaleStore = create<LocaleStore>()(
  persist(
    (set) => ({
      country: 'FR',
      currency: 'EUR',
      locale: 'fr-FR',
      setRegion: (country) => {
        const region = REGIONS.find((r) => r.country === country) ?? REGIONS[0]
        set({
          country: region.country,
          currency: region.currency,
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
