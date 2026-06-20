import { api } from '@/lib/api'
import { PostCard } from '@/components/blog/PostCard'
import { generatePageMetadata } from '@/lib/seo'
import type { Metadata } from 'next'
import Link from 'next/link'
import { Brain, ArrowRight } from 'lucide-react'

export const metadata: Metadata = generatePageMetadata({
  title: 'Outils IA — NextMakers',
  description:
    "Les meilleurs outils d'intelligence artificielle testés et sélectionnés : ChatGPT, Claude, Midjourney, agents IA et bien plus.",
  path: '/outils-ia',
})

export default async function OutilsIAPage() {
  let aiPosts: Awaited<ReturnType<typeof api.posts.list>> = []
  try {
    aiPosts = await api.posts.list('category=IA')
  } catch {
    aiPosts = []
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
      {/* Header */}
      <div className="mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-green-500/30 bg-green-500/10 text-green-300 text-sm font-medium mb-6">
          <Brain size={14} />
          Intelligence Artificielle
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-(--text-primary) mb-4">
          Les meilleurs outils IA
        </h1>
        <p className="text-(--text-secondary) max-w-xl leading-relaxed mb-6">
          On teste, compare et sélectionne les outils d&apos;intelligence artificielle qui
          apportent un vrai gain de productivité aux entrepreneurs, créateurs et développeurs.
        </p>
        <Link
          href="/blog?category=IA"
          className="inline-flex items-center gap-2 text-sm font-medium text-green-400 hover:text-green-300 transition-colors"
        >
          Voir tous les articles IA <ArrowRight size={14} />
        </Link>
      </div>

      {/* Posts grid or empty state */}
      {aiPosts.length === 0 ? (
        <div className="text-center py-24">
          <p className="text-(--text-muted) mb-4">
            Les premiers guides IA arrivent bientôt.
          </p>
          <Link
            href="#newsletter"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-green-500 hover:bg-green-400 transition-colors"
          >
            Être notifié à la publication
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {aiPosts.map((post) => (
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
