import { HeroSection } from '@/components/home/HeroSection'
import { CategoriesSection } from '@/components/home/CategoriesSection'
import { TechTransformSection } from '@/components/home/TechTransformSection'
import { GuidesSection } from '@/components/home/GuidesSection'
import { BlogPreviewSection } from '@/components/home/BlogPreviewSection'
import { NewsletterSection } from '@/components/home/NewsletterSection'
import { generatePageMetadata } from '@/lib/seo'
import type { Metadata } from 'next'

export const metadata: Metadata = generatePageMetadata({
  title: 'NextMakers — Les outils qui construisent votre avenir',
  description:
    'Découvrez les outils d\'intelligence artificielle, les logiciels et les équipements qui aident les entrepreneurs, créateurs et professionnels à atteindre leurs objectifs plus rapidement.',
  path: '/',
})

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <CategoriesSection />
      <TechTransformSection />
      <GuidesSection />
      <BlogPreviewSection />
      <NewsletterSection />
    </>
  )
}
