import type { MetadataRoute } from 'next'
import { api } from '@/lib/api'

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://nextmakers.fr'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE,                lastModified: new Date(), changeFrequency: 'daily',   priority: 1.0 },
    { url: `${BASE}/blog`,      lastModified: new Date(), changeFrequency: 'daily',   priority: 0.9 },
    { url: `${BASE}/produits`,  lastModified: new Date(), changeFrequency: 'daily',   priority: 0.9 },
    { url: `${BASE}/outils-ia`, lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.8 },
    { url: `${BASE}/guides`,    lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.8 },
    { url: `${BASE}/about`,     lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE}/contact`,   lastModified: new Date(), changeFrequency: 'monthly', priority: 0.4 },
  ]

  const [postsResult, productsResult] = await Promise.allSettled([
    api.posts.list(),
    api.products.list(),
  ])

  const postRoutes: MetadataRoute.Sitemap =
    postsResult.status === 'fulfilled'
      ? postsResult.value.map((p) => ({
          url: `${BASE}/blog/${p.slug}`,
          lastModified: new Date(p.updatedAt),
          changeFrequency: 'weekly' as const,
          priority: 0.85,
        }))
      : []

  const productRoutes: MetadataRoute.Sitemap =
    productsResult.status === 'fulfilled'
      ? productsResult.value.map((p) => ({
          url: `${BASE}/produits/${p.slug}`,
          lastModified: new Date(p.updatedAt),
          changeFrequency: 'weekly' as const,
          priority: 0.8,
        }))
      : []

  return [...staticRoutes, ...postRoutes, ...productRoutes]
}
