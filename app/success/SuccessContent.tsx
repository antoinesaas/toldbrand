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

  useEffect(() => {
    if (!sessionId) return
    fetch(`/api/orders/confirm?session_id=${encodeURIComponent(sessionId)}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.order) setOrder(data.order)
      })
      .finally(() => setLoading(false))
  }, [sessionId])

  return (
    <div className="pt-32 min-h-screen bg-white px-6 pb-20">
      <div className="max-w-lg mx-auto text-center">
        <h1 className="text-3xl font-bold uppercase tracking-tight mb-4">{t.success.title}</h1>
        <p className="text-neutral-600 mb-8">{t.success.message}</p>

        {loading && <p className="text-sm text-neutral-400 animate-pulse">Chargement de votre commande…</p>}

        {order && (
          <div className="text-left border border-neutral-100 rounded-2xl p-6 mb-8">
            <div className="flex justify-between items-center mb-4">
              <span className="text-xs uppercase tracking-[0.15em] text-neutral-500">Commande confirmée</span>
              <OrderStatusBadge status={order.status} />
            </div>
            <ul className="space-y-3">
              {order.order_items?.map((item, i) => (
                <li key={i} className="flex gap-3 items-center">
                  {item.image_url && (
                    <div className="relative w-12 h-14 bg-neutral-50 rounded-lg shrink-0 overflow-hidden">
                      <Image src={item.image_url} alt="" fill className="object-contain p-0.5" sizes="48px" />
                    </div>
                  )}
                  <div className="min-w-0">
                    <p className="text-sm font-medium truncate">{item.product_name}</p>
                    <p className="text-xs text-neutral-500">
                      {item.variant_label} · {item.size} · x{item.quantity}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm font-medium text-right">
              {(order.total_cents / 100).toLocaleString('fr-FR', {
                style: 'currency',
                currency: order.currency,
              })}
            </p>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          {order?.id && (
            <Link
              href={`/account/orders/${order.id}`}
              className="inline-block text-xs tracking-[0.2em] uppercase bg-black text-white px-8 py-3 rounded-full hover:bg-neutral-800"
            >
              {account.successViewOrders}
            </Link>
          )}
          <Link
            href="/account/register"
            className="inline-block text-xs tracking-[0.2em] uppercase border border-black px-8 py-3 rounded-full hover:bg-black hover:text-white"
          >
            {account.createAccount}
          </Link>
          <Link
            href="/shop"
            className="inline-block text-xs tracking-[0.2em] uppercase border border-neutral-300 px-8 py-3 rounded-full hover:border-black"
          >
            {t.success.cta}
          </Link>
        </div>
      </div>
    </div>
  )
}
