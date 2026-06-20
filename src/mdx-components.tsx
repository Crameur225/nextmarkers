import type { MDXComponents } from 'mdx/types'
import Image from 'next/image'
import Link from 'next/link'
import { AffiliateLink } from '@/components/mdx/AffiliateLink'
import { Callout } from '@/components/mdx/Callout'
import { ComparisonTable } from '@/components/mdx/ComparisonTable'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => (
      <h1 className="text-3xl font-bold text-white mt-12 mb-4 leading-tight">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-2xl font-semibold text-white mt-10 mb-3 pb-2 border-b border-white/10">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl font-semibold text-white mt-8 mb-2">{children}</h3>
    ),
    p: ({ children }) => (
      <p className="text-(--text-secondary) leading-7 mb-4">{children}</p>
    ),
    a: ({ href, children }) => (
      <Link
        href={href ?? '#'}
        className="text-green-400 underline underline-offset-2 hover:text-green-300 transition-colors"
      >
        {children}
      </Link>
    ),
    ul: ({ children }) => (
      <ul className="list-disc list-inside space-y-1 mb-4 text-(--text-secondary)">
        {children}
      </ul>
    ),
    ol: ({ children }) => (
      <ol className="list-decimal list-inside space-y-1 mb-4 text-(--text-secondary)">
        {children}
      </ol>
    ),
    li: ({ children }) => <li className="leading-7">{children}</li>,
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-green-500 pl-4 my-4 italic text-(--text-secondary)">
        {children}
      </blockquote>
    ),
    code: ({ children }) => (
      <code className="bg-(--bg-elevated) text-green-300 px-1.5 py-0.5 rounded text-sm font-mono">
        {children}
      </code>
    ),
    pre: ({ children }) => (
      <pre className="bg-(--bg-elevated) border border-(--border-subtle) rounded-xl p-4 overflow-x-auto mb-4 text-sm">
        {children}
      </pre>
    ),
    table: ({ children }) => (
      <div className="overflow-x-auto my-6 rounded-xl border border-(--border-subtle)">
        <table className="w-full text-sm">{children}</table>
      </div>
    ),
    thead: ({ children }) => (
      <thead className="border-b border-(--border-subtle) bg-(--bg-elevated)">
        {children}
      </thead>
    ),
    th: ({ children }) => (
      <th className="text-left px-4 py-3 text-white font-semibold">{children}</th>
    ),
    td: ({ children }) => (
      <td className="px-4 py-3 text-(--text-secondary) border-b border-(--border-subtle) last:border-0">
        {children}
      </td>
    ),
    img: ({ src, alt }) => (
      <Image
        src={src!}
        alt={alt ?? ''}
        width={800}
        height={450}
        className="rounded-xl border border-(--border-subtle) my-8 w-full h-auto"
      />
    ),
    hr: () => <hr className="border-(--border-subtle) my-8" />,
    strong: ({ children }) => <strong className="text-white font-semibold">{children}</strong>,
    // Custom MDX components
    AffiliateLink,
    Callout,
    ComparisonTable,
    ...components,
  }
}
