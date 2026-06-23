'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ImageUploader } from './ImageUploader'
import { SocialPublisher } from './SocialPublisher'
import type { Product } from '@/lib/api'

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000'

function getToken() {
  return document.cookie
    .split('; ')
    .find((row) => row.startsWith('admin_token='))
    ?.split('=')[1]
}

type ProductDraft = Omit<Product, 'id' | 'createdAt' | 'updatedAt'>

const EMPTY: ProductDraft = {
  name: '',
  slug: '',
  description: '',
  shortDesc: '',
  images: [],
  price: '',
  currency: 'EUR',
  affiliateUrl: '',
  provider: 'amazon',
  category: 'IA',
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

  function set<K extends keyof ProductDraft>(key: K, value: ProductDraft[K]) {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
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
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 max-w-2xl">
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
            <option>IA</option>
            <option>Amazon</option>
            <option>Productivité</option>
            <option>Développement</option>
          </select>
        </Field>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Provider">
          <select value={form.provider} onChange={(e) => set('provider', e.target.value)} className="field-input">
            <option value="amazon">Amazon</option>
            <option value="fnac">Fnac</option>
            <option value="darty">Darty</option>
            <option value="boulanger">Boulanger</option>
            <option value="aliexpress">AliExpress</option>
            <option value="cdiscount">Cdiscount</option>
            <option value="default">Autre</option>
          </select>
        </Field>
        <Field label="URL d'affiliation">
          <input value={form.affiliateUrl} onChange={(e) => set('affiliateUrl', e.target.value)} required className="field-input" />
        </Field>
      </div>

      <Field label="Tags (séparés par des virgules)">
        <input value={tagsInput} onChange={(e) => setTagsInput(e.target.value)} className="field-input" placeholder="ia, outil, productivité" />
      </Field>

      <Field label="Images">
        <ImageUploader value={form.images} onChange={(urls) => set('images', urls)} />
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

      {/* Social publishing — visible only once product is saved & published */}
      {savedSlug && form.published && (
        <SocialPublisher
          title={form.name}
          description={form.shortDesc}
          url={`${process.env.NEXT_PUBLIC_SITE_URL ?? 'https://nextmakers.fr'}/produits/${savedSlug}`}
          imageUrl={form.images[0]}
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
