'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Play, ChevronLeft, ChevronRight } from 'lucide-react'
import { fadeUp, staggerContainer, transition } from '@/lib/motion'

type Reel = {
  id: number
  title: string
  thumbnail: string
  video: string
}

const reels: Reel[] = [
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
  const scrollRef = useRef<HTMLDivElement>(null)
  const desktopAutoScrollRef = useRef<number | null>(null)
  const [activeReelId, setActiveReelId] = useState<number | null>(null)
  const [pauseDesktopAutoScroll, setPauseDesktopAutoScroll] = useState(false)
  const prefersReducedMotion = useReducedMotion()

  const scroll = useCallback((direction: 'left' | 'right') => {
    if (!scrollRef.current) return
    const amount = 320
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -amount : amount,
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
    })
  }, [prefersReducedMotion])

  useEffect(() => {
    const section = scrollRef.current
    if (!section || prefersReducedMotion) return

    const mediaQuery = window.matchMedia('(min-width: 768px)')
    if (!mediaQuery.matches) return

    let direction = 1
    const step = () => {
      if (!scrollRef.current || pauseDesktopAutoScroll) {
        desktopAutoScrollRef.current = window.requestAnimationFrame(step)
        return
      }

      const node = scrollRef.current
      const maxScrollLeft = node.scrollWidth - node.clientWidth
      node.scrollLeft += direction * 0.2

      if (node.scrollLeft >= maxScrollLeft - 2) direction = -1
      if (node.scrollLeft <= 2) direction = 1

      desktopAutoScrollRef.current = window.requestAnimationFrame(step)
    }

    desktopAutoScrollRef.current = window.requestAnimationFrame(step)

    return () => {
      if (desktopAutoScrollRef.current) {
        window.cancelAnimationFrame(desktopAutoScrollRef.current)
      }
    }
  }, [pauseDesktopAutoScroll, prefersReducedMotion])

  return (
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
          <div className="hidden gap-2 md:flex">
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
            onMouseEnter={() => setPauseDesktopAutoScroll(true)}
            onMouseLeave={() => setPauseDesktopAutoScroll(false)}
            onTouchStart={() => setPauseDesktopAutoScroll(true)}
            onTouchEnd={() => setPauseDesktopAutoScroll(false)}
            className="flex h-[84svh] max-w-full snap-y snap-mandatory flex-col gap-4 overflow-y-auto overflow-x-hidden pb-4 pt-1 scrollbar-none md:h-auto md:snap-x md:snap-mandatory md:flex-row md:overflow-x-auto md:overflow-y-visible"
            style={{ scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch' }}
          >
            {reels.map((reel) => (
              <ReelCard
                key={reel.id}
                reel={reel}
                active={activeReelId === reel.id}
                setActiveReelId={setActiveReelId}
                prefersReducedMotion={Boolean(prefersReducedMotion)}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

type ReelCardProps = {
  reel: Reel
  active: boolean
  setActiveReelId: (id: number | null) => void
  prefersReducedMotion: boolean
}

function ReelCard({ reel, active, setActiveReelId, prefersReducedMotion }: ReelCardProps) {
  const cardRef = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const card = cardRef.current
    const video = videoRef.current
    if (!card || !video) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        const inView = entry.isIntersecting && entry.intersectionRatio > 0.6

        if (inView) {
          setActiveReelId(reel.id)
          if (!prefersReducedMotion) {
            video.play().catch(() => {
              // Ignore autoplay rejections from strict browser policies.
            })
          }
        } else {
          if (!video.paused) video.pause()
        }
      },
      {
        threshold: [0.25, 0.6, 0.8],
      }
    )

    observer.observe(card)

    return () => {
      observer.disconnect()
      video.pause()
    }
  }, [prefersReducedMotion, reel.id, setActiveReelId])

  return (
    <motion.article
      ref={cardRef}
      variants={fadeUp}
      transition={transition.smooth}
      whileHover={prefersReducedMotion ? {} : { y: -6 }}
      className="group relative min-h-[78svh] w-full flex-shrink-0 snap-start overflow-hidden rounded-2xl bg-foreground shadow-lg md:min-h-0 md:w-[240px] md:rounded-xl"
      style={{
        aspectRatio: '9 / 16',
      }}
    >
      <video
        ref={videoRef}
        src={reel.video}
        poster={reel.thumbnail}
        muted
        loop
        playsInline
        preload="none"
        className="h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 to-transparent" />

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full border border-white/35 bg-black/25 text-white backdrop-blur-sm transition-all duration-300 group-hover:scale-110">
          <Play className="ml-0.5 h-6 w-6" fill="currentColor" />
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-5">
        <p className="text-left text-sm font-semibold text-primary-foreground md:text-base">
          {reel.title}
        </p>
      </div>

      <div
        className={`pointer-events-none absolute inset-0 border border-white/20 transition-all duration-500 ${
          active ? 'scale-[1.01] shadow-[0_0_0_1px_rgba(255,255,255,0.3)]' : 'scale-100'
        }`}
      />
    </motion.article>
  )
}
