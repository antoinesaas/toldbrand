import { NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'

// Toujours exécutée à la demande (jamais mise en cache).
export const dynamic = 'force-dynamic'
export const revalidate = 0

/**
 * Vérifie que la base Supabase répond et que les tables existent.
 * Appelée chaque jour par le cron Vercel (vercel.json) : ça garde le projet
 * Supabase gratuit actif (il se met en pause après ~7 jours sans activité).
 */
export async function GET() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim() ?? ''
  const ref = url.match(/https:\/\/([^.]+)\.supabase\.co/)?.[1] ?? 'unknown'
  const checkedAt = new Date().toISOString()

  try {
    const admin = createAdminClient()
    const { count, error } = await admin
      .from('orders')
      .select('*', { count: 'exact', head: true })

    if (error) {
      const schemaCache = error.message.includes('schema cache')
      const missing =
        !schemaCache && (error.message.includes('does not exist') || error.code === '42P01')

      let hint: string
      if (schemaCache) {
        hint = `Tables créées mais l'API n'est pas à jour. SQL Editor → NOTIFY pgrst, 'reload schema'; puis rechargez.`
      } else if (missing) {
        hint = `Tables manquantes. https://supabase.com/dashboard/project/${ref}/sql/new → collez supabase/schema.sql`
      } else {
        hint = 'Vérifiez SUPABASE_SERVICE_ROLE_KEY sur Vercel (même projet que NEXT_PUBLIC_SUPABASE_URL).'
      }

      return NextResponse.json(
        {
          ok: false,
          supabaseProjectRef: ref,
          tablesReady: false,
          schemaCacheStale: schemaCache,
          error: error.message,
          hint,
          checkedAt,
        },
        { status: 503 }
      )
    }

    return NextResponse.json({
      ok: true,
      supabaseProjectRef: ref,
      tablesReady: true,
      orderCount: count ?? 0,
      checkedAt,
    })
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    return NextResponse.json(
      {
        ok: false,
        supabaseProjectRef: ref,
        tablesReady: false,
        error: message,
        hint:
          message.includes('not configured')
            ? 'Configurez NEXT_PUBLIC_SUPABASE_URL et SUPABASE_SERVICE_ROLE_KEY sur Vercel.'
            : 'Base injoignable (projet en pause ou supprimé ?).',
        checkedAt,
      },
      { status: 503 }
    )
  }
}
