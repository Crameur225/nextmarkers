'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import { Upload, X, Link2 } from 'lucide-react'

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000'

function getToken() {
  return document.cookie
    .split('; ')
    .find((row) => row.startsWith('admin_token='))
    ?.split('=')[1]
}

interface ImageUploaderProps {
  value: string[]
  onChange: (urls: string[]) => void
}

export function ImageUploader({ value, onChange }: ImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)
  const [urlInput, setUrlInput] = useState('')

  async function handleFiles(files: FileList | null) {
    if (!files || files.length === 0) return
    setUploading(true)
    const uploaded: string[] = []
    for (const file of Array.from(files)) {
      const fd = new FormData()
      fd.append('file', file) // backend multer expects 'file'
      try {
        const res = await fetch(`${API_URL}/api/upload`, {
          method: 'POST',
          headers: { Authorization: `Bearer ${getToken()}` },
          body: fd,
        })
        if (res.ok) {
          const { url } = await res.json()
          uploaded.push(url)
        } else {
          console.error('Upload failed:', await res.text())
        }
      } catch (err) {
        console.error('Upload error:', err)
      }
    }
    onChange([...value, ...uploaded])
    setUploading(false)
  }

  function addUrlManually() {
    const trimmed = urlInput.trim()
    if (!trimmed || value.includes(trimmed)) return
    onChange([...value, trimmed])
    setUrlInput('')
  }

  function removeImage(url: string) {
    onChange(value.filter((u) => u !== url))
  }

  return (
    <div className="flex flex-col gap-3">
      {value.length > 0 && (
        <div className="flex flex-wrap gap-3">
          {value.map((url) => (
            <div key={url} className="relative w-20 h-20 rounded-xl overflow-hidden border border-(--border-subtle) group">
              <Image src={url} alt="product" fill className="object-cover" sizes="80px" unoptimized={!url.includes('res.cloudinary.com') && !url.includes('images.unsplash.com') && !url.includes('m.media-amazon.com')} />
              <button
                type="button"
                onClick={() => removeImage(url)}
                className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X size={16} className="text-white" />
              </button>
            </div>
          ))}
        </div>
      )}

      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={uploading}
        className="flex items-center gap-2 px-4 py-3 rounded-xl border border-dashed border-(--border-default) text-(--text-muted) hover:border-green-500/40 hover:text-green-400 transition-colors text-sm disabled:opacity-50"
      >
        <Upload size={16} />
        {uploading ? 'Envoi en cours…' : 'Upload depuis l\'appareil'}
      </button>

      {/* URL fallback */}
      <div className="flex gap-2">
        <input
          type="url"
          value={urlInput}
          onChange={(e) => setUrlInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addUrlManually())}
          placeholder="Ou coller une URL d'image…"
          className="field-input flex-1 text-sm"
        />
        <button
          type="button"
          onClick={addUrlManually}
          disabled={!urlInput.trim()}
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium text-green-400 border border-green-500/30 hover:bg-green-500/10 disabled:opacity-40 transition-colors"
        >
          <Link2 size={14} />
          Ajouter
        </button>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />
    </div>
  )
}
