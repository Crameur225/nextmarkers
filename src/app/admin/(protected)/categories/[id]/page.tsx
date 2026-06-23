import { AdminCategoryForm } from '@/components/admin/AdminCategoryForm'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import type { Category } from '@/lib/api'

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000'

interface Props {
  params: Promise<{ id: string }>
}

export default async function EditCategoryPage({ params }: Props) {
  const { id } = await params

  let category: Category | null = null
  try {
    const res = await fetch(`${API_URL}/api/categories/${id}`, { cache: 'no-store' })
    if (!res.ok) notFound()
    category = await res.json()
  } catch {
    notFound()
  }

  if (!category) notFound()

  return (
    <div className="p-8">
      <Link
        href="/admin/categories"
        className="inline-flex items-center gap-2 text-sm text-(--text-muted) hover:text-(--text-primary) transition-colors mb-6"
      >
        <ArrowLeft size={14} />
        Retour aux catégories
      </Link>
      <h1 className="text-2xl font-bold text-(--text-primary) mb-8">Modifier la catégorie</h1>
      <AdminCategoryForm initial={category} id={id} />
    </div>
  )
}
