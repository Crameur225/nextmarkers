import type { Metadata } from 'next'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://nextmakers.fr'
const SITE_NAME = 'NextMakers'
const DEFAULT_OG = `${BASE_URL}/og-default.jpg`
const LOGO_URL = `${BASE_URL}/logo.png`

export function generatePageMetadata({
  title,
  description,
  path = '/',
  ogImage = DEFAULT_OG,
  type = 'website',
}: {
  title: string
  description: string
  path?: string
  ogImage?: string
  type?: 'website' | 'article'
}): Metadata {
  const fullTitle = `${title} | ${SITE_NAME}`
  const url = `${BASE_URL}${path}`

  return {
    title: fullTitle,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: SITE_NAME,
      locale: 'fr_FR',
      type,
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [ogImage],
      site: '@nextmakers_fr',
      creator: '@nextmakers_fr',
    },
  }
}

export function generateArticleJsonLd(post: {
  title: string
  description: string
  slug: string
  createdAt: string
  updatedAt?: string
  heroImage?: string | null
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    datePublished: post.createdAt,
    dateModified: post.updatedAt ?? post.createdAt,
    url: `${BASE_URL}/blog/${post.slug}`,
    image: post.heroImage ?? DEFAULT_OG,
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: BASE_URL,
      logo: { '@type': 'ImageObject', url: LOGO_URL },
    },
    author: { '@type': 'Organization', name: SITE_NAME, url: BASE_URL },
    inLanguage: 'fr-FR',
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${BASE_URL}/blog/${post.slug}` },
  }
}

export function generateProductJsonLd(product: {
  name: string
  description: string
  slug: string
  price?: string | null
  currency?: string
  images?: string[]
  affiliateUrl: string
  provider?: string
}) {
  const jsonLd: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    url: `${BASE_URL}/produits/${product.slug}`,
    image: product.images?.[0] ?? DEFAULT_OG,
    brand: {
      '@type': 'Brand',
      name: product.provider === 'amazon' ? 'Amazon' : product.provider ?? 'NextMakers',
    },
    offers: {
      '@type': 'Offer',
      url: product.affiliateUrl,
      availability: 'https://schema.org/InStock',
      ...(product.price
        ? {
            price: product.price.replace(/[^\d.,]/g, '').replace(',', '.'),
            priceCurrency: product.currency ?? 'EUR',
          }
        : {}),
    },
  }
  return jsonLd
}
