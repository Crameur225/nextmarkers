import Link from 'next/link'
import { Plus } from 'lucide-react'
import { AdminCategoryActions } from '@/components/admin/AdminCategoryActions'
import type { Category } from '@/lib/api'

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000'

async function getCategories(): Promise<Category[]> {
  try {
    const res = await fetch(`${API_URL}/api/categories`, { cache: 'no-store' })
    if (!res.ok) return []
    return res.json()
  } catch {
    return []
  }
}

const CONTENT_TYPE_LABEL: Record<string, string> = {
  product: 'Produits',
  post: 'Articles',
  both: 'Les deux',
}

export default async function AdminCategoriesPage() {
  const categories = await getCategories()

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-(--text-primary)">Catégories</h1>
        <Link
          href="/admin/categories/nouveau"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white bg-green-500 hover:bg-green-400 transition-colors"
        >
          <Plus size={16} />
          Nouvelle catégorie
        </Link>
      </div>

      {categories.length === 0 ? (
        <div className="text-center py-24 text-(--text-muted)">
          Aucune catégorie. <Link href="/admin/categories/nouveau" className="text-green-400 hover:underline">En créer une</Link>.
        </div>
      ) : (
        <div className="card-glass rounded-2xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-(--border-subtle)">
                <th className="text-left px-5 py-3 font-medium text-(--text-muted)">Nom</th>
                <th className="text-left px-5 py-3 font-medium text-(--text-muted)">Couleur</th>
                <th className="text-left px-5 py-3 font-medium text-(--text-muted)">Applicable à</th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-(--border-subtle)">
              {categories.map((c) => (
                <tr key={c.id} className="hover:bg-(--bg-elevated)/40 transition-colors">
                  <td className="px-5 py-3.5 font-medium text-(--text-primary)">
                    <span
                      className="inline-flex items-center gap-2 px-2.5 py-1 rounded-lg text-xs font-semibold text-white"
                      style={{ backgroundColor: c.color }}
                    >
                      {c.name}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 font-mono text-xs text-(--text-muted)">{c.color}</td>
                  <td className="px-5 py-3.5 text-(--text-secondary) text-xs">
                    {CONTENT_TYPE_LABEL[c.contentType] ?? c.contentType}
                  </td>
                  <td className="px-5 py-3.5">
                    <AdminCategoryActions id={c.id} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
