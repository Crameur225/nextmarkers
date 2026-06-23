import { Calendar, Clock, AlertCircle } from 'lucide-react'
import { CategoryBadge } from './CategoryBadge'

interface BlogHeaderProps {
  title: string
  description: string
  date: string
  updated?: string
  category: string
  tags: string[]
  readingTime?: number
  affiliateDisclosure?: boolean
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export function BlogHeader({
  title,
  description,
  date,
  updated,
  category,
  tags,
  readingTime,
  affiliateDisclosure,
}: BlogHeaderProps) {
  return (
    <header className="mb-10">
      <div className="flex flex-wrap items-center gap-2 mb-5">
        <CategoryBadge category={category} size="md" />
        {tags.slice(0, 3).map((tag) => (
          <span
            key={tag}
            className="text-xs px-2.5 py-0.5 rounded-full bg-white/5 text-(--text-muted) border border-white/10"
          >
            #{tag}
          </span>
        ))}
      </div>

      <h1 className="text-3xl sm:text-4xl font-bold text-(--text-primary) leading-tight mb-4">{title}</h1>

      <p className="text-lg text-(--text-secondary) leading-relaxed mb-6">{description}</p>

      <div className="flex flex-wrap items-center gap-5 text-sm text-(--text-muted)">
        <span className="flex items-center gap-1.5">
          <Calendar size={14} />
          <time dateTime={date}>{formatDate(date)}</time>
        </span>
        {updated && updated !== date && (
          <span className="flex items-center gap-1.5">
            <Calendar size={14} />
            Mis à jour le {formatDate(updated)}
          </span>
        )}
        {readingTime && (
          <span className="flex items-center gap-1.5">
            <Clock size={14} />
            {readingTime} min de lecture
          </span>
        )}
      </div>

      {affiliateDisclosure && (
        <div className="mt-6 flex items-start gap-2 text-xs text-(--text-muted) bg-white/3 border border-white/8 rounded-lg px-4 py-3">
          <AlertCircle size={14} className="flex-shrink-0 mt-0.5 text-amber-400" />
          <span>
            Cet article contient des liens d'affiliation. Si tu achètes via ces liens, je touche
            une petite commission sans surcoût pour toi.
          </span>
        </div>
      )}

      <hr className="mt-8 border-(--border-subtle)" />
    </header>
  )
}
