interface Props {
  light?: boolean
}

export default function AnnouncementBar({ light = false }: Props) {
  const messages = [
    'Livraison offerte dès 60 €',
    'Coton bio · 220 gsm',
    'Nouveautés chaque mois',
    'Expédition sous 24–48 h',
  ]

  return (
    <div
      className={`overflow-hidden h-8 flex items-center ${
        light ? 'bg-black/30 text-white/80' : 'bg-black text-white/70'
      }`}
    >
      <div className="flex whitespace-nowrap animate-marquee">
        {[...messages, ...messages].map((msg, i) => (
          <span key={i} className="text-[10px] tracking-[0.25em] uppercase mx-12">
            {msg}
          </span>
        ))}
      </div>
    </div>
  )
}
