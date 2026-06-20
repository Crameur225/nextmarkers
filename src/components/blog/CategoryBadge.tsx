import { cn } from '@/lib/cn'

type Category = 'IA' | 'Amazon' | 'Productivité'

interface CategoryBadgeProps {
  category: Category
  size?: 'sm' | 'md'
}

const styles: Record<Category, string> = {
  IA: 'bg-green-500/15 text-green-400 border-green-500/20',
  Amazon: 'bg-orange-500/15 text-orange-400 border-orange-500/20',
  Productivité: 'bg-blue-500/15 text-blue-400 border-blue-500/20',
}

export function CategoryBadge({ category, size = 'sm' }: CategoryBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border font-medium',
        styles[category],
        size === 'sm' ? 'text-xs px-2.5 py-0.5' : 'text-sm px-3 py-1'
      )}
    >
      {category}
    </span>
  )
}
