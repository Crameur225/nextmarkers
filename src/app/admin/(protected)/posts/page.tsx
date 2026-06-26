import { api } from '@/lib/api'
import Link from 'next/link'
import { Plus, Eye, EyeOff } from 'lucide-react'
import { AdminPostActions } from '@/components/admin/AdminPostActions'
import { cookies } from 'next/headers'

export default async function AdminPostsPage() {
  const token = (await cookies()).get('admin_token')?.value ?? ''
  let posts: Awaited<ReturnType<typeof api.posts.adminAll>> = []
  try {
    posts = await api.posts.adminAll(token)
  } catch {
    posts = []
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-(--text-primary)">Articles</h1>
        <Link
          href="/admin/posts/nouveau"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white bg-green-500 hover:bg-green-400 transition-colors"
        >
          <Plus size={16} />
          Nouvel article
        </Link>
      </div>

      {posts.length === 0 ? (
        <div className="text-center py-24 text-(--text-muted)">
          Aucun article. <Link href="/admin/posts/nouveau" className="text-green-400 hover:underline">En écrire un</Link>.
        </div>
      ) : (
        <div className="card-glass rounded-2xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-(--border-subtle)">
                <th className="text-left px-5 py-3 font-medium text-(--text-muted)">Article</th>
                <th className="text-left px-5 py-3 font-medium text-(--text-muted)">Auteur</th>
                <th className="text-left px-5 py-3 font-medium text-(--text-muted)">Catégorie</th>
                <th className="text-left px-5 py-3 font-medium text-(--text-muted)">Statut</th>
                <th className="text-left px-5 py-3 font-medium text-(--text-muted)">
                  <span className="flex items-center gap-1"><Eye size={13} /> Vues</span>
                </th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-(--border-subtle)">
              {posts.map((p) => (
                <tr key={p.id} className="hover:bg-(--bg-elevated)/40 transition-colors">
                  {/* Titre + desc */}
                  <td className="px-5 py-3.5">
                    <p className="font-semibold text-(--text-primary) leading-tight">{p.title}</p>
                    <p className="text-xs text-(--text-muted) mt-0.5 line-clamp-1 max-w-xs">
                      {p.description?.slice(0, 70) || '—'}
                    </p>
                  </td>
                  {/* Auteur */}
                  <td className="px-5 py-3.5 text-(--text-secondary) text-xs whitespace-nowrap">
                    {p.author || '—'}
                  </td>
                  {/* Catégorie */}
                  <td className="px-5 py-3.5 text-(--text-secondary)">{p.category}</td>
                  {/* Statut */}
                  <td className="px-5 py-3.5">
                    {p.published ? (
                      <span className="inline-flex items-center gap-1 text-xs font-medium text-green-400">
                        <Eye size={11} /> Publié
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-xs font-medium text-(--text-muted)">
                        <EyeOff size={11} /> Brouillon
                      </span>
                    )}
                  </td>
                  {/* Vues */}
                  <td className="px-5 py-3.5 text-(--text-secondary) tabular-nums">{p.views ?? 0}</td>
                  {/* Actions */}
                  <td className="px-5 py-3.5">
                    <AdminPostActions id={p.id} />
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
