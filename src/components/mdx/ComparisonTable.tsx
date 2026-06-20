import { cn } from '@/lib/cn'

interface ComparisonRow {
  feature: string
  [productName: string]: string
}

interface ComparisonTableProps {
  products: string[]
  rows: ComparisonRow[]
  winner?: string
}

export function ComparisonTable({ products, rows, winner }: ComparisonTableProps) {
  return (
    <div className="my-6 overflow-x-auto rounded-xl border border-(--border-subtle)">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-(--border-subtle) bg-(--bg-elevated)">
            <th className="text-left px-4 py-3 text-(--text-secondary) font-medium">
              Fonctionnalité
            </th>
            {products.map((product) => (
              <th
                key={product}
                className={cn(
                  'text-center px-4 py-3 font-semibold',
                  winner === product ? 'text-green-400' : 'text-white'
                )}
              >
                {product}
                {winner === product && (
                  <span className="ml-2 text-xs bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full">
                    Recommandé
                  </span>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={row.feature}
              className={cn(
                'border-b border-(--border-subtle) last:border-0',
                i % 2 === 0 ? 'bg-(--bg-surface)' : 'bg-(--bg-base)'
              )}
            >
              <td className="px-4 py-3 text-(--text-secondary)">{row.feature}</td>
              {products.map((product) => (
                <td
                  key={product}
                  className={cn(
                    'px-4 py-3 text-center',
                    winner === product ? 'text-green-300' : 'text-white'
                  )}
                >
                  {row[product] === '✓' ? (
                    <span className="text-emerald-400">✓</span>
                  ) : row[product] === '✗' ? (
                    <span className="text-red-400">✗</span>
                  ) : (
                    row[product]
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
