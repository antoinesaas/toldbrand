import Link from 'next/link'
import AuthForm from '@/components/account/AuthForm'

export default function LoginPage({
  searchParams,
}: {
  searchParams: { redirect?: string; error?: string }
}) {
  const redirect = searchParams.redirect ?? '/account/orders'

  return (
    <div className="pt-32 pb-20 px-6 min-h-screen">
      <h1 className="text-center text-2xl font-serif uppercase tracking-[0.12em] mb-10">Connexion</h1>
      <AuthForm mode="login" redirectTo={redirect} initialError={searchParams.error ?? null} />
      <p className="text-center mt-8 text-sm text-neutral-500">
        Pas encore de compte ?{' '}
        <Link href="/account/register" className="text-black underline">
          Créer un compte
        </Link>
      </p>
    </div>
  )
}
