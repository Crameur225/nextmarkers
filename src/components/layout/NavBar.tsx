'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/cn'
import { ThemeToggle } from '@/components/theme/ThemeToggle'

const navLinks = [
  { href: '/', label: 'Accueil' },
  { href: '/outils-ia', label: 'Outils IA' },
  { href: '/produits', label: 'Produits' },
  { href: '/guides', label: 'Guides' },
  { href: '/blog', label: 'Blog' },
  { href: '/about', label: 'À propos' },
  { href: '/contact', label: 'Contact' },
]

export function NavBar() {
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  useEffect(() => {
    const handler = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full transition-all duration-300',
        isScrolled
          ? 'backdrop-blur-xl bg-(--bg-base)/90 border-b border-(--border-subtle)'
          : 'bg-transparent'
      )}
    >
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group shrink-0">
          <LogoIcon />
          <span className="font-bold text-lg text-(--text-primary) tracking-tight">NextMakers</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-0.5">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                'px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                pathname === href
                  ? 'text-(--text-primary) bg-(--bg-elevated)'
                  : 'text-(--text-secondary) hover:text-(--text-primary) hover:bg-(--bg-elevated)'
              )}
            >
              {label}
            </Link>
          ))}
        </div>

        {/* CTA + theme + hamburger */}
        <div className="flex items-center gap-2 shrink-0">
          <ThemeToggle />
          <a
            href="/newsletter"
            className="hidden md:flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-white bg-green-500 hover:bg-green-400 transition-colors"
          >
            Newsletter
          </a>

          <button
            className="lg:hidden p-2 rounded-lg text-(--text-secondary) hover:text-(--text-primary) hover:bg-(--bg-elevated) transition-colors"
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            aria-label="Menu"
          >
            {isMobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {isMobileOpen && (
        <div className="lg:hidden border-t border-(--border-subtle) bg-(--bg-surface) px-4 py-4 space-y-1">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                'block px-4 py-2.5 rounded-lg text-sm font-medium transition-colors',
                pathname === href
                  ? 'text-(--text-primary) bg-(--bg-elevated)'
                  : 'text-(--text-secondary) hover:text-(--text-primary) hover:bg-(--bg-elevated)'
              )}
              onClick={() => setIsMobileOpen(false)}
            >
              {label}
            </Link>
          ))}
          <a
            href="/newsletter"
            className="block mt-2 px-4 py-2.5 rounded-lg text-sm font-semibold text-white bg-green-500 hover:bg-green-400 transition-colors text-center"
            onClick={() => setIsMobileOpen(false)}
          >
            Newsletter gratuite
          </a>
        </div>
      )}
    </header>
  )
}

function LogoIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#22C55E" />
          <stop offset="100%" stopColor="#4ADE80" />
        </linearGradient>
      </defs>
      <path d="M8 6 L8 26 L26 16 Z" fill="url(#logoGrad)" />
      <path d="M17 11 L13 17 L16 17 L14 23 L20 16 L17 16 Z" fill="var(--bg-base)" />
    </svg>
  )
}
