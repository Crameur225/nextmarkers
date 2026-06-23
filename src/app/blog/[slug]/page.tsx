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
          category={post.category}
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

        {(post.images ?? []).length > 0 && (
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {(post.images ?? []).map((url, i) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={i} src={url} alt="" className="w-full rounded-xl object-cover" />
            ))}
          </div>
        )}

        {(post.audios ?? []).length > 0 && (
          <div className="mt-6 flex flex-col gap-3">
            {(post.audios ?? []).map((url, i) => (
              <audio key={i} src={url} controls className="w-full rounded-xl" />
            ))}
          </div>
        )}

        {(post.videos ?? []).length > 0 && (
          <div className="mt-6 flex flex-col gap-4">
            {(post.videos ?? []).map((url, i) => (
              <video key={i} src={url} controls className="w-full rounded-xl max-h-96" />
            ))}
          </div>
        )}
      </article>
    </>
  )
}
