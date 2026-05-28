'use client'

import type { OrderStatus } from '@/lib/orders'
import { ORDER_STATUS_LABELS } from '@/lib/order-labels'
import { useI18n } from '@/lib/i18n/use-i18n'

const STEPS: OrderStatus[] = ['paid', 'processing', 'in_production', 'shipped', 'delivered']

function stepIndex(status: OrderStatus) {
  if (status === 'cancelled' || status === 'failed') return -1
  if (status === 'pending') return 0
  const idx = STEPS.indexOf(status)
  return idx >= 0 ? idx : 1
}

export default function OrderTimeline({ status }: { status: OrderStatus }) {
  const { language } = useI18n()
  const current = stepIndex(status)
  const isError = status === 'cancelled' || status === 'failed'

  if (isError) {
    return (
      <p className="text-sm text-red-600">
        {ORDER_STATUS_LABELS[language][status]}
      </p>
    )
  }

  return (
    <ol className="space-y-3">
      {STEPS.map((step, i) => {
        const done = i <= current
        const active = i === current
        return (
          <li key={step} className="flex items-center gap-3">
            <span
              className={`w-2.5 h-2.5 rounded-full shrink-0 ${
                done ? 'bg-black' : 'bg-neutral-200'
              } ${active ? 'ring-2 ring-offset-2 ring-black' : ''}`}
            />
            <span
              className={`text-xs tracking-wide ${
                done ? 'text-black font-medium' : 'text-neutral-400'
              }`}
            >
              {ORDER_STATUS_LABELS[language][step]}
            </span>
          </li>
        )
      })}
    </ol>
  )
}
