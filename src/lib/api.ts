const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000'

export interface Product {
  id: string
  name: string
  slug: string
  description: string
  shortDesc: string
  images: string[]
  price?: string
  currency: string
  affiliateUrl: string
  provider: string
  category: string
  tags: string[]
  published: boolean
  featured: boolean
  createdAt: string
  updatedAt: string
}

export interface Post {
  id: string
  title: string
  slug: string
  description: string
  content?: string
  category: string
  tags: string[]
  heroImage?: string
  affiliateDisclosure: boolean
  published: boolean
  createdAt: string
  updatedAt: string
}

export interface Subscriber {
  id: string
  email: string
  createdAt: string
}

async function apiFetch<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    next: { revalidate: 60 },
    ...options,
    headers: { 'Content-Type': 'application/json', ...options?.headers },
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: 'Erreur réseau' }))
    throw new Error(err.error ?? `HTTP ${res.status}`)
  }
  return res.json()
}

export const api = {
  products: {
    list: (params?: string) => apiFetch<Product[]>(`/api/products${params ? `?${params}` : ''}`),
    get: (slug: string) => apiFetch<Product>(`/api/products/${slug}`),
    featured: () => apiFetch<Product[]>('/api/products?featured=true'),
    adminAll: (token = '') => apiFetch<Product[]>('/api/products/admin/all', {
      headers: { Authorization: `Bearer ${token}` },
      cache: 'no-store',
    }),
    create: (data: Partial<Product>, token = '') =>
      apiFetch<Product>('/api/products', { method: 'POST', body: JSON.stringify(data), headers: { Authorization: `Bearer ${token}` } }),
    update: (id: string, data: Partial<Product>, token = '') =>
      apiFetch<Product>(`/api/products/${id}`, { method: 'PUT', body: JSON.stringify(data), headers: { Authorization: `Bearer ${token}` } }),
    delete: (id: string, token = '') =>
      apiFetch<{ success: boolean }>(`/api/products/${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } }),
  },
  posts: {
    list: (params?: string) => apiFetch<Post[]>(`/api/posts${params ? `?${params}` : ''}`),
    get: (slug: string) => apiFetch<Post>(`/api/posts/${slug}`),
    adminAll: (token = '') => apiFetch<Post[]>('/api/posts/admin/all', {
      headers: { Authorization: `Bearer ${token}` },
      cache: 'no-store',
    }),
    create: (data: Partial<Post>, token = '') =>
      apiFetch<Post>('/api/posts', { method: 'POST', body: JSON.stringify(data), headers: { Authorization: `Bearer ${token}` } }),
    update: (id: string, data: Partial<Post>, token = '') =>
      apiFetch<Post>(`/api/posts/${id}`, { method: 'PUT', body: JSON.stringify(data), headers: { Authorization: `Bearer ${token}` } }),
    delete: (id: string, token = '') =>
      apiFetch<{ success: boolean }>(`/api/posts/${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } }),
  },
  subscribers: {
    list: (token = '') => apiFetch<Subscriber[]>('/api/newsletter', {
      headers: { Authorization: `Bearer ${token}` },
      cache: 'no-store',
    }),
  },
  auth: {
    login: (email: string, password: string) =>
      apiFetch<{ token: string }>('/api/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) }),
  },
}
