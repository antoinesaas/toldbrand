import fs from 'fs'

function loadEnv(path) {
  const raw = fs.readFileSync(path, 'utf8')
  const env = {}
  for (const line of raw.split(/\r?\n/)) {
    if (!line || line.startsWith('#')) continue
    const eq = line.indexOf('=')
    if (eq < 0) continue
    const key = line.slice(0, eq)
    let val = line.slice(eq + 1)
    if (val.startsWith('"')) {
      const end = raw.indexOf('"', raw.indexOf(`${key}=`) + key.length + 2)
      val = raw.slice(raw.indexOf(`${key}=`) + key.length + 2, end)
    }
    env[key] = val.replace(/\\n/g, '').replace(/\r/g, '').trim()
  }
  return env
}

const env = loadEnv(process.argv[2] || '.env.verify')

async function checkGelato() {
  const key = env.GELATO_API_KEY
  if (!key) {
    console.log('GELATO: missing API key')
    return
  }
  const res = await fetch('https://order.gelatoapis.com/v4/orders', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'X-API-KEY': key },
    body: JSON.stringify({
      orderType: 'order',
      orderReferenceId: `dry-run-${Date.now()}`,
      currency: 'EUR',
      items: [
        {
          itemReferenceId: 'test-1',
          productUid: env.GELATO_UID_CRY_BETTER_LAMBORGHINI || env.GELATO_UID_JOB_UNEMPLOYED_WHITE,
          quantity: 1,
          files: [
            {
              type: 'default',
              url: 'https://toldbrand.fr/images/products/cry-better-lamborghini/white/front.png',
            },
            {
              type: 'back',
              url: 'https://toldbrand.fr/images/products/cry-better-lamborghini/white/back.png',
            },
          ],
        },
      ],
      shippingAddress: {
        firstName: 'Test',
        lastName: 'Validation',
        addressLine1: '1 rue de Rivoli',
        city: 'Paris',
        postCode: '75001',
        country: 'FR',
        email: 'test-validation@toldbrand.fr',
      },
    }),
  })
  const text = await res.text()
  console.log('GELATO_ORDER_TEST', res.status, text.slice(0, 400))
}

async function checkStripe() {
  const sk = env.STRIPE_SECRET_KEY
  if (!sk?.startsWith('sk_')) {
    console.log('STRIPE: invalid or missing secret key (len=' + (sk?.length ?? 0) + ')')
    return
  }
  const { default: Stripe } = await import('stripe')
  const stripe = new Stripe(sk)
  const products = await stripe.products.list({ limit: 15 })
  console.log('STRIPE_CATALOG', products.data.length, 'products in Dashboard')
  const dynamic = products.data.filter((p) => p.name.includes('—') || p.name.includes('UNEMPLOYED'))
  console.log('STRIPE_TOLD_PRODUCTS', dynamic.length)
  dynamic.slice(0, 5).forEach((p) => console.log(' -', p.name))

  const webhooks = await stripe.webhookEndpoints.list({ limit: 10 })
  const told = webhooks.data.filter((w) => w.url.includes('toldbrand'))
  console.log('STRIPE_WEBHOOKS_TOLDBRAND', told.length)
  told.forEach((w) => console.log(' -', w.url, '|', w.status, '|', w.enabled_events.join(',')))

  const sessions = await stripe.checkout.sessions.list({ limit: 5, status: 'complete' })
  console.log('STRIPE_COMPLETED_SESSIONS', sessions.data.length)
  for (const s of sessions.data.slice(0, 3)) {
    const full = await stripe.checkout.sessions.retrieve(s.id, {
      expand: ['line_items', 'line_items.data.price.product'],
    })
    const items = full.line_items?.data?.length ?? 0
    const ship = Boolean(full.shipping_details?.address)
    const meta = full.line_items?.data?.[0]?.price?.product?.metadata
    console.log(' SESSION', s.id.slice(-12), '| items:', items, '| shipping:', ship, '| gelatoUid:', meta?.gelatoProductUid?.slice(0, 30) ?? 'n/a')
  }
}

await checkStripe()
await checkGelato()
