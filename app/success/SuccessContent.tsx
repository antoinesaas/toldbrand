'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import Image from 'next/image'
import { useI18n } from '@/lib/i18n/use-i18n'
import { ACCOUNT_COPY } from '@/lib/order-labels'
import OrderStatusBadge from '@/components/account/OrderStatusBadge'
import type { OrderStatus } from '@/lib/orders'

type OrderItem = {
  product_name: string
  variant_label: string
  size: string
  quantity: number
  image_url: string
}

type Order = {
  id: string
  status: OrderStatus
  total_cents: number
  currency: string
  order_items: OrderItem[]
}

export default function SuccessContent() {
  const { t, language } = useI18n()
  const account = ACCOUNT_COPY[language]
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('session_id')
  const [order, setOrder] = useState<Order | null>(null)
  const [loading, setLoading] = useState(!!sessionId)
  const [syncError, setSyncError] = useState<string | null>(null)
  const [gelatoError, setGelatoError] = useState<string | null>(null)
  const [retryingGelato, setRetryingGelato] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    fetch('/api/auth/me', { credentials: 'include' })
      .then((r) => r.json())
      .then((data) => setIsLoggedIn(Boolean(data.user)))
      .catch(() => setIsLoggedIn(false))
  }, [])

  useEffect(() => {
    if (!sessionId) return
    setSyncError(null)
    fetch(`/api/orders/confirm?session_id=${encodeURIComponent(sessionId)}`, {
      credentials: 'include',
    })
      .then((r) => r.json())
      .then((data) => {
        if (data.order) {
          setOrder(data.order)
        }
        if (data.gelatoError) {
          setGelatoError(data.gelatoError)
        }
        if (data.error) {
          setSyncError(data.error)
        }
      })
      .catch(() => setSyncError('Impossible de charger la commande.'))
      .finally(() => setLoading(false))
  }, [sessionId])

  const message = isLoggedIn ? t.success.messageLoggedIn : t.success.message

  return (
    <div className="pt-32 min-h-screen px-6 pb-20 bg-[#0a0a0a]">
      <div className="max-w-lg mx-auto text-center">
        <h1 className="text-3xl font-bold uppercase tracking-tight mb-4 text-white">{t.success.title}</h1>
        <p className="text-white/60 mb-4">{message}</p>
        <p className="text-xs text-white/30 mb-8">{t.success.emailNote}</p>

        {loading && (
          <p className="text-sm text-white/30 animate-pulse mb-8">Enregistrement de votre commande...</p>
        )}

        {syncError && (
          <p className="text-sm text-amber-400 bg-amber-500/10 border border-amber-500/20 rounded-xl px-4 py-3 mb-8">
            {syncError} — contactez-nous avec votre preuve de paiement.
          </p>
        )}

        {gelatoError && !syncError && (
          <div className="text-sm text-amber-400 bg-amber-500/10 border border-amber-500/20 rounded-xl px-4 py-3 mb-8 text-left">
            <p className="font-medium mb-1">Paiement recu — envoi atelier en attente</p>
            <p className="text-xs text-amber-400/70 mb-3">{gelatoError}</p>
            {isLoggedIn && sessionId && (
              <button
                type="button"
                disabled={retryingGelato}
                onClick={async () => {
                  setRetryingGelato(true)
                  try {
                    const res = await fetch('/api/orders/retry-gelato', {
                      method: 'POST',
                      credentials: 'include',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({ sessionId }),
                    })
                    const data = await res.json()
                    if (data.gelatoOrderId) {
                      setGelatoError(null)
                    } else if (data.gelatoError || data.error) {
                      setGelatoError(data.gelatoError ?? data.error)
                    }
                  } finally {
                    setRetryingGelato(false)
                  }
                }}
                className="text-xs uppercase tracking-wider underline disabled:opacity-50 text-amber-400"
              >
                {retryingGelato ? "Envoi en cours..." : "Reessayer l'envoi a l'atelier"}
              </button>
            )}
          </div>
        )}

        {order && (
          <div className="text-left border border-white/10 bg-[#111] rounded-2xl p-6 mb-8">
            <div className="flex justify-between items-center mb-4">
              <span className="text-xs uppercase tracking-[0.15em] text-white/40">Commande confirmee</span>
              <OrderStatusBadge status={order.status} />
            </div>
            <ul className="space-y-3">
              {order.order_items?.map((item, i) => (
                <li key={i} className="flex gap-3 items-center">
                  {item.image_url && (
                    <div className="relative w-12 h-14 bg-white/5 rounded-lg shrink-0 overflow-hidden">
                      <Image src={item.image_url} alt="" fill className="object-contain p-0.5" sizes="48px" />
                    </div>
                  )}
                  <div className="min-w-0">
                    <p className="text-sm font-medium truncate text-white">{item.product_name}</p>
                    <p className="text-xs text-white/40">
                      {item.variant_label} · {item.size} · x{item.quantity}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm font-medium text-right text-white">
              {(order.total_cents / 100).toLocaleString('fr-FR', {
                style: 'currency',
                currency: order.currency,
              })}
            </p>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3 justify-center flex-wrap">
          {order?.id && (
            <Link
              href={`/account/orders/${order.id}`}
              className="inline-block text-xs tracking-[0.2em] uppercase bg-white text-black px-8 py-3 rounded-full hover:bg-white/90"
            >
              {account.successViewOrders}
            </Link>
          )}

          {isLoggedIn ? (
            <Link
              href="/account/orders"
              className="inline-block text-xs tracking-[0.2em] uppercase border border-white/20 text-white px-8 py-3 rounded-full hover:bg-white/10"
            >
              {account.myOrders}
            </Link>
          ) : (
            <Link
              href={`/account/login?redirect=${encodeURIComponent('/account/orders')}`}
              className="inline-block text-xs tracking-[0.2em] uppercase border border-white/20 text-white px-8 py-3 rounded-full hover:bg-white/10"
            >
              {account.createAccount}
            </Link>
          )}

          <Link
            href="/shop"
            className="inline-block text-xs tracking-[0.2em] uppercase border border-white/10 text-white/60 px-8 py-3 rounded-full hover:border-white/40 hover:text-white"
          >
            {t.success.cta}
          </Link>
        </div>
      </div>
    </div>
  )
}
