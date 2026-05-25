'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { Star } from 'lucide-react'
import { fadeUp, staggerContainer, transition } from '@/lib/motion'

const testimonials = [
  {
    id: 1,
    name: 'Priya Sharma',
    location: 'Mumbai',
    rating: 5,
    text: 'The Radiance Face Serum has completely transformed my skin. After just two weeks, I noticed a visible glow. The quality is truly unmatched.',
  },
  {
    id: 2,
    name: 'Arjun Patel',
    location: 'Bangalore',
    rating: 5,
    text: "Verbiance Group's honey is the purest I've ever tasted. You can genuinely tell the difference from mass-produced brands. My family is hooked.",
  },
  {
    id: 3,
    name: 'Meera Nair',
    location: 'Kerala',
    rating: 5,
    text: "I love the turmeric blend for my morning golden milk. It's potent, fragrant, and works wonders for immunity. Packaging is beautiful too.",
  },
]

export function Testimonials() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <section className="bg-background py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={transition.smooth}
          className="mb-14 text-center"
        >
          <p className="mb-3 text-sm font-semibold tracking-[0.2em] uppercase text-primary">
            Testimonials
          </p>
          <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            Loved by Thousands
          </h2>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid gap-8 md:grid-cols-3"
        >
          {testimonials.map((t) => (
            <motion.div
              key={t.id}
              variants={fadeUp}
              transition={transition.smooth}
              whileHover={prefersReducedMotion ? {} : { y: -4 }}
              className="rounded-lg border border-border/50 bg-card p-8 shadow-sm transition-shadow duration-500 hover:shadow-lg hover:shadow-foreground/5"
            >
              <div className="mb-4 flex gap-0.5">
                {Array.from({ length: t.rating }).map((_, idx) => (
                  <Star
                    key={idx}
                    className="h-4 w-4 fill-accent text-accent"
                  />
                ))}
              </div>
              <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
                {`"${t.text}"`}
              </p>
              <div>
                <p className="font-semibold text-foreground">{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.location}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
