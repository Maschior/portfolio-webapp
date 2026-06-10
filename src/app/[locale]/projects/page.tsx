import { generateLocalizedMetadata } from '@/lib/metadata'
import { ProjectHero } from './_components'

interface ProjectPageProps {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: ProjectPageProps) {
  const { locale } = await params
  return generateLocalizedMetadata(locale, 'projects')
}

export default function ProjectPage() {
  return <ProjectHero />
}
