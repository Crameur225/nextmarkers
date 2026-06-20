import { api } from '@/lib/api'
import { AdminPostForm } from '@/components/admin/AdminPostForm'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { cookies } from 'next/headers'

interface Props {
  params: Promise<{ id: string }>
}

export default async function EditPostPage({ params }: Props) {
  const { id } = await params
  const token = (await cookies()).get('admin_token')?.value ?? ''

  let post
  try {
    const all = await api.posts.adminAll(token)
    post = all.find((p) => p.id === id)
    if (!post) notFound()
  } catch {
    notFound()
  }

  return (
    <div className="p-8">
      <Link
        href="/admin/posts"
        className="inline-flex items-center gap-2 text-sm text-(--text-muted) hover:text-(--text-primary) transition-colors mb-6"
      >
        <ArrowLeft size={14} />
        Retour aux articles
      </Link>
      <h1 className="text-2xl font-bold text-(--text-primary) mb-8">Modifier l&apos;article</h1>
      <AdminPostForm initial={post} id={id} />
    </div>
  )
}
