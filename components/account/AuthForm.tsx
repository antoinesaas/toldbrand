'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useI18n } from '@/lib/i18n/use-i18n'
import { ACCOUNT_COPY } from '@/lib/order-labels'

interface Props {
  mode: 'login' | 'register'
  redirectTo?: string
}

export default function AuthForm({ mode, redirectTo = '/account/orders' }: Props) {
  const { language } = useI18n()
  const t = ACCOUNT_COPY[language]
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const supabase = createClient()
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : ''

  async function onEmailSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    if (mode === 'register') {
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${baseUrl}/auth/callback?next=${encodeURIComponent(redirectTo)}`,
        },
      })
      if (signUpError) {
        setError(signUpError.message)
        setLoading(false)
        return
      }
      if (data.user?.email) {
        try {
          await fetch('/api/account/link-orders', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: data.user.email }),
          })
        } catch {
          /* non-blocking */
        }
      }
      setError(null)
      alert('Vérifiez votre e-mail pour confirmer votre compte.')
      setLoading(false)
      return
    }

    const { data, error: signInError } = await supabase.auth.signInWithPassword({ email, password })
    if (signInError) {
      setError(signInError.message)
      setLoading(false)
      return
    }

    if (data.user?.email) {
      try {
        await fetch('/api/account/link-orders', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: data.user.email }),
        })
      } catch {
        /* non-blocking */
      }
    }

    window.location.href = redirectTo
  }

  async function onOAuth(provider: 'google' | 'apple') {
    setLoading(true)
    await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${baseUrl}/auth/callback?next=${encodeURIComponent(redirectTo)}`,
      },
    })
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={onEmailSubmit} className="space-y-4">
        <div>
          <label className="text-[10px] tracking-[0.2em] uppercase text-neutral-500">{t.email}</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-full border border-neutral-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-black"
          />
        </div>
        <div>
          <label className="text-[10px] tracking-[0.2em] uppercase text-neutral-500">{t.password}</label>
          <input
            type="password"
            required
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 w-full border border-neutral-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-black"
          />
        </div>
        {error && <p className="text-sm text-red-600">{error}</p>}
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

      <div className="space-y-2">
        <button
          type="button"
          onClick={() => onOAuth('google')}
          disabled={loading}
          className="w-full h-11 border border-neutral-200 rounded-full text-xs uppercase tracking-[0.12em] hover:bg-neutral-50"
        >
          {t.google}
        </button>
        <button
          type="button"
          onClick={() => onOAuth('apple')}
          disabled={loading}
          className="w-full h-11 border border-neutral-900 bg-black text-white rounded-full text-xs uppercase tracking-[0.12em] hover:bg-neutral-800"
        >
          {t.apple}
        </button>
      </div>
    </div>
  )
}
