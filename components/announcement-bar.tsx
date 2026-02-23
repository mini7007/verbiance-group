'use client'

import { useState } from 'react'
import { X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export function AnnouncementBar() {
  const [isVisible, setIsVisible] = useState(true)

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-primary text-primary-foreground overflow-hidden"
        >
          <div className="mx-auto flex max-w-7xl items-center justify-center px-4 py-2.5">
            <p className="text-center text-xs font-medium tracking-wider uppercase sm:text-sm">
              Free shipping on all orders above Rs. 999 — Use code{' '}
              <span className="font-bold">NATURE10</span> for 10% off
            </p>
            <button
              onClick={() => setIsVisible(false)}
              className="ml-4 flex-shrink-0 rounded-full p-0.5 transition-colors hover:bg-primary-foreground/20"
              aria-label="Close announcement"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
