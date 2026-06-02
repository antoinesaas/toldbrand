# Configuration Supabase — TOLD Brand

Projet : [befyczgottbemittzpop](https://supabase.com/dashboard/project/befyczgottbemittzpop)

> **Attention** : le site **toldbrand.fr** utilise le projet **`befyczgottbemittzpop`**, pas un autre projet Supabase (ex. « totalbread » affiché dans la sidebar). Si vous ouvrez le mauvais projet, vous verrez « No tables » alors que le site écrit ailleurs — ou l’inverse. Vérifiez : `https://toldbrand.fr/api/health/db` → champ `supabaseProjectRef` doit être `befyczgottbemittzpop`.

> **MCP Cursor** : le serveur Supabase doit être lié à `befyczgottbemittzpop`.  
> Voir [`SUPABASE-MCP-README.md`](./SUPABASE-MCP-README.md) et [`configure-supabase-auth.ps1`](./configure-supabase-auth.ps1).

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

## 4. OAuth Google

Voir le guide détaillé : [`setup-google-oauth.md`](./setup-google-oauth.md)

Résumé des URI à saisir dans Google Cloud (client OAuth « Application Web ») :

- **Origines JavaScript** : `https://toldbrand.fr`, `http://localhost:3000`
- **URI de redirection** : `https://befyczgottbemittzpop.supabase.co/auth/v1/callback`

Puis activer **Google** dans Supabase → Providers avec l’ID client et le secret.

## 5. Email (inscription)

**Authentication → Providers → Email** : activer, confirmer par e-mail si souhaité.
