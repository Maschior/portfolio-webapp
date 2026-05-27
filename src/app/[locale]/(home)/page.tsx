import { generateLocalizedMetadata } from '@/lib/metadata'
import { HeroSection, ExperienceSection, SkillsSection, ProjectsSection } from './_components'

interface HomePageProps {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: HomePageProps) {
  const { locale } = await params
  return generateLocalizedMetadata(locale, 'home')
}

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ExperienceSection />
      <SkillsSection />
      <ProjectsSection />
    </>
  )
}
