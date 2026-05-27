import { generateLocalizedMetadata } from '@/lib/metadata'
import { AboutHero } from './_components'

interface AboutPageProps {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: AboutPageProps) {
  const { locale } = await params
  return generateLocalizedMetadata(locale, 'about')
}

export default function AboutPage() {
  return <AboutHero />
}
