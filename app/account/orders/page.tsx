import Link from 'next/link'
import Image from 'next/image'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import OrderStatusBadge from '@/components/account/OrderStatusBadge'
import type { OrderStatus } from '@/lib/orders'
import { getOrdersForUser } from '@/lib/get-user-orders'
import { linkOrdersToUser } from '@/lib/orders'
import AccountHeader from '@/components/account/AccountHeader'

export const dynamic = 'force-dynamic'

export default async function OrdersPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect('/account/login')

  if (user.email) {
    await linkOrdersToUser(user.id, user.email)
  }

  let orders: Awaited<ReturnType<typeof getOrdersForUser>> = []
  try {
    orders = await getOrdersForUser(user.id, user.email ?? '')
  } catch (err) {
    console.error('getOrdersForUser:', err)
  }

  return (
    <div className="pt-28 pb-20 px-4 md:px-8 min-h-screen max-w-3xl mx-auto">
      <AccountHeader />

      <h1 className="text-xl font-serif uppercase tracking-[0.12em] mb-8">Mes commandes</h1>

      {!orders?.length ? (
        <p className="text-sm text-neutral-500 text-center py-16">Aucune commande pour le moment.</p>
      ) : (
        <ul className="space-y-4">
          {orders.map((order) => {
            const items = order.order_items ?? []
            const firstImage = items[0]?.image_url
            return (
              <li key={order.id} className="border border-neutral-100 rounded-2xl p-4 hover:border-neutral-200">
                <Link href={`/account/orders/${order.id}`} className="block">
                  <div className="flex gap-4">
                    {firstImage && (
                      <div className="relative w-16 h-20 bg-neutral-50 rounded-xl shrink-0 overflow-hidden">
                        <Image src={firstImage} alt="" fill className="object-contain p-1" sizes="64px" />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                        <p className="text-xs text-neutral-500">
                          {new Date(order.created_at).toLocaleDateString('fr-FR')}
                        </p>
                        <OrderStatusBadge status={order.status as OrderStatus} />
                      </div>
                      <p className="text-sm font-medium truncate">
                        {items.map((i: { product_name: string }) => i.product_name).join(', ')}
                      </p>
                      <p className="text-sm text-neutral-600 mt-1">
                        {(order.total_cents / 100).toLocaleString('fr-FR', {
                          style: 'currency',
                          currency: order.currency,
                        })}
                      </p>
                    </div>
                  </div>
                </Link>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
