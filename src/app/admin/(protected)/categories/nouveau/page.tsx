import { AdminCategoryForm } from '@/components/admin/AdminCategoryForm'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function NouvelleCategoryPage() {
  return (
    <div className="p-8">
      <Link
        href="/admin/categories"
        className="inline-flex items-center gap-2 text-sm text-(--text-muted) hover:text-(--text-primary) transition-colors mb-6"
      >
        <ArrowLeft size={14} />
        Retour aux catégories
      </Link>
      <h1 className="text-2xl font-bold text-(--text-primary) mb-8">Nouvelle catégorie</h1>
      <AdminCategoryForm />
    </div>
  )
}
