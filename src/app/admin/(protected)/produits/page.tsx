import { api } from '@/lib/api'
import Link from 'next/link'
import { Plus, Eye, EyeOff, MousePointerClick } from 'lucide-react'
import { AdminProductActions } from '@/components/admin/AdminProductActions'
import { cookies } from 'next/headers'

export default async function AdminProduitsPage() {
  const token = (await cookies()).get('admin_token')?.value ?? ''
  let products: Awaited<ReturnType<typeof api.products.adminAll>> = []
  try {
    products = await api.products.adminAll(token)
  } catch {
    products = []
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-(--text-primary)">Produits</h1>
        <Link
          href="/admin/produits/nouveau"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white bg-green-500 hover:bg-green-400 transition-colors"
        >
          <Plus size={16} />
          Nouveau produit
        </Link>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-24 text-(--text-muted)">
          Aucun produit. <Link href="/admin/produits/nouveau" className="text-green-400 hover:underline">En créer un</Link>.
        </div>
      ) : (
        <div className="card-glass rounded-2xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-(--border-subtle)">
                <th className="text-left px-4 py-3 font-medium text-(--text-muted) w-14" />
                <th className="text-left px-4 py-3 font-medium text-(--text-muted)">Produit</th>
                <th className="text-left px-4 py-3 font-medium text-(--text-muted)">Prix</th>
                <th className="text-left px-4 py-3 font-medium text-(--text-muted)">Statut</th>
                <th className="text-left px-4 py-3 font-medium text-(--text-muted)">
                  <span className="flex items-center gap-1"><Eye size={13} /> Vues</span>
                </th>
                <th className="text-left px-4 py-3 font-medium text-(--text-muted)">
                  <span className="flex items-center gap-1"><MousePointerClick size={13} /> Clics</span>
                </th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-(--border-subtle)">
              {products.map((p) => (
                <tr key={p.id} className="hover:bg-(--bg-elevated)/40 transition-colors">
                  {/* Thumbnail */}
                  <td className="px-4 py-3">
                    {p.images[0] ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={p.images[0]}
                        alt=""
                        className="w-11 h-11 rounded-lg object-cover border border-(--border-subtle)"
                      />
                    ) : (
                      <div className="w-11 h-11 rounded-lg bg-(--bg-surface) border border-(--border-subtle) flex items-center justify-center text-(--text-muted) text-[10px]">
                        —
                      </div>
                    )}
                  </td>
                  {/* Nom + desc */}
                  <td className="px-4 py-3">
                    <p className="font-semibold text-(--text-primary) leading-tight">{p.name}</p>
                    <p className="text-xs text-(--text-muted) mt-0.5 line-clamp-1 max-w-xs">
                      {p.shortDesc || p.description?.slice(0, 60) || '—'}
                    </p>
                  </td>
                  {/* Prix */}
                  <td className="px-4 py-3 text-(--text-secondary) whitespace-nowrap">{p.price ?? '—'}</td>
                  {/* Statut */}
                  <td className="px-4 py-3">
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
                  <td className="px-4 py-3 text-(--text-secondary) tabular-nums">{p.views ?? 0}</td>
                  {/* Clics */}
                  <td className="px-4 py-3 text-(--text-secondary) tabular-nums">{p.clicks ?? 0}</td>
                  {/* Actions */}
                  <td className="px-4 py-3">
                    <AdminProductActions id={p.id} />
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
