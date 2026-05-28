# Google OAuth — projet `elwqdulkxprjmkejwcai` (MCP + toldbrand.fr)

Configuré via MCP Supabase : base `orders` / RLS / trigger OK.  
Vercel : URL + clé **anon** alignées sur ce projet.

## Étape restante (2 min) — activer Google dans Supabase

Le MCP **ne peut pas** activer le provider Google (pas d’outil dashboard). À faire une fois :

### 1. Google Cloud Console

[Créer / modifier client OAuth Web](https://console.cloud.google.com/apis/credentials)

| Champ | Valeur |
|-------|--------|
| Origines JavaScript | `https://toldbrand.fr`, `http://localhost:3000` |
| URI de redirection | `https://elwqdulkxprjmkejwcai.supabase.co/auth/v1/callback` |

Copier **ID client** et **Secret**.

### 2. Supabase

[Providers → Google](https://supabase.com/dashboard/project/elwqdulkxprjmkejwcai/auth/providers) → Enable → coller ID + Secret.

[URL Configuration](https://supabase.com/dashboard/project/elwqdulkxprjmkejwcai/auth/url-configuration) :

- Site URL : `https://toldbrand.fr`
- Redirect URLs : `https://toldbrand.fr/auth/callback`, `http://localhost:3000/auth/callback`

### 3. Test

`https://toldbrand.fr/account/login` → **Continuer avec Google**

---

## Option script (si token Supabase)

```powershell
$env:SUPABASE_ACCESS_TOKEN = "sbp_..."  # https://supabase.com/dashboard/account/tokens
$env:GOOGLE_CLIENT_ID = "....apps.googleusercontent.com"
$env:GOOGLE_CLIENT_SECRET = "GOCSPX-..."
.\scripts\configure-supabase-auth.ps1
```
