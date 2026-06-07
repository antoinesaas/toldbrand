import Link from 'next/link'
import AuthForm from '@/components/account/AuthForm'

export default function RegisterPage() {
  return (
    <div className="pt-32 pb-20 px-6 min-h-screen bg-[#0a0a0a]">
      <h1 className="text-center text-2xl font-serif uppercase tracking-[0.12em] mb-10 text-white">
        Créer un compte
      </h1>
      <AuthForm mode="register" />
      <p className="text-center mt-8 text-sm text-white/50">
        Déjà un compte ?{' '}
        <Link href="/account/login" className="text-white underline">
          Se connecter
        </Link>
      </p>
    </div>
  )
}
