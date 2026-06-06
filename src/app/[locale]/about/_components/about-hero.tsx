'use client'

import { ProfileAvatar } from '@/components/common'
import { Badge } from '@/components/ui/badge'
import { useTranslations } from 'next-intl'
import { MapPin, GraduationCap, Briefcase, Globe, Code2 } from 'lucide-react'

const quickFacts = [
  { icon: GraduationCap, labelKey: 'fact1' },
  { icon: Briefcase, labelKey: 'fact2' },
  { icon: MapPin, labelKey: 'fact3' },
  { icon: Globe, labelKey: 'fact4' },
]

const techStack = [
  'Python', 'Shell Script (Bash)', 'Docker', 'Jenkins', 'Git/Gitea', 'CI/CD',
  'Selenium', 'SQL', 'MySQL', 'PostgreSQL', 'SQL Server', 'Linux (CentOS, Ubuntu Server)',
  'Windows Server', 'pfSense', 'Proxy Squid', 'Samba', 'Oracle EBS',
  'ServiceNow', 'Microsoft 365', 'HTML/CSS', 'JavaScript'
]

export function AboutHero() {
  const t = useTranslations('about')

  return (
    <section className="bg-background">
      <div className="max-w-6xl mx-auto px-8 py-16 lg:py-24 border-x-2 border-dotted border-border/40">
        <div className="text-center mb-16 space-y-4">
          <p className="text-subtitle">{t('subtitle')}</p>
          <h1 className="text-headline">{t('title')}</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left: Avatar + Quick Facts */}
          <div className="space-y-8">
            <div className="flex justify-center">
              <ProfileAvatar size={200} className="border border-border/30 shadow-lg" />
            </div>

            <div className="space-y-4">
              {quickFacts.map((fact) => (
                <div key={fact.labelKey} className="flex items-center gap-3 text-sm text-muted-foreground">
                  <fact.icon className="h-4 w-4 flex-shrink-0 text-primary" />
                  <span>{t(fact.labelKey)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Bio + Tech */}
          <div className="lg:col-span-2 space-y-8">
            <div className="card-modern p-8 space-y-6">
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>{t('bio1')}</p>
                <p>{t('bio2')}</p>
                <p>{t('bio3')}</p>
              </div>
            </div>

            {/* Tech Stack */}
            <div className="card-modern p-8 space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <Code2 className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-semibold">Stack Técnica</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {techStack.map((tech) => (
                  <Badge
                    key={tech}
                    variant="secondary"
                    className="py-1.5 px-3 rounded-lg hover:bg-secondary/70 transition-colors"
                  >
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
