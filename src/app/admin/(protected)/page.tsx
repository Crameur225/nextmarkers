import { api } from '@/lib/api'
import { Package, FileText, Users } from 'lucide-react'
import Link from 'next/link'
import { cookies } from 'next/headers'

async function getStats() {
  const token = (await cookies()).get('admin_token')?.value ?? ''
  const [products, posts, subscribers] = await Promise.allSettled([
    api.products.adminAll(token),
    api.posts.adminAll(token),
    api.subscribers.list(token),
  ])
  return {
    products: products.status === 'fulfilled' ? products.value.length : 0,
    posts: posts.status === 'fulfilled' ? posts.value.length : 0,
    subscribers: subscribers.status === 'fulfilled' ? subscribers.value.length : 0,
  }
}

export default async function AdminDashboard() {
  const stats = await getStats()

  const cards = [
    { label: 'Produits', value: stats.products, icon: Package, href: '/admin/produits', color: 'text-green-400' },
    { label: 'Articles', value: stats.posts, icon: FileText, href: '/admin/posts', color: 'text-blue-400' },
    { label: 'Abonnés', value: stats.subscribers, icon: Users, href: '/admin/abonnes', color: 'text-purple-400' },
  ]

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-(--text-primary) mb-8">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
        {cards.map(({ label, value, icon: Icon, href, color }) => (
          <Link
            key={label}
            href={href}
            className="card-glass rounded-2xl p-6 flex items-center gap-4 hover:border-(--border-strong) transition-colors"
          >
            <div className={`p-3 rounded-xl bg-(--bg-elevated) ${color}`}>
              <Icon size={22} />
            </div>
            <div>
              <p className="text-2xl font-bold text-(--text-primary)">{value}</p>
              <p className="text-sm text-(--text-muted)">{label}</p>
            </div>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Link
          href="/admin/produits/nouveau"
          className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium bg-green-500 text-white hover:bg-green-400 transition-colors"
        >
          <Package size={16} />
          Ajouter un produit
        </Link>
        <Link
          href="/admin/posts/nouveau"
          className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium bg-(--bg-elevated) text-(--text-primary) border border-(--border-default) hover:border-(--border-strong) transition-colors"
        >
          <FileText size={16} />
          Écrire un article
        </Link>
      </div>
    </div>
  )
}
