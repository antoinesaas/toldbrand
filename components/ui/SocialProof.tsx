'use client'

import { useEffect, useState } from 'react'

const REVIEWS = [
  { name: 'Lucas M.', city: 'Paris', text: 'Le Porsche x Star Wars est parfait. Le print est net, les couleurs intenses. Tissu lourd, ca tient bien.', stars: 5 },
  { name: 'Theo R.', city: 'Lyon', text: 'Recu en 3 jours, conforme aux photos. Le Tokyo Ghost en vrai c\'est encore mieux. Mon pote en a commande un direct.', stars: 5 },
  { name: 'Maxime D.', city: 'Bordeaux', text: 'Le Phantom est incroyable. Print ultra net, tient apres plusieurs lavages. Le meilleur achat streetwear de l\'annee.', stars: 5 },
  { name: 'Jules B.', city: 'Marseille', text: 'Le Supra porte en sortie, j\'ai eu des compliments toute la soiree. Tout le monde demandait ou j\'avais trouve ca.', stars: 5 },
  { name: 'Antoine V.', city: 'Toulouse', text: 'Packaging soigne, livraison rapide. Le tissu est epais, la qualite est la. Je recommande sans hesiter.', stars: 5 },
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
    </div>
  )
}
