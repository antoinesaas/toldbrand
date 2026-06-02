'use client'

import { useMemo, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useI18n } from '@/lib/i18n/use-i18n'
import { ACCOUNT_COPY } from '@/lib/order-labels'

interface Props {
  mode: 'login' | 'register'
  redirectTo?: string
  initialError?: string | null
}

function mapAuthError(message: string): string {
  const m = message.toLowerCase()
  if (m.includes('invalid login credentials')) {
    return 'E-mail ou mot de passe incorrect.'
  }
  if (m.includes('user already registered')) {
    return 'Un compte existe déjà avec cet e-mail. Connectez-vous.'
  }
  if (m.includes('email not confirmed')) {
    return 'Confirmez votre e-mail avant de vous connecter (vérifiez vos spams).'
  }
  if (m.includes('invalid api key')) {
    return 'Configuration Supabase incorrecte sur le serveur (clé API). Contactez le support.'
  }
  if (m.includes('redirect_uri_mismatch')) {
    return 'Connexion Google mal configurée (URI de redirection).'
  }
  if (m.includes('access blocked') || m.includes('access_denied')) {
    return 'Accès Google refusé. Réessayez ou utilisez e-mail / mot de passe.'
  }
  return message
}

function EyeIcon({ open }: { open: boolean }) {
  if (open) {
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    )
  }
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M3 3l18 18M10.58 10.58A3 3 0 0 0 12 15a3 3 0 0 0 2.42-4.42M9.88 4.24A10.94 10.94 0 0 1 12 5c6.5 0 10 7 10 7a18.2 18.2 0 0 1-4.12 5.12M6.61 6.61C4.09 8.21 2.36 10.24 2 12s3.5 7 10 7a10.8 10.8 0 0 0 4.39-.89"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  )
}

export default function AuthForm({ mode, redirectTo = '/account/orders', initialError }: Props) {
  const { language } = useI18n()
  const t = ACCOUNT_COPY[language]
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(
    initialError ? mapAuthError(initialError) : null
  )
  const [success, setSuccess] = useState<string | null>(null)

  const supabaseConfigured = Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  )

  const supabase = useMemo(() => {
    if (!supabaseConfigured) return null
    return createClient()
  }, [supabaseConfigured])

  const baseUrl = typeof window !== 'undefined' ? window.location.origin : ''

  async function onEmailSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!supabase) return

    setLoading(true)
    setError(null)
    setSuccess(null)

    const endpoint = mode === 'register' ? '/api/auth/register' : '/api/auth/login'
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
      credentials: 'include',
    })
    const data = await res.json()

    if (!res.ok) {
      setError(mapAuthError(data.error ?? 'Erreur de connexion'))
      setLoading(false)
      return
    }

    if (mode === 'register' && data.needsEmailConfirmation) {
      setSuccess(
        data.message ??
          'Compte créé. Vérifiez votre boîte mail pour confirmer votre inscription.'
      )
      setLoading(false)
      return
    }

    window.location.href = redirectTo
  }

  async function onGoogleSignIn() {
    if (!supabase) return

    setLoading(true)
    setError(null)
    setSuccess(null)

    const { error: oauthError } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${baseUrl}/auth/callback?next=${encodeURIComponent(redirectTo)}`,
      },
    })

    if (oauthError) {
      setError(mapAuthError(oauthError.message))
      setLoading(false)
    }
  }

  if (!supabaseConfigured) {
    return (
      <p className="text-sm text-red-600 text-center">
        Authentification indisponible : variables Supabase manquantes sur le serveur.
      </p>
    )
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={onEmailSubmit} className="space-y-4">
        <div>
          <label className="text-[10px] tracking-[0.2em] uppercase text-neutral-500">{t.email}</label>
          <input
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-full border border-neutral-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-black"
          />
        </div>
        <div>
          <label className="text-[10px] tracking-[0.2em] uppercase text-neutral-500">{t.password}</label>
          <div className="relative mt-1">
            <input
              type={showPassword ? 'text' : 'password'}
              required
              minLength={6}
              autoComplete={mode === 'register' ? 'new-password' : 'current-password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-neutral-200 rounded-xl px-4 py-3 pr-12 text-sm focus:outline-none focus:border-black"
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-neutral-400 hover:text-black"
              aria-label={showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
            >
              <EyeIcon open={showPassword} />
            </button>
          </div>
        </div>
        {error && <p className="text-sm text-red-600">{error}</p>}
        {success && <p className="text-sm text-green-700">{success}</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full h-12 bg-black text-white text-xs uppercase tracking-[0.15em] rounded-full hover:bg-neutral-800 disabled:opacity-50"
        >
          {mode === 'login' ? t.signIn : t.signUp}
        </button>
      </form>

      <div className="my-6 flex items-center gap-4">
        <div className="flex-1 h-px bg-neutral-200" />
        <span className="text-[10px] text-neutral-400 uppercase tracking-widest">ou</span>
        <div className="flex-1 h-px bg-neutral-200" />
      </div>

      <button
        type="button"
        onClick={onGoogleSignIn}
        disabled={loading}
        className="w-full h-11 border border-neutral-200 rounded-full text-xs uppercase tracking-[0.12em] hover:bg-neutral-50 disabled:opacity-50"
      >
        {t.google}
      </button>
    </div>
  )
}
