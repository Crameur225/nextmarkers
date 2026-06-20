'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Pencil, Trash2 } from 'lucide-react'

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000'

function getToken() {
  return document.cookie
    .split('; ')
    .find((row) => row.startsWith('admin_token='))
    ?.split('=')[1]
}

export function AdminPostActions({ id }: { id: string }) {
  const router = useRouter()

  async function handleDelete() {
    if (!confirm('Supprimer cet article ?')) return
    const res = await fetch(`${API_URL}/api/posts/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${getToken()}` },
    })
    if (res.ok) router.refresh()
  }

  return (
    <div className="flex items-center gap-2 justify-end">
      <Link
        href={`/admin/posts/${id}`}
        className="p-1.5 rounded-lg hover:bg-(--bg-elevated) text-(--text-muted) hover:text-(--text-primary) transition-colors"
      >
        <Pencil size={14} />
      </Link>
      <button
        onClick={handleDelete}
        className="p-1.5 rounded-lg hover:bg-red-500/10 text-(--text-muted) hover:text-red-400 transition-colors"
      >
        <Trash2 size={14} />
      </button>
    </div>
  )
}
