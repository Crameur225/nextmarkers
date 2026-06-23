import { AdminProviderForm } from '@/components/admin/AdminProviderForm'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function NouveauProviderPage() {
  return (
    <div className="p-8">
      <Link
        href="/admin/providers"
        className="inline-flex items-center gap-2 text-sm text-(--text-muted) hover:text-(--text-primary) transition-colors mb-6"
      >
        <ArrowLeft size={14} />
        Retour aux providers
      </Link>
      <h1 className="text-2xl font-bold text-(--text-primary) mb-8">Nouveau provider</h1>
      <AdminProviderForm />
    </div>
  )
}
