import Image from 'next/image'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { redirect, notFound } from 'next/navigation'
import OrderStatusBadge from '@/components/account/OrderStatusBadge'
import OrderTimeline from '@/components/account/OrderTimeline'
import type { OrderStatus } from '@/lib/orders'
import AccountHeader from '@/components/account/AccountHeader'

export const dynamic = 'force-dynamic'

export default async function OrderDetailPage({ params }: { params: { id: string } }) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect('/account/login')

  const { data: order } = await supabase
    .from('orders')
    .select('*, order_items(*)')
    .eq('id', params.id)
    .maybeSingle()

  if (!order) notFound()

  const items = order.order_items ?? []
  const address = order.shipping_address as {
    line1?: string
    line2?: string
    city?: string
    postal_code?: string
    country?: string
  } | null

  return (
    <div className="pt-28 pb-20 px-4 md:px-8 min-h-screen max-w-3xl mx-auto">
      <AccountHeader />

      <Link
        href="/account/orders"
        className="text-xs uppercase tracking-[0.15em] text-neutral-500 hover:text-black mb-6 inline-block"
      >
        ← Retour
      </Link>

      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <h1 className="text-xl font-serif uppercase tracking-[0.12em]">
          Commande
        </h1>
        <OrderStatusBadge status={order.status as OrderStatus} />
      </div>

      <p className="text-sm text-neutral-500 mb-8">
        {new Date(order.created_at).toLocaleString('fr-FR')}
      </p>

      <div className="grid md:grid-cols-2 gap-8 mb-10">
        <div>
          <h2 className="text-[10px] uppercase tracking-[0.2em] text-neutral-400 mb-4">Suivi</h2>
          <OrderTimeline status={order.status as OrderStatus} />
          {order.tracking_url && (
            <a
              href={order.tracking_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-6 text-xs uppercase tracking-[0.15em] underline"
            >
              Suivre le colis
              {order.tracking_number ? ` · ${order.tracking_number}` : ''}
            </a>
          )}
        </div>
        {address && (
          <div>
            <h2 className="text-[10px] uppercase tracking-[0.2em] text-neutral-400 mb-4">Livraison</h2>
            <p className="text-sm leading-relaxed text-neutral-700">
              {order.shipping_name}
              <br />
              {address.line1}
              {address.line2 ? <>, {address.line2}</> : null}
              <br />
              {address.postal_code} {address.city}
              <br />
              {address.country}
            </p>
          </div>
        )}
      </div>

      <h2 className="text-[10px] uppercase tracking-[0.2em] text-neutral-400 mb-4">Articles</h2>
      <ul className="divide-y divide-neutral-100 border-t border-neutral-100">
        {items.map((item: {
          id: string
          product_name: string
          variant_label: string
          size: string
          quantity: number
          unit_price_cents: number
          image_url: string
        }) => (
          <li key={item.id} className="flex gap-4 py-4">
            {item.image_url && (
              <div className="relative w-20 h-24 bg-neutral-50 rounded-xl shrink-0 overflow-hidden">
                <Image src={item.image_url} alt={item.product_name} fill className="object-contain p-1" sizes="80px" />
              </div>
            )}
            <div>
              <p className="text-sm font-medium">{item.product_name}</p>
              <p className="text-xs text-neutral-500 mt-1">
                {item.variant_label} · {item.size} · x{item.quantity}
              </p>
              <p className="text-sm mt-2">
                {((item.unit_price_cents * item.quantity) / 100).toLocaleString('fr-FR', {
                  style: 'currency',
                  currency: order.currency,
                })}
              </p>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-8 pt-6 border-t border-neutral-100 flex justify-between text-sm font-medium">
        <span>Total</span>
        <span>
          {(order.total_cents / 100).toLocaleString('fr-FR', {
            style: 'currency',
            currency: order.currency,
          })}
        </span>
      </div>
    </div>
  )
}
