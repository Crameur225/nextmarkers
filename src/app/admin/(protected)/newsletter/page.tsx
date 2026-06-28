import { api } from '@/lib/api'
import Link from 'next/link'
import { Send, Eye, MousePointerClick, Users } from 'lucide-react'
import { cookies } from 'next/headers'

export default async function AdminNewsletterPage() {
  const token = (await cookies()).get('admin_token')?.value ?? ''

  let campaigns: Awaited<ReturnType<typeof api.campaigns.list>> = []
  let subscribers: Awaited<ReturnType<typeof api.subscribers.list>> = []

  try {
    ;[campaigns, subscribers] = await Promise.all([
      api.campaigns.list(token),
      api.subscribers.list(token),
    ])
  } catch {
    campaigns = []
    subscribers = []
  }

  const active = subscribers.filter((s) => !s.unsubscribed).length
  const unsub = subscribers.filter((s) => s.unsubscribed).length

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-(--text-primary)">Newsletter</h1>
          <p className="text-sm text-(--text-muted) mt-1">
            {active} abonné{active !== 1 ? 's' : ''} actif{active !== 1 ? 's' : ''}
            {unsub > 0 && ` · ${unsub} désabonné${unsub !== 1 ? 's' : ''}`}
          </p>
        </div>
        <Link
          href="/admin/newsletter/envoyer"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white bg-green-500 hover:bg-green-400 transition-colors"
        >
          <Send size={16} />
          Envoyer une newsletter
        </Link>
      </div>

      {campaigns.length === 0 ? (
        <div className="text-center py-24 text-(--text-muted)">
          Aucune campagne envoyée.{' '}
          <Link href="/admin/newsletter/envoyer" className="text-green-400 hover:underline">
            Envoyer la première
          </Link>
          .
        </div>
      ) : (
        <div className="card-glass rounded-2xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-(--border-subtle)">
                <th className="text-left px-5 py-3 font-medium text-(--text-muted)">Sujet</th>
                <th className="text-left px-5 py-3 font-medium text-(--text-muted)">Envoyée</th>
                <th className="text-left px-5 py-3 font-medium text-(--text-muted)">
                  <span className="flex items-center gap-1"><Users size={13} /> Destinataires</span>
                </th>
                <th className="text-left px-5 py-3 font-medium text-(--text-muted)">
                  <span className="flex items-center gap-1"><Eye size={13} /> Ouvertures</span>
                </th>
                <th className="text-left px-5 py-3 font-medium text-(--text-muted)">
                  <span className="flex items-center gap-1"><MousePointerClick size={13} /> Clics</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-(--border-subtle)">
              {campaigns.map((c) => {
                const openRate = c.recipientCount > 0
                  ? Math.round((c.uniqueOpens / c.recipientCount) * 100)
                  : 0
                const clickRate = c.recipientCount > 0
                  ? Math.round((c.uniqueClicks / c.recipientCount) * 100)
                  : 0

                return (
                  <tr key={c.id} className="hover:bg-(--bg-elevated)/40 transition-colors">
                    <td className="px-5 py-3.5">
                      <p className="font-semibold text-(--text-primary) leading-tight">{c.subject}</p>
                      {!c.sentAt && (
                        <span className="text-xs text-amber-400">En cours d&apos;envoi…</span>
                      )}
                    </td>
                    <td className="px-5 py-3.5 text-(--text-secondary) whitespace-nowrap">
                      {c.sentAt
                        ? new Date(c.sentAt).toLocaleDateString('fr-FR', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                          })
                        : '—'}
                    </td>
                    <td className="px-5 py-3.5 text-(--text-secondary) tabular-nums">
                      {c.recipientCount}
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="text-(--text-primary) tabular-nums font-medium">
                        {c.uniqueOpens}
                      </span>
                      <span className="text-(--text-muted) text-xs ml-1">({openRate}%)</span>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="text-(--text-primary) tabular-nums font-medium">
                        {c.uniqueClicks}
                      </span>
                      <span className="text-(--text-muted) text-xs ml-1">({clickRate}%)</span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
