'use client'

import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { fadeUp, staggerContainer, transition } from '@/lib/motion'

const blogs = [
  {
    id: 1,
    title: 'The Art of Natural Skincare: A Complete Guide',
    excerpt:
      'Discover how organic ingredients can transform your daily skincare routine into a luxurious self-care ritual.',
    image: '/images/blog-1.jpg',
    date: 'Jan 15, 2026',
    category: 'Skincare',
  },
  {
    id: 2,
    title: 'Herbal Teas for Every Season',
    excerpt:
      'From cooling summer blends to warming winter infusions, explore the world of Himalayan herbal teas.',
    image: '/images/blog-2.jpg',
    date: 'Jan 8, 2026',
    category: 'Wellness',
  },
  {
    id: 3,
    title: 'Turmeric: The Golden Spice of Life',
    excerpt:
      'Unlock the ancient secrets of turmeric and learn why Lakadong variety is the gold standard in wellness.',
    image: '/images/blog-3.jpg',
    date: 'Dec 28, 2025',
    category: 'Superfoods',
  },
]

export function BlogPreview() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <section id="blog" className="bg-secondary py-20 lg:py-28">
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
            From Our Journal
          </p>
          <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            Stories & Insights
          </h2>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid gap-8 md:grid-cols-3"
        >
          {blogs.map((blog) => (
            <motion.article
              key={blog.id}
              variants={fadeUp}
              transition={transition.smooth}
              whileHover={prefersReducedMotion ? {} : { y: -6 }}
              className="group cursor-pointer overflow-hidden rounded-lg bg-card shadow-sm transition-shadow duration-500 hover:shadow-xl hover:shadow-foreground/5"
            >
              <div className="aspect-[16/10] overflow-hidden">
                <Image
                  src={blog.image}
                  alt={blog.title}
                  width={600}
                  height={375}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <div className="mb-3 flex items-center gap-3">
                  <span className="text-xs font-semibold tracking-wider text-primary uppercase">
                    {blog.category}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {blog.date}
                  </span>
                </div>
                <h3 className="mb-2 font-serif text-lg font-semibold text-foreground transition-colors duration-300 group-hover:text-primary">
                  {blog.title}
                </h3>
                <p className="mb-4 text-sm leading-relaxed text-muted-foreground line-clamp-2">
                  {blog.excerpt}
                </p>
                <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-all duration-300 group-hover:gap-2.5">
                  Read More
                  <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
