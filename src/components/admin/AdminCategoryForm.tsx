'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import type { Category } from '@/lib/api'

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000'

function getToken() {
  return document.cookie.split('; ').find((r) => r.startsWith('admin_token='))?.split('=')[1]
}

type CategoryDraft = Omit<Category, 'id' | 'createdAt' | 'updatedAt'>

const EMPTY: CategoryDraft = {
  name: '',
  color: '#22C55E',
  contentType: 'both',
}

interface Props {
  initial?: Partial<Category>
  id?: string
}

export function AdminCategoryForm({ initial, id }: Props) {
  const router = useRouter()
  const [form, setForm] = useState<CategoryDraft>({ ...EMPTY, ...initial })
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  function set<K extends keyof CategoryDraft>(key: K, value: CategoryDraft[K]) {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setError('')

    try {
      const url = id ? `${API_URL}/api/categories/${id}` : `${API_URL}/api/categories`
      const res = await fetch(url, {
        method: id ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${getToken()}` },
        body: JSON.stringify(form),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        setError(data.error ?? data.detail ?? 'Erreur lors de la sauvegarde.')
        return
      }
      router.push('/admin/categories')
      router.refresh()
    } catch {
      setError('Erreur réseau.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 max-w-lg">
      <Field label="Nom de la catégorie">
        <input
          value={form.name}
          onChange={(e) => set('name', e.target.value)}
          required
          placeholder="IA, Guides, Productivité…"
          className="field-input"
        />
      </Field>

      <Field label="Couleur">
        <div className="flex items-center gap-3">
          <input
            type="color"
            value={form.color}
            onChange={(e) => set('color', e.target.value)}
            className="w-10 h-10 rounded-lg border border-(--border-subtle) cursor-pointer bg-transparent"
          />
          <input
            type="text"
            value={form.color}
            onChange={(e) => set('color', e.target.value)}
            maxLength={7}
            className="field-input w-32 font-mono text-sm"
          />
          <span
            className="px-3 py-1.5 rounded-lg text-sm font-medium text-white"
            style={{ backgroundColor: form.color }}
          >
            {form.name || 'Aperçu'}
          </span>
        </div>
      </Field>

      <Field label="Applicable à">
        <div className="flex gap-3">
          {(['product', 'post', 'both'] as const).map((val) => (
            <label key={val} className="flex items-center gap-2 text-sm text-(--text-secondary) cursor-pointer">
              <input
                type="radio"
                name="contentType"
                value={val}
                checked={form.contentType === val}
                onChange={() => set('contentType', val)}
                className="accent-green-500"
              />
              {val === 'product' ? 'Produits' : val === 'post' ? 'Articles' : 'Les deux'}
            </label>
          ))}
        </div>
      </Field>

      {error && (
        <p className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">{error}</p>
      )}

      <div className="flex gap-3">
        <button type="submit" disabled={saving} className="px-6 py-2.5 rounded-xl font-semibold text-sm text-white bg-green-500 hover:bg-green-400 disabled:opacity-50 transition-colors">
          {saving ? 'Enregistrement…' : id ? 'Mettre à jour' : 'Créer la catégorie'}
        </button>
        <button type="button" onClick={() => router.back()} className="px-6 py-2.5 rounded-xl font-medium text-sm text-(--text-secondary) bg-(--bg-elevated) hover:text-(--text-primary) transition-colors">
          Annuler
        </button>
      </div>
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
