import Link from 'next/link'
import AuthForm from '@/components/account/AuthForm'

export default function LoginPage({
  searchParams,
}: {
  searchParams: { redirect?: string; error?: string }
}) {
  const redirect = searchParams.redirect ?? '/account/orders'

  const checkoutReturn = redirect === '/cart' || redirect.startsWith('/shop/')

  return (
    <div className="pt-32 pb-20 px-6 min-h-screen bg-[#0a0a0a]">
      <h1 className="text-center text-2xl font-serif uppercase tracking-[0.12em] mb-10 text-white">Connexion</h1>
      {checkoutReturn && (
        <p className="text-center text-sm text-white/60 max-w-md mx-auto mb-8 -mt-4">
          Connectez-vous ou créez un compte pour payer et suivre votre commande.
        </p>
      )}
      <AuthForm mode="login" redirectTo={redirect} initialError={searchParams.error ?? null} />
      <p className="text-center mt-8 text-sm text-white/50">
        Pas encore de compte ?{' '}
        <Link href="/account/register" className="text-white underline">
          Créer un compte
        </Link>
      </p>
    </div>
  )
}
