import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, ShoppingCart } from 'lucide-react'
import type { Product } from '@/lib/api'
import { TiltImage } from './TiltImage'

const categoryColors: Record<string, string> = {
  IA: 'bg-green-500/15 text-green-600 dark:text-green-400',
  Amazon: 'bg-orange-500/15 text-orange-600 dark:text-orange-400',
  Productivité: 'bg-blue-500/15 text-blue-600 dark:text-blue-400',
  Développement: 'bg-purple-500/15 text-purple-600 dark:text-purple-400',
}

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const { name, slug, shortDesc, images, price, category, provider } = product
  const heroImage = images[0]

  return (
    <div className="card-glass rounded-2xl flex flex-col group">
      {/* Image */}
      <Link href={`/produits/${slug}`} className="block">
        <TiltImage variant="card" className="relative aspect-[4/3] bg-(--bg-elevated) overflow-hidden rounded-t-2xl">
          {heroImage ? (
            <Image
              src={heroImage}
              alt={name}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <ShoppingCart size={40} className="text-(--text-muted)" />
            </div>
          )}
          {/* Provider badge */}
          {provider === 'amazon' && (
            <span className="absolute top-3 left-3 bg-orange-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
              Amazon
            </span>
          )}
        </TiltImage>
      </Link>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1 gap-3">
        <div className="flex items-start justify-between gap-2">
          <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${categoryColors[category] ?? 'bg-(--bg-elevated) text-(--text-muted)'}`}>
            {category}
          </span>
          {price && (
            <span className="text-sm font-bold text-(--text-primary) shrink-0">{price}</span>
          )}
        </div>

        <div className="flex-1">
          <h3 className="font-semibold text-(--text-primary) leading-snug mb-1 group-hover:text-green-500 transition-colors">
            {name}
          </h3>
          <p className="text-sm text-(--text-secondary) leading-relaxed line-clamp-2">{shortDesc}</p>
        </div>

        <Link
          href={`/produits/${slug}`}
          className="flex items-center gap-2 text-sm font-medium text-green-500 hover:text-green-400 transition-colors"
        >
          Voir le produit <ArrowRight size={13} />
        </Link>
      </div>
    </div>
  )
}
