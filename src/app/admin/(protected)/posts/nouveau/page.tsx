import { AdminPostForm } from '@/components/admin/AdminPostForm'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function NouvelArticlePage() {
  return (
    <div className="p-8">
      <Link
        href="/admin/posts"
        className="inline-flex items-center gap-2 text-sm text-(--text-muted) hover:text-(--text-primary) transition-colors mb-6"
      >
        <ArrowLeft size={14} />
        Retour aux articles
      </Link>
      <h1 className="text-2xl font-bold text-(--text-primary) mb-8">Nouvel article</h1>
      <AdminPostForm />
    </div>
  )
}
