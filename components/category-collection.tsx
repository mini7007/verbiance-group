'use client'

import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import { fadeUp, staggerContainer, transition } from '@/lib/motion'

const categories = [
  { name: 'Ghee', image: '/images/cat-ghee.jpg', count: 12 },
  { name: 'Honey', image: '/images/cat-honey.jpg', count: 8 },
  { name: 'Pulses & Grains', image: '/images/cat-pulses.jpg', count: 24 },
  { name: 'Spices', image: '/images/cat-spices.jpg', count: 32 },
  { name: 'Millets', image: '/images/cat-millets.jpg', count: 15 },
  { name: 'Flour', image: '/images/cat-flour.jpg', count: 10 },
  { name: 'Tea', image: '/images/cat-tea.jpg', count: 18 },
  { name: 'All Products', image: '/images/cat-all.jpg', count: 119 },
]

export function CategoryCollection() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <section className="bg-background py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={fadeUp}
          transition={transition.smooth}
          className="mb-12 text-center lg:mb-16"
        >
          <p className="mb-3 text-xs font-semibold tracking-[0.2em] uppercase text-accent">
            Browse by category
          </p>
          <h2 className="font-serif text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl text-balance">
            Our Collection
          </h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={staggerContainer}
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {categories.map((cat) => (
            <motion.a
              key={cat.name}
              href="#"
              variants={fadeUp}
              transition={transition.smooth}
              whileHover={prefersReducedMotion ? {} : { y: -4 }}
              className="group relative aspect-square cursor-pointer overflow-hidden rounded-lg"
            >
              <Image
                src={cat.image}
                alt={cat.name}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />
              {/* Default overlay */}
              <div className="absolute inset-0 bg-foreground/30 transition-all duration-500 group-hover:bg-foreground/55" />
              {/* Content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                <h3 className="font-serif text-xl font-bold text-primary-foreground sm:text-2xl text-balance text-center">
                  {cat.name}
                </h3>
                <span className="mt-2 text-xs font-medium tracking-wider uppercase text-primary-foreground/70 transition-colors duration-300 group-hover:text-primary-foreground">
                  {cat.count} Products
                </span>
                <span className="mt-4 flex h-9 items-center rounded-full border border-primary-foreground/40 px-5 text-xs font-semibold tracking-wider uppercase text-primary-foreground opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:border-primary-foreground/80">
                  Explore
                </span>
              </div>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
