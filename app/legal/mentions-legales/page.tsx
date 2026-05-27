import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Mentions légales',
}

export default function MentionsLegalesPage() {
  return (
    <article className="pt-[100px] pb-20 px-6 md:px-16 max-w-3xl mx-auto prose prose-neutral prose-sm">
      <h1 className="text-2xl font-medium uppercase tracking-widest text-center mb-12">
        Mentions légales
      </h1>

      <h2>Éditeur du site</h2>
      <p>
        Le site <strong>toldbrand.fr</strong> est édité par TOLD.
        <br />
        Contact :{' '}
        <a href="mailto:antoine08.pro@gmail.com" className="underline">
          antoine08.pro@gmail.com
        </a>
      </p>

      <h2>Hébergement</h2>
      <p>
        Le site est hébergé par Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis.
      </p>

      <h2>Propriété intellectuelle</h2>
      <p>
        L&apos;ensemble des éléments du site (textes, visuels, logos, vidéos) est protégé par le droit
        d&apos;auteur. Toute reproduction sans autorisation est interdite.
      </p>

      <h2>Données personnelles</h2>
      <p>
        Les données collectées lors d&apos;une commande sont utilisées uniquement pour le traitement de
        celle-ci. Consultez notre{' '}
        <a href="/legal/confidentialite" className="underline">
          politique de confidentialité
        </a>
        .
      </p>

      <h2>Paiement</h2>
      <p>
        Les paiements sont sécurisés via Stripe. TOLD ne conserve pas les données bancaires des clients.
      </p>
    </article>
  )
}
