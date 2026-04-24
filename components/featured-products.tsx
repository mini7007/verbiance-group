'use client'

import { motion } from 'framer-motion'
import { type Product, products as fallbackProducts } from '@/lib/products'
import { ProductCard } from './product-card'
import { fadeUp, staggerContainer, transition } from '@/lib/motion'

type FeaturedProductsProps = {
  eyebrow?: string
  title?: string
  description?: string
  products?: Product[]
}

const sectionDefaults = {
  eyebrow: 'Our Collection',
  title: 'Handpicked for Your Wellness',
  description: 'Each product is carefully sourced and crafted to bring you the purest nature has to offer.',
}

export function FeaturedProducts({ eyebrow, title, description, products }: FeaturedProductsProps) {
  const featuredProducts = products?.length ? products : fallbackProducts

  return (
    <section id="shop" className="bg-background py-16 sm:py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={transition.smooth}
          className="mb-12 text-center sm:mb-14"
        >
          <p className="mb-3 text-sm font-semibold tracking-[0.2em] uppercase text-primary">
            {eyebrow || sectionDefaults.eyebrow}
          </p>
          <h2 className="mx-auto max-w-xl font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            {title || sectionDefaults.title}
          </h2>
          <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-muted-foreground">
            {description || sectionDefaults.description}
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-1 gap-7 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3"
        >
          {featuredProducts.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
