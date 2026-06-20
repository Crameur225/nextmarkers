import Link from 'next/link'
import { Clock, ArrowRight } from 'lucide-react'
import { CategoryBadge } from './CategoryBadge'
import { cn } from '@/lib/cn'

interface PostCardProps {
  title: string
  description: string
  date: string
  category: 'IA' | 'Amazon' | 'Productivité'
  tags: string[]
  slug: string
  readingTime?: number
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export function PostCard({
  title,
  description,
  date,
  category,
  slug,
  readingTime,
}: PostCardProps) {
  return (
    <Link
      href={`/blog/${slug}`}
      className={cn(
        'group card-glass rounded-2xl p-6 flex flex-col gap-4 h-full',
        'hover:border-(--border-strong) transition-all duration-300'
      )}
    >
      <div className="flex items-center justify-between gap-2">
        <CategoryBadge category={category} />
        <time
          dateTime={date}
          className="text-xs text-(--text-muted) flex items-center gap-1.5"
        >
          {readingTime && (
            <>
              <Clock size={11} />
              {readingTime} min
              <span className="mx-1">·</span>
            </>
          )}
          {formatDate(date)}
        </time>
      </div>

      <div className="flex-1">
        <h3 className="text-base font-semibold text-(--text-primary) leading-snug mb-2 group-hover:text-green-300 transition-colors">
          {title}
        </h3>
        <p className="text-sm text-(--text-secondary) leading-relaxed line-clamp-3">
          {description}
        </p>
      </div>

      <div className="flex items-center gap-1 text-sm text-green-400 font-medium group-hover:gap-2 transition-all">
        Lire l&apos;article
        <ArrowRight size={14} />
      </div>
    </Link>
  )
}
