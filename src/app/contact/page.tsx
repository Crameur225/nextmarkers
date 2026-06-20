import { generatePageMetadata } from '@/lib/seo'
import type { Metadata } from 'next'
import { Mail, MessageSquare } from 'lucide-react'

export const metadata: Metadata = generatePageMetadata({
  title: 'Contact — NextMakers',
  description:
    'Contactez l\'équipe NextMakers pour toute question, collaboration ou partenariat.',
  path: '/contact',
})

export default function ContactPage() {
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

      {/* Contact options */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
        <div className="card-glass rounded-2xl p-6">
          <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center mb-4">
            <Mail size={18} className="text-green-400" />
          </div>
          <h2 className="font-semibold text-(--text-primary) mb-1">Email</h2>
          <p className="text-sm text-(--text-secondary)">Pour toute demande générale</p>
          <a
            href="mailto:contact@nextmakers.fr"
            className="mt-3 inline-block text-sm font-medium text-green-400 hover:text-green-300 transition-colors"
          >
            contact@nextmakers.fr
          </a>
        </div>

        <div className="card-glass rounded-2xl p-6">
          <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center mb-4">
            <MessageSquare size={18} className="text-green-400" />
          </div>
          <h2 className="font-semibold text-(--text-primary) mb-1">Partenariats</h2>
          <p className="text-sm text-(--text-secondary)">Collaborations & sponsors</p>
          <a
            href="mailto:partenariats@nextmakers.fr"
            className="mt-3 inline-block text-sm font-medium text-green-400 hover:text-green-300 transition-colors"
          >
            partenariats@nextmakers.fr
          </a>
        </div>
      </div>

      {/* Form */}
      <div className="card-glass rounded-2xl p-8">
        <h2 className="font-semibold text-(--text-primary) mb-6">Envoyer un message</h2>
        <form className="space-y-5">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-(--text-secondary) mb-2">
              Nom
            </label>
            <input
              id="name"
              type="text"
              placeholder="Votre nom"
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white placeholder:text-(--text-muted) focus:outline-none focus:border-green-500/60 transition-colors"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-(--text-secondary) mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="votre@email.com"
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white placeholder:text-(--text-muted) focus:outline-none focus:border-green-500/60 transition-colors"
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-(--text-secondary) mb-2">
              Message
            </label>
            <textarea
              id="message"
              rows={5}
              placeholder="Votre message..."
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white placeholder:text-(--text-muted) focus:outline-none focus:border-green-500/60 transition-colors resize-none"
            />
          </div>
          <button
            type="submit"
            className="w-full px-6 py-3 rounded-xl font-semibold text-sm text-white bg-green-500 hover:bg-green-400 transition-colors"
          >
            Envoyer
          </button>
        </form>
      </div>
    </div>
  )
}
