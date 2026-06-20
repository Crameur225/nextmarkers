import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
      <p className="text-8xl font-bold gradient-text mb-6">404</p>
      <h1 className="text-2xl font-bold text-(--text-primary) mb-3">Page introuvable</h1>
      <p className="text-(--text-secondary) mb-8 max-w-sm">
        Cette page n'existe pas ou a été déplacée.
      </p>
      <Link
        href="/"
        className="px-6 py-3 rounded-xl font-semibold text-white bg-green-500 hover:bg-green-400 transition-colors"
      >
        Retour à l'accueil
      </Link>
    </div>
  )
}
