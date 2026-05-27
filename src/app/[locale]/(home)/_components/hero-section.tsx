'use client'

import { ProfileAvatar } from '@/components/common'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Link } from '@/lib/navigation'
import { useTranslations } from 'next-intl'
import { MapPin, Briefcase, ArrowRight, Sparkles, Users, Globe } from 'lucide-react'
import * as FancyButton from '@/components/ui/fancy-button'
import Image from 'next/image'

export function HeroSection() {
  const t = useTranslations('hero')

  const highlights = [
    t('highlights.automation'),
    t('highlights.devops'),
    t('highlights.infra'),
    t('highlights.support'),
  ]

  const stats = [
    { value: '5+', label: t('stats.experience'), icon: Briefcase },
    { value: '15+', label: t('stats.technologies'), icon: Sparkles },
    { value: '4', label: t('stats.companies'), icon: Users },
    { value: '2', label: t('stats.languages'), icon: Globe },
  ]

  return (
    <section className="hero-section">
      <div className="max-w-6xl mx-auto px-8 py-16 lg:py-24 border-x-2 border-dotted border-border/40">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          {/* Left Column - Content */}
          <div className="space-y-8">
            {/* Location + Role badges */}
            <div className="flex items-center space-x-2">
              <Badge variant="secondary" className="px-3 py-1">
                <MapPin className="mr-1 h-3 w-3" />
                {t('location')}
              </Badge>
              <Badge variant="outline" className="px-3 py-1">
                <Briefcase className="mr-1 h-3 w-3" />
                {t('role')}
              </Badge>
            </div>

            {/* Main Heading */}
            <div className="space-y-6">
              <div className="text-subtitle">{t('subtitle')}</div>
              <h1 className="text-display">{t('title')}</h1>
              <p className="text-body-large text-muted-foreground max-w-2xl">
                {t('description')}
              </p>
            </div>

            {/* Highlights */}
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {highlights.map((highlight) => (
                <div key={highlight} className="flex items-center">
                  <span className="text-sm font-medium">{highlight}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
              <FancyButton.Root size="lg" asChild={true} className="group">
                <Link href="#experience">
                  <FancyButton.Icon as={Sparkles} className="mr-2" />
                  {t('cta.experience')}
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </FancyButton.Root>

              <FancyButton.Root variant="basic" size="lg" asChild={true} className="group">
                <Link href="/contact">
                  {t('cta.contact')}
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </FancyButton.Root>
            </div>
          </div>

          {/* Right Column - Image & Stats */}
          <div className="space-y-8">
            {/* Profile Image */}
            <div className="relative">
              <div className="aspect-square w-full max-w-md mx-auto relative overflow-hidden rounded-2xl bg-gradient-to-br from-muted/50 to-muted border border-border/20">
                <Image
                  src="/foto-perfil.png"
                  alt="Matheus Delmaschio - Analista de Suporte & DevOps"
                  fill={true}
                  className="object-cover object-center"
                  priority={true}
                  sizes="(max-width: 768px) 100vw, 448px"
                />
              </div>

              {/* Floating badge */}
              <div className="absolute -bottom-4 -right-4">
                <Card className="border-green-500/20 shadow-lg shadow-green-500/20">
                  <CardContent className="p-3">
                    <div className="flex items-center space-x-2">
                      <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse shadow-md shadow-green-500/50" />
                      <span className="text-xs font-medium">
                        {t('cta.available')}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat) => {
                const Icon = stat.icon
                return (
                  <Card key={stat.label} className="tech-card">
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                          <Icon className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <div className="text-2xl font-bold">{stat.value}</div>
                          <div className="text-xs text-muted-foreground">
                            {stat.label}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
