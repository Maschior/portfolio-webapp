'use client'

import { useState, useRef, useEffect } from 'react'
import { Badge } from '@/components/ui/badge'
import { Link } from '@/lib/navigation'
import { useTranslations } from 'next-intl'
import { ExternalLink, Github, Folder, Image as ImageIcon } from 'lucide-react'
import * as FancyButton from '@/components/ui/fancy-button'
import { Project, ProjectMedia } from './project-hero'
import { ProjectCarouselModal } from './project-carousel-modal'

// Unique gradients per index
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
  media: ProjectMedia[]
}

export function ProjectCard({ project, index, media }: ProjectCardProps) {
  const t = useTranslations('projects')
  const gradient = PALETTE[index % PALETTE.length]
  const videoRef = useRef<HTMLVideoElement>(null)
  const hoverTimeoutRef = useRef<any>(null)

  const [isPhotoHovered, setIsPhotoHovered] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const hasMedia = media && media.length > 0
  const coverMedia = hasMedia ? media[0] : null

  // Clean up timeout on unmount
  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current)
    }
  }, [])

  // Auto-play/pause video thumbnail on hover
  useEffect(() => {
    if (videoRef.current && coverMedia?.type === 'video') {
      if (isPhotoHovered) {
        // Load the video source on demand and play
        videoRef.current.load()
        videoRef.current.play().catch(() => {})
      } else {
        videoRef.current.pause()
        videoRef.current.currentTime = 0
      }
    }
  }, [isPhotoHovered, coverMedia])

  const handleMouseEnter = () => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current)
    hoverTimeoutRef.current = setTimeout(() => {
      setIsPhotoHovered(true)
    }, 150)
  }

  const handleMouseLeave = () => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current)
    setIsPhotoHovered(false)
  }

  const handleCardClick = () => {
    if (hasMedia) {
      setIsModalOpen(true)
    }
  }

  return (
    <>
      <div 
        onClick={handleCardClick}
        style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
        className={`card-modern p-0 overflow-hidden flex flex-col group cursor-pointer !transition-all !duration-500 ${
          isPhotoHovered 
            ? 'scale-[1.04] -translate-y-2 shadow-2xl z-30 ring-1 ring-primary/20 bg-card/90' 
            : 'z-10 bg-card'
        }`}
      >
        {/* Media / Cover Container */}
        <div 
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="relative aspect-video overflow-hidden border-b border-border/10 bg-muted"
        >
          {coverMedia ? (
            coverMedia.type === 'image' ? (
              <img 
                src={coverMedia.url} 
                alt={t(project.titleKey)}
                className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                loading="lazy"
              />
            ) : (
              <video 
                ref={videoRef}
                src={coverMedia.url} 
                preload="none"
                muted
                loop
                playsInline
                className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
              />
            )
          ) : (
            <div className={`w-full h-full bg-gradient-to-br ${gradient} flex items-center justify-center relative`}>
              {/* Decorative background pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-4 left-4 w-20 h-20 rounded-full bg-white" />
                <div className="absolute bottom-4 right-4 w-32 h-32 rounded-full bg-white" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full border-4 border-white/20" />
              </div>
              {/* Center Icon */}
              <Folder className="w-12 h-12 text-white/50 relative z-10" strokeWidth={1.5} />
            </div>
          )}
          
          {/* Overlay on Hover */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors duration-300 z-20 flex items-center justify-center">
            {hasMedia && (
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/60 backdrop-blur-sm px-3 py-1.5 rounded-full text-white text-xs font-medium flex items-center gap-1.5 shadow-lg pointer-events-none">
                <ImageIcon className="w-3.5 h-3.5" />
                <span>{media.length} {media.length === 1 ? t('viewProject') : 'Media'}</span>
              </div>
            )}
          </div>
        </div>

        {/* Textual Content */}
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

          {/* Action Buttons */}
          <div className="flex items-center gap-3 pt-4 border-t border-border/30">
            {project.github && (
              <FancyButton.Root variant="ghost" size="sm" asChild>
                <Link 
                  href={project.github} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="gap-1.5"
                  onClick={(e) => e.stopPropagation()}
                >
                  <FancyButton.Icon as={Github} />
                  {t('viewCode')}
                </Link>
              </FancyButton.Root>
            )}
            {project.demo && (
              <FancyButton.Root variant="basic" size="sm" asChild>
                <Link 
                  href={project.demo} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="gap-1.5"
                  onClick={(e) => e.stopPropagation()}
                >
                  <FancyButton.Icon as={ExternalLink} />
                  {t('viewProject')}
                </Link>
              </FancyButton.Root>
            )}
          </div>
        </div>
      </div>

      {/* Lightbox Carousel Modal */}
      <ProjectCarouselModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        media={media}
        projectName={t(project.titleKey)}
      />
    </>
  )
}
