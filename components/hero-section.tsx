'use client'

import { useRef, useEffect, useState } from 'react'
import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import { ease } from '@/lib/motion'

export function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [videoLoaded, setVideoLoaded] = useState(false)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleCanPlay = () => setVideoLoaded(true)
    video.addEventListener('canplaythrough', handleCanPlay)

    // Attempt to play (might fail on some mobile browsers)
    video.play().catch(() => {
      // Video autoplay blocked — fallback image will show
    })

    return () => video.removeEventListener('canplaythrough', handleCanPlay)
  }, [])

  return (
    <section id="home" className="relative min-h-[90vh] overflow-hidden lg:min-h-screen">
      {/* Fallback Image (shown until video loads) */}
      <div
        className={`absolute inset-0 transition-opacity duration-1000 ${videoLoaded ? 'opacity-0' : 'opacity-100'}`}
      >
        <Image
          src="/images/hero.jpg"
          alt="Organic wellness products"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
      </div>

      {/* Background Video */}
      <motion.div
        initial={{ scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 8, ease: ease.out }}
        className="absolute inset-0"
      >
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className={`h-full w-full object-cover transition-opacity duration-1000 ${videoLoaded ? 'opacity-100' : 'opacity-0'}`}
          aria-hidden="true"
        >
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>
      </motion.div>

      {/* Dark gradient overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 via-foreground/50 to-foreground/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 via-transparent to-transparent" />

      {/* Content */}
      <div className="relative mx-auto flex min-h-[90vh] max-w-7xl items-center px-4 py-24 lg:min-h-screen lg:px-8">
        <div className="max-w-2xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: ease.out }}
            className="mb-4 text-sm font-semibold tracking-[0.25em] uppercase text-accent"
          >
            Handcrafted with love
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: ease.out }}
            className="mb-6 font-serif text-4xl font-bold leading-tight tracking-tight text-primary-foreground text-balance sm:text-5xl lg:text-6xl xl:text-7xl"
          >
            {"Nature's Finest, Delivered to Your Door"}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7, ease: ease.out }}
            className="mb-10 max-w-lg text-base leading-relaxed text-primary-foreground/70 sm:text-lg"
          >
            Discover our curated collection of premium organic wellness products
            sourced directly from the pristine valleys of India.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9, ease: ease.out }}
            className="flex flex-wrap gap-4"
          >
            <motion.a
              href="#shop"
              whileHover={prefersReducedMotion ? {} : { scale: 1.03 }}
              whileTap={prefersReducedMotion ? {} : { scale: 0.97 }}
              className="group inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3.5 text-sm font-semibold tracking-wide text-primary-foreground shadow-lg shadow-primary/25 transition-all duration-300 hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/30"
            >
              Shop Collection
              <svg
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </motion.a>
            <motion.a
              href="#about"
              whileHover={prefersReducedMotion ? {} : { scale: 1.03 }}
              whileTap={prefersReducedMotion ? {} : { scale: 0.97 }}
              className="inline-flex items-center rounded-full border-2 border-primary-foreground/30 px-8 py-3.5 text-sm font-semibold tracking-wide text-primary-foreground transition-all duration-300 hover:border-primary-foreground/60 hover:bg-primary-foreground/10"
            >
              Our Story
            </motion.a>
          </motion.div>
        </div>
      </div>

      {/* Bottom scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={prefersReducedMotion ? {} : { y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          className="flex h-10 w-6 items-start justify-center rounded-full border-2 border-primary-foreground/30 pt-2"
        >
          <div className="h-1.5 w-1.5 rounded-full bg-primary-foreground/60" />
        </motion.div>
      </motion.div>
    </section>
  )
}
