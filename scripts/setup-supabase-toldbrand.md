# Configuration Supabase — TOLD Brand

Projet : [befyczgottbemittzpop](https://supabase.com/dashboard/project/befyczgottbemittzpop)

## 1. Base de données

1. Ouvrir **SQL Editor** dans le dashboard
2. Coller et exécuter le fichier `supabase/migrations/20250328120000_toldbrand_orders.sql`

## 2. Variables Vercel

Dashboard → **Settings → API** :

| Variable | Valeur |
|----------|--------|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://befyczgottbemittzpop.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | clé **anon** `public` |
| `SUPABASE_SERVICE_ROLE_KEY` | clé **service_role** (secrète) |

```bash
vercel env add NEXT_PUBLIC_SUPABASE_URL production
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY production
vercel env add SUPABASE_SERVICE_ROLE_KEY production
vercel deploy --prod
```

## 3. Auth — URLs de redirection

**Authentication → URL Configuration** :

- Site URL : `https://toldbrand.fr`
- Redirect URLs :
  - `https://toldbrand.fr/auth/callback`
  - `http://localhost:3000/auth/callback`

## 4. OAuth Google & Apple

**Authentication → Providers** :

- Activer **Google** (Client ID + Secret depuis Google Cloud Console)
- Activer **Apple** (Service ID + clé depuis Apple Developer)

## 5. Email (inscription)

**Authentication → Providers → Email** : activer, confirmer par e-mail si souhaité.
