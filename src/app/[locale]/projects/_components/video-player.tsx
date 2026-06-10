'use client'

import { useEffect, useRef } from 'react'
import videojs from 'video.js'
import 'video.js/dist/video-js.css'

interface VideoPlayerProps {
  src: string
  controls?: boolean
  autoplay?: boolean | 'play' | 'muted' | 'any'
  muted?: boolean
  loop?: boolean
  className?: string
}

const getMimeType = (url: string) => {
  const ext = url.split('.').pop()?.toLowerCase()
  if (ext === 'webm') return 'video/webm'
  if (ext === 'ogg') return 'video/ogg'
  if (ext === 'mov') return 'video/quicktime'
  return 'video/mp4'
}

export function VideoPlayer({
  src,
  controls = true,
  autoplay = false,
  muted = false,
  loop = false,
  className = '',
}: VideoPlayerProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const playerRef = useRef<ReturnType<typeof videojs> | null>(null)

  // Initialize Video.js once on mount
  useEffect(() => {
    if (!containerRef.current) return

    const videoElement = document.createElement('video-js')
    videoElement.classList.add('vjs-panda-skin', 'vjs-big-play-centered', 'vjs-fluid')
    containerRef.current.appendChild(videoElement)

    const player = videojs(videoElement, {
      controls,
      playbackRates: [0.5, 1, 1.25, 1.5, 2],
      responsive: true,
      fluid: true,
      controlBar: {
        children: [
          'playToggle',
          'currentTimeDisplay',
          'progressControl',
          'durationDisplay',
          'volumePanel',
          'playbackRateMenuButton',
          'fullscreenToggle',
        ],
      },
    })

    playerRef.current = player

    return () => {
      if (playerRef.current) {
        playerRef.current.dispose()
        playerRef.current = null
      }
      if (containerRef.current) {
        containerRef.current.innerHTML = ''
      }
    }
  }, [])

  // Update player source and attributes when props change
  useEffect(() => {
    const player = playerRef.current
    if (player && src) {
      player.src({
        src,
        type: getMimeType(src),
      })
      player.autoplay(autoplay)
      player.muted(muted)
      player.loop(loop)

      if (autoplay) {
        const playPromise = player.play()
        if (playPromise && typeof playPromise.catch === 'function') {
          playPromise.catch(() => {})
        }
      }
    }
  }, [src, autoplay, muted, loop])

  return (
    <div className={`w-full h-full flex items-center justify-center overflow-hidden rounded-lg ${className}`}>
      <div ref={containerRef} className="w-full max-w-full" />
    </div>
  )
}
