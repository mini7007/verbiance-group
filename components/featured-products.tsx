'use client'

import { motion } from 'framer-motion'
import { products } from '@/lib/products'
import { ProductCard } from './product-card'
import { fadeUp, staggerContainer, transition } from '@/lib/motion'

export function FeaturedProducts() {
  return (
    <section id="shop" className="bg-background py-20 lg:py-28">
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
            Our Collection
          </p>
          <h2 className="mx-auto max-w-xl font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            Handpicked for Your Wellness
          </h2>
          <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-muted-foreground">
            Each product is carefully sourced and crafted to bring you the purest
            nature has to offer.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
        >
          {products.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
