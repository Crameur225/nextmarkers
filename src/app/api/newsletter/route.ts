import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { render } from '@react-email/render'
import { NewsletterWelcome } from '../../../../emails/NewsletterWelcome'

const resend = new Resend(process.env.RESEND_API_KEY)

const rateLimitMap = new Map<string, number>()

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const last = rateLimitMap.get(ip) ?? 0
  if (now - last < 60_000) return true
  rateLimitMap.set(ip, now)
  return false
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get('x-forwarded-for') ?? req.headers.get('x-real-ip') ?? 'unknown'
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: 'Trop de demandes. Réessayez dans une minute.' },
        { status: 429 }
      )
    }

    const body = await req.json()
    const { email } = body

    if (!email || typeof email !== 'string' || !emailRegex.test(email)) {
      return NextResponse.json({ error: 'Email invalide.' }, { status: 400 })
    }

    const audienceId = process.env.RESEND_AUDIENCE_ID
    if (!audienceId) {
      console.error('[newsletter] RESEND_AUDIENCE_ID manquant')
      return NextResponse.json({ error: 'Erreur de configuration.' }, { status: 500 })
    }

    await resend.contacts.create({ email, audienceId, unsubscribed: false })

    const html = await render(NewsletterWelcome({ email }))
    await resend.emails.send({
      from: 'NextMakers <bonjour@nextmakers.fr>',
      to: email,
      subject: 'Bienvenue dans la communauté NextMakers !',
      html,
    })

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error: unknown) {
    if (error instanceof Error && error.message.toLowerCase().includes('already exists')) {
      return NextResponse.json({ error: 'Cet email est déjà inscrit.' }, { status: 409 })
    }
    console.error('[newsletter]', error)
    return NextResponse.json({ error: 'Erreur serveur.' }, { status: 500 })
  }
}
