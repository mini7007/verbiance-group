'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'

import { ease } from '@/lib/motion'

const LOADER_KEY = 'valley-culture-site-loader-seen'

export function SiteLoader() {
  const prefersReducedMotion = useReducedMotion()
  const [visible, setVisible] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    const hasSeenLoader = sessionStorage.getItem(LOADER_KEY) === 'true'
    if (hasSeenLoader) {
      return
    }

    setVisible(true)
    sessionStorage.setItem(LOADER_KEY, 'true')

    const timeout = window.setTimeout(() => {
      setVisible(false)
    }, prefersReducedMotion ? 900 : 1450)

    return () => window.clearTimeout(timeout)
  }, [prefersReducedMotion])

  if (!mounted) {
    return null
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: prefersReducedMotion ? 0.2 : 0.45, ease: ease.out } }}
          className="pointer-events-none fixed inset-0 z-[60] flex items-center justify-center bg-[#f4ede3]"
          aria-hidden="true"
        >
          <motion.div
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 8 }}
            animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            transition={{ duration: prefersReducedMotion ? 0.01 : 0.55, ease: ease.out }}
            className="relative"
          >
            {!prefersReducedMotion ? (
              <motion.span
                aria-hidden="true"
                initial={{ opacity: 0.35, scale: 0.98 }}
                animate={{ opacity: 0.65, scale: 1.02 }}
                transition={{ duration: 1.2, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
                className="absolute inset-x-0 top-1/2 h-10 -translate-y-1/2 rounded-full bg-[#d8c4a7]/35 blur-2xl"
              />
            ) : null}
            <p className="relative font-serif text-4xl tracking-[0.12em] text-[#2d5a3d] sm:text-5xl">Valley Culture</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
