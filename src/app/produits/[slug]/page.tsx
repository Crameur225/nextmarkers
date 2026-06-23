import { api } from '@/lib/api'
import { ProductImageGallery } from '@/components/product/ProductImageGallery'
import { BuyButton } from '@/components/product/BuyButton'
import { notFound } from 'next/navigation'
import { generatePageMetadata, generateProductJsonLd } from '@/lib/seo'
import type { Metadata } from 'next'
import { ArrowLeft, Tag } from 'lucide-react'
import Link from 'next/link'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  try {
    const product = await api.products.get(slug)
    return generatePageMetadata({
      title: product.name,
      description: product.shortDesc,
      path: `/produits/${slug}`,
      ogImage: product.images[0],
    })
  } catch {
    return {}
  }
}

export default async function ProduitPage({ params }: Props) {
  const { slug } = await params

  let product
  try {
    product = await api.products.get(slug)
  } catch {
    notFound()
  }

  const jsonLd = generateProductJsonLd({
    name: product.name,
    description: product.description,
    slug: product.slug,
    price: product.price,
    currency: product.currency,
    images: product.images,
    affiliateUrl: product.affiliateUrl,
    provider: product.provider,
  })

  return (
    <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
      {/* Breadcrumb */}
      <Link
        href="/produits"
        className="inline-flex items-center gap-2 text-sm text-(--text-secondary) hover:text-(--text-primary) transition-colors mb-10"
      >
        <ArrowLeft size={15} />
        Retour aux produits
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left — Gallery */}
        <ProductImageGallery images={product.images} name={product.name} />

        {/* Right — Info */}
        <div className="flex flex-col gap-6">
          {/* Category + provider */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-green-500/10 text-green-500">
              {product.category}
            </span>
            {product.provider !== 'default' && (
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-orange-500/10 text-orange-500 capitalize">
                {product.provider === 'aliexpress' ? 'AliExpress' : product.provider.charAt(0).toUpperCase() + product.provider.slice(1)}
              </span>
            )}
          </div>

          {/* Name */}
          <h1 className="text-3xl sm:text-4xl font-bold text-(--text-primary) leading-tight">
            {product.name}
          </h1>

          {/* Price */}
          {product.price && (
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-green-500">{product.price}</span>
              <span className="text-sm text-(--text-muted)">{product.currency}</span>
            </div>
          )}

          {/* Description */}
          <p className="text-(--text-secondary) leading-relaxed text-lg">
            {product.description}
          </p>

          {/* Affiliate notice */}
          <div className="text-xs text-(--text-muted) bg-(--bg-elevated) rounded-lg px-4 py-3 border border-(--border-subtle)">
            ℹ️ Lien d&apos;affiliation — si vous achetez via ce lien, nous touchons une commission sans surcoût pour vous.
          </div>

          {/* Buy button */}
          <BuyButton
            affiliateUrl={product.affiliateUrl}
            provider={product.provider}
            price={product.price ?? undefined}
            size="lg"
          />

          {/* Tags */}
          {product.tags.length > 0 && (
            <div className="flex items-center gap-2 flex-wrap pt-2 border-t border-(--border-subtle)">
              <Tag size={14} className="text-(--text-muted)" />
              {product.tags.map((tag) => (
                <span key={tag} className="text-xs text-(--text-muted) bg-(--bg-elevated) px-2 py-0.5 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
    </>
  )
}
