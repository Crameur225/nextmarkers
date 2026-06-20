import Link from 'next/link'
import { Brain, Zap, Palette, Code2, Cpu } from 'lucide-react'

const categories = [
  {
    icon: Brain,
    label: 'Intelligence Artificielle',
    description: 'ChatGPT, Claude, Midjourney et les meilleurs agents IA pour automatiser ton travail.',
    href: '/outils-ia',
  },
  {
    icon: Zap,
    label: 'Productivité',
    description: 'Notion, Linear, Obsidian — les outils qui éliminent les frictions et multiplient ta vélocité.',
    href: '/blog?category=Productivité',
  },
  {
    icon: Palette,
    label: 'Création de contenu',
    description: 'Capcut, Descript, ElevenLabs — crée plus vite et mieux sans équipe dédiée.',
    href: '/blog',
  },
  {
    icon: Code2,
    label: 'Développement',
    description: 'Cursor, Copilot, Vercel — le stack des développeurs qui livrent 10× plus vite.',
    href: '/blog',
  },
  {
    icon: Cpu,
    label: 'Équipements Tech',
    description: 'Accessoires, gadgets et setup qui changent concrètement la façon de travailler.',
    href: '/blog?category=Amazon',
  },
]

export function CategoriesSection() {
  return (
    <section className="section-padding bg-(--bg-surface)">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-xs font-semibold text-green-400 uppercase tracking-widest mb-3">
            Nos catégories
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-(--text-primary) mb-4">
            Les outils qui font la différence.
          </h2>
          <p className="text-(--text-secondary) max-w-xl mx-auto leading-relaxed">
            Nous sélectionnons uniquement les technologies qui apportent un véritable gain
            de temps, de productivité et de performance.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {categories.map(({ icon: Icon, label, description, href }) => (
            <Link
              key={label}
              href={href}
              className="card-glass rounded-2xl p-6 group"
            >
              <div className="w-11 h-11 rounded-xl bg-green-500/10 flex items-center justify-center mb-4 group-hover:bg-green-500/20 transition-colors">
                <Icon size={20} className="text-green-400" />
              </div>
              <h3 className="font-semibold text-(--text-primary) mb-2">{label}</h3>
              <p className="text-sm text-(--text-secondary) leading-relaxed">{description}</p>
            </Link>
          ))}

          {/* CTA card */}
          <div className="rounded-2xl p-6 border border-dashed border-(--border-default) flex flex-col items-center justify-center text-center gap-3">
            <p className="text-sm text-(--text-muted) leading-relaxed">
              Tous les outils testés et sélectionnés par NextMakers
            </p>
            <Link
              href="/blog"
              className="text-sm font-semibold text-green-400 hover:text-green-300 transition-colors"
            >
              Voir toutes les catégories →
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
