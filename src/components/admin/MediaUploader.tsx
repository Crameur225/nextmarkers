'use client'

import { useState, useRef } from 'react'
import { Upload, Link2, X, Plus, Image, Music, Video, Loader2 } from 'lucide-react'

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000'

function getToken() {
  return document.cookie.split('; ').find((r) => r.startsWith('admin_token='))?.split('=')[1] ?? ''
}

type Tab = 'images' | 'audios' | 'videos'

interface Props {
  images: string[]
  audios: string[]
  videos: string[]
  onImagesChange: (urls: string[]) => void
  onAudiosChange: (urls: string[]) => void
  onVideosChange: (urls: string[]) => void
}

const TAB_CONFIG: { id: Tab; label: string; icon: React.ReactNode; accept: string; multiple: boolean }[] = [
  { id: 'images', label: 'Images', icon: <Image size={14} />, accept: 'image/*', multiple: true },
  { id: 'audios', label: 'Audio', icon: <Music size={14} />, accept: 'audio/*', multiple: true },
  { id: 'videos', label: 'Vidéo', icon: <Video size={14} />, accept: 'video/*', multiple: true },
]

export function MediaUploader({ images, audios, videos, onImagesChange, onAudiosChange, onVideosChange }: Props) {
  const [tab, setTab] = useState<Tab>('images')
  const [progress, setProgress] = useState<{ done: number; total: number } | null>(null)
  const [error, setError] = useState('')
  const [urlInput, setUrlInput] = useState('')
  const [showUrlInput, setShowUrlInput] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const items = tab === 'images' ? images : tab === 'audios' ? audios : videos
  const onChange = tab === 'images' ? onImagesChange : tab === 'audios' ? onAudiosChange : onVideosChange

  function remove(index: number) {
    onChange(items.filter((_, i) => i !== index))
  }

  function addUrl() {
    if (!urlInput.trim()) return
    onChange([...items, urlInput.trim()])
    setUrlInput('')
    setShowUrlInput(false)
  }

  async function uploadFile(file: File): Promise<string | null> {
    const fd = new FormData()
    fd.append('file', file)
    try {
      const res = await fetch(`${API_URL}/api/upload`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${getToken()}` },
        body: fd,
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.error ?? data.detail ?? `HTTP ${res.status}`)
      }
      const data = await res.json() as { url: string }
      return data.url
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur upload')
      return null
    }
  }

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? [])
    if (!files.length) return

    setError('')
    setProgress({ done: 0, total: files.length })

    const newUrls: string[] = []
    for (const file of files) {
      const url = await uploadFile(file)
      if (url) newUrls.push(url)
      setProgress((p) => p ? { ...p, done: p.done + 1 } : null)
    }

    if (newUrls.length) onChange([...items, ...newUrls])
    setProgress(null)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const currentTab = TAB_CONFIG.find((t) => t.id === tab)!
  const isUploading = progress !== null

  return (
    <div className="flex flex-col gap-3">
      {/* Tabs */}
      <div className="flex gap-1 p-1 bg-(--bg-surface) rounded-xl">
        {TAB_CONFIG.map((t) => {
          const count = (t.id === 'images' ? images : t.id === 'audios' ? audios : videos).length
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => { setTab(t.id); setError(''); setShowUrlInput(false) }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex-1 justify-center
                ${tab === t.id
                  ? 'bg-(--bg-elevated) text-(--text-primary) shadow-sm'
                  : 'text-(--text-muted) hover:text-(--text-secondary)'}`}
            >
              {t.icon}
              {t.label}
              {count > 0 && (
                <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold leading-none
                  ${tab === t.id ? 'bg-green-500/20 text-green-400' : 'bg-(--border-subtle) text-(--text-muted)'}`}>
                  {count}
                </span>
              )}
            </button>
          )
        })}
      </div>

      {/* Images — 2-col grid */}
      {tab === 'images' && items.length > 0 && (
        <div className="grid grid-cols-2 gap-2">
          {items.map((url, i) => (
            <div key={i} className="group relative rounded-xl overflow-hidden border border-(--border-subtle) bg-(--bg-surface)">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={url} alt="" className="w-full h-40 object-cover" />
              <button
                type="button"
                onClick={() => remove(i)}
                className="absolute top-1.5 right-1.5 p-1 rounded-lg bg-black/60 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500/80"
              >
                <X size={13} />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Audio list */}
      {tab === 'audios' && items.length > 0 && (
        <div className="flex flex-col gap-2">
          {items.map((url, i) => (
            <div key={i} className="group relative rounded-xl border border-(--border-subtle) bg-(--bg-surface) p-3">
              <audio controls src={url} className="w-full" />
              <p className="text-xs text-(--text-muted) mt-1 truncate">{url}</p>
              <button
                type="button"
                onClick={() => remove(i)}
                className="absolute top-2 right-2 p-1 rounded-lg bg-black/60 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500/80"
              >
                <X size={13} />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Video list */}
      {tab === 'videos' && items.length > 0 && (
        <div className="flex flex-col gap-2">
          {items.map((url, i) => (
            <div key={i} className="group relative rounded-xl border border-(--border-subtle) bg-(--bg-surface) p-3">
              <video controls src={url} className="w-full rounded-lg max-h-52" />
              <p className="text-xs text-(--text-muted) mt-1 truncate">{url}</p>
              <button
                type="button"
                onClick={() => remove(i)}
                className="absolute top-2 right-2 p-1 rounded-lg bg-black/60 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500/80"
              >
                <X size={13} />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-2 items-center">
        <input
          ref={fileInputRef}
          type="file"
          accept={currentTab.accept}
          multiple={currentTab.multiple}
          className="hidden"
          onChange={handleFileChange}
        />
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={isUploading}
          className="flex items-center gap-2 px-3 py-2 rounded-xl border border-(--border-subtle) text-xs font-medium text-(--text-secondary) hover:border-(--border-default) hover:text-(--text-primary) disabled:opacity-50 transition-all"
        >
          {isUploading ? <Loader2 size={13} className="animate-spin" /> : <Upload size={13} />}
          {isUploading
            ? `${progress!.done} / ${progress!.total} fichiers…`
            : tab === 'images' ? 'Uploader des images' : 'Uploader'}
        </button>
        <button
          type="button"
          onClick={() => setShowUrlInput(!showUrlInput)}
          className="flex items-center gap-2 px-3 py-2 rounded-xl border border-(--border-subtle) text-xs font-medium text-(--text-secondary) hover:border-(--border-default) hover:text-(--text-primary) transition-all"
        >
          <Link2 size={13} />
          URL
        </button>
      </div>

      {showUrlInput && (
        <div className="flex gap-2">
          <input
            type="url"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addUrl())}
            placeholder="https://..."
            className="field-input flex-1 text-xs"
          />
          <button
            type="button"
            onClick={addUrl}
            className="px-3 py-2 rounded-xl bg-green-500/20 text-green-400 hover:bg-green-500/30 transition-colors"
          >
            <Plus size={14} />
          </button>
        </div>
      )}

      {error && (
        <p className="text-xs text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">{error}</p>
      )}
    </div>
  )
}
