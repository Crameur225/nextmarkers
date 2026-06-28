import { NewsletterSection } from '@/components/home/NewsletterSection'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Newsletter — NextMakers',
  description: 'Rejoins des milliers de makers et reçois chaque semaine une sélection d\'outils IA, de stratégies et d\'innovations.',
}

export default function NewsletterPage() {
  return (
    <main className="min-h-screen flex flex-col justify-center py-20">
      <NewsletterSection />
    </main>
  )
}
