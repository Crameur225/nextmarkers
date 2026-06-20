'use client'

import { Download } from 'lucide-react'

interface Props {
  subscribers: { email: string; createdAt: string }[]
}

export function ExportSubscribersButton({ subscribers }: Props) {
  function handleExport() {
    const csv = ['Email,Date inscription', ...subscribers.map((s) => `${s.email},${s.createdAt}`)].join('\n')
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `abonnes-${new Date().toISOString().slice(0, 10)}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  if (subscribers.length === 0) return null

  return (
    <button
      onClick={handleExport}
      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-(--text-secondary) bg-(--bg-elevated) border border-(--border-default) hover:border-(--border-strong) hover:text-(--text-primary) transition-colors"
    >
      <Download size={15} />
      Exporter CSV
    </button>
  )
}
