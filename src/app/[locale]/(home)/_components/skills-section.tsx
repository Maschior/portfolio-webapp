'use client'

import { Badge } from '@/components/ui/badge'
import { useTranslations } from 'next-intl'
import { SiPython, SiJavascript, SiHtml5, SiDocker, SiJenkins, SiGit, SiLinux, SiMysql, SiGnubash, SiSelenium, SiPostgresql, SiGitea } from 'react-icons/si'
import { VscTerminalPowershell } from 'react-icons/vsc'
import { TbBrandVscode } from 'react-icons/tb'
import type { IconType } from 'react-icons'

interface SkillCategory {
  nameKey: string
  skills: { name: string; icon?: IconType }[]
}

const skillCategories: SkillCategory[] = [
  {
    nameKey: 'languages',
    skills: [
      { name: 'Python', icon: SiPython },
      { name: 'Shell Script (Bash)', icon: SiGnubash },
      { name: 'SQL' },
      { name: 'JavaScript', icon: SiJavascript },
      { name: 'HTML/CSS', icon: SiHtml5 },
    ],
  },
  {
    nameKey: 'devops',
    skills: [
      { name: 'Docker', icon: SiDocker },
      { name: 'Jenkins', icon: SiJenkins },
      { name: 'Git / Gitea', icon: SiGit },
      { name: 'CI/CD' },
      { name: 'Selenium', icon: SiSelenium },
    ],
  },
  {
    nameKey: 'infra',
    skills: [
      { name: 'Linux (CentOS, Ubuntu)', icon: SiLinux },
      { name: 'Windows Server' },
      { name: 'pfSense' },
      { name: 'Proxy Squid' },
      { name: 'Samba' },
      { name: 'MySQL', icon: SiMysql },
      { name: 'PostgreSQL', icon: SiPostgresql },
      { name: 'SQL Server' },
    ],
  },
  {
    nameKey: 'tools',
    skills: [
      { name: 'Oracle EBS' },
      { name: 'ServiceNow' },
      { name: 'Microsoft 365' },
      { name: 'VS Code', icon: TbBrandVscode },
    ],
  },
]

export function SkillsSection() {
  const t = useTranslations('skills')

  return (
    <section className="bg-card/30">
      <div className="max-w-6xl mx-auto px-8 py-16 lg:py-24 border-x-2 border-dotted border-border/40">
        <div className="text-center mb-16 space-y-4">
          <p className="text-subtitle">{t('subtitle')}</p>
          <h2 className="text-headline">{t('title')}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skillCategories.map((category) => (
            <div key={category.nameKey} className="card-modern p-6 space-y-4">
              <h3 className="text-lg font-semibold text-foreground">
                {t(`categories.${category.nameKey}`)}
              </h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <Badge
                    key={skill.name}
                    variant="secondary"
                    className="gap-1.5 py-1.5 px-3 rounded-lg text-sm hover:bg-secondary/70 transition-colors"
                  >
                    {skill.icon && <skill.icon className="h-3.5 w-3.5" />}
                    {skill.name}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
