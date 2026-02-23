'use client'

import Image from 'next/image'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { useRef } from 'react'
import { ArrowRight } from 'lucide-react'
import { fadeUp, transition } from '@/lib/motion'

export function BulkCta() {
  const sectionRef = useRef<HTMLElement>(null)
  const prefersReducedMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '20%'])
  const bgScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.05, 1.1, 1.15])

  return (
    <section ref={sectionRef} className="relative overflow-hidden py-0">
      <div className="relative h-[500px] sm:h-[550px] lg:h-[600px]">
        {/* Parallax background */}
        <motion.div
          className="absolute inset-0"
          style={
            prefersReducedMotion
              ? {}
              : { y: bgY, scale: bgScale }
          }
        >
          <Image
            src="/images/bulk-cta.jpg"
            alt="Organic farmland"
            fill
            className="object-cover"
            sizes="100vw"
          />
        </motion.div>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 via-foreground/65 to-foreground/50" />

        {/* Content */}
        <div className="relative flex h-full items-center">
          <div className="mx-auto w-full max-w-7xl px-4 lg:px-8">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              className="max-w-xl"
            >
              <motion.p
                variants={fadeUp}
                transition={transition.smooth}
                className="mb-4 text-xs font-semibold tracking-[0.2em] uppercase text-accent"
              >
                For businesses & institutions
              </motion.p>
              <motion.h2
                variants={fadeUp}
                transition={{ ...transition.smooth, delay: 0.1 }}
                className="mb-6 font-serif text-3xl font-bold text-primary-foreground sm:text-4xl lg:text-5xl text-balance"
              >
                Looking to Buy in Bulk?
              </motion.h2>
              <motion.p
                variants={fadeUp}
                transition={{ ...transition.smooth, delay: 0.2 }}
                className="mb-8 max-w-md text-base leading-relaxed text-primary-foreground/75 sm:text-lg"
              >
                We offer wholesale pricing for restaurants, retailers, and
                organizations committed to quality organic products. Custom
                packaging available.
              </motion.p>
              <motion.a
                href="#contact"
                variants={fadeUp}
                transition={{ ...transition.smooth, delay: 0.3 }}
                whileHover={prefersReducedMotion ? {} : { scale: 1.03 }}
                whileTap={prefersReducedMotion ? {} : { scale: 0.97 }}
                className="inline-flex items-center gap-2 rounded-full bg-accent px-8 py-3.5 text-sm font-semibold tracking-wide text-accent-foreground transition-colors hover:bg-accent/90"
              >
                Get a Quote
                <ArrowRight className="h-4 w-4" />
              </motion.a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
