import fs from 'fs'
const raw = fs.readFileSync(process.argv[2] || '.env.chk', 'utf8')
const m = raw.match(/STRIPE_SECRET_KEY=(?:"([^"]+)"|([^\r\n]+))/)
const sk = (m?.[1] || m?.[2] || '').replace(/\\n/g, '').trim()
if (sk.startsWith('sk_live')) console.log('TEST_OR_LIVE', 'LIVE')
else if (sk.startsWith('sk_test')) console.log('TEST_OR_LIVE', 'TEST')
else console.log('TEST_OR_LIVE', 'UNKNOWN', 'len', sk.length)
