# Configuration Supabase — TOLD Brand

Projet actuel : **`cyabxaynfzjhrzxfldsx`** → [dashboard](https://supabase.com/dashboard/project/cyabxaynfzjhrzxfldsx)

Vérifier à tout moment que le site pointe bien dessus :
`https://toldbrand.fr/api/health/db` → `supabaseProjectRef` doit valoir `cyabxaynfzjhrzxfldsx`.

> Les anciens projets (`befyczgottbemittzpop`, `elwqdulkxprjmkejwcai`) ne sont plus utilisés.

## 1. Base de données

[SQL Editor](https://supabase.com/dashboard/project/cyabxaynfzjhrzxfldsx/sql/new) → coller **tout** `supabase/schema.sql` → **Run**.

Le script est relançable sans risque. Résultat attendu dans Table Editor : `orders` et `order_items`.

## 2. Variables Vercel (Settings → Environment Variables → Production)

Valeurs dans Supabase → **Project Settings → API Keys** :

| Variable | Valeur |
|----------|--------|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://cyabxaynfzjhrzxfldsx.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | clé **anon / publishable** |
| `SUPABASE_SERVICE_ROLE_KEY` | clé **service_role / secret** (ne jamais la mettre côté client) |

Puis **Redeploy** le dernier déploiement (les variables ne s'appliquent qu'aux nouveaux déploiements).

## 3. Auth — URLs de redirection

[Authentication → URL Configuration](https://supabase.com/dashboard/project/cyabxaynfzjhrzxfldsx/auth/url-configuration) :

- Site URL : `https://toldbrand.fr`
- Redirect URLs : `https://toldbrand.fr/auth/callback` et `http://localhost:3000/auth/callback`

## 4. Connexion Google (optionnel)

1. [Google Cloud Console](https://console.cloud.google.com/apis/credentials) → ton client OAuth « Application Web »
2. **URI de redirection autorisés** : remplacer l'ancienne par
   `https://cyabxaynfzjhrzxfldsx.supabase.co/auth/v1/callback`
3. [Supabase → Providers → Google](https://supabase.com/dashboard/project/cyabxaynfzjhrzxfldsx/auth/providers) → activer, coller Client ID + Secret.

Ou en une commande (PowerShell) : `scripts/configure-supabase-auth.ps1`.

| Erreur | Cause probable |
|--------|----------------|
| `redirect_uri_mismatch` | URI Supabase manquante dans Google Cloud |
| `Access blocked` | App OAuth en mode Test → ajouter ton e-mail dans « Utilisateurs de test » |
| Retour sur le site sans session | Redirect URL manquante dans Supabase (étape 3) |

## 5. Anti-pause

Le plan gratuit met un projet en pause après ~7 jours sans activité. Le cron Vercel
(`vercel.json`) appelle `/api/health/db` chaque matin pour le garder actif.

## Comment une commande est traitée

1. Stripe envoie `checkout.session.completed` → `/api/webhooks/stripe`
2. Le site crée la commande **Gelato d'abord** (en vérifiant qu'elle n'existe pas déjà)
3. Puis l'enregistre dans Supabase — si la base est en panne, le colis part quand même,
   la base est rattrapée au prochain passage
4. Stripe ne reçoit une erreur (et ne renvoie l'événement) que si **Gelato** a échoué
