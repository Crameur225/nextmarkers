import Link from 'next/link'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-(--border-subtle) bg-(--bg-surface)">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          {/* Brand */}
          <div>
            <p className="font-bold text-(--text-primary) text-lg mb-3">NextMakers</p>
            <p className="text-sm text-(--text-secondary) leading-relaxed max-w-xs">
              Les outils qui construisent votre avenir.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-xs font-semibold text-(--text-muted) uppercase tracking-widest mb-4">
              Navigation
            </p>
            <ul className="space-y-2">
              {[
                { href: '/', label: 'Accueil' },
                { href: '/outils-ia', label: 'Outils IA' },
                { href: '/guides', label: 'Guides' },
                { href: '/blog', label: 'Blog' },
                { href: '/about', label: 'À propos' },
                { href: '/contact', label: 'Contact' },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-(--text-secondary) hover:text-(--text-primary) transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter teaser */}
          <div>
            <p className="text-xs font-semibold text-(--text-muted) uppercase tracking-widest mb-4">
              Newsletter
            </p>
            <p className="text-sm text-(--text-secondary) mb-4 leading-relaxed">
              Une sélection d&apos;outils et d&apos;innovations chaque semaine dans ta boîte mail.
            </p>
            <a
              href="/newsletter"
              className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-semibold text-white bg-green-500 hover:bg-green-400 transition-colors"
            >
              S&apos;inscrire gratuitement →
            </a>
          </div>
        </div>

        <div className="border-t border-(--border-subtle) pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-(--text-muted)">
            © {currentYear} NextMakers. Tous droits réservés.
          </p>
          <p className="text-xs text-(--text-muted)">
            Certains liens sont des liens d&apos;affiliation.{' '}
            <Link href="/about" className="text-green-400 hover:text-green-300 transition-colors">
              En savoir plus
            </Link>
          </p>
        </div>
      </div>
    </footer>
  )
}
