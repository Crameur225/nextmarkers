'use client'

import { Tag, ShoppingCart, ExternalLink } from 'lucide-react'
import type { Product } from '@/lib/api'

type ProductDraft = Omit<Product, 'id' | 'createdAt' | 'updatedAt' | 'views' | 'clicks'>

interface Props {
  form: ProductDraft
}

export function ProductPreview({ form }: Props) {
  const mainImage = form.images[0]

  return (
    <div className="rounded-2xl border border-(--border-subtle) bg-(--bg-elevated) overflow-hidden">
      {/* Header */}
      <div className="px-4 py-2.5 border-b border-(--border-subtle) flex items-center gap-2">
        <span className="w-2.5 h-2.5 rounded-full bg-red-400/60" />
        <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/60" />
        <span className="w-2.5 h-2.5 rounded-full bg-green-400/60" />
        <span className="ml-2 text-xs text-(--text-muted) font-mono truncate">
          nextmakers.fr/produits/{form.slug || 'slug'}
        </span>
      </div>

      <div className="p-5 flex flex-col gap-5">
        {/* Image principale */}
        <div className="rounded-xl overflow-hidden bg-(--bg-surface) border border-(--border-subtle) aspect-video flex items-center justify-center">
          {mainImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={mainImage} alt={form.name} className="w-full h-full object-cover" />
          ) : (
            <span className="text-(--text-muted) text-sm">Aucune image</span>
          )}
        </div>

        {/* Badges */}
        <div className="flex items-center gap-2 flex-wrap">
          {form.category && (
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-green-500/10 text-green-500">
              {form.category}
            </span>
          )}
          {form.provider && form.provider !== 'default' && (
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-orange-500/10 text-orange-500 capitalize">
              {form.provider}
            </span>
          )}
        </div>

        {/* Nom */}
        <h2 className="text-xl font-bold text-(--text-primary) leading-tight">
          {form.name || <span className="text-(--text-muted) italic">Nom du produit</span>}
        </h2>

        {/* Prix */}
        {form.price && (
          <div className="flex items-baseline gap-1.5">
            <span className="text-xl font-bold text-green-500">{form.price}</span>
            <span className="text-sm text-(--text-muted)">{form.currency}</span>
          </div>
        )}

        {/* Description */}
        <p className="text-(--text-secondary) text-sm leading-relaxed">
          {form.description || <span className="italic text-(--text-muted)">Description…</span>}
        </p>

        {/* Bouton d'achat (visuel) */}
        <div className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-green-500 text-white font-semibold text-sm w-full">
          <ShoppingCart size={16} />
          Acheter
          <ExternalLink size={13} className="opacity-70" />
        </div>

        {/* Tags */}
        {form.tags.length > 0 && (
          <div className="flex items-center gap-2 flex-wrap pt-2 border-t border-(--border-subtle)">
            <Tag size={13} className="text-(--text-muted)" />
            {form.tags.map((tag) => (
              <span key={tag} className="text-xs text-(--text-muted) bg-(--bg-surface) px-2 py-0.5 rounded-full border border-(--border-subtle)">
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Galerie miniatures */}
        {form.images.length > 1 && (
          <div className="flex gap-2 flex-wrap">
            {form.images.slice(1).map((url, i) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={i} src={url} alt="" className="h-14 w-14 object-cover rounded-lg border border-(--border-subtle)" />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
