import type { Metadata } from 'next'
import { Geist, Inter } from 'next/font/google'
import './globals.css'
import { NavBar } from '@/components/layout/NavBar'
import { Footer } from '@/components/layout/Footer'
import { ThemeProvider } from '@/components/theme/ThemeProvider'

const geist = Geist({
  variable: '--font-geist',
  subsets: ['latin'],
  display: 'swap',
})

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://nextmakers.fr'),
  title: {
    template: '%s | NextMakers',
    default: 'NextMakers — Les outils qui construisent votre avenir',
  },
  description:
    'Découvrez les meilleurs outils IA, logiciels et équipements tech pour entrepreneurs et créateurs.',
  icons: {
    icon: [
      { url: '/icon.png', type: 'image/png', sizes: '32x32' },
    ],
    apple: [
      { url: '/apple-icon.png', sizes: '180x180' },
    ],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${geist.variable} ${inter.variable}`} suppressHydrationWarning>
      <body className="bg-(--bg-base) text-(--text-primary) antialiased min-h-screen flex flex-col transition-colors duration-200">
        <ThemeProvider>
          <NavBar />
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
