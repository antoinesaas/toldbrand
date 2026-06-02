type OrderItem = {
  product_name: string
  variant_label?: string | null
  size: string
  quantity: number
}

type OrderRow = {
  id: string
  customer_email: string
  total_cents: number
  currency: string
  order_items?: OrderItem[]
}

/** E-mail de confirmation TOLD (nécessite RESEND_API_KEY sur Vercel). */
export async function sendOrderConfirmationEmail(order: OrderRow): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY?.trim()
  if (!apiKey) {
    console.warn('RESEND_API_KEY not set — skip order confirmation email')
    return false
  }

  const from = process.env.RESEND_FROM?.trim() || 'TOLD <onboarding@resend.dev>'
  const siteUrl = (process.env.NEXT_PUBLIC_URL ?? 'https://toldbrand.fr').replace(/\s/g, '')
  const items = order.order_items ?? []
  const total = (order.total_cents / 100).toLocaleString('fr-FR', {
    style: 'currency',
    currency: order.currency || 'EUR',
  })

  const lines = items
    .map(
      (i) =>
        `<li style="margin-bottom:8px">${i.product_name} — ${i.variant_label ?? ''} / ${i.size} × ${i.quantity}</li>`
    )
    .join('')

  const html = `
    <div style="font-family:sans-serif;max-width:520px;margin:0 auto;color:#111">
      <p style="letter-spacing:0.2em;font-size:11px;text-transform:uppercase;color:#666">TOLD</p>
      <h1 style="font-size:22px;font-weight:600">Merci pour votre commande</h1>
      <p>Votre paiement est confirmé. Nous préparons votre envoi.</p>
      <ul style="padding-left:18px">${lines}</ul>
      <p><strong>Total : ${total}</strong></p>
      <p>
        <a href="${siteUrl}/account/orders/${order.id}" style="display:inline-block;background:#000;color:#fff;padding:12px 24px;text-decoration:none;border-radius:999px;font-size:12px;letter-spacing:0.1em;text-transform:uppercase">
          Suivre ma commande
        </a>
      </p>
      <p style="font-size:12px;color:#666;margin-top:32px">
        Questions ? Répondez à cet e-mail ou écrivez à antoine08.pro@gmail.com
      </p>
    </div>
  `

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to: [order.customer_email],
      subject: 'TOLD — Confirmation de commande',
      html,
    }),
  })

  if (!res.ok) {
    const err = await res.text()
    console.error('Resend email failed:', res.status, err)
    return false
  }

  return true
}
