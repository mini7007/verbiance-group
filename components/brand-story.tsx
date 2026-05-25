'use client'

import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import { slideLeft, slideRight, scaleIn, fadeUp, transition } from '@/lib/motion'

const stats = [
  { value: '500+', label: 'Products Crafted' },
  { value: '50K+', label: 'Happy Customers' },
  { value: '100%', label: 'Organic' },
]

export function BrandStory() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <section id="about" className="bg-secondary py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Image */}
          <motion.div
            variants={slideLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={transition.slow}
            className="relative overflow-hidden rounded-lg"
          >
            <div className="aspect-[4/3] overflow-hidden rounded-lg">
              <motion.div
                whileHover={prefersReducedMotion ? {} : { scale: 1.03 }}
                transition={{ duration: 0.7 }}
                className="h-full w-full"
              >
                <Image
                  src="/images/brand-story.jpg"
                  alt="Our organic farm in the Indian valley"
                  width={800}
                  height={600}
                  className="h-full w-full object-cover"
                />
              </motion.div>
            </div>
            {/* Floating stat badge */}
            <motion.div
              variants={scaleIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ ...transition.smooth, delay: 0.5 }}
              className="absolute -bottom-4 -right-4 rounded-lg bg-primary p-5 text-center text-primary-foreground shadow-xl sm:bottom-6 sm:right-6"
            >
              <p className="font-serif text-3xl font-bold">10+</p>
              <p className="text-xs font-medium tracking-wider uppercase">Years of Trust</p>
            </motion.div>
          </motion.div>

          {/* Text */}
          <motion.div
            variants={slideRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={transition.slow}
          >
            <p className="mb-3 text-sm font-semibold tracking-[0.2em] uppercase text-primary">
              Our Story
            </p>
            <h2 className="mb-6 font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              Rooted in Nature, Crafted with Care
            </h2>
            <div className="space-y-5 text-base leading-relaxed text-muted-foreground">
              <p>
                Verbiance Group was born from a simple belief: that the finest
                wellness products come from the purest sources. Deep in the lush
                valleys of India, where ancient traditions meet modern science, we
                source every ingredient with intention.
              </p>
              <p>
                Our artisans work hand-in-hand with local farming communities to
                bring you products that are not just organic, but truly alive with
                the essence of nature. From cold-pressed oils to hand-harvested
                herbs, every product tells a story of purity.
              </p>
              <p>
                We believe in transparent sourcing, sustainable practices, and
                delivering nothing but the best to your doorstep. Because you
                deserve wellness that is as authentic as it is effective.
              </p>
            </div>
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ ...transition.smooth, delay: 0.3 }}
              className="mt-8 flex gap-10"
            >
              {stats.map((stat) => (
                <div key={stat.label}>
                  <p className="font-serif text-3xl font-bold text-primary">{stat.value}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
