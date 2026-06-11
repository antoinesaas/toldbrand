'use client'

import { useEffect, useState } from 'react'

const PROMO_CODE = 'TOLD15'
const SESSION_KEY = 'promo_popup_shown'

export default function PromoPopup() {
  const [visible, setVisible] = useState(false)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY)) return

    const show = () => {
      if (sessionStorage.getItem(SESSION_KEY)) return
      sessionStorage.setItem(SESSION_KEY, '1')
      setVisible(true)
    }

    const isMobile = window.innerWidth < 768

    // Mobile: show after 5s unconditionally
    // Desktop: show after 45s OR on exit intent (mouse leaving top of page)
    const delay = isMobile ? 5000 : 45000
    const timer = setTimeout(show, delay)

    let leaveHandler: ((e: MouseEvent) => void) | null = null
    if (!isMobile) {
      leaveHandler = (e: MouseEvent) => {
        if (e.clientY <= 0) show()
      }
      document.addEventListener('mouseleave', leaveHandler)
    }

    return () => {
      clearTimeout(timer)
      if (leaveHandler) document.removeEventListener('mouseleave', leaveHandler)
    }
  }, [])

  function copy() {
    navigator.clipboard.writeText(PROMO_CODE).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  if (!visible) return null

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setVisible(false)} />
      <div className="relative bg-[#111] border border-white/10 rounded-2xl p-8 w-full max-w-sm shadow-2xl">
        <button
          type="button"
          onClick={() => setVisible(false)}
          className="absolute top-4 right-4 text-white/40 hover:text-white text-xl leading-none"
          aria-label="Fermer"
        >
          &times;
        </button>

        <p className="text-[10px] tracking-[0.3em] uppercase text-white/40 mb-2">Offre exclusive</p>
        <h2 className="text-xl font-bold uppercase tracking-[0.1em] text-white mb-1">
          -15% sur votre commande
        </h2>
        <p className="text-sm text-white/50 mb-6">Copiez le code et appliquez-le au checkout.</p>

        <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-4 py-3 mb-4">
          <span className="flex-1 text-white font-mono font-bold tracking-widest text-sm">
            {PROMO_CODE}
          </span>
          <button
            type="button"
            onClick={copy}
            className="text-[10px] uppercase tracking-[0.15em] text-white/60 hover:text-white border border-white/20 rounded-full px-3 py-1"
          >
            {copied ? 'Copie !' : 'Copier'}
          </button>
        </div>

        <p className="text-[10px] text-white/30 text-center">Valable une fois par commande</p>
      </div>
    </div>
  )
}
