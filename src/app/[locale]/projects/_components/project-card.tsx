'use client'

import { Badge } from '@/components/ui/badge'
import { Link } from '@/lib/navigation'
import { useTranslations } from 'next-intl'
import { ExternalLink, Github, Folder } from 'lucide-react'
import * as FancyButton from '@/components/ui/fancy-button'

interface Project {
  titleKey: string
  descriptionKey: string
  tags: string[]
  github?: string
  demo?: string
}

// Gradientes únicos por índice — determinístico, sem precisar de Date.now/Math.random
const PALETTE = [
  'from-indigo-600 to-purple-700',
  'from-emerald-600 to-teal-700',
  'from-amber-600 to-orange-700',
  'from-rose-600 to-pink-700',
  'from-cyan-600 to-blue-700',
  'from-violet-600 to-fuchsia-700',
  'from-lime-600 to-green-700',
  'from-red-600 to-rose-700',
  'from-sky-600 to-indigo-700',
]

interface ProjectCardProps {
  project: Project
  index: number
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const t = useTranslations('projects')
  const gradient = PALETTE[index % PALETTE.length]

  return (
    <div className="card-modern p-0 overflow-hidden flex flex-col group">
      {/* Imagem / Placeholder */}
      <div className={`relative aspect-video bg-gradient-to-br ${gradient} flex items-center justify-center`}>
        {/* Padrão decorativo de fundo */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-4 left-4 w-20 h-20 rounded-full bg-white" />
          <div className="absolute bottom-4 right-4 w-32 h-32 rounded-full bg-white" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full border-4 border-white/20" />
        </div>
        {/* Ícone central */}
        <Folder className="w-12 h-12 text-white/50 relative z-10" strokeWidth={1.5} />
        {/* Overlay no hover */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 z-20" />
      </div>

      {/* Conteúdo textual */}
      <div className="p-6 flex flex-col flex-1 space-y-3">
        <h3 className="text-lg font-semibold text-foreground">
          {t(project.titleKey)}
        </h3>

        <p className="text-sm text-muted-foreground leading-relaxed flex-1">
          {t(project.descriptionKey)}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <Badge key={tag} variant="outline" className="text-[10px] rounded-md px-2 py-0.5">
              {tag}
            </Badge>
          ))}
        </div>

        {/* Botões de ação */}
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
    </div>
  )
}
