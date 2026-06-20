import { ShoppingCart, ExternalLink } from 'lucide-react'

interface BuyButtonProps {
  affiliateUrl: string
  provider?: string
  price?: string
  size?: 'md' | 'lg'
}

const providerLabels: Record<string, string> = {
  amazon: 'Acheter sur Amazon',
  default: 'Acheter maintenant',
}

export function BuyButton({ affiliateUrl, provider = 'default', price, size = 'lg' }: BuyButtonProps) {
  const label = providerLabels[provider] ?? providerLabels.default
  const isLg = size === 'lg'

  return (
    <a
      href={affiliateUrl}
      target="_blank"
      rel="nofollow noopener sponsored"
      className={`inline-flex items-center justify-center gap-2 font-semibold text-white bg-green-500 hover:bg-green-400 active:scale-95 transition-all rounded-xl glow-green ${
        isLg ? 'px-8 py-4 text-base w-full sm:w-auto' : 'px-5 py-2.5 text-sm'
      }`}
    >
      <ShoppingCart size={isLg ? 20 : 16} />
      {label}
      {price && <span className="ml-1 opacity-80">— {price}</span>}
      <ExternalLink size={14} className="opacity-70" />
    </a>
  )
}
