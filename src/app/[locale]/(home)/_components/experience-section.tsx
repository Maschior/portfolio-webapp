'use client'

import { Badge } from '@/components/ui/badge'
import { useTranslations } from 'next-intl'
import { Briefcase, Calendar } from 'lucide-react'

interface Experience {
  company: string
  client?: string
  role: string
  period: string
  current?: boolean
  description: string[]
}

const experiences: Experience[] = [
  {
    company: 'Softtek',
    client: 'Cummins',
    role: 'Analista de Suporte',
    period: 'Mai 2023',
    current: true,
    description: [
      'Automação operacional, infraestrutura interna, DevOps e padronização de processos',
      'Desenvolvimento de aplicação desktop em Python para automação de processamento de arquivos EDI (DSNOs) com Selenium e Oracle EBS',
      'Implementação de esteira CI/CD com Docker e Jenkins para automação de operações e auditoria em ambientes Oracle',
      'Criação e manutenção de scripts Python para geração automatizada de relatórios e operação de rotinas internas',
      'Administração de infraestrutura Linux (servidores, DNS, regras de firewall, rede e serviços internos)',
    ],
  },
  {
    company: 'Teleperformance',
    client: 'Microsoft',
    role: 'Analista de Suporte',
    period: 'Jan 2023 – Mai 2025',
    description: [
      'Suporte técnico para Microsoft 365 (Teams, SharePoint, OneDrive, Exchange, Entra ID)',
      'Diagnóstico e resolução de problemas via PowerShell, Graph Explorer e ferramentas Microsoft',
      'Tratamento de escalonamentos e coordenação com equipes internas de engenharia Microsoft',
      'Criação de documentação técnica e participação em treinamentos internos como instrutor',
    ],
  },
  {
    company: 'Calvo Cesta Básica',
    role: 'Jovem Aprendiz de TI',
    period: 'Ago 2021 – Out 2022',
    description: [
      'Suporte técnico interno (hardware, software, rede e periféricos)',
      'Manutenção de computadores, impressoras e cabeamento de rede',
      'Controle de estoque e inventário de equipamentos de TI',
    ],
  },
  {
    company: 'Sonolayer',
    role: 'Estagiário de TI',
    period: 'Jun 2020 – Jun 2021',
    description: [
      'Suporte técnico e manutenção de equipamentos',
      'Configuração de rede, periféricos e infraestrutura básica de TI',
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
              <div key={`${exp.company}-${exp.period}`} className={`relative flex flex-col md:flex-row gap-8 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
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
                      <h3 className="text-lg font-semibold text-foreground">{exp.role}</h3>
                      <div className="flex items-center gap-1.5 text-sm text-muted-foreground mt-1">
                        <Calendar className="h-3.5 w-3.5" />
                        <span>{exp.period}{exp.current ? ` – ${t('current')}` : ''}</span>
                      </div>
                    </div>

                    <ul className="space-y-2">
                      {exp.description.map((desc) => (
                        <li key={desc} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <span className="text-primary mt-1.5 flex-shrink-0">•</span>
                          <span>{desc}</span>
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
