import { api } from '@/lib/api'
import { AdminProductForm } from '@/components/admin/AdminProductForm'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { cookies } from 'next/headers'

interface Props {
  params: Promise<{ id: string }>
}

export default async function EditProduitPage({ params }: Props) {
  const { id } = await params
  const token = (await cookies()).get('admin_token')?.value ?? ''

  let product
  try {
    const all = await api.products.adminAll(token)
    product = all.find((p) => p.id === id)
    if (!product) notFound()
  } catch {
    notFound()
  }

  return (
    <div className="p-8">
      <Link
        href="/admin/produits"
        className="inline-flex items-center gap-2 text-sm text-(--text-muted) hover:text-(--text-primary) transition-colors mb-6"
      >
        <ArrowLeft size={14} />
        Retour aux produits
      </Link>
      <h1 className="text-2xl font-bold text-(--text-primary) mb-8">Modifier le produit</h1>
      <AdminProductForm initial={product} id={id} />
    </div>
  )
}
