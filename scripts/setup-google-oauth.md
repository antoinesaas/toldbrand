# Google OAuth — TOLD Brand (Supabase)

Projet Supabase : `befyczgottbemittzpop`  
Site : `https://toldbrand.fr`

## 1. Google Cloud Console

1. [Google Cloud Console](https://console.cloud.google.com/) → **APIs & Services** → **Credentials**
2. **+ Créer des identifiants** → **ID client OAuth**
3. Type : **Application Web**
4. Nom : `TOLD Brand Web` (ou « Client Web 1 »)

### Origines JavaScript autorisées

Cliquer **+ Ajouter un URI** pour chaque ligne :

```
https://toldbrand.fr
http://localhost:3000
```

### URI de redirection autorisés

Cliquer **+ Ajouter un URI** :

```
https://befyczgottbemittzpop.supabase.co/auth/v1/callback
```

> Important : c’est l’URL **Supabase**, pas `https://toldbrand.fr/auth/callback`.  
> Google renvoie d’abord vers Supabase, qui redirige ensuite vers votre site.

5. **Créer** → copier **ID client** et **Secret client**

### Écran de consentement OAuth (si demandé)

- Type : **Externe**
- Nom de l’application : `TOLD`
- E-mail d’assistance : votre e-mail
- Domaine autorisé : `toldbrand.fr`
- Utilisateurs de test : ajoutez votre Gmail tant que l’app est en « Test »

## 2. Supabase

[Dashboard → Authentication → Providers → Google](https://supabase.com/dashboard/project/befyczgottbemittzpop/auth/providers)

- Activer **Google**
- Coller **Client ID** et **Client Secret** depuis Google Cloud
- Enregistrer

### URLs de redirection (déjà requis pour le site)

[Authentication → URL Configuration](https://supabase.com/dashboard/project/befyczgottbemittzpop/auth/url-configuration)

| Champ | Valeur |
|-------|--------|
| Site URL | `https://toldbrand.fr` |
| Redirect URLs | `https://toldbrand.fr/auth/callback` |
| | `http://localhost:3000/auth/callback` |

## 3. Vérification

1. Aller sur `https://toldbrand.fr/account/login`
2. Cliquer **Continuer avec Google**
3. Après connexion → redirection vers `/account/orders`

## Dépannage

| Erreur | Cause probable |
|--------|----------------|
| `redirect_uri_mismatch` | URI manquant dans Google Cloud → vérifier `…supabase.co/auth/v1/callback` |
| `Access blocked` | App OAuth en mode Test → ajouter l’e-mail dans « Utilisateurs de test » |
| Retour sur le site sans session | Redirect URL manquant dans Supabase → `https://toldbrand.fr/auth/callback` |
