'use client'

import { useState } from 'react'
import { Send, Check, X, Loader2 } from 'lucide-react'

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000'

function getToken() {
  return document.cookie.split('; ').find((r) => r.startsWith('admin_token='))?.split('=')[1] ?? ''
}

interface Platform {
  id: 'twitter' | 'facebook' | 'instagram' | 'tiktok'
  label: string
  icon: React.ReactNode
  color: string
  note?: string
}

const XIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.261 5.636 5.903-5.636Zm-1.161 17.52h1.833L7.084 4.126H5.117Z" />
  </svg>
)
const FBIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
)
const IGIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
  </svg>
)

const PLATFORMS: Platform[] = [
  { id: 'twitter',   label: 'X / Twitter', icon: <XIcon />,   color: 'border-sky-500/30 bg-sky-500/10 text-sky-400' },
  { id: 'facebook',  label: 'Facebook',    icon: <FBIcon />,  color: 'border-blue-600/30 bg-blue-600/10 text-blue-400' },
  { id: 'instagram', label: 'Instagram',   icon: <IGIcon />,  color: 'border-pink-500/30 bg-pink-500/10 text-pink-400' },
  { id: 'tiktok',    label: 'TikTok',      icon: <span className="text-[10px] font-black leading-none">TK</span>, color: 'border-white/20 bg-white/5 text-(--text-muted)', note: 'Lien de partage uniquement (API vidéo)' },
]

interface PublishResult {
  success: boolean
  error?: string
}

interface Props {
  title: string
  description: string
  url: string
  imageUrl?: string
}

export function SocialPublisher({ title, description, url, imageUrl }: Props) {
  const [selected, setSelected] = useState<Set<string>>(new Set(['twitter', 'facebook']))
  const [status, setStatus] = useState<'idle' | 'loading' | 'done'>('idle')
  const [results, setResults] = useState<Record<string, PublishResult>>({})

  function toggle(id: string) {
    setSelected((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  async function publish() {
    if (!selected.size) return
    setStatus('loading')
    setResults({})

    try {
      const res = await fetch(`${API_URL}/api/social/publish`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify({
          title,
          description,
          url,
          imageUrl,
          platforms: Array.from(selected),
        }),
      })
      const data = await res.json() as { results: Record<string, PublishResult> }
      setResults(data.results ?? {})
    } catch {
      setResults(Object.fromEntries(Array.from(selected).map((id) => [id, { success: false, error: 'Erreur réseau' }])))
    } finally {
      setStatus('done')
    }
  }

  return (
    <div className="rounded-2xl border border-(--border-subtle) bg-(--bg-elevated) p-5 flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <Send size={16} className="text-green-400" />
        <p className="text-sm font-semibold text-(--text-primary)">Diffuser sur les réseaux</p>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {PLATFORMS.map((p) => {
          const isSelected = selected.has(p.id)
          const result = results[p.id]
          return (
            <button
              key={p.id}
              type="button"
              onClick={() => toggle(p.id)}
              disabled={status === 'loading'}
              className={`relative flex items-center gap-2 px-3 py-2.5 rounded-xl border text-xs font-medium transition-all
                ${isSelected ? p.color : 'border-(--border-subtle) text-(--text-muted) hover:border-(--border-default)'}
                disabled:opacity-50`}
            >
              {p.icon}
              <span className="flex-1 text-left">{p.label}</span>
              {result && (
                <span className={result.success ? 'text-green-400' : 'text-red-400'}>
                  {result.success ? <Check size={13} /> : <X size={13} />}
                </span>
              )}
            </button>
          )
        })}
      </div>

      {/* Platform notes */}
      {Array.from(selected).map((id) => {
        const p = PLATFORMS.find((pl) => pl.id === id)
        return p?.note ? (
          <p key={id} className="text-xs text-(--text-muted) -mt-2">ℹ️ {p.label} : {p.note}</p>
        ) : null
      })}

      {/* Results */}
      {status === 'done' && Object.keys(results).length > 0 && (
        <ul className="flex flex-col gap-1.5">
          {Object.entries(results).map(([platform, r]) => (
            <li key={platform} className={`text-xs flex items-center gap-2 ${r.success ? 'text-green-400' : 'text-red-400'}`}>
              {r.success ? <Check size={12} /> : <X size={12} />}
              <span className="font-medium capitalize">{platform}</span>
              {!r.success && r.error && <span className="text-(--text-muted)">— {r.error}</span>}
            </li>
          ))}
        </ul>
      )}

      <button
        type="button"
        onClick={publish}
        disabled={status === 'loading' || !selected.size}
        className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white bg-green-500 hover:bg-green-400 disabled:opacity-50 transition-colors"
      >
        {status === 'loading' ? (
          <><Loader2 size={15} className="animate-spin" /> Publication…</>
        ) : (
          <><Send size={14} /> Publier maintenant</>
        )}
      </button>

      <p className="text-xs text-(--text-muted)">
        Configure tes clés API dans le fichier <code className="text-green-400">.env</code> du backend pour activer chaque plateforme.
      </p>
    </div>
  )
}
