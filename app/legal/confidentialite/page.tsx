import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Politique de confidentialité',
}

export default function ConfidentialitePage() {
  return (
    <article className="pt-[100px] pb-20 px-6 md:px-16 max-w-3xl mx-auto prose prose-neutral prose-sm">
      <h1 className="text-2xl font-medium uppercase tracking-widest text-center mb-12">
        Politique de confidentialité
      </h1>

      <p>
        TOLD s&apos;engage à protéger vos données personnelles conformément au RGPD.
      </p>

      <h2>Données collectées</h2>
      <p>
        Nom, adresse, e-mail et informations de commande lors d&apos;un achat. Données de navigation
        anonymisées via cookies techniques.
      </p>

      <h2>Finalités</h2>
      <ul>
        <li>Traitement et livraison des commandes</li>
        <li>Service client</li>
        <li>Amélioration du site</li>
      </ul>

      <h2>Conservation</h2>
      <p>Les données de commande sont conservées pendant la durée légale applicable (10 ans pour les factures).</p>

      <h2>Vos droits</h2>
      <p>
        Accès, rectification, suppression : contactez{' '}
        <a href="mailto:antoine08.pro@gmail.com" className="underline">
          antoine08.pro@gmail.com
        </a>
      </p>
    </article>
  )
}
