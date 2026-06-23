import { AdminProviderForm } from '@/components/admin/AdminProviderForm'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import type { Provider } from '@/lib/api'

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000'

interface Props {
  params: Promise<{ id: string }>
}

export default async function EditProviderPage({ params }: Props) {
  const { id } = await params

  let provider: Provider | null = null
  try {
    const res = await fetch(`${API_URL}/api/providers/${id}`, { cache: 'no-store' })
    if (!res.ok) notFound()
    provider = await res.json()
  } catch {
    notFound()
  }

  if (!provider) notFound()

  return (
    <div className="p-8">
      <Link
        href="/admin/providers"
        className="inline-flex items-center gap-2 text-sm text-(--text-muted) hover:text-(--text-primary) transition-colors mb-6"
      >
        <ArrowLeft size={14} />
        Retour aux providers
      </Link>
      <h1 className="text-2xl font-bold text-(--text-primary) mb-8">Modifier le provider</h1>
      <AdminProviderForm initial={provider} id={id} />
    </div>
  )
}
