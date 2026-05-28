const BRANDS = [
  { id: 'visa', label: 'Visa', viewBox: '0 0 48 16', content: <path fill="#1434CB" d="M19.5 1.5h-7L8 14.5h7.2l1.3-8.2 3.2 8.2H28l4.5-13H19.5zm-4.2 8.5l1.8-5 1 5h-2.8zm12.8-8.5l-4.2 13h6.8l4.2-13h-6.8zm-.5 3.5l1.5 4.5 1.5-4.5h-3zM8.5 1.5L4 14.5h7.5c1 0 1.8-.6 2.1-1.5l3.2-11.5H8.5z" /> },
  {
    id: 'mc',
    label: 'Mastercard',
    viewBox: '0 0 32 20',
    content: (
      <>
        <circle cx="12" cy="10" r="7" fill="#EB001B" />
        <circle cx="20" cy="10" r="7" fill="#F79E1B" />
        <path fill="#FF5F00" d="M16 5.2a7 7 0 0 1 0 9.6A7 7 0 0 1 16 5.2z" />
      </>
    ),
  },
  {
    id: 'amex',
    label: 'Amex',
    viewBox: '0 0 48 16',
    content: (
      <path
        fill="#006FCF"
        d="M2 2h44v12H2V2zm3.5 2.5 2.8 7h2.2l2.8-7H9.8L8 9.2 6.2 4.5H4.5zm8.5 0v7h6.5V9.5h-4.2V8h4V6.5h-4V4.5h4.2V2.5h-6.5zm9 0 3.5 7 3.5-7h-2.3l-1.2 2.8-1.2-2.8h-2.3zm8.5 0v7H42l2.5-3.5L47 9.5V2.5h-2.2v4.8L42.5 2.5h-2.2v7h2.2V6.8l2.3 2.7h2.5z"
      />
    ),
  },
  {
    id: 'apple',
    label: 'Apple Pay',
    viewBox: '0 0 48 20',
    content: (
      <path
        fill="#000"
        d="M9.5 3.2c-.6.7-1.5 1.3-2.5 1.2-.1-1 .4-2 1-2.6.6-.7 1.7-1.2 2.5-1.2.1 1-.3 2-1 2.6zm.7 1.1c-1.4-.1-2.6.8-3.3.8-.7 0-1.7-.8-2.8-.8-1.4 0-2.8.8-3.5 2.1-1.5 2.6-.4 6.4 1.1 8.5.7 1 1.6 2.2 2.7 2.1 1.1 0 1.5-.7 2.8-.7 1.3 0 1.6.7 2.8.7 1.1 0 1.9-1 2.6-2.1.8-1.2 1.1-2.3 1.1-2.4-.1 0-2.2-.8-2.2-3.3 0-2.1 1.7-3.1 1.8-3.2zm7.2-2.3v14.5h2.3V9.8h3.2c3 0 5.1-2 5.1-5.4S25.2 2 22.2 2h-4.8zm2.3 2h2.7c2 0 3.1 1.1 3.1 3.3s-1.1 3.4-3.1 3.4h-2.7V4.1zm11.5 12.6c1.4 0 2.6-.7 3.1-1.9h.1v1.8h2.1V7.5c0-2.4-1.9-3.9-4.8-3.9-2.7 0-4.5 1.5-4.6 3.7h2.1c.2-1.1 1.2-1.8 2.4-1.8 1.5 0 2.3.7 2.3 2v.9l-3 .2c-2.9.2-4.4 1.3-4.4 3.2 0 2 1.5 3.3 3.7 3.3zm.6-1.8c-1.3 0-2.1-.6-2.1-1.6 0-1 1-1.6 2.8-1.7l2.7-.2v.9c0 1.5-1.3 2.6-3.4 2.6z"
      />
    ),
  },
  {
    id: 'paypal',
    label: 'PayPal',
    viewBox: '0 0 48 16',
    content: (
      <>
        <path fill="#003087" d="M18 2H8.5c-.7 0-1.3.5-1.4 1.2L4 13.8c-.1.5.3.9.8.9h3.5l.9-5.7c.1-.7.7-1.2 1.4-1.2H14c2.8 0 4.4-1.4 4.8-4.1.2-1.2.1-2.2-.3-2.9-.4-.8-1.2-1.3-2.7-1.3z" />
        <path fill="#009CDE" d="M32 2h-9.5c-.7 0-1.3.5-1.4 1.2L18 13.8c-.1.5.3.9.8.9h4.1c.8 0 1.4-.6 1.5-1.3l.8-5.2c.1-.7.7-1.2 1.4-1.2H30c2.8 0 4.4-1.4 4.8-4.1.2-1.2.1-2.2-.3-2.9C34.1 2.5 33.3 2 32 2z" />
      </>
    ),
  },
  {
    id: 'klarna',
    label: 'Klarna',
    viewBox: '0 0 48 16',
    content: <path fill="#FFB3C7" d="M6 2h4.5c3.2 0 5.3 1.7 5.3 4.5 0 2.1-1.2 3.6-3.1 4.1L17 14h-3.5l-3.2-4.5H9V14H6V2zm3 2v3.5h1.2c1.5 0 2.3-.7 2.3-1.9 0-1.1-.8-1.6-2.1-1.6H9zm12-2h5.5c2.8 0 4.5 1.4 4.5 3.6 0 1.5-.8 2.6-2.2 3.1L32 14h-3.3l-2.8-3.8h-.2V14h-3V2zm5 2.2c-1.2 0-1.9.5-1.9 1.4 0 .9.7 1.3 1.9 1.3h1.5V4.2H26z" />,
  },
] as const

export default function PaymentIcons({ className = '' }: { className?: string }) {
  return (
    <div className={`flex flex-wrap items-center justify-center gap-2 ${className}`} role="list" aria-label="Moyens de paiement">
      {BRANDS.map((brand) => (
        <span
          key={brand.id}
          role="listitem"
          title={brand.label}
          className="inline-flex items-center justify-center h-8 w-[52px] rounded-lg border border-neutral-200 bg-white px-1.5"
        >
          <svg viewBox={brand.viewBox} className="h-4 w-full" aria-hidden>
            {brand.content}
          </svg>
        </span>
      ))}
    </div>
  )
}
