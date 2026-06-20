import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { api } from '@/lib/api'

const categoryColors: Record<string, string> = {
  IA: 'bg-green-500/15 text-green-400',
  Amazon: 'bg-orange-500/15 text-orange-400',
  Productivité: 'bg-blue-500/15 text-blue-400',
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })
}

export async function BlogPreviewSection() {
  let recentPosts: { id: string; title: string; description: string; category: string; createdAt: string; slug: string }[] = []
  try {
    const all = await api.posts.list()
    recentPosts = all.slice(0, 3)
  } catch {
    recentPosts = []
  }

  if (recentPosts.length === 0) return null

  return (
    <section className="section-padding">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
          <div>
            <p className="text-xs font-semibold text-green-400 uppercase tracking-widest mb-3">
              Blog
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-(--text-primary) mb-3">
              Dernières publications
            </h2>
            <p className="text-(--text-secondary) max-w-lg leading-relaxed">
              Des analyses approfondies, des comparatifs et des conseils pratiques pour rester
              à la pointe de l&apos;innovation.
            </p>
          </div>
          <Link
            href="/blog"
            className="shrink-0 inline-flex items-center gap-2 text-sm font-medium text-green-400 hover:text-green-300 transition-colors"
          >
            Voir toutes les publications <ArrowRight size={14} />
          </Link>
        </div>

        {/* Posts grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {recentPosts.map(({ id, title, description, category, createdAt, slug }) => (
            <Link
              key={id}
              href={`/blog/${slug}`}
              className="card-glass rounded-2xl p-6 flex flex-col gap-4 group"
            >
              <div className="flex items-center justify-between">
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${categoryColors[category] ?? 'bg-(--bg-elevated) text-(--text-muted)'}`}>
                  {category}
                </span>
                <span className="text-xs text-(--text-muted)">{formatDate(createdAt)}</span>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-(--text-primary) mb-2 leading-snug group-hover:text-green-300 transition-colors">
                  {title}
                </h3>
                <p className="text-sm text-(--text-secondary) leading-relaxed line-clamp-3">
                  {description}
                </p>
              </div>
              <span className="text-sm font-medium text-green-400 group-hover:text-green-300 transition-colors inline-flex items-center gap-1">
                Lire l&apos;article <ArrowRight size={13} />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
