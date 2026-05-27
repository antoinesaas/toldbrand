export default function PaymentIcons({ className = '' }: { className?: string }) {
  const methods = ['Visa', 'Mastercard', 'Amex', 'Apple Pay', 'Google Pay', 'PayPal', 'Klarna']
  return (
    <div className={`flex flex-wrap items-center justify-center gap-2 ${className}`}>
      {methods.map((name) => (
        <span
          key={name}
          className="inline-flex items-center justify-center h-7 px-2 border border-neutral-200 text-[9px] font-semibold uppercase tracking-wider text-neutral-500 bg-white"
          title={name}
        >
          {name}
        </span>
      ))}
    </div>
  )
}
