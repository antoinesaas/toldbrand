export default function AnnouncementBar() {
  const messages = [
    'Free shipping on orders over €60',
    'Printed in Europe via Gelato',
    'Organic cotton · 220 gsm',
    'New drops every month',
  ]

  return (
    <div className="bg-ink text-cream overflow-hidden h-8 flex items-center">
      <div className="flex whitespace-nowrap animate-marquee">
        {[...messages, ...messages].map((msg, i) => (
          <span key={i} className="font-sans text-[10px] tracking-[0.25em] uppercase mx-12 text-cream/70">
            {msg}
          </span>
        ))}
      </div>
    </div>
  )
}
