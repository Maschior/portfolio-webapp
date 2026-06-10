'use client'

import { useEffect, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { ProjectMedia } from './project-hero'
import { VideoPlayer } from './video-player'

interface ProjectCarouselModalProps {
  isOpen: boolean
  onClose: () => void
  media: ProjectMedia[]
  projectName: string
}

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 300 : -300,
    opacity: 0,
  }),
}

export function ProjectCarouselModal({
  isOpen,
  onClose,
  media,
  projectName,
}: ProjectCarouselModalProps) {
  const [[page, direction], setPage] = useState([0, 0])

  // Reset slider position when modal opens
  useEffect(() => {
    if (isOpen) {
      setPage([0, 0])
    }
  }, [isOpen])

  const mediaIndex = page % media.length
  // Wrap index to handle negative values properly
  const currentIndex = mediaIndex < 0 ? media.length + mediaIndex : mediaIndex

  const paginate = useCallback((newDirection: number) => {
    setPage([page + newDirection, newDirection])
  }, [page])

  // Keydown handlers & body overflow management
  useEffect(() => {
    if (!isOpen) return

    // Prevent body scrolling
    const originalStyle = window.getComputedStyle(document.body).overflow
    document.body.style.overflow = 'hidden'

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight' && media.length > 1) paginate(1)
      if (e.key === 'ArrowLeft' && media.length > 1) paginate(-1)
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = originalStyle
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose, paginate, media.length])

  const currentMedia = media && media.length > 0 ? media[currentIndex] : null

  return (
    <AnimatePresence>
      {isOpen && media.length > 0 && currentMedia && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md select-none"
        >
          {/* Backdrop (clicking outside content closes the modal) */}
          <div className="absolute inset-0 cursor-zoom-out" onClick={onClose} />

          {/* Modal Container */}
          <div className="relative w-full max-w-5xl h-full flex flex-col items-center justify-center px-4 md:px-12 py-8 z-10 pointer-events-none">
            {/* Header (Project Name & Close Button) */}
            <div className="absolute top-6 left-6 right-6 flex items-center justify-between pointer-events-auto">
              <h3 className="text-white font-medium text-lg tracking-wide md:text-xl">
                {projectName}
              </h3>
              <button
                onClick={onClose}
                className="p-2 rounded-full bg-white/5 border border-white/10 text-white/80 hover:text-white hover:bg-white/10 transition-all duration-300"
                aria-label="Close modal"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Media Slider Container */}
            <div className="relative w-full aspect-video md:max-h-[70vh] flex items-center justify-center overflow-hidden pointer-events-auto">
              <AnimatePresence initial={false} custom={direction} mode="popLayout">
                <motion.div
                  key={page}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: 'spring', stiffness: 300, damping: 35 },
                    opacity: { duration: 0.25 },
                  }}
                  className="w-full h-full flex items-center justify-center"
                >
                  {currentMedia.type === 'image' ? (
                    <img
                      src={currentMedia.url}
                      alt={`${projectName} - Media ${currentIndex + 1}`}
                      className="max-w-full max-h-full object-contain rounded-lg shadow-2xl border border-white/10 bg-black/40"
                      draggable={false}
                    />
                  ) : (
                    <VideoPlayer
                      src={currentMedia.url}
                      controls={true}
                      autoplay={true}
                      muted={false}
                      loop={true}
                      className="max-w-full max-h-[70vh] shadow-2xl"
                    />
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation Controls */}
            {media.length > 1 && (
              <>
                {/* Left Arrow */}
                <button
                  onClick={() => paginate(-1)}
                  className="absolute left-4 md:left-8 p-3 rounded-full bg-white/5 border border-white/10 text-white/80 hover:text-white hover:bg-white/10 transition-all duration-300 pointer-events-auto cursor-pointer"
                  aria-label="Previous media"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>

                {/* Right Arrow */}
                <button
                  onClick={() => paginate(1)}
                  className="absolute right-4 md:right-8 p-3 rounded-full bg-white/5 border border-white/10 text-white/80 hover:text-white hover:bg-white/10 transition-all duration-300 pointer-events-auto cursor-pointer"
                  aria-label="Next media"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}

            {/* Bottom Info & Indicators */}
            <div className="absolute bottom-6 flex flex-col items-center gap-3 pointer-events-auto">
              <p className="text-white/60 text-xs tracking-wider">
                {currentIndex + 1} / {media.length}
              </p>
              
              {media.length > 1 && (
                <div className="flex gap-1.5">
                  {media.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        const dir = index > currentIndex ? 1 : -1
                        setPage([index, dir])
                      }}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        index === currentIndex
                          ? 'w-6 bg-white'
                          : 'w-1.5 bg-white/30 hover:bg-white/60'
                      }`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
