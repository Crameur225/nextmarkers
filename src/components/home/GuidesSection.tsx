import Link from 'next/link'
import { ArrowRight, BookOpen } from 'lucide-react'

const guides = [
  {
    category: 'IA',
    title: 'Les 20 meilleurs outils IA à utiliser en 2026',
    description: 'Le tour d\'horizon complet des outils d\'intelligence artificielle qui changent vraiment la productivité.',
    readTime: '12 min',
  },
  {
    category: 'IA',
    title: 'ChatGPT vs Claude : lequel choisir ?',
    description: 'Comparatif détaillé des deux assistants IA les plus puissants pour savoir lequel correspond à ton usage.',
    readTime: '8 min',
  },
  {
    category: 'Productivité',
    title: 'Les outils qui me font gagner plusieurs heures par semaine',
    description: 'Ma stack personnelle testée au quotidien pour maximiser le temps disponible sur ce qui compte vraiment.',
    readTime: '6 min',
  },
]

const categoryColors: Record<string, string> = {
  IA: 'bg-green-500/15 text-green-400',
  Productivité: 'bg-blue-500/15 text-blue-400',
}

export function GuidesSection() {
  return (
    <section className="section-padding bg-(--bg-surface)">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-xs font-semibold text-green-400 uppercase tracking-widest mb-3">
            Guides pratiques
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-(--text-primary) mb-4">
            Des guides conçus pour passer à l&apos;action.
          </h2>
          <p className="text-(--text-secondary) max-w-xl mx-auto leading-relaxed">
            Apprenez à exploiter pleinement les outils modernes grâce à nos tutoriels,
            comparatifs et études de cas.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {guides.map(({ category, title, description, readTime }) => (
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
              <div>
                <h3 className="font-semibold text-(--text-primary) mb-2 leading-snug">{title}</h3>
                <p className="text-sm text-(--text-secondary) leading-relaxed">{description}</p>
              </div>
              <Link
                href="/guides"
                className="mt-auto text-sm font-medium text-green-400 hover:text-green-300 transition-colors inline-flex items-center gap-1"
              >
                Lire le guide <ArrowRight size={13} />
              </Link>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            href="/guides"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-(--text-primary) border border-(--border-default) hover:border-green-500/40 hover:bg-(--bg-elevated) transition-all"
          >
            Voir tous les guides
            <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </section>
  )
}
