import Link from 'next/link'
import { ArrowRight, Sparkles } from 'lucide-react'

export function HeroSection() {
  return (
    <section className="relative overflow-hidden min-h-[90vh] flex items-center">
      {/* Background orbs */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-green-500/10 blur-[120px] animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-green-400/8 blur-[100px]" style={{ animationDelay: '1.5s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-green-600/6 blur-[80px]" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-24 text-center">
        {/* Eyebrow badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-green-500/30 bg-green-500/10 text-green-300 text-sm font-medium mb-8 animate-fade-in-up">
          <Sparkles size={14} />
          Plateforme de découverte technologique
        </div>

        {/* Headline */}
        <h1
          className="text-4xl sm:text-5xl md:text-6xl font-bold text-(--text-primary) leading-tight tracking-tight mb-6 animate-fade-in-up"
          style={{ animationDelay: '100ms' }}
        >
          Construisez votre avenir
          <br className="hidden sm:block" />
          avec les{' '}
          <span className="gradient-text">meilleures technologies.</span>
        </h1>

        {/* Subtitle */}
        <p
          className="text-lg sm:text-xl text-(--text-secondary) max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in-up"
          style={{ animationDelay: '200ms' }}
        >
          Découvrez les outils d&apos;intelligence artificielle, les logiciels et les équipements
          qui aident les entrepreneurs, créateurs et professionnels à atteindre leurs objectifs
          plus rapidement.
        </p>

        {/* CTAs */}
        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up"
          style={{ animationDelay: '300ms' }}
        >
          <Link
            href="/outils-ia"
            className="flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-white bg-green-500 hover:bg-green-400 transition-all duration-200 glow-green hover:scale-105"
          >
            Explorer les outils
            <ArrowRight size={16} />
          </Link>
          <Link
            href="/guides"
            className="flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-white border border-white/15 hover:border-white/30 hover:bg-white/5 transition-all duration-200"
          >
            Lire les guides
          </Link>
        </div>

        {/* Social proof */}
        <p
          className="mt-10 text-sm text-(--text-muted) animate-fade-in-up"
          style={{ animationDelay: '400ms' }}
        >
          Rejoins{' '}
          <span className="text-green-400 font-semibold">10 000+ bâtisseurs</span>
          {' '}qui lisent NextMakers chaque semaine
        </p>
      </div>
    </section>
  )
}
