import Image from 'next/image'

const PAYMENTS = [
  { src: '/images/payments/visa.svg', label: 'Visa', w: 38 },
  { src: '/images/payments/mastercard.svg', label: 'Mastercard', w: 32 },
  { src: '/images/payments/americanexpress.svg', label: 'American Express', w: 32 },
  { src: '/images/payments/applepay.svg', label: 'Apple Pay', w: 40 },
  { src: '/images/payments/paypal.svg', label: 'PayPal', w: 36 },
  { src: '/images/payments/klarna.svg', label: 'Klarna', w: 36 },
] as const

export default function PaymentIcons({ className = '', compact = false }: { className?: string; compact?: boolean }) {
  return (
    <div
      className={`flex flex-wrap items-center justify-center gap-1.5 ${className}`}
      role="list"
      aria-label="Moyens de paiement"
    >
      {PAYMENTS.map(({ src, label, w }) => (
        <span
          key={src}
          role="listitem"
          title={label}
          className={compact
            ? 'inline-flex items-center justify-center h-6 min-w-[38px] px-1.5 rounded border border-neutral-200 bg-white'
            : 'inline-flex items-center justify-center h-9 min-w-[52px] px-2 rounded-lg border border-neutral-200 bg-white'}
        >
          <Image
            src={src}
            alt={label}
            width={compact ? Math.round(w * 0.7) : w}
            height={compact ? 14 : 20}
            className={compact ? 'h-3.5 w-auto object-contain' : 'h-5 w-auto object-contain'}
            unoptimized
          />
        </span>
      ))}
    </div>
  )
}
