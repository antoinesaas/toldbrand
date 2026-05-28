import { Suspense } from 'react'
import SuccessContent from './SuccessContent'

export default function SuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="pt-32 min-h-screen text-center text-sm text-neutral-400">Chargement…</div>
      }
    >
      <SuccessContent />
    </Suspense>
  )
}
