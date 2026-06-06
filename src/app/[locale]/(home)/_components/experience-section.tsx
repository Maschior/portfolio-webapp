'use client'

import { Badge } from '@/components/ui/badge'
import { useTranslations } from 'next-intl'
import { Briefcase, Calendar } from 'lucide-react'

interface Experience {
  company: string
  client?: string
  roleKey: string
  periodKey: string
  current?: boolean
  descriptionKeys: string[]
}

const experiences: Experience[] = [
  {
    company: 'Softtek',
    client: 'Cummins',
    roleKey: 'softtek.role',
    periodKey: 'softtek.period',
    current: true,
    descriptionKeys: [
      'softtek.desc1',
      'softtek.desc2',
      'softtek.desc3',
      'softtek.desc4',
      'softtek.desc5',
      'softtek.desc6',
    ],
  },
  {
    company: 'Teleperformance',
    client: 'Microsoft',
    roleKey: 'teleperformance.role',
    periodKey: 'teleperformance.period',
    descriptionKeys: [
      'teleperformance.desc1',
      'teleperformance.desc2',
    ],
  },
  {
    company: 'Calvo Cesta Básica',
    roleKey: 'calvo.role',
    periodKey: 'calvo.period',
    descriptionKeys: [
      'calvo.desc1',
      'calvo.desc2',
    ],
  },
  {
    company: 'Sonolayer',
    roleKey: 'sonolayer.role',
    periodKey: 'sonolayer.period',
    descriptionKeys: [
      'sonolayer.desc1',
      'sonolayer.desc2',
      'sonolayer.desc3',
    ],
  },
]

export function ExperienceSection() {
  const t = useTranslations('experience')

  return (
    <section id="experience" className="bg-background">
      <div className="max-w-6xl mx-auto px-8 py-16 lg:py-24 border-x-2 border-dotted border-border/40">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <p className="text-subtitle">{t('subtitle')}</p>
          <h2 className="text-headline">{t('title')}</h2>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-border/40 transform md:-translate-x-1/2" />

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <div key={`${exp.company}-${exp.roleKey}`} className={`relative flex flex-col md:flex-row gap-8 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                {/* Timeline dot */}
                <div className="absolute left-0 md:left-1/2 w-3 h-3 rounded-full bg-primary border-2 border-background transform -translate-x-1.5 md:-translate-x-1.5 mt-6 z-10" />

                {/* Content */}
                <div className={`ml-8 md:ml-0 md:w-1/2 ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}`}>
                  <div className="card-modern p-6 space-y-4 hover:border-border/60">
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge variant="outline" className="gap-1.5 rounded-lg">
                        <Briefcase className="h-3 w-3" />
                        {exp.company}{exp.client ? ` (${exp.client})` : ''}
                      </Badge>
                      {exp.current && (
                        <Badge variant="default" className="rounded-lg text-[10px]">
                          {t('current')}
                        </Badge>
                      )}
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-foreground">{t(exp.roleKey)}</h3>
                      <div className="flex items-center gap-1.5 text-sm text-muted-foreground mt-1">
                        <Calendar className="h-3.5 w-3.5" />
                        <span>{t(exp.periodKey)}{exp.current ? ` – ${t('current')}` : ''}</span>
                      </div>
                    </div>

                    <ul className="space-y-2">
                      {exp.descriptionKeys.map((descKey) => (
                        <li key={descKey} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <span className="text-primary mt-1.5 flex-shrink-0">•</span>
                          <span>{t(descKey)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Spacer */}
                <div className="hidden md:block md:w-1/2" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
