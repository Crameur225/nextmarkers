import { cn } from '@/lib/cn'

interface CategoryBadgeProps {
  category: string
  size?: 'sm' | 'md'
}

const KNOWN_STYLES: Record<string, string> = {
  IA: 'bg-green-500/15 text-green-400 border-green-500/20',
  Amazon: 'bg-orange-500/15 text-orange-400 border-orange-500/20',
  Productivité: 'bg-blue-500/15 text-blue-400 border-blue-500/20',
  Guides: 'bg-indigo-500/15 text-indigo-400 border-indigo-500/20',
  Développement: 'bg-cyan-500/15 text-cyan-400 border-cyan-500/20',
  Vidéo: 'bg-red-500/15 text-red-400 border-red-500/20',
  Audio: 'bg-amber-500/15 text-amber-400 border-amber-500/20',
}

export function CategoryBadge({ category, size = 'sm' }: CategoryBadgeProps) {
  const style = KNOWN_STYLES[category] ?? 'bg-white/5 text-(--text-muted) border-white/10'
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border font-medium',
        style,
        size === 'sm' ? 'text-xs px-2.5 py-0.5' : 'text-sm px-3 py-1'
      )}
    >
      {category}
    </span>
  )
}
