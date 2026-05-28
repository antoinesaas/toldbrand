# Supabase MCP — projet TOLD Brand

## Projet attendu

| | Valeur |
|---|--------|
| **Ref** | `befyczgottbemittzpop` |
| **URL** | `https://befyczgottbemittzpop.supabase.co` |
| **Callback OAuth (Google Cloud)** | `https://befyczgottbemittzpop.supabase.co/auth/v1/callback` |

## Ce que le MCP peut faire

- Migrations SQL (`orders`, `order_items`, RLS, trigger liaison commandes)
- Requêtes SQL, logs auth, clés du projet **lié au MCP**

## Ce que le MCP ne peut pas faire

- Activer Google / désactiver Apple (réglages Auth → hors SQL)
- Changer les **Redirect URLs** dans le dashboard (sauf via [Management API](./configure-supabase-auth.ps1))

## Reconnecter le MCP au bon projet

1. Cursor → **Settings** → **MCP** → serveur **Supabase**
2. Choisir le projet **`befyczgottbemittzpop`** (pas `elwqdulkxprjmkejwcai`)
3. Redémarrer Cursor si besoin

Puis demander à l’agent d’exécuter `apply_migration` avec le fichier  
`supabase/migrations/20250328120000_toldbrand_orders.sql`.

## Configuration Auth (dashboard ou script)

### Option A — Dashboard

[URL Configuration](https://supabase.com/dashboard/project/befyczgottbemittzpop/auth/url-configuration)

| Champ | Valeur |
|-------|--------|
| Site URL | `https://toldbrand.fr` |
| Redirect URLs | `https://toldbrand.fr/auth/callback` |
| | `http://localhost:3000/auth/callback` |

[Google Provider](https://supabase.com/dashboard/project/befyczgottbemittzpop/auth/providers) → activer, coller Client ID + Secret.

Désactiver **Apple** dans Providers.

### Option B — Script Management API

```powershell
$env:SUPABASE_ACCESS_TOKEN = "sbp_..."
$env:GOOGLE_CLIENT_ID = "....apps.googleusercontent.com"
$env:GOOGLE_CLIENT_SECRET = "GOCSPX-..."
.\scripts\configure-supabase-auth.ps1
```

## Vercel — clés à aligner

Sur Vercel, **URL et clé anon doivent être du même projet** :

| Variable | Valeur |
|----------|--------|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://befyczgottbemittzpop.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | clé **anon** de `befyczgottbemittzpop` (Dashboard → Settings → API) |
| `SUPABASE_SERVICE_ROLE_KEY` | clé **service_role** du même projet |

Si l’anon key contient `"ref":"elwqdulkxprjmkejwcai"` dans le JWT, c’est la mauvaise clé.
