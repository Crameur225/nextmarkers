import { Resvg } from '@resvg/resvg-js'
import { readFileSync, writeFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const publicDir  = resolve(__dirname, '../public')
const appDir     = resolve(__dirname, '../src/app')

const svgFull = readFileSync(resolve(publicDir, 'logo.svg'))

// ── Logotype complet ───────────────────────────────────────────
const resvg1x = new Resvg(svgFull, { fitTo: { mode: 'width', value: 220 } })
writeFileSync(resolve(publicDir, 'logo.png'), resvg1x.render().asPng())
console.log('✓ public/logo.png        (220×48)')

const resvg2x = new Resvg(svgFull, { fitTo: { mode: 'width', value: 440 } })
writeFileSync(resolve(publicDir, 'logo@2x.png'), resvg2x.render().asPng())
console.log('✓ public/logo@2x.png     (440×96)')

// ── Icône seule (fond vert, éclair blanc) ──────────────────────
const svgIcon = `<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="48" height="48" rx="10" fill="#22C55E"/>
  <path d="M28.5 7L13 25.5H24.5L19.5 41L35 22.5H23.5L28.5 7Z" fill="white" stroke="white" stroke-width="0.5" stroke-linejoin="round" stroke-linecap="round"/>
</svg>`

// 32×32 → src/app/icon.png  (favicon navigateur — Next.js App Router)
const resvgFav = new Resvg(svgIcon, { fitTo: { mode: 'width', value: 32 } })
writeFileSync(resolve(appDir, 'icon.png'), resvgFav.render().asPng())
console.log('✓ src/app/icon.png       (32×32, favicon)')

// 180×180 → src/app/apple-icon.png  (iOS home screen)
const resvgApple = new Resvg(svgIcon, { fitTo: { mode: 'width', value: 180 } })
writeFileSync(resolve(appDir, 'apple-icon.png'), resvgApple.render().asPng())
console.log('✓ src/app/apple-icon.png (180×180, Apple touch icon)')

// 192×192 → public/logo-icon.png  (PWA / og:image fallback)
const resvgIcon = new Resvg(svgIcon, { fitTo: { mode: 'width', value: 192 } })
writeFileSync(resolve(publicDir, 'logo-icon.png'), resvgIcon.render().asPng())
console.log('✓ public/logo-icon.png   (192×192)')
