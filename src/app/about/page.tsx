import { generatePageMetadata } from '@/lib/seo'
import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Target, Eye, Zap } from 'lucide-react'

export const metadata: Metadata = generatePageMetadata({
  title: 'À propos — NextMakers',
  description:
    'Pourquoi NextMakers ? Notre mission : vous aider à identifier les outils technologiques qui méritent vraiment votre attention.',
  path: '/about',
})

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
      {/* Header */}
      <div className="mb-16">
        <p className="text-xs font-semibold text-green-400 uppercase tracking-widest mb-3">
          À propos
        </p>
        <h1 className="text-3xl sm:text-4xl font-bold text-(--text-primary) mb-6 leading-tight">
          Pourquoi NextMakers ?
        </h1>
        <p className="text-lg text-(--text-secondary) leading-relaxed mb-6">
          Le monde évolue rapidement. Chaque semaine, de nouveaux outils, logiciels et
          technologies apparaissent.
        </p>
        <p className="text-lg text-white font-medium leading-relaxed">
          Notre mission est simple :{' '}
          <span className="gradient-text">
            vous aider à identifier ceux qui méritent réellement votre attention.
          </span>
        </p>
      </div>

      {/* Mission / Vision / Promesse */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16">
        {[
          {
            icon: Target,
            label: 'Mission',
            text: 'Aider les entrepreneurs, créateurs, développeurs et professionnels à découvrir les outils technologiques qui augmentent leur productivité, accélèrent leurs projets et leur permettent de construire l\'avenir.',
          },
          {
            icon: Eye,
            label: 'Vision',
            text: 'Créer la référence francophone pour découvrir les meilleures innovations technologiques, les outils d\'intelligence artificielle et les équipements qui permettent de travailler plus intelligemment.',
          },
          {
            icon: Zap,
            label: 'Promesse',
            text: 'Nous testons, analysons et sélectionnons les outils qui vous permettent d\'aller plus loin, plus vite.',
          },
        ].map(({ icon: Icon, label, text }) => (
          <div key={label} className="card-glass rounded-2xl p-6">
            <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center mb-4">
              <Icon size={18} className="text-green-400" />
            </div>
            <h2 className="font-semibold text-(--text-primary) mb-3">{label}</h2>
            <p className="text-sm text-(--text-secondary) leading-relaxed">{text}</p>
          </div>
        ))}
      </div>

      {/* Story */}
      <div className="prose prose-invert max-w-none mb-16">
        <p className="text-(--text-secondary) leading-relaxed text-lg mb-6">
          Nous recherchons, testons et analysons les solutions qui permettent aux entrepreneurs,
          créateurs et professionnels de travailler plus intelligemment et de construire plus
          efficacement leurs projets.
        </p>
        <p className="text-(--text-secondary) leading-relaxed">
          NextMakers n&apos;est pas un comparateur Amazon, ni un simple blog tech, ni un annuaire
          d&apos;outils IA. C&apos;est une plateforme de découverte, un guide technologique,
          une communauté de bâtisseurs — une bibliothèque d&apos;outils du futur.
        </p>
      </div>

      {/* Message central */}
      <div className="rounded-2xl border border-green-500/20 bg-green-500/5 p-10 text-center mb-12">
        <p className="text-xl font-bold text-(--text-primary) mb-3 leading-snug">
          Le futur n&apos;appartient pas à ceux qui travaillent plus dur.
        </p>
        <p className="text-xl font-bold gradient-text leading-snug">
          Il appartient à ceux qui utilisent les meilleurs outils.
        </p>
        <p className="mt-4 text-(--text-secondary)">NextMakers vous aide à les trouver.</p>
      </div>

      {/* Affiliate disclosure */}
      <div className="rounded-xl border border-(--border-subtle) bg-(--bg-surface) p-6 mb-12">
        <h2 className="font-semibold text-(--text-primary) mb-2 text-sm">Liens d&apos;affiliation</h2>
        <p className="text-sm text-(--text-secondary) leading-relaxed">
          Certains liens présents sur NextMakers sont des liens d&apos;affiliation. Si vous achetez
          un produit via ces liens, nous touchons une commission sans coût supplémentaire pour vous.
          Cela nous permet de continuer à publier du contenu gratuit. Nos avis restent toujours
          indépendants et honnêtes.
        </p>
      </div>

      {/* CTA */}
      <div className="text-center">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-white bg-green-500 hover:bg-green-400 transition-colors"
        >
          Découvrir nos publications <ArrowRight size={15} />
        </Link>
      </div>
    </div>
  )
}
