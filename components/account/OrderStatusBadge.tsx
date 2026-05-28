'use client'

import type { OrderStatus } from '@/lib/orders'
import { ORDER_STATUS_LABELS } from '@/lib/order-labels'
import { useI18n } from '@/lib/i18n/use-i18n'

const STATUS_STYLE: Record<OrderStatus, string> = {
  pending: 'bg-neutral-100 text-neutral-600',
  paid: 'bg-emerald-50 text-emerald-800',
  processing: 'bg-amber-50 text-amber-800',
  in_production: 'bg-blue-50 text-blue-800',
  shipped: 'bg-indigo-50 text-indigo-800',
  delivered: 'bg-emerald-100 text-emerald-900',
  cancelled: 'bg-neutral-200 text-neutral-700',
  failed: 'bg-red-50 text-red-700',
}

export default function OrderStatusBadge({ status }: { status: OrderStatus }) {
  const { language } = useI18n()
  const label = ORDER_STATUS_LABELS[language][status] ?? status

  return (
    <span
      className={`inline-block text-[10px] uppercase tracking-[0.15em] px-3 py-1 rounded-full font-medium ${STATUS_STYLE[status]}`}
    >
      {label}
    </span>
  )
}
