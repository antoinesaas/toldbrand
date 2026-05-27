export default function PaymentIcons({ className = '' }: { className?: string }) {
  const ICONS = [
    { name: 'Visa', fg: '#1A1A18', bg: '#FFFFFF' },
    { name: 'Mastercard', fg: '#1A1A18', bg: '#FFFFFF' },
    { name: 'Amex', fg: '#1A1A18', bg: '#FFFFFF' },
    { name: 'Apple Pay', fg: '#1A1A18', bg: '#FFFFFF' },
    { name: 'Google Pay', fg: '#1A1A18', bg: '#FFFFFF' },
    { name: 'PayPal', fg: '#1A1A18', bg: '#FFFFFF' },
    { name: 'Klarna', fg: '#1A1A18', bg: '#FFFFFF' },
  ]

  return (
    <div className={`flex flex-wrap items-center justify-center gap-2 ${className}`}>
      {ICONS.map((m) => (
        <span
          key={m.name}
          className="inline-flex items-center justify-center h-7 px-2 border border-neutral-200 bg-white rounded-[2px] text-[9px] font-semibold uppercase tracking-wider text-neutral-500"
          title={m.name}
        >
          {/* Lightweight “logo-like” marks */}
          {m.name === 'Visa' && (
            <svg width="52" height="16" viewBox="0 0 52 16" aria-hidden>
              <path d="M6 2h40v12H6z" fill="none" stroke="currentColor" strokeWidth="1.2" />
              <text x="14" y="12" fontSize="8.8" fontFamily="Arial" fill="currentColor">
                VISA
              </text>
            </svg>
          )}
          {m.name === 'Mastercard' && (
            <svg width="70" height="16" viewBox="0 0 70 16" aria-hidden>
              <circle cx="29" cy="8" r="6" fill="#EB001B" opacity="0.12" />
              <circle cx="41" cy="8" r="6" fill="#F79E1B" opacity="0.12" />
              <path d="M24 3c-5 2-8 5-8 8 0 1 0 1 1 2" fill="none" stroke="currentColor" strokeWidth="1.2" />
              <text x="28" y="12" fontSize="7.4" fontFamily="Arial" fill="currentColor">
                MC
              </text>
            </svg>
          )}
          {m.name === 'Amex' && (
            <svg width="54" height="16" viewBox="0 0 54 16" aria-hidden>
              <rect x="6" y="3" width="42" height="10" rx="2" fill="none" stroke="currentColor" strokeWidth="1.2" />
              <text x="18" y="12" fontSize="8.2" fontFamily="Arial" fill="currentColor">
                AMEX
              </text>
            </svg>
          )}
          {m.name === 'Apple Pay' && (
            <svg width="70" height="16" viewBox="0 0 70 16" aria-hidden>
              <path
                d="M18 12c0 0 2-8 6-8s6 8 6 8"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
              />
              <text x="31" y="12" fontSize="7.4" fontFamily="Arial" fill="currentColor">
                PAY
              </text>
            </svg>
          )}
          {m.name === 'Google Pay' && (
            <svg width="75" height="16" viewBox="0 0 75 16" aria-hidden>
              <path d="M10 8h20" stroke="currentColor" strokeWidth="1.2" />
              <path d="M40 4c6 0 10 4 10 4s-4 4-10 4" fill="none" stroke="currentColor" strokeWidth="1.2" />
              <text x="45" y="12" fontSize="7.1" fontFamily="Arial" fill="currentColor">
                G
              </text>
            </svg>
          )}
          {m.name === 'PayPal' && (
            <svg width="60" height="16" viewBox="0 0 60 16" aria-hidden>
              <path
                d="M18 12c2 0 3-8 7-8 4 0 6 8 6 8"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
              />
              <text x="6" y="12" fontSize="7.2" fontFamily="Arial" fill="currentColor">
                PP
              </text>
            </svg>
          )}
          {m.name === 'Klarna' && (
            <svg width="62" height="16" viewBox="0 0 62 16" aria-hidden>
              <path d="M18 4l10 8 10-8" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
              <text x="10" y="12" fontSize="7.2" fontFamily="Arial" fill="currentColor">
                K
              </text>
            </svg>
          )}
        </span>
      ))}
    </div>
  )
}
