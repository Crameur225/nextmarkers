import type { Metadata } from 'next'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://nextmakers.fr'
const SITE_NAME = 'NextMakers'
const DEFAULT_OG_IMAGE = `${BASE_URL}/og-default.jpg`

export function generatePageMetadata({
  title,
  description,
  path = '/',
  ogImage = DEFAULT_OG_IMAGE,
}: {
  title: string
  description: string
  path?: string
  ogImage?: string
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
      type: 'website',
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [ogImage],
    },
  }
}

export function generateArticleJsonLd(post: {
  title: string
  description: string
  slug: string
  createdAt: string
  updatedAt?: string
  heroImage?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    datePublished: post.createdAt,
    dateModified: post.updatedAt ?? post.createdAt,
    url: `${BASE_URL}/blog/${post.slug}`,
    image: post.heroImage ?? DEFAULT_OG_IMAGE,
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: BASE_URL,
      logo: { '@type': 'ImageObject', url: `${BASE_URL}/favicon.ico` },
    },
    author: { '@type': 'Organization', name: SITE_NAME },
    inLanguage: 'fr-FR',
  }
}
