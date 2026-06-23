import Link from 'next/link'
import { ArrowRight, Sparkles, Bot, Cpu, Zap, Code2, Headphones, Smartphone, Laptop, Rocket, Package, Globe, Star, BrainCircuit, ShoppingBag } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export function HeroSection() {
  return (
    <section className="relative overflow-hidden min-h-[90vh] flex items-center">
      {/* Animated background */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        {/* Dot grid */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(34,197,94,0.15) 1px, transparent 1px)',
            backgroundSize: '44px 44px',
            animation: 'grid-fade 8s ease-in-out infinite',
          }}
        />

        {/* Main orb — top left */}
        <div
          className="absolute top-1/4 left-1/4 w-[700px] h-[700px] rounded-full bg-green-500/10 blur-[130px]"
          style={{ animation: 'pulse-orb 7s ease-in-out infinite' }}
        />

        {/* Secondary orb — bottom right */}
        <div
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-green-400/8 blur-[110px]"
          style={{ animation: 'pulse-orb 9s ease-in-out infinite 2s' }}
        />

        {/* Drifting orb — center */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full bg-green-600/6 blur-[90px]"
          style={{ animation: 'drift 14s ease-in-out infinite' }}
        />

        {/* Floating tech icons */}
        {floatingIcons.map((item) => {
          const Icon = item.icon
          return (
            <div
              key={item.id}
              className="absolute text-green-400/20"
              style={{
                left: item.left,
                top: item.top,
                animation: `icon-float ${item.duration}s ease-in-out infinite ${item.delay}s`,
              }}
            >
              <Icon size={item.size} strokeWidth={1.5} />
            </div>
          )
        })}
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
            className="flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-(--text-primary) border border-(--border-default) hover:border-green-500/40 hover:bg-(--bg-elevated) transition-all duration-200"
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

interface FloatingIcon {
  id: number
  icon: LucideIcon
  left: string
  top: string
  size: number
  duration: number
  delay: number
}

const floatingIcons: FloatingIcon[] = [
  // Colonne gauche
  { id: 1,  icon: Bot,         left: '5%',  top: '20%', size: 28, duration: 6,  delay: 0   },
  { id: 2,  icon: Cpu,         left: '8%',  top: '55%', size: 22, duration: 8,  delay: 1.5 },
  { id: 3,  icon: BrainCircuit,left: '4%',  top: '78%', size: 30, duration: 7,  delay: 3   },
  { id: 4,  icon: Zap,         left: '14%', top: '38%', size: 20, duration: 9,  delay: 0.8 },
  { id: 5,  icon: Code2,       left: '11%', top: '68%', size: 24, duration: 7,  delay: 4   },

  // Colonne droite
  { id: 6,  icon: Laptop,      left: '88%', top: '18%', size: 28, duration: 8,  delay: 2   },
  { id: 7,  icon: Smartphone,  left: '92%', top: '48%', size: 22, duration: 6,  delay: 0.5 },
  { id: 8,  icon: Headphones,  left: '86%', top: '72%', size: 26, duration: 9,  delay: 3.5 },
  { id: 9,  icon: ShoppingBag, left: '82%', top: '35%', size: 20, duration: 7,  delay: 1.2 },
  { id: 10, icon: Package,     left: '90%', top: '62%', size: 24, duration: 8,  delay: 4.5 },

  // Haut / bas — centre
  { id: 11, icon: Rocket,      left: '28%', top: '8%',  size: 26, duration: 7,  delay: 1   },
  { id: 12, icon: Globe,       left: '55%', top: '6%',  size: 22, duration: 9,  delay: 2.5 },
  { id: 13, icon: Star,        left: '72%', top: '10%', size: 18, duration: 6,  delay: 0.3 },
  { id: 14, icon: Sparkles,    left: '40%', top: '88%', size: 20, duration: 8,  delay: 1.8 },
  { id: 15, icon: Zap,         left: '62%', top: '85%', size: 22, duration: 7,  delay: 3.2 },
]
