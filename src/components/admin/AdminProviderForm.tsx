'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import type { Provider } from '@/lib/api'

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000'

function getToken() {
  return document.cookie.split('; ').find((r) => r.startsWith('admin_token='))?.split('=')[1]
}

type ProviderDraft = Omit<Provider, 'id' | 'createdAt' | 'updatedAt'>

const EMPTY: ProviderDraft = {
  name: '',
  label: '',
  iconUrl: '',
  color: '#94A3B8',
}

function toKey(s: string) {
  return s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}

interface Props {
  initial?: Partial<Provider>
  id?: string
}

export function AdminProviderForm({ initial, id }: Props) {
  const router = useRouter()
  const [form, setForm] = useState<ProviderDraft>({ ...EMPTY, ...initial })
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  function set<K extends keyof ProviderDraft>(key: K, value: ProviderDraft[K]) {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setError('')

    try {
      const url = id ? `${API_URL}/api/providers/${id}` : `${API_URL}/api/providers`
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
      router.push('/admin/providers')
      router.refresh()
    } catch {
      setError('Erreur réseau.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 max-w-lg">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Label (affiché)">
          <input
            value={form.label}
            onChange={(e) => {
              set('label', e.target.value)
              if (!id) set('name', toKey(e.target.value))
            }}
            required
            placeholder="Amazon"
            className="field-input"
          />
        </Field>
        <Field label="Clé interne (name)">
          <input
            value={form.name}
            onChange={(e) => set('name', e.target.value)}
            required
            placeholder="amazon"
            className="field-input font-mono text-sm"
          />
        </Field>
      </div>

      <Field label="URL de l'icône (optionnel)">
        <input
          type="url"
          value={form.iconUrl ?? ''}
          onChange={(e) => set('iconUrl', e.target.value)}
          placeholder="https://..."
          className="field-input"
        />
        {form.iconUrl && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={form.iconUrl} alt="" className="mt-2 h-8 w-8 rounded object-contain bg-(--bg-surface) p-1" />
        )}
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
            {form.label || 'Aperçu'}
          </span>
        </div>
      </Field>

      {error && (
        <p className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">{error}</p>
      )}

      <div className="flex gap-3">
        <button type="submit" disabled={saving} className="px-6 py-2.5 rounded-xl font-semibold text-sm text-white bg-green-500 hover:bg-green-400 disabled:opacity-50 transition-colors">
          {saving ? 'Enregistrement…' : id ? 'Mettre à jour' : 'Créer le provider'}
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
