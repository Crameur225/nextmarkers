import { ExternalLink, ShoppingCart } from 'lucide-react'
import { cn } from '@/lib/cn'

interface AffiliateLinkProps {
  href: string
  label: string
  price?: string
  provider?: 'amazon' | 'default'
  description?: string
}

export function AffiliateLink({
  href,
  label,
  price,
  provider = 'default',
  description,
}: AffiliateLinkProps) {
  return (
    <div className={cn(
      'my-6 rounded-xl border p-4 flex flex-col sm:flex-row items-start sm:items-center gap-4',
      'bg-(--bg-surface) border-(--border-subtle)',
      'hover:border-(--border-strong) transition-colors'
    )}>
      <div className={cn(
        'flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center',
        provider === 'amazon' ? 'bg-orange-500/15 text-orange-400' : 'bg-green-500/15 text-green-400'
      )}>
        <ShoppingCart size={20} />
      </div>

      <div className="flex-1 min-w-0">
        {description && (
          <p className="text-sm text-(--text-secondary) mb-1 leading-snug">{description}</p>
        )}
        {price && (
          <p className="text-base font-semibold text-white">{price}</p>
        )}
      </div>

      <a
        href={href}
        target="_blank"
        rel="nofollow noopener sponsored"
        className={cn(
          'flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold',
          'transition-all duration-200',
          provider === 'amazon'
            ? 'bg-orange-500 hover:bg-orange-400 text-white'
            : 'bg-green-500 hover:bg-green-400 text-white'
        )}
      >
        {label}
        <ExternalLink size={14} />
      </a>
    </div>
  )
}
