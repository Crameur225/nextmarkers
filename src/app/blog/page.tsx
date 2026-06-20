import { api } from '@/lib/api'
import { PostCard } from '@/components/blog/PostCard'
import { CategoryBadge } from '@/components/blog/CategoryBadge'
import { generatePageMetadata } from '@/lib/seo'
import type { Metadata } from 'next'

export const metadata: Metadata = generatePageMetadata({
  title: 'Blog — Outils IA, Productivité & Tech',
  description:
    'Comparatifs, guides et études de cas sur les meilleurs outils IA, équipements tech et stratégies de productivité.',
  path: '/blog',
})

const CATEGORIES = ['Tous', 'IA', 'Amazon', 'Productivité'] as const
type FilterCategory = (typeof CATEGORIES)[number]

interface BlogPageProps {
  searchParams: Promise<{ category?: string }>
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const { category } = await searchParams
  const activeCategory = (CATEGORIES.includes(category as FilterCategory) ? category : 'Tous') as FilterCategory

  let posts: Awaited<ReturnType<typeof api.posts.list>> = []
  try {
    const params = activeCategory !== 'Tous' ? `category=${activeCategory}` : undefined
    posts = await api.posts.list(params)
  } catch {
    posts = []
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
      {/* Header */}
      <div className="mb-12">
        <p className="text-xs font-semibold text-green-400 uppercase tracking-widest mb-3">
          Tous les articles
        </p>
        <h1 className="text-3xl sm:text-4xl font-bold text-(--text-primary) mb-4">Blog</h1>
        <p className="text-(--text-secondary) max-w-xl">
          Comparatifs honnêtes, guides pratiques et études de cas sur les outils qui changent
          vraiment la façon de travailler.
        </p>
      </div>

      {/* Category filter */}
      <div className="flex flex-wrap gap-2 mb-10">
        {CATEGORIES.map((cat) => (
          <a
            key={cat}
            href={cat === 'Tous' ? '/blog' : `/blog?category=${cat}`}
            className={
              activeCategory === cat
                ? 'px-4 py-2 rounded-full text-sm font-medium bg-green-500 text-white'
                : 'px-4 py-2 rounded-full text-sm font-medium bg-(--bg-elevated) text-(--text-secondary) border border-(--border-default) hover:border-green-500/40 hover:text-(--text-primary) transition-colors'
            }
          >
            {cat === 'Tous' ? (
              'Tous'
            ) : (
              <CategoryBadge category={cat as 'IA' | 'Amazon' | 'Productivité'} />
            )}
          </a>
        ))}
      </div>

      {/* Grid */}
      {posts.length === 0 ? (
        <div className="text-center py-20 text-(--text-muted)">
          Aucun article dans cette catégorie pour l&apos;instant.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <PostCard
              key={post.id}
              title={post.title}
              description={post.description}
              date={post.createdAt}
              category={post.category as 'IA' | 'Amazon' | 'Productivité'}
              tags={post.tags}
              slug={post.slug}
            />
          ))}
        </div>
      )}
    </div>
  )
}
