import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const rateLimitMap = new Map<string, number>()
function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const last = rateLimitMap.get(ip) ?? 0
  if (now - last < 60_000) return true
  rateLimitMap.set(ip, now)
  return false
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get('x-forwarded-for') ?? req.headers.get('x-real-ip') ?? 'unknown'
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: 'Trop de demandes. Réessayez dans une minute.' },
        { status: 429 }
      )
    }

    const { name, email, message } = await req.json() as {
      name: unknown
      email: unknown
      message: unknown
    }

    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      return NextResponse.json({ error: 'Nom invalide.' }, { status: 400 })
    }
    if (!email || typeof email !== 'string' || !emailRegex.test(email)) {
      return NextResponse.json({ error: 'Email invalide.' }, { status: 400 })
    }
    if (!message || typeof message !== 'string' || message.trim().length < 10) {
      return NextResponse.json({ error: 'Message trop court (minimum 10 caractères).' }, { status: 400 })
    }

    const to = process.env.CONTACT_EMAIL
    const from = process.env.RESEND_FROM_EMAIL ?? 'NextMakers <noreply@nextmakers.net>'

    if (!to) {
      console.error('[contact] CONTACT_EMAIL manquant')
      return NextResponse.json({ error: 'Erreur de configuration.' }, { status: 500 })
    }

    await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject: `[Contact] Message de ${name.trim()}`,
      html: `
        <p><strong>Nom :</strong> ${escapeHtml(name.trim())}</p>
        <p><strong>Email :</strong> ${escapeHtml(email)}</p>
        <br>
        <p><strong>Message :</strong></p>
        <p>${escapeHtml(message.trim()).replace(/\n/g, '<br>')}</p>
      `,
    })

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    console.error('[contact]', error)
    return NextResponse.json({ error: 'Erreur serveur.' }, { status: 500 })
  }
}
