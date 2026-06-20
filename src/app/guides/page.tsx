import { generatePageMetadata } from '@/lib/seo'
import type { Metadata } from 'next'
import Link from 'next/link'
import { BookOpen, ArrowRight } from 'lucide-react'

export const metadata: Metadata = generatePageMetadata({
  title: 'Guides — NextMakers',
  description:
    'Tutoriels, comparatifs et études de cas pour apprendre à exploiter les meilleurs outils technologiques.',
  path: '/guides',
})

const upcomingGuides = [
  {
    category: 'IA',
    title: 'Les 20 meilleurs outils IA à utiliser en 2026',
    description: 'Le tour d\'horizon complet des outils d\'IA qui transforment la productivité des entrepreneurs et créateurs.',
    readTime: '12 min',
  },
  {
    category: 'IA',
    title: 'ChatGPT vs Claude : lequel choisir ?',
    description: 'Comparatif détaillé des deux assistants IA les plus puissants pour identifier lequel correspond à votre usage.',
    readTime: '8 min',
  },
  {
    category: 'IA',
    title: 'Comment automatiser son travail grâce à l\'IA',
    description: 'Stratégies concrètes pour déléguer les tâches répétitives à des agents IA et récupérer du temps.',
    readTime: '10 min',
  },
  {
    category: 'Productivité',
    title: 'Les outils qui me font gagner plusieurs heures par semaine',
    description: 'Ma stack personnelle testée au quotidien pour maximiser le temps disponible sur ce qui compte vraiment.',
    readTime: '6 min',
  },
  {
    category: 'Productivité',
    title: 'Les meilleures applications pour entrepreneurs',
    description: 'Le stack complet des applications indispensables pour gérer, créer et scaler son activité.',
    readTime: '9 min',
  },
  {
    category: 'Amazon',
    title: 'Les 15 gadgets technologiques les plus utiles en 2026',
    description: 'Sélection des équipements tech qui améliorent vraiment le quotidien des créateurs et entrepreneurs.',
    readTime: '7 min',
  },
]

const categoryColors: Record<string, string> = {
  IA: 'bg-green-500/15 text-green-400',
  Productivité: 'bg-blue-500/15 text-blue-400',
  Amazon: 'bg-orange-500/15 text-orange-400',
}

export default function GuidesPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
      {/* Header */}
      <div className="mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-green-500/30 bg-green-500/10 text-green-300 text-sm font-medium mb-6">
          <BookOpen size={14} />
          Guides pratiques
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-(--text-primary) mb-4">
          Des guides conçus pour passer à l&apos;action.
        </h1>
        <p className="text-(--text-secondary) max-w-xl leading-relaxed">
          Apprenez à exploiter pleinement les outils modernes grâce à nos tutoriels,
          comparatifs et études de cas.
        </p>
      </div>

      {/* Coming soon grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {upcomingGuides.map(({ category, title, description, readTime }) => (
          <div key={title} className="card-glass rounded-2xl p-6 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${categoryColors[category] ?? 'bg-white/10 text-white/60'}`}>
                {category}
              </span>
              <span className="text-xs text-(--text-muted) flex items-center gap-1">
                <BookOpen size={12} />
                {readTime}
              </span>
            </div>
            <div className="flex-1">
              <h2 className="font-semibold text-(--text-primary) mb-2 leading-snug">{title}</h2>
              <p className="text-sm text-(--text-secondary) leading-relaxed">{description}</p>
            </div>
            <span className="text-xs font-medium text-(--text-muted) px-2.5 py-1 rounded-full bg-white/5 border border-white/10 self-start">
              Bientôt disponible
            </span>
          </div>
        ))}
      </div>

      {/* Newsletter CTA */}
      <div className="mt-16 text-center rounded-2xl border border-(--border-subtle) bg-(--bg-surface) p-10">
        <h2 className="text-xl font-bold text-(--text-primary) mb-3">Soyez notifié à chaque nouveau guide</h2>
        <p className="text-(--text-secondary) mb-6 text-sm">
          Rejoignez la newsletter et recevez les guides directement dans votre boîte mail.
        </p>
        <Link
          href="/#newsletter"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-white bg-green-500 hover:bg-green-400 transition-colors"
        >
          S&apos;inscrire gratuitement <ArrowRight size={15} />
        </Link>
      </div>
    </div>
  )
}
