import Link from 'next/link'
import { Plus } from 'lucide-react'
import { AdminProviderActions } from '@/components/admin/AdminProviderActions'
import type { Provider } from '@/lib/api'

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000'

async function getProviders(): Promise<Provider[]> {
  try {
    const res = await fetch(`${API_URL}/api/providers`, { cache: 'no-store' })
    if (!res.ok) return []
    return res.json()
  } catch {
    return []
  }
}

export default async function AdminProvidersPage() {
  const providers = await getProviders()

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-(--text-primary)">Providers</h1>
        <Link
          href="/admin/providers/nouveau"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white bg-green-500 hover:bg-green-400 transition-colors"
        >
          <Plus size={16} />
          Nouveau provider
        </Link>
      </div>

      {providers.length === 0 ? (
        <div className="text-center py-24 text-(--text-muted)">
          Aucun provider. <Link href="/admin/providers/nouveau" className="text-green-400 hover:underline">En créer un</Link>.
        </div>
      ) : (
        <div className="card-glass rounded-2xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-(--border-subtle)">
                <th className="text-left px-5 py-3 font-medium text-(--text-muted)">Label</th>
                <th className="text-left px-5 py-3 font-medium text-(--text-muted)">Clé</th>
                <th className="text-left px-5 py-3 font-medium text-(--text-muted)">Couleur</th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-(--border-subtle)">
              {providers.map((p) => (
                <tr key={p.id} className="hover:bg-(--bg-elevated)/40 transition-colors">
                  <td className="px-5 py-3.5 font-medium text-(--text-primary) flex items-center gap-2">
                    {p.iconUrl && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={p.iconUrl} alt="" className="h-5 w-5 object-contain rounded" />
                    )}
                    {p.label}
                  </td>
                  <td className="px-5 py-3.5 font-mono text-xs text-(--text-muted)">{p.name}</td>
                  <td className="px-5 py-3.5">
                    <span
                      className="inline-flex items-center gap-2 px-2 py-1 rounded-lg text-xs font-medium text-white"
                      style={{ backgroundColor: p.color }}
                    >
                      <span className="w-2.5 h-2.5 rounded-full bg-white/30" />
                      {p.color}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <AdminProviderActions id={p.id} />
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
