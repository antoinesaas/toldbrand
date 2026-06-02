# Webhook Gelato — configuration manuelle

Le endpoint est déjà déployé sur le site. Il faut l’enregistrer dans le **Dashboard Gelato** (l’API ne permet pas toujours de le faire par code).

## Étapes

1. Ouvrir [Créer un webhook Gelato](https://dashboard.gelato.com/webhooks/create)
2. Renseigner :
   - **URL** : `https://toldbrand.fr/api/webhooks/gelato`
   - **Méthode** : `POST`
   - **Événement** : `order_status_updated` (obligatoire pour le suivi commande)
   - Optionnel : `order_item_status_updated`
3. Cliquer sur **Test** / **Send test notification** — la réponse doit être **2xx**
4. Enregistrer le webhook

## Ce que fait le site

Quand Gelato envoie `order_status_updated`, le site met à jour la commande Supabase :

- `gelato_order_id` → correspondance via `orderId` Gelato ou `orderReferenceId` (= ID session Stripe)
- `gelato_status` / `status` → expédié, en production, livré, etc.
- `tracking_url` / `tracking_number` si présents dans le payload

## Test après un paiement

1. Passer une commande test (tee Job Unemployed à 0 €)
2. Vérifier dans Gelato que la commande est créée
3. Dans Gelato → Webhooks → logs : l’événement doit être **delivered**
4. Sur le site → **Mon compte** → la commande doit afficher le statut mis à jour
