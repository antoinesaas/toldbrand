import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Conditions générales de vente',
}

export default function CguPage() {
  return (
    <article className="pt-[100px] pb-20 px-6 md:px-16 max-w-3xl mx-auto prose prose-neutral prose-sm">
      <h1 className="text-2xl font-medium uppercase tracking-widest text-center mb-12">
        Conditions générales de vente
      </h1>

      <h2>1. Objet</h2>
      <p>
        Les présentes conditions régissent les ventes de produits TOLD sur le site toldbrand.fr.
      </p>

      <h2>2. Produits</h2>
      <p>
        Les t-shirts sont imprimés à la demande. Les visuels peuvent légèrement varier selon les écrans.
        Coupe relax unisexe, 100 % coton.
      </p>

      <h2>3. Prix</h2>
      <p>
        Les prix sont indiqués en euros TTC. TOLD se réserve le droit de modifier ses tarifs à tout moment.
      </p>

      <h2>4. Commande et paiement</h2>
      <p>
        La commande est validée après paiement intégral via Stripe. Un e-mail de confirmation est envoyé
        à l&apos;adresse fournie lors du checkout.
      </p>

      <h2>5. Livraison</h2>
      <p>
        Livraison à domicile uniquement (pas de retrait en boutique). Expédition sous 24 à 48 h après
        commande. Délai de livraison habituel : 3 à 7 jours ouvrés.{' '}
        <strong>Livraison offerte à partir de 60 €</strong> d&apos;achat.
      </p>

      <h2>6. Droit de rétractation</h2>
      <p>
        Conformément à la réglementation, vous disposez de 14 jours pour exercer votre droit de rétractation.
        Les articles personnalisés ou imprimés à la demande peuvent faire l&apos;objet de restrictions.
        Contact : antoine08.pro@gmail.com
      </p>

      <h2>7. Service client</h2>
      <p>
        Pour toute question :{' '}
        <a href="mailto:antoine08.pro@gmail.com" className="underline">
          antoine08.pro@gmail.com
        </a>
      </p>
    </article>
  )
}
