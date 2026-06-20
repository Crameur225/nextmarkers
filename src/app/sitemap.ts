import { MetadataRoute } from 'next'
import { api } from '@/lib/api'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://nextmakers.fr'

  let postUrls: MetadataRoute.Sitemap = []
  try {
    const posts = await api.posts.list()
    postUrls = posts.map((p) => ({
      url: `${baseUrl}/blog/${p.slug}`,
      lastModified: new Date(p.updatedAt ?? p.createdAt),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }))
  } catch {
    postUrls = []
  }

  return [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
    { url: `${baseUrl}/blog`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${baseUrl}/produits`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    ...postUrls,
  ]
}
