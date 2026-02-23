'use client'

import { useRef, useEffect, useState } from 'react'
import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import { ease } from '@/lib/motion'

const heroCopy = {
  eyebrow: 'Handcrafted with love',
  title: "Nature's Finest, Delivered to Your Door",
  description:
    'Discover our curated collection of premium organic wellness products sourced directly from the pristine valleys of India.',
}

export function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [videoLoaded, setVideoLoaded] = useState(false)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    const video = videoRef.current
    if (!video || prefersReducedMotion) return

    const handleCanPlay = () => setVideoLoaded(true)
    video.addEventListener('loadeddata', handleCanPlay, { once: true })

    video.play().catch(() => {
      // Video autoplay blocked — fallback image remains visible
    })

    return () => video.removeEventListener('loadeddata', handleCanPlay)
  }, [prefersReducedMotion])

  return (
    <section id="home" className="relative min-h-[88vh] overflow-hidden lg:min-h-screen">
      <div className={`absolute inset-0 transition-opacity duration-700 ${videoLoaded ? 'opacity-0' : 'opacity-100'}`}>
        <Image
          src="/images/hero.jpg"
          alt="Organic wellness products"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
      </div>

      {!prefersReducedMotion && (
        <motion.div
          initial={{ scale: 1.04 }}
          animate={{ scale: 1.1 }}
          transition={{ duration: 16, ease: 'linear', repeat: Infinity, repeatType: 'reverse' }}
          className="absolute inset-0"
        >
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster="/images/hero.jpg"
            className={`h-full w-full object-cover transition-opacity duration-700 ${videoLoaded ? 'opacity-100' : 'opacity-0'}`}
            aria-hidden="true"
          >
            <source src="/videos/hero.mp4" type="video/mp4" />
          </video>
        </motion.div>
      )}

      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/45 to-black/55" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/35 to-transparent" />

      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: prefersReducedMotion
              ? undefined
              : { delayChildren: 0.2, staggerChildren: 0.14 },
          },
        }}
        className="relative mx-auto flex min-h-[88vh] max-w-7xl items-center px-4 py-20 sm:px-6 lg:min-h-screen lg:px-8"
      >
        <div className="max-w-2xl">
          <motion.p
            variants={{ hidden: { opacity: 0, y: 18 }, visible: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.55, ease: ease.out }}
            className="mb-3 text-xs font-semibold tracking-[0.24em] uppercase text-accent sm:mb-5 sm:text-sm"
          >
            {heroCopy.eyebrow}
          </motion.p>

          <motion.h1
            variants={{ hidden: { opacity: 0, y: 22 }, visible: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.65, ease: ease.out }}
            className="mb-5 font-serif text-4xl leading-[1.1] font-bold tracking-tight text-primary-foreground text-balance sm:text-5xl lg:text-6xl xl:text-7xl"
          >
            {heroCopy.title}
          </motion.h1>

          <motion.p
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.65, ease: ease.out }}
            className="mb-9 max-w-xl text-base leading-relaxed text-primary-foreground/85 sm:text-lg"
          >
            {heroCopy.description}
          </motion.p>

          <motion.div
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.65, ease: ease.out }}
            className="flex flex-wrap gap-3 sm:gap-4"
          >
            <motion.a
              href="#shop"
              whileHover={prefersReducedMotion ? {} : { y: -2 }}
              whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
              className="group inline-flex min-h-12 items-center gap-2 rounded-full bg-primary px-7 py-3 text-sm font-semibold tracking-wide text-primary-foreground shadow-[0_10px_30px_-12px_rgba(45,90,61,0.75)] transition-all duration-300 hover:bg-primary/90 hover:shadow-[0_16px_35px_-14px_rgba(45,90,61,0.8)] sm:px-8"
            >
              Shop Collection
              <svg
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </motion.a>
            <motion.a
              href="#about"
              whileHover={prefersReducedMotion ? {} : { y: -2 }}
              whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
              className="inline-flex min-h-12 items-center rounded-full border border-primary-foreground/40 bg-white/5 px-7 py-3 text-sm font-semibold tracking-wide text-primary-foreground backdrop-blur-xs transition-all duration-300 hover:border-primary-foreground/80 hover:bg-white/12 sm:px-8"
            >
              Our Story
            </motion.a>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
