import { api } from '@/lib/api'
import { ExportSubscribersButton } from '@/components/admin/ExportSubscribersButton'
import { cookies } from 'next/headers'

export default async function AbonnesPage() {
  const token = (await cookies()).get('admin_token')?.value ?? ''
  let subscribers: { id: string; email: string; createdAt: string }[] = []
  try {
    subscribers = await api.subscribers.list(token)
  } catch {
    subscribers = []
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-(--text-primary)">Abonnés</h1>
          <p className="text-sm text-(--text-muted) mt-1">{subscribers.length} abonné{subscribers.length !== 1 ? 's' : ''}</p>
        </div>
        <ExportSubscribersButton subscribers={subscribers} />
      </div>

      {subscribers.length === 0 ? (
        <div className="text-center py-24 text-(--text-muted)">
          Aucun abonné pour l&apos;instant.
        </div>
      ) : (
        <div className="card-glass rounded-2xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-(--border-subtle)">
                <th className="text-left px-5 py-3 font-medium text-(--text-muted)">Email</th>
                <th className="text-left px-5 py-3 font-medium text-(--text-muted)">Date d&apos;inscription</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-(--border-subtle)">
              {subscribers.map((s) => (
                <tr key={s.id} className="hover:bg-(--bg-elevated)/40 transition-colors">
                  <td className="px-5 py-3.5 text-(--text-primary)">{s.email}</td>
                  <td className="px-5 py-3.5 text-(--text-secondary)">
                    {new Date(s.createdAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
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
