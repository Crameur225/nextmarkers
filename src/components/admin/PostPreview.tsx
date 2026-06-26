'use client'

import type { Post } from '@/lib/api'

type PostDraft = Omit<Post, 'id' | 'createdAt' | 'updatedAt' | 'views'>

interface Props {
  form: PostDraft
}

function isHtml(content: string) {
  return content.trimStart().startsWith('<')
}

export function PostPreview({ form }: Props) {
  return (
    <div className="rounded-2xl border border-(--border-subtle) bg-(--bg-elevated) overflow-hidden">
      {/* Browser bar */}
      <div className="px-4 py-2.5 border-b border-(--border-subtle) flex items-center gap-2">
        <span className="w-2.5 h-2.5 rounded-full bg-red-400/60" />
        <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/60" />
        <span className="w-2.5 h-2.5 rounded-full bg-green-400/60" />
        <span className="ml-2 text-xs text-(--text-muted) font-mono truncate">
          nextmakers.fr/blog/{form.slug || 'slug'}
        </span>
      </div>

      <div className="p-5 flex flex-col gap-4 max-h-[600px] overflow-y-auto">
        {/* Hero image */}
        {form.heroImage && (
          <div className="rounded-xl overflow-hidden aspect-video">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={form.heroImage} alt={form.title} className="w-full h-full object-cover" />
          </div>
        )}

        {/* Category + tags */}
        <div className="flex items-center gap-2 flex-wrap">
          {form.category && (
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-green-500/10 text-green-400">
              {form.category}
            </span>
          )}
          {form.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="text-xs text-(--text-muted) bg-(--bg-surface) px-2 py-0.5 rounded-full border border-(--border-subtle)">
              #{tag}
            </span>
          ))}
        </div>

        {/* Title */}
        <h2 className="text-xl font-bold text-(--text-primary) leading-tight">
          {form.title || <span className="text-(--text-muted) italic">Titre de l'article</span>}
        </h2>

        {/* Author + date */}
        <p className="text-xs text-(--text-muted)">
          {form.author && <span className="font-medium text-(--text-secondary)">{form.author} · </span>}
          {new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
        </p>

        {/* Description */}
        <p className="text-(--text-secondary) text-sm leading-relaxed border-l-2 border-green-500/40 pl-3">
          {form.description || <span className="italic text-(--text-muted)">Description…</span>}
        </p>

        {/* Content */}
        {form.content && (
          <div className="prose prose-sm prose-invert prose-green max-w-none text-sm">
            {isHtml(form.content) ? (
              <div dangerouslySetInnerHTML={{ __html: form.content }} />
            ) : (
              <p className="text-(--text-secondary) whitespace-pre-wrap">{form.content}</p>
            )}
          </div>
        )}

        {/* Affiliate disclosure */}
        {form.affiliateDisclosure && (
          <div className="text-xs text-(--text-muted) bg-(--bg-surface) rounded-lg px-3 py-2 border border-(--border-subtle)">
            ℹ️ Cet article contient des liens d'affiliation.
          </div>
        )}
      </div>
    </div>
  )
}
