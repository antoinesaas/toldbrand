import { createAdminClient } from '@/lib/supabase/admin'

/** Lecture commandes via service role (évite les soucis RLS) — filtré par utilisateur connecté. */
export async function getOrdersForUser(userId: string, email: string) {
  const admin = createAdminClient()
  const { data, error } = await admin
    .from('orders')
    .select('*, order_items(*)')
    .or(`user_id.eq.${userId},customer_email.eq.${email}`)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data ?? []
}

export async function getOrderForUser(orderId: string, userId: string, email: string) {
  const admin = createAdminClient()
  const { data, error } = await admin
    .from('orders')
    .select('*, order_items(*)')
    .eq('id', orderId)
    .or(`user_id.eq.${userId},customer_email.eq.${email}`)
    .maybeSingle()

  if (error) throw error
  return data
}
