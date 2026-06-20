import { api } from '@/lib/api'
import { ProductCard } from '@/components/product/ProductCard'
import { generatePageMetadata } from '@/lib/seo'
import type { Metadata } from 'next'
import { Package } from 'lucide-react'

export const metadata: Metadata = generatePageMetadata({
  title: 'Produits — NextMakers',
  description: 'Découvrez les meilleurs outils, gadgets et équipements tech sélectionnés par NextMakers.',
  path: '/produits',
})

const CATEGORIES = ['Tous', 'IA', 'Amazon', 'Productivité', 'Développement']

interface Props {
  searchParams: Promise<{ category?: string }>
}

export default async function ProduitsPage({ searchParams }: Props) {
  const { category } = await searchParams

  let products: Awaited<ReturnType<typeof api.products.list>> = []
  try {
    const params = category && category !== 'Tous' ? `category=${category}` : undefined
    products = await api.products.list(params)
  } catch {
    products = []
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
      {/* Header */}
      <div className="mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-green-500/30 bg-green-500/10 text-green-500 text-sm font-medium mb-6">
          <Package size={14} />
          Sélection NextMakers
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-(--text-primary) mb-4">
          Les meilleurs produits tech
        </h1>
        <p className="text-(--text-secondary) max-w-xl leading-relaxed">
          Chaque produit est testé et sélectionné pour apporter un vrai gain de productivité.
        </p>
      </div>

      {/* Category filter */}
      <div className="flex flex-wrap gap-2 mb-10">
        {CATEGORIES.map((cat) => (
          <a
            key={cat}
            href={cat === 'Tous' ? '/produits' : `/produits?category=${cat}`}
            className={
              (category ?? 'Tous') === cat
                ? 'px-4 py-2 rounded-full text-sm font-medium bg-green-500 text-white'
                : 'px-4 py-2 rounded-full text-sm font-medium bg-(--bg-elevated) text-(--text-secondary) border border-(--border-default) hover:border-green-500/40 hover:text-(--text-primary) transition-colors'
            }
          >
            {cat}
          </a>
        ))}
      </div>

      {/* Grid */}
      {products.length === 0 ? (
        <div className="text-center py-24">
          <p className="text-(--text-muted) mb-2">Aucun produit disponible pour l&apos;instant.</p>
          <p className="text-sm text-(--text-muted)">Revenez bientôt — notre équipe sélectionne les meilleurs outils.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  )
}
