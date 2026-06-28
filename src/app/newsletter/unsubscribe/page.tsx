import Link from 'next/link'
import { CheckCircle, XCircle } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Désabonnement — NextMakers',
  robots: 'noindex',
}

export default async function UnsubscribePage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>
}) {
  const { error } = await searchParams
  const isError = error === '1'

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center space-y-6">
        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto ${isError ? 'bg-red-500/15' : 'bg-green-500/15'}`}>
          {isError
            ? <XCircle size={32} className="text-red-400" />
            : <CheckCircle size={32} className="text-green-400" />}
        </div>

        {isError ? (
          <>
            <h1 className="text-2xl font-bold text-(--text-primary)">Lien invalide</h1>
            <p className="text-(--text-secondary)">
              Ce lien de désabonnement est invalide ou a déjà été utilisé.
            </p>
          </>
        ) : (
          <>
            <h1 className="text-2xl font-bold text-(--text-primary)">Tu es désabonné(e)</h1>
            <p className="text-(--text-secondary)">
              Tu ne recevras plus d&apos;emails de NextMakers. Si c&apos;est une erreur,
              tu peux te réinscrire à tout moment.
            </p>
          </>
        )}

        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
          <Link
            href="/"
            className="px-5 py-2.5 rounded-xl text-sm font-semibold text-(--text-secondary) border border-(--border-default) hover:border-(--border-strong) transition-colors"
          >
            Retour à l&apos;accueil
          </Link>
          {!isError && (
            <Link
              href="/newsletter"
              className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-green-500 hover:bg-green-400 transition-colors"
            >
              Se réinscrire
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
