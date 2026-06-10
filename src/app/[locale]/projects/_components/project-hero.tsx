'use client'

import { useTranslations } from 'next-intl'
import { useState, useEffect } from 'react'
import { ProjectCard } from './project-card'

export interface ProjectMedia {
  url: string
  type: 'image' | 'video'
}

export interface Project {
  id: string
  titleKey: string
  descriptionKey: string
  tags: string[]
  github?: string
  demo?: string
}

const projects: Project[] = [
  {
    id: 'dsno-processor',
    titleKey: 'dsno.title',
    descriptionKey: 'dsno.description',
    tags: ['Python', 'Selenium', 'Oracle EBS', 'Tkinter'],
    github: 'https://github.com/Maschior/dsno-processor',
  },
  {
    id: 'portfolio-infra',
    titleKey: 'portfolio.title',
    descriptionKey: 'portfolio.description',
    tags: ['Terraform', 'Ansible', 'AWS', 'CI/CD'],
    github: 'https://github.com/Maschior/portfolio',
  },
  {
    id: 'portfolio-webapp',
    titleKey: 'site.title',
    descriptionKey: 'site.description',
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'i18n'],
    github: 'https://github.com/Maschior/portfolio-webapp',
  },
]

export function ProjectHero() {
  const t = useTranslations('projects')
  const [projectMediaMap, setProjectMediaMap] = useState<Record<string, ProjectMedia[]>>({})

  useEffect(() => {
    fetch('/api/project-images')
      .then((res) => res.json())
      .then((data) => setProjectMediaMap(data))
      .catch((err) => console.error('Failed to load project media:', err))
  }, [])

  return (
    <section className="bg-background">
      <div className="max-w-6xl mx-auto px-8 py-16 lg:py-24 border-x-2 border-dotted border-border/40">
        {/* Cabeçalho */}
        <div className="text-center mb-16 space-y-4">
          <p className="text-subtitle">{t('subtitle')}</p>
          <h1 className="text-headline">{t('title')}</h1>
        </div>

        {/* Grid de projetos — 3 colunas a partir de lg */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              index={index} 
              media={projectMediaMap[project.id] || []} 
            />
          ))}
        </div>
      </div>
    </section>
  )
}
