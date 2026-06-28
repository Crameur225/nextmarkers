'use client'

import { useState, FormEvent } from 'react'
import { Mail, Loader2, CheckCircle, AlertCircle } from 'lucide-react'

type Status = 'idle' | 'loading' | 'success' | 'error'

export default function ContactPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<Status>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message }),
      })
      const data = await res.json() as { error?: string }

      if (res.ok) {
        setStatus('success')
        setName('')
        setEmail('')
        setMessage('')
      } else {
        setStatus('error')
        setErrorMsg(data.error ?? 'Une erreur est survenue.')
      }
    } catch {
      setStatus('error')
      setErrorMsg('Erreur réseau. Réessaie dans un moment.')
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-16">
      {/* Header */}
      <div className="mb-12">
        <p className="text-xs font-semibold text-green-400 uppercase tracking-widest mb-3">
          Contact
        </p>
        <h1 className="text-3xl sm:text-4xl font-bold text-(--text-primary) mb-4">
          Prenons contact.
        </h1>
        <p className="text-(--text-secondary) leading-relaxed">
          Une question, une idée de collaboration ou un partenariat ? Envoyez-nous un message.
        </p>
      </div>

      {/* Email affiché */}
      <div className="card-glass rounded-2xl p-6 mb-8 flex items-center gap-4">
        <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center shrink-0">
          <Mail size={18} className="text-green-400" />
        </div>
        <div>
          <p className="font-semibold text-(--text-primary)">Email</p>
          <p className="text-sm text-(--text-secondary) mb-1">Demandes générales & partenariats</p>
          <a
            href="mailto:info@nextmakers.net"
            className="text-sm font-medium text-green-400 hover:text-green-300 transition-colors"
          >
            info@nextmakers.net
          </a>
        </div>
      </div>

      {/* Formulaire */}
      <div className="card-glass rounded-2xl p-8">
        <h2 className="font-semibold text-(--text-primary) mb-6">Envoyer un message</h2>

        {status === 'success' ? (
          <div className="flex flex-col items-center gap-3 py-8 text-center">
            <CheckCircle size={32} className="text-green-400" />
            <p className="font-medium text-(--text-primary)">Message envoyé !</p>
            <p className="text-sm text-(--text-secondary)">
              On te répond sous 48h à l&apos;adresse indiquée.
            </p>
            <button
              onClick={() => setStatus('idle')}
              className="mt-4 text-sm text-green-400 hover:text-green-300 transition-colors"
            >
              Envoyer un autre message
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-(--text-secondary) mb-2">
                Nom
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Votre nom"
                required
                minLength={2}
                disabled={status === 'loading'}
                className="w-full px-4 py-3 rounded-xl bg-(--bg-elevated) border border-(--border-default) text-(--text-primary) placeholder:text-(--text-muted) focus:outline-none focus:border-green-500/60 transition-colors disabled:opacity-60"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-(--text-secondary) mb-2">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="votre@email.com"
                required
                disabled={status === 'loading'}
                className="w-full px-4 py-3 rounded-xl bg-(--bg-elevated) border border-(--border-default) text-(--text-primary) placeholder:text-(--text-muted) focus:outline-none focus:border-green-500/60 transition-colors disabled:opacity-60"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-(--text-secondary) mb-2">
                Message
              </label>
              <textarea
                id="message"
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Votre message..."
                required
                minLength={10}
                disabled={status === 'loading'}
                className="w-full px-4 py-3 rounded-xl bg-(--bg-elevated) border border-(--border-default) text-(--text-primary) placeholder:text-(--text-muted) focus:outline-none focus:border-green-500/60 transition-colors resize-none disabled:opacity-60"
              />
            </div>

            {status === 'error' && (
              <div className="flex items-center gap-2 text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
                <AlertCircle size={14} />
                <span>{errorMsg}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-white bg-green-500 hover:bg-green-400 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
            >
              {status === 'loading' ? (
                <><Loader2 size={16} className="animate-spin" /> Envoi en cours…</>
              ) : (
                'Envoyer le message'
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
