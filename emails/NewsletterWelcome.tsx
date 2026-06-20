import {
  Html,
  Head,
  Preview,
  Body,
  Container,
  Section,
  Heading,
  Text,
  Button,
  Hr,
  Link,
} from '@react-email/components'

interface Props {
  email: string
}

export function NewsletterWelcome({ email }: Props) {
  return (
    <Html lang="fr">
      <Head />
      <Preview>Bienvenue dans la communauté NextMakers !</Preview>
      <Body style={body}>
        <Container style={container}>
          <Section style={header}>
            <Text style={logo}>⚡ NextMakers</Text>
          </Section>

          <Section style={content}>
            <Heading style={heading}>Bienvenue chez NextMakers !</Heading>
            <Text style={paragraph}>
              Tu rejoins une communauté de passionnés qui découvrent chaque semaine
              les meilleurs outils IA et gadgets tech pour travailler plus vite et
              plus intelligemment.
            </Text>
            <Text style={paragraph}>
              Chaque semaine tu recevras :
            </Text>
            <Text style={listItem}>→ Les derniers outils IA testés et comparés</Text>
            <Text style={listItem}>→ Les meilleures trouvailles Amazon sous 50€</Text>
            <Text style={listItem}>→ Des guides pratiques pour automatiser ton workflow</Text>

            <Section style={{ textAlign: 'center' as const, margin: '32px 0' }}>
              <Button href="https://nextmakers.fr/blog" style={button}>
                Voir les derniers articles →
              </Button>
            </Section>
          </Section>

          <Hr style={divider} />

          <Text style={footer}>
            Tu reçois cet email car{' '}
            <Link href={`mailto:${email}`} style={link}>
              {email}
            </Link>{' '}
            s'est inscrit sur{' '}
            <Link href="https://nextmakers.fr" style={link}>
              nextmakers.fr
            </Link>
            .{' '}
            <Link href="{{unsubscribe_url}}" style={link}>
              Se désabonner
            </Link>
          </Text>
        </Container>
      </Body>
    </Html>
  )
}

const body = {
  backgroundColor: '#0A0A0F',
  fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
}

const container = {
  maxWidth: '560px',
  margin: '0 auto',
  padding: '40px 20px',
}

const header = {
  marginBottom: '32px',
}

const logo = {
  color: '#A78BFA',
  fontSize: '20px',
  fontWeight: '700',
  margin: '0',
}

const content = {
  backgroundColor: '#0D0D1A',
  borderRadius: '12px',
  border: '1px solid rgba(255,255,255,0.08)',
  padding: '32px',
}

const heading = {
  color: '#F8FAFC',
  fontSize: '24px',
  fontWeight: '700',
  margin: '0 0 16px',
  lineHeight: '1.3',
}

const paragraph = {
  color: '#94A3B8',
  fontSize: '15px',
  lineHeight: '1.7',
  margin: '0 0 12px',
}

const listItem = {
  color: '#CBD5E1',
  fontSize: '14px',
  lineHeight: '1.8',
  margin: '0 0 4px',
}

const button = {
  backgroundColor: '#7C3AED',
  color: '#ffffff',
  padding: '14px 28px',
  borderRadius: '8px',
  fontWeight: '600',
  fontSize: '15px',
  textDecoration: 'none',
  display: 'inline-block',
}

const divider = {
  borderColor: 'rgba(255,255,255,0.08)',
  margin: '24px 0',
}

const footer = {
  color: '#475569',
  fontSize: '12px',
  textAlign: 'center' as const,
  lineHeight: '1.6',
}

const link = {
  color: '#A78BFA',
  textDecoration: 'underline',
}
