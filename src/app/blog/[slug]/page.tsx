import { api } from '@/lib/api'
import { notFound } from 'next/navigation'
import { BlogHeader } from '@/components/blog/BlogHeader'
import { generatePageMetadata, generateArticleJsonLd } from '@/lib/seo'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { useMDXComponents } from '@/mdx-components'
import type { Metadata } from 'next'

function isHtmlContent(content: string) {
  return content.trimStart().startsWith('<')
}

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  try {
    const post = await api.posts.get(slug)
    return generatePageMetadata({
      title: post.title,
      description: post.description,
      path: `/blog/${post.slug}`,
      ogImage: post.heroImage,
    })
  } catch {
    return {}
  }
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params

  let post
  try {
    post = await api.posts.get(slug)
  } catch {
    notFound()
  }

  const jsonLd = generateArticleJsonLd({
    title: post.title,
    description: post.description,
    slug: post.slug,
    createdAt: post.createdAt,
    updatedAt: post.updatedAt,
    heroImage: post.heroImage,
  })

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
        <BlogHeader
          title={post.title}
          description={post.description}
          date={post.createdAt}
          updated={post.updatedAt}
          category={post.category as 'IA' | 'Amazon' | 'Productivité'}
          tags={post.tags}
          affiliateDisclosure={post.affiliateDisclosure}
        />

        <div className="prose prose-invert prose-green max-w-none">
          {isHtmlContent(post.content ?? '') ? (
            <div dangerouslySetInnerHTML={{ __html: post.content ?? '' }} />
          ) : (
            <MDXRemote source={post.content ?? ''} components={useMDXComponents({})} />
          )}
        </div>
      </article>
    </>
  )
}
