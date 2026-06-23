'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import type { Post, Category } from '@/lib/api'
import { RichTextEditor } from './RichTextEditor'
import { MediaUploader } from './MediaUploader'
import { SocialPublisher } from './SocialPublisher'

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000'

function getToken() {
  return document.cookie
    .split('; ')
    .find((row) => row.startsWith('admin_token='))
    ?.split('=')[1]
}

type PostDraft = Omit<Post, 'id' | 'createdAt' | 'updatedAt'>

const EMPTY: PostDraft = {
  title: '',
  slug: '',
  description: '',
  content: '',
  category: '',
  tags: [],
  heroImage: '',
  images: [],
  audios: [],
  videos: [],
  affiliateDisclosure: false,
  published: false,
}

function toSlug(s: string) {
  return s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

interface Props {
  initial?: Partial<Post>
  id?: string
}

export function AdminPostForm({ initial, id }: Props) {
  const router = useRouter()
  const [form, setForm] = useState<PostDraft>({ ...EMPTY, ...initial })
  const [tagsInput, setTagsInput] = useState((initial?.tags ?? []).join(', '))
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [savedSlug, setSavedSlug] = useState(initial?.slug ?? '')
  const [categories, setCategories] = useState<Category[]>([])

  useEffect(() => {
    fetch(`${API_URL}/api/categories?contentType=post`).then(r => r.json()).then((data: Category[]) => {
      setCategories(data)
      if (!form.category && data.length > 0) set('category', data[0].name)
    }).catch(() => {})
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function set<K extends keyof PostDraft>(key: K, value: PostDraft[K]) {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setError('')

    const payload = { ...form, tags: tagsInput.split(',').map((t) => t.trim()).filter(Boolean) }

    try {
      const url = id ? `${API_URL}/api/posts/${id}` : `${API_URL}/api/posts`
      const res = await fetch(url, {
        method: id ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify(payload),
      })

      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        setError(data.error ?? 'Erreur lors de la sauvegarde.')
        return
      }

      const saved = await res.json().catch(() => ({})) as { slug?: string }
      if (saved.slug) setSavedSlug(saved.slug)
      router.push('/admin/posts')
      router.refresh()
    } catch {
      setError('Erreur réseau.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Titre">
          <input
            value={form.title}
            onChange={(e) => {
              set('title', e.target.value)
              if (!id) set('slug', toSlug(e.target.value))
            }}
            required
            className="field-input"
          />
        </Field>
        <Field label="Slug">
          <input value={form.slug} onChange={(e) => set('slug', e.target.value)} required className="field-input" />
        </Field>
      </div>

      <Field label="Description (méta / accroche)">
        <textarea value={form.description} onChange={(e) => set('description', e.target.value)} rows={2} required className="field-input resize-none" />
      </Field>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Field label="Catégorie">
          <select value={form.category} onChange={(e) => set('category', e.target.value)} className="field-input">
            {categories.length === 0 && <option value="">Chargement…</option>}
            {categories.map((c) => (
              <option key={c.id} value={c.name}>{c.name}</option>
            ))}
          </select>
        </Field>
        <Field label="Image hero (URL)">
          <input value={form.heroImage ?? ''} onChange={(e) => set('heroImage', e.target.value)} className="field-input" placeholder="https://..." />
        </Field>
        <Field label="Tags (séparés par des virgules)">
          <input value={tagsInput} onChange={(e) => setTagsInput(e.target.value)} className="field-input" placeholder="ia, chatgpt" />
        </Field>
      </div>

      <Field label="Contenu">
        <RichTextEditor value={form.content ?? ''} onChange={(html) => set('content', html)} />
      </Field>

      <Field label="Médias supplémentaires">
        <MediaUploader
          images={form.images}
          audios={form.audios}
          videos={form.videos}
          onImagesChange={(urls) => set('images', urls)}
          onAudiosChange={(urls) => set('audios', urls)}
          onVideosChange={(urls) => set('videos', urls)}
        />
      </Field>

      <div className="flex items-center gap-6">
        <label className="flex items-center gap-2 text-sm text-(--text-secondary) cursor-pointer">
          <input type="checkbox" checked={form.published} onChange={(e) => set('published', e.target.checked)} className="accent-green-500" />
          Publié
        </label>
        <label className="flex items-center gap-2 text-sm text-(--text-secondary) cursor-pointer">
          <input type="checkbox" checked={form.affiliateDisclosure} onChange={(e) => set('affiliateDisclosure', e.target.checked)} className="accent-green-500" />
          Mention affiliation
        </label>
      </div>

      {error && (
        <p className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
          {error}
        </p>
      )}

      <div className="flex gap-3">
        <button type="submit" disabled={saving} className="px-6 py-2.5 rounded-xl font-semibold text-sm text-white bg-green-500 hover:bg-green-400 disabled:opacity-50 transition-colors">
          {saving ? 'Enregistrement…' : id ? 'Mettre à jour' : 'Créer l\'article'}
        </button>
        <button type="button" onClick={() => router.back()} className="px-6 py-2.5 rounded-xl font-medium text-sm text-(--text-secondary) bg-(--bg-elevated) hover:text-(--text-primary) transition-colors">
          Annuler
        </button>
      </div>

      {savedSlug && form.published && (
        <SocialPublisher
          title={form.title}
          description={form.description}
          url={`${process.env.NEXT_PUBLIC_SITE_URL ?? 'https://nextmakers.fr'}/blog/${savedSlug}`}
          imageUrl={form.heroImage ?? undefined}
        />
      )}
    </form>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-(--text-secondary)">{label}</label>
      {children}
    </div>
  )
}
