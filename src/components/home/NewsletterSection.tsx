'use client'

import { useState, FormEvent } from 'react'
import { Mail, Loader2, CheckCircle, AlertCircle } from 'lucide-react'

type Status = 'idle' | 'loading' | 'success' | 'error'

export function NewsletterSection() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<Status>('idle')
  const [message, setMessage] = useState('')

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setStatus('loading')

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000'}/api/newsletter`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      const data = await res.json()

      if (res.ok) {
        setStatus('success')
        setMessage('Bienvenue ! Vérifie ta boîte mail pour confirmer.')
        setEmail('')
      } else {
        setStatus('error')
        setMessage(data.error ?? 'Une erreur est survenue.')
      }
    } catch {
      setStatus('error')
      setMessage('Erreur réseau. Réessaie dans un moment.')
    }
  }

  return (
    <section id="newsletter" className="section-padding bg-(--bg-surface)">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="relative rounded-3xl border border-(--border-subtle) bg-gradient-to-br from-green-500/10 via-transparent to-green-400/5 overflow-hidden">
          {/* Background orb */}
          <div
            aria-hidden
            className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-green-500/15 blur-[100px]"
          />

          <div className="relative px-8 py-14 text-center">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-green-500/15 border border-green-500/20 mb-6">
              <Mail size={24} className="text-green-400" />
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold text-(--text-primary) mb-4">
              Recevez les meilleures découvertes chaque semaine.
            </h2>
            <p className="text-lg text-(--text-secondary) max-w-xl mx-auto mb-10">
              Une sélection d&apos;outils, de stratégies et d&apos;innovations directement dans votre boîte mail.
            </p>

            {status === 'success' ? (
              <div className="flex items-center justify-center gap-3 text-green-400">
                <CheckCircle size={20} />
                <p className="font-medium">{message}</p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Votre adresse e-mail"
                  required
                  disabled={status === 'loading'}
                  className="flex-1 px-4 py-3 rounded-xl bg-(--bg-elevated) border border-(--border-default) text-(--text-primary) placeholder:text-(--text-muted) focus:outline-none focus:border-green-500/60 transition-colors disabled:opacity-60"
                />
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-white bg-green-500 hover:bg-green-400 transition-colors disabled:opacity-60 disabled:cursor-not-allowed whitespace-nowrap"
                >
                  {status === 'loading' ? (
                    <Loader2 size={16} className="animate-spin" />
                  ) : (
                    'Je rejoins NextMakers'
                  )}
                </button>
              </form>
            )}

            {status === 'error' && (
              <div className="mt-3 flex items-center justify-center gap-2 text-sm text-red-400">
                <AlertCircle size={14} />
                <span>{message}</span>
              </div>
            )}

            <p className="mt-5 text-xs text-(--text-muted)">
              Gratuit. Pas de spam. Désabonnement en un clic.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
