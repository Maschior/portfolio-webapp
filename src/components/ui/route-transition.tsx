'use client'

import { usePathname } from '@/lib/navigation'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import type { ReactNode } from 'react'

interface RouteTransitionProps {
  children: ReactNode
  className?: string
}

const SPRING_CONFIG = { type: 'spring' as const, stiffness: 200, damping: 25, mass: 1 }

export function RouteTransition({ children, className = '' }: RouteTransitionProps) {
  const pathname = usePathname()
  const [isInitialLoad, setIsInitialLoad] = useState(true)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    const timer = setTimeout(() => setIsInitialLoad(false), 300)
    return () => clearTimeout(timer)
  }, [])

  if (!isMounted || isInitialLoad) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      key={pathname}
      className={className}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0, transition: { ...SPRING_CONFIG, duration: 0.3 } }}
    >
      {children}
    </motion.div>
  )
}
