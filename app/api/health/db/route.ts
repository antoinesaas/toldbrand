import { NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'

/** Vérifie que les tables orders existent sur le projet Supabase configuré sur Vercel. */
export async function GET() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim() ?? ''
  const ref = url.match(/https:\/\/([^.]+)\.supabase\.co/)?.[1] ?? 'unknown'

  try {
    const admin = createAdminClient()
    const { error } = await admin.from('orders').select('id').limit(1)

    if (error) {
      const schemaCache = error.message.includes('schema cache')
      const missing =
        !schemaCache &&
        (error.message.includes('does not exist') ||
          error.code === '42P01')

      let hint: string
      if (schemaCache) {
        hint = `Tables créées mais l’API n’est pas à jour. SQL Editor → exécutez : NOTIFY pgrst, 'reload schema'; (voir scripts/RELOAD-SCHEMA-CACHE.sql) puis attendez ~30 s et rechargez /api/health/db`
      } else if (missing) {
        hint = `Tables manquantes. https://supabase.com/dashboard/project/${ref}/sql/new → scripts/CREER-TABLES-BEFYC.sql`
      } else {
        hint = 'Vérifiez SUPABASE_SERVICE_ROLE_KEY sur Vercel (même projet que l’URL).'
      }

      return NextResponse.json({
        ok: false,
        supabaseProjectRef: ref,
        tablesReady: false,
        schemaCacheStale: schemaCache,
        error: error.message,
        hint,
      })
    }

    const { count } = await admin.from('orders').select('*', { count: 'exact', head: true })

    return NextResponse.json({
      ok: true,
      supabaseProjectRef: ref,
      tablesReady: true,
      orderCount: count ?? 0,
      hint:
        ref === 'befyczgottbemittzpop'
          ? 'Projet correct pour toldbrand.fr. Si le dashboard affiche un autre nom (ex. totalbread), ouvrez le bon projet via le lien befyc.'
          : `Vercel pointe vers ${ref}. Le dashboard doit être le même projet.`,
    })
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    return NextResponse.json({
      ok: false,
      supabaseProjectRef: ref,
      tablesReady: false,
      error: message,
      hint: 'Configurez NEXT_PUBLIC_SUPABASE_URL et SUPABASE_SERVICE_ROLE_KEY sur Vercel.',
    })
  }
}
