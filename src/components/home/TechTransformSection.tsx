import Link from 'next/link'
import { ArrowRight, CheckCircle2 } from 'lucide-react'

const stats = [
  { value: '500+', label: 'outils analysés' },
  { value: '50+', label: 'guides publiés' },
  { value: '10K+', label: 'bâtisseurs abonnés' },
  { value: '100%', label: 'tests indépendants' },
]

const highlights = [
  'Chaque outil est testé en conditions réelles',
  'Comparatifs honnêtes, sans sponsoring caché',
  'Mise à jour continue avec les dernières innovations',
  'Avis d\'entrepreneurs et de créateurs actifs',
]

export function TechTransformSection() {
  return (
    <section className="section-padding">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left — text */}
          <div>
            <p className="text-xs font-semibold text-green-400 uppercase tracking-widest mb-3">
              Notre approche
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-(--text-primary) mb-6 leading-tight">
              Découvrez les technologies qui transforment le travail.
            </h2>
            <p className="text-(--text-secondary) leading-relaxed mb-8">
              Des outils IA aux équipements les plus innovants, nous analysons chaque
              solution pour vous aider à faire les meilleurs choix.
            </p>

            <ul className="space-y-3 mb-10">
              {highlights.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle2 size={18} className="text-green-400 mt-0.5 shrink-0" />
                  <span className="text-sm text-(--text-secondary)">{item}</span>
                </li>
              ))}
            </ul>

            <Link
              href="/outils-ia"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm text-white bg-green-500 hover:bg-green-400 transition-colors glow-green"
            >
              Explorer les outils IA
              <ArrowRight size={15} />
            </Link>
          </div>

          {/* Right — stats grid */}
          <div className="grid grid-cols-2 gap-4">
            {stats.map(({ value, label }) => (
              <div
                key={label}
                className="card-glass rounded-2xl p-8 text-center"
              >
                <p className="text-4xl font-bold gradient-text mb-2">{value}</p>
                <p className="text-sm text-(--text-secondary)">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
