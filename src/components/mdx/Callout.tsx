import { Info, AlertTriangle, Lightbulb, AlertCircle } from 'lucide-react'
import { cn } from '@/lib/cn'
import { ReactNode } from 'react'

type CalloutType = 'info' | 'warning' | 'tip' | 'danger'

interface CalloutProps {
  type?: CalloutType
  title?: string
  children: ReactNode
}

const config: Record<CalloutType, {
  icon: typeof Info
  className: string
  iconClass: string
}> = {
  info: {
    icon: Info,
    className: 'border-blue-500/30 bg-blue-500/5',
    iconClass: 'text-blue-400',
  },
  warning: {
    icon: AlertTriangle,
    className: 'border-amber-500/30 bg-amber-500/5',
    iconClass: 'text-amber-400',
  },
  tip: {
    icon: Lightbulb,
    className: 'border-green-500/30 bg-green-500/5',
    iconClass: 'text-green-400',
  },
  danger: {
    icon: AlertCircle,
    className: 'border-red-500/30 bg-red-500/5',
    iconClass: 'text-red-400',
  },
}

export function Callout({ type = 'info', title, children }: CalloutProps) {
  const { icon: Icon, className, iconClass } = config[type]

  return (
    <div className={cn('my-6 rounded-xl border px-4 py-4 flex gap-3', className)}>
      <Icon className={cn('mt-0.5 flex-shrink-0', iconClass)} size={18} />
      <div className="flex-1 min-w-0 text-sm leading-relaxed text-(--text-secondary)">
        {title && (
          <p className="font-semibold text-(--text-primary) mb-1">{title}</p>
        )}
        {children}
      </div>
    </div>
  )
}
