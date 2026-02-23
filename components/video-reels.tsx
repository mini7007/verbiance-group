'use client'

import { useState, useRef, useCallback } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { Play, X, ChevronLeft, ChevronRight } from 'lucide-react'
import { fadeUp, staggerContainer, transition, ease } from '@/lib/motion'

const reels = [
  {
    id: 1,
    title: 'Farm to Table Journey',
    thumbnail: '/images/cat-ghee.jpg',
    video: '/videos/hero.mp4',
  },
  {
    id: 2,
    title: 'Making Pure Ghee',
    thumbnail: '/images/cat-honey.jpg',
    video: '/videos/hero.mp4',
  },
  {
    id: 3,
    title: 'Harvesting Wild Honey',
    thumbnail: '/images/cat-spices.jpg',
    video: '/videos/hero.mp4',
  },
  {
    id: 4,
    title: 'Spice Garden Tour',
    thumbnail: '/images/brand-story.jpg',
    video: '/videos/hero.mp4',
  },
  {
    id: 5,
    title: 'Millet Processing',
    thumbnail: '/images/cat-millets.jpg',
    video: '/videos/hero.mp4',
  },
  {
    id: 6,
    title: 'Tea Leaf Picking',
    thumbnail: '/images/cat-tea.jpg',
    video: '/videos/hero.mp4',
  },
]

export function VideoReels() {
  const [activeVideo, setActiveVideo] = useState<typeof reels[0] | null>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()

  const scroll = useCallback((direction: 'left' | 'right') => {
    if (!scrollRef.current) return
    const amount = 280
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -amount : amount,
      behavior: 'smooth',
    })
  }, [])

  return (
    <>
      <section className="bg-secondary py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={fadeUp}
            transition={transition.smooth}
            className="mb-12 flex items-end justify-between"
          >
            <div>
              <p className="mb-3 text-xs font-semibold tracking-[0.2em] uppercase text-accent">
                Behind the scenes
              </p>
              <h2 className="font-serif text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl text-balance">
                Our Stories
              </h2>
            </div>
            <div className="hidden gap-2 sm:flex">
              <button
                onClick={() => scroll('left')}
                aria-label="Scroll reels left"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-foreground/60 transition-colors hover:border-primary hover:text-primary"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={() => scroll('right')}
                aria-label="Scroll reels right"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-foreground/60 transition-colors hover:border-primary hover:text-primary"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={staggerContainer}
          >
            <div
              ref={scrollRef}
              className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 scrollbar-none"
              style={{ scrollbarWidth: 'none' }}
            >
              {reels.map((reel) => (
                <motion.button
                  key={reel.id}
                  variants={fadeUp}
                  transition={transition.smooth}
                  whileHover={prefersReducedMotion ? {} : { y: -6 }}
                  onClick={() => setActiveVideo(reel)}
                  className="group relative flex-shrink-0 snap-start overflow-hidden rounded-xl"
                  style={{ width: 240, height: 380 }}
                >
                  <Image
                    src={reel.thumbnail}
                    alt={reel.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="240px"
                  />
                  <div className="absolute inset-0 bg-foreground/20 transition-colors duration-300 group-hover:bg-foreground/40" />
                  {/* Play button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary-foreground/90 text-primary shadow-lg transition-transform duration-300 group-hover:scale-110">
                      <Play className="ml-0.5 h-6 w-6" fill="currentColor" />
                    </div>
                  </div>
                  {/* Title */}
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <p className="text-left text-sm font-semibold text-primary-foreground">
                      {reel.title}
                    </p>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Video modal */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-foreground/80 backdrop-blur-sm p-4"
            onClick={() => setActiveVideo(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3, ease: ease.out }}
              className="relative w-full max-w-sm overflow-hidden rounded-2xl bg-foreground shadow-2xl"
              style={{ aspectRatio: '9/16' }}
              onClick={(e) => e.stopPropagation()}
            >
              <video
                src={activeVideo.video}
                autoPlay
                loop
                playsInline
                className="h-full w-full object-cover"
              />
              <button
                onClick={() => setActiveVideo(null)}
                aria-label="Close video"
                className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-foreground/50 text-primary-foreground backdrop-blur-sm transition-colors hover:bg-foreground/70"
              >
                <X className="h-4 w-4" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
