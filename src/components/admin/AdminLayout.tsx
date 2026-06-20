'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { LayoutDashboard, Package, FileText, Users, LogOut } from 'lucide-react'
import { cn } from '@/lib/cn'

const NAV = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard, exact: true },
  { href: '/admin/produits', label: 'Produits', icon: Package },
  { href: '/admin/posts', label: 'Articles', icon: FileText },
  { href: '/admin/abonnes', label: 'Abonnés', icon: Users },
]

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()

  async function handleLogout() {
    await fetch('/api/admin/logout', { method: 'POST' })
    router.push('/admin/login')
  }

  return (
    <div className="min-h-screen flex bg-(--bg-base)">
      {/* Sidebar */}
      <aside className="w-56 shrink-0 border-r border-(--border-subtle) flex flex-col">
        <div className="px-5 py-6 border-b border-(--border-subtle)">
          <span className="text-sm font-bold text-(--text-primary)">NextMakers</span>
          <span className="block text-xs text-(--text-muted) mt-0.5">Administration</span>
        </div>

        <nav className="flex-1 px-3 py-4 flex flex-col gap-1">
          {NAV.map(({ href, label, icon: Icon, exact }) => {
            const active = exact ? pathname === href : pathname.startsWith(href)
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  'flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                  active
                    ? 'bg-green-500/15 text-green-400'
                    : 'text-(--text-secondary) hover:bg-(--bg-elevated) hover:text-(--text-primary)'
                )}
              >
                <Icon size={16} />
                {label}
              </Link>
            )
          })}
        </nav>

        <div className="px-3 py-4 border-t border-(--border-subtle)">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2 w-full rounded-lg text-sm font-medium text-(--text-secondary) hover:bg-(--bg-elevated) hover:text-red-400 transition-colors"
          >
            <LogOut size={16} />
            Déconnexion
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  )
}
