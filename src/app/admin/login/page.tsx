'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000'

export default function AdminLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      if (!res.ok) {
        setError('Email ou mot de passe incorrect.')
        return
      }

      const { token } = await res.json()
      document.cookie = `admin_token=${token}; path=/; max-age=${60 * 60 * 24}; SameSite=Strict`
      router.push('/admin')
    } catch {
      setError('Erreur de connexion. Vérifiez que le serveur est démarré.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-(--bg-base) px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-(--text-primary)">NextMakers Admin</h1>
          <p className="text-sm text-(--text-muted) mt-1">Accès réservé</p>
        </div>

        <form onSubmit={handleSubmit} className="card-glass rounded-2xl p-6 flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="email" className="text-sm font-medium text-(--text-secondary)">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              className="px-3.5 py-2.5 rounded-xl bg-(--bg-elevated) border border-(--border-default) text-(--text-primary) text-sm focus:outline-none focus:border-(--border-strong) transition-colors"
              placeholder="admin@nextmakers.fr"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="password" className="text-sm font-medium text-(--text-secondary)">
              Mot de passe
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              className="px-3.5 py-2.5 rounded-xl bg-(--bg-elevated) border border-(--border-default) text-(--text-primary) text-sm focus:outline-none focus:border-(--border-strong) transition-colors"
            />
          </div>

          {error && (
            <p className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-1 px-5 py-3 rounded-xl font-semibold text-sm text-white bg-green-500 hover:bg-green-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {loading ? 'Connexion…' : 'Se connecter'}
          </button>
        </form>
      </div>
    </div>
  )
}
