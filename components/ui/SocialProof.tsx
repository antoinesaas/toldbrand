'use client'

import { useEffect, useState } from 'react'

const REVIEWS = [
  { name: 'Lucas M.', city: 'Paris', text: 'Qualite incroyable, le tissu est epais et le design parfait. Je recommande.', stars: 5 },
  { name: 'Theo R.', city: 'Lyon', text: 'Recu en 3 jours, conforme aux photos. Mon pote a voulu le meme direct.', stars: 5 },
  { name: 'Maxime D.', city: 'Bordeaux', text: 'Le print tient apres plusieurs lavages. Vraiment solide pour le prix.', stars: 5 },
  { name: 'Jules B.', city: 'Marseille', text: 'Trop marrant comme concept, les gens dans la rue me demandent ou je l\'ai eu.', stars: 5 },
  { name: 'Antoine V.', city: 'Toulouse', text: 'Livraison rapide, packaging soigne. Le T-shirt vaut vraiment son prix.', stars: 5 },
]

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} width="12" height="12" viewBox="0 0 24 24" fill="#FBBF24" aria-hidden>
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  )
}

export default function SocialProof() {
  const [idx, setIdx] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setIdx((i) => (i + 1) % REVIEWS.length), 5000)
    return () => clearInterval(id)
  }, [])

  const review = REVIEWS[idx]

  return (
    <div className="mt-6 bg-white/5 border border-white/10 rounded-2xl p-4 transition-all duration-500">
      <div className="flex items-center justify-between mb-3">
        <Stars count={review.stars} />
        <span className="text-[9px] uppercase tracking-[0.2em] text-emerald-400 border border-emerald-500/30 rounded-full px-2 py-0.5">
          Achat verifie
        </span>
      </div>
      <p className="text-sm text-white/70 leading-relaxed mb-3">&ldquo;{review.text}&rdquo;</p>
      <p className="text-[10px] text-white/40 uppercase tracking-[0.15em]">
        {review.name} — {review.city}
      </p>
      <div className="flex gap-1 mt-3">
        {REVIEWS.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setIdx(i)}
            className={`h-0.5 flex-1 rounded-full transition-all ${i === idx ? 'bg-white' : 'bg-white/20'}`}
            aria-label={`Avis ${i + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
