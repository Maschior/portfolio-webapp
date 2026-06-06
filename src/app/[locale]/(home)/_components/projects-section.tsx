'use client'

import { Badge } from '@/components/ui/badge'
import { Link } from '@/lib/navigation'
import { useTranslations } from 'next-intl'
import { ExternalLink, Github } from 'lucide-react'
import * as FancyButton from '@/components/ui/fancy-button'

interface Project {
  titleKey: string
  descriptionKey: string
  tags: string[]
  github?: string
  demo?: string
}

const projects: Project[] = [
  {
    titleKey: 'dsno.title',
    descriptionKey: 'dsno.description',
    tags: ['Python', 'Selenium', 'Oracle EBS', 'Tkinter'],
    github: 'https://github.com/Maschior/dsno-processor',
  },
  {
    titleKey: 'portfolio.title',
    descriptionKey: 'portfolio.description',
    tags: ['Terraform', 'Ansible', 'AWS', 'CI/CD'],
    github: 'https://github.com/Maschior/portfolio',
  },
  {
    titleKey: 'site.title',
    descriptionKey: 'site.description',
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'i18n'],
    github: 'https://github.com/Maschior/portfolio-project',
  },
]

export function ProjectsSection() {
  const t = useTranslations('projects')

  return (
    <section className="bg-background">
      <div className="max-w-6xl mx-auto px-8 py-16 lg:py-24 border-x-2 border-dotted border-border/40">
        <div className="text-center mb-16 space-y-4">
          <p className="text-subtitle">{t('subtitle')}</p>
          <h2 className="text-headline">{t('title')}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div key={project.titleKey} className="card-modern p-6 space-y-4 flex flex-col">
              <div className="flex-1 space-y-3">
                <h3 className="text-lg font-semibold text-foreground">{t(project.titleKey)}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{t(project.descriptionKey)}</p>
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-[10px] rounded-md px-2 py-0.5">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-border/30">
                {project.github && (
                  <FancyButton.Root variant="ghost" size="sm" asChild>
                    <Link href={project.github} target="_blank" rel="noopener noreferrer" className="gap-1.5">
                      <FancyButton.Icon as={Github} />
                      {t('viewCode')}
                    </Link>
                  </FancyButton.Root>
                )}
                {project.demo && (
                  <FancyButton.Root variant="basic" size="sm" asChild>
                    <Link href={project.demo} target="_blank" rel="noopener noreferrer" className="gap-1.5">
                      <FancyButton.Icon as={ExternalLink} />
                      {t('viewProject')}
                    </Link>
                  </FancyButton.Root>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
