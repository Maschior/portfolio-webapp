import { generateLocalizedMetadata } from '@/lib/metadata'
import { ContactHero } from './_components'

interface ContactPageProps {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: ContactPageProps) {
  const { locale } = await params
  return generateLocalizedMetadata(locale, 'contact')
}

export default function ContactPage() {
  return <ContactHero />
}
