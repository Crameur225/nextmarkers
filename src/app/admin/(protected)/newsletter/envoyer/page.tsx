'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Send, Eye, Code, Loader2, CheckCircle } from 'lucide-react'

function getToken() {
  return document.cookie.split('; ').find((r) => r.startsWith('admin_token='))?.split('=')[1] ?? ''
}

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000'

export default function EnvoyerNewsletterPage() {
  const router = useRouter()
  const [subject, setSubject] = useState('')
  const [html, setHtml] = useState('')
  const [tab, setTab] = useState<'code' | 'preview'>('code')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle')
  const [result, setResult] = useState<{ campaignId: string; recipientCount: number } | null>(null)
  const [error, setError] = useState('')
  const [subscriberCount, setSubscriberCount] = useState<number | null>(null)

  useEffect(() => {
    fetch(`${API_URL}/api/newsletter`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    })
      .then((r) => r.json())
      .then((data: { unsubscribed: boolean }[]) => {
        setSubscriberCount(data.filter((s) => !s.unsubscribed).length)
      })
      .catch(() => {})
  }, [])

  async function handleSend() {
    if (!subject.trim() || !html.trim()) {
      setError('Sujet et contenu HTML requis.')
      return
    }
    if (!confirm(`Envoyer à ${subscriberCount ?? '?'} abonnés actifs ?`)) return

    setStatus('loading')
    setError('')

    try {
      const res = await fetch(`${API_URL}/api/newsletter/campaigns`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify({ subject, html }),
      })
      const data = await res.json() as { success?: boolean; campaignId?: string; recipientCount?: number; error?: string }

      if (!res.ok) {
        setError(data.error ?? 'Erreur serveur.')
        setStatus('idle')
        return
      }

      setResult({ campaignId: data.campaignId!, recipientCount: data.recipientCount! })
      setStatus('success')
    } catch {
      setError('Erreur réseau.')
      setStatus('idle')
    }
  }

  if (status === 'success' && result) {
    return (
      <div className="p-8 flex flex-col items-center justify-center min-h-[60vh] text-center gap-6">
        <div className="w-16 h-16 rounded-2xl bg-green-500/15 flex items-center justify-center">
          <CheckCircle size={32} className="text-green-400" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-(--text-primary) mb-2">Envoi en cours !</h2>
          <p className="text-(--text-secondary)">
            La campagne est en cours d&apos;envoi à{' '}
            <strong className="text-(--text-primary)">{result.recipientCount} abonnés</strong>.
            <br />
            Les emails partent un par un — cela peut prendre quelques minutes.
          </p>
        </div>
        <button
          onClick={() => router.push('/admin/newsletter')}
          className="px-6 py-2.5 rounded-xl font-semibold text-sm text-white bg-green-500 hover:bg-green-400 transition-colors"
        >
          Voir les campagnes
        </button>
      </div>
    )
  }

  return (
    <div className="p-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-(--text-primary)">Envoyer une newsletter</h1>
        {subscriberCount !== null && (
          <p className="text-sm text-(--text-muted) mt-1">
            {subscriberCount} abonné{subscriberCount !== 1 ? 's' : ''} actif{subscriberCount !== 1 ? 's' : ''}
          </p>
        )}
      </div>

      <div className="space-y-5">
        {/* Sujet */}
        <div>
          <label className="block text-sm font-medium text-(--text-secondary) mb-2">Sujet</label>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Ex: Les 5 meilleurs outils IA de juin 2026"
            className="w-full px-4 py-3 rounded-xl bg-(--bg-elevated) border border-(--border-default) text-(--text-primary) placeholder:text-(--text-muted) focus:outline-none focus:border-green-500/60 transition-colors"
          />
        </div>

        {/* Éditeur HTML + preview */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <label className="text-sm font-medium text-(--text-secondary)">Contenu HTML</label>
            <div className="flex items-center gap-1 ml-auto">
              <button
                type="button"
                onClick={() => setTab('code')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  tab === 'code'
                    ? 'bg-green-500/15 text-green-400'
                    : 'text-(--text-muted) hover:text-(--text-primary)'
                }`}
              >
                <Code size={13} /> Code
              </button>
              <button
                type="button"
                onClick={() => setTab('preview')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  tab === 'preview'
                    ? 'bg-green-500/15 text-green-400'
                    : 'text-(--text-muted) hover:text-(--text-primary)'
                }`}
              >
                <Eye size={13} /> Aperçu
              </button>
            </div>
          </div>

          {tab === 'code' ? (
            <textarea
              value={html}
              onChange={(e) => setHtml(e.target.value)}
              rows={18}
              placeholder="<h1>Bonjour !</h1><p>Voici les outils de la semaine...</p>"
              className="w-full px-4 py-3 rounded-xl bg-(--bg-elevated) border border-(--border-default) text-(--text-primary) placeholder:text-(--text-muted) focus:outline-none focus:border-green-500/60 transition-colors resize-y font-mono text-sm"
            />
          ) : (
            <div className="rounded-xl border border-(--border-default) overflow-hidden bg-white" style={{ height: '420px' }}>
              {html ? (
                <iframe
                  srcDoc={html}
                  sandbox="allow-same-origin"
                  className="w-full h-full"
                  title="Aperçu email"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-sm text-gray-400">
                  Écris du HTML pour voir l&apos;aperçu
                </div>
              )}
            </div>
          )}
        </div>

        {error && (
          <p className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
            {error}
          </p>
        )}

        <button
          type="button"
          onClick={handleSend}
          disabled={status === 'loading'}
          className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-white bg-green-500 hover:bg-green-400 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
        >
          {status === 'loading' ? (
            <><Loader2 size={16} className="animate-spin" /> Envoi…</>
          ) : (
            <><Send size={16} /> Envoyer la campagne</>
          )}
        </button>
      </div>
    </div>
  )
}
