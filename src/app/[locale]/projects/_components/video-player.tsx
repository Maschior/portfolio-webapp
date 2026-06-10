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

  useEffect(() => {
    if (!containerRef.current) return

    // Create a dynamic video element for video.js inside the container
    const videoElement = document.createElement('video-js')
    videoElement.classList.add('vjs-panda-skin', 'vjs-big-play-centered', 'vjs-fluid')
    containerRef.current.appendChild(videoElement)

    // Initialize Video.js
    const player = videojs(videoElement, {
      controls,
      autoplay,
      muted,
      loop,
      playbackRates: [0.5, 1, 1.25, 1.5, 2],
      responsive: true,
      fluid: true,
      sources: [
        {
          src,
          type: getMimeType(src),
        },
      ],
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

    // Cleanup on unmount
    return () => {
      if (playerRef.current) {
        playerRef.current.dispose()
        playerRef.current = null
      }
      if (containerRef.current) {
        containerRef.current.innerHTML = ''
      }
    }
  }, [src, controls, autoplay, muted, loop])

  return (
    <div className={`w-full h-full flex items-center justify-center overflow-hidden rounded-lg ${className}`}>
      <div ref={containerRef} className="w-full max-w-full" />
    </div>
  )
}
