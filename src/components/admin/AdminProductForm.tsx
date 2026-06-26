'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { MediaUploader } from './MediaUploader'
import { SocialPublisher } from './SocialPublisher'
import { ProductPreview } from './ProductPreview'
import { Eye, EyeOff } from 'lucide-react'
import type { Product, Provider, Category } from '@/lib/api'

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000'

function getToken() {
  return document.cookie
    .split('; ')
    .find((row) => row.startsWith('admin_token='))
    ?.split('=')[1]
}

type ProductDraft = Omit<Product, 'id' | 'createdAt' | 'updatedAt' | 'views' | 'clicks'>

const EMPTY: ProductDraft = {
  name: '',
  slug: '',
  description: '',
  shortDesc: '',
  images: [],
  audios: [],
  videos: [],
  price: '',
  currency: 'EUR',
  affiliateUrl: '',
  provider: '',
  category: '',
  tags: [],
  published: false,
  featured: false,
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
  initial?: Partial<Product>
  id?: string
}

export function AdminProductForm({ initial, id }: Props) {
  const router = useRouter()
  const [form, setForm] = useState<ProductDraft>({ ...EMPTY, ...initial })
  const [tagsInput, setTagsInput] = useState((initial?.tags ?? []).join(', '))
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [savedSlug, setSavedSlug] = useState(initial?.slug ?? '')
  const [providers, setProviders] = useState<Provider[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [showPreview, setShowPreview] = useState(false)

  useEffect(() => {
    fetch(`${API_URL}/api/providers`).then(r => r.json()).then((data: Provider[]) => {
      setProviders(data)
      if (!form.provider && data.length > 0) set('provider', data[0].name)
    }).catch(() => {})
    fetch(`${API_URL}/api/categories?contentType=product`).then(r => r.json()).then((data: Category[]) => {
      setCategories(data)
      if (!form.category && data.length > 0) set('category', data[0].name)
    }).catch(() => {})
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function set<K extends keyof ProductDraft>(key: K, value: ProductDraft[K]) {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.provider) return setError('Sélectionne un provider.')
    if (!form.category) return setError('Sélectionne une catégorie.')
    setSaving(true)
    setError('')

    const payload = { ...form, tags: tagsInput.split(',').map((t) => t.trim()).filter(Boolean) }

    try {
      const url = id ? `${API_URL}/api/products/${id}` : `${API_URL}/api/products`
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
      router.push('/admin/produits')
      router.refresh()
    } catch {
      setError('Erreur réseau.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className={`flex gap-8 ${showPreview ? 'items-start' : ''}`}>
    <form onSubmit={handleSubmit} className={`flex flex-col gap-6 ${showPreview ? 'flex-1 min-w-0' : 'max-w-2xl w-full'}`}>
      {/* Preview toggle */}
      <div className="flex justify-end">
        <button
          type="button"
          onClick={() => setShowPreview(!showPreview)}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors border
            ${showPreview
              ? 'bg-green-500/15 text-green-400 border-green-500/30'
              : 'text-(--text-muted) border-(--border-subtle) hover:text-(--text-primary) hover:border-(--border-default)'}`}
        >
          {showPreview ? <EyeOff size={13} /> : <Eye size={13} />}
          {showPreview ? 'Masquer l\'aperçu' : 'Aperçu live'}
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Nom">
          <input
            value={form.name}
            onChange={(e) => {
              set('name', e.target.value)
              if (!id) set('slug', toSlug(e.target.value))
            }}
            required
            className="field-input"
          />
        </Field>

        <Field label="Slug">
          <input
            value={form.slug}
            onChange={(e) => set('slug', e.target.value)}
            required
            className="field-input"
          />
        </Field>
      </div>

      <Field label="Description courte">
        <input
          value={form.shortDesc}
          onChange={(e) => set('shortDesc', e.target.value)}
          required
          className="field-input"
        />
      </Field>

      <Field label="Description longue">
        <textarea
          value={form.description}
          onChange={(e) => set('description', e.target.value)}
          rows={4}
          required
          className="field-input resize-none"
        />
      </Field>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Field label="Prix">
          <input value={form.price ?? ''} onChange={(e) => set('price', e.target.value)} className="field-input" placeholder="99.99" />
        </Field>
        <Field label="Devise">
          <input value={form.currency} onChange={(e) => set('currency', e.target.value)} className="field-input" />
        </Field>
        <Field label="Catégorie">
          <select value={form.category} onChange={(e) => set('category', e.target.value)} className="field-input">
            {categories.length === 0 && <option value="">Chargement…</option>}
            {categories.map((c) => (
              <option key={c.id} value={c.name}>{c.name}</option>
            ))}
          </select>
        </Field>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Provider">
          <select value={form.provider} onChange={(e) => set('provider', e.target.value)} className="field-input">
            {providers.length === 0 && <option value="">Chargement…</option>}
            {providers.map((p) => (
              <option key={p.id} value={p.name}>{p.label}</option>
            ))}
          </select>
        </Field>
        <Field label="URL d'affiliation">
          <input value={form.affiliateUrl} onChange={(e) => set('affiliateUrl', e.target.value)} required className="field-input" />
        </Field>
      </div>

      <Field label="Tags (séparés par des virgules)">
        <input value={tagsInput} onChange={(e) => setTagsInput(e.target.value)} className="field-input" placeholder="ia, outil, productivité" />
      </Field>

      <Field label="Médias">
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
          <input type="checkbox" checked={form.featured} onChange={(e) => set('featured', e.target.checked)} className="accent-green-500" />
          À la une
        </label>
      </div>

      {error && (
        <p className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
          {error}
        </p>
      )}

      <div className="flex gap-3">
        <button type="submit" disabled={saving} className="px-6 py-2.5 rounded-xl font-semibold text-sm text-white bg-green-500 hover:bg-green-400 disabled:opacity-50 transition-colors">
          {saving ? 'Enregistrement…' : id ? 'Mettre à jour' : 'Créer le produit'}
        </button>
        <button type="button" onClick={() => router.back()} className="px-6 py-2.5 rounded-xl font-medium text-sm text-(--text-secondary) bg-(--bg-elevated) hover:text-(--text-primary) transition-colors">
          Annuler
        </button>
      </div>

      {savedSlug && form.published && (
        <SocialPublisher
          title={form.name}
          description={form.shortDesc}
          url={`${process.env.NEXT_PUBLIC_SITE_URL ?? 'https://nextmakers.fr'}/produits/${savedSlug}`}
          imageUrl={form.images[0]}
        />
      )}
    </form>

    {/* Live preview panel */}
    {showPreview && (
      <div className="w-80 shrink-0 sticky top-6">
        <p className="text-xs font-semibold text-(--text-muted) uppercase tracking-wider mb-3">Aperçu</p>
        <ProductPreview form={form} />
      </div>
    )}
    </div>
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
