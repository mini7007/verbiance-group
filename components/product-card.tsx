'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import { ShoppingBag } from 'lucide-react'
import { toast } from 'sonner'
import { useCartStore } from '@/lib/cart-store'
import { type Product, formatPrice } from '@/lib/products'
import { fadeUp, transition } from '@/lib/motion'

const badgeStyles: Record<string, string> = {
  'Best Seller': 'bg-primary text-primary-foreground',
  New: 'bg-accent text-accent-foreground',
}

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const addItem = useCartStore((s) => s.addItem)
  const prefersReducedMotion = useReducedMotion()

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    })
    toast.success(`${product.name} added to cart`)
  }

  return (
    <motion.article
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      transition={{ ...transition.smooth, delay: index * 0.08 }}
      whileHover={prefersReducedMotion ? {} : { y: -7 }}
      className="group"
    >
      <div className="relative mb-4 overflow-hidden rounded-2xl border border-border/70 bg-card shadow-[0_8px_20px_-14px_rgba(0,0,0,0.2)] transition-all duration-500 group-hover:-translate-y-0.5 group-hover:shadow-[0_24px_45px_-26px_rgba(0,0,0,0.35)]">
        {product.badge && (
          <span
            className={`absolute left-3 top-3 z-10 rounded-full px-3 py-1 text-[11px] font-semibold tracking-wide uppercase ${badgeStyles[product.badge] ?? 'bg-secondary text-secondary-foreground'}`}
          >
            {product.badge}
          </span>
        )}

        <Link href={`/product/${product.slug}`} className="relative block aspect-square overflow-hidden" aria-label={`View details for ${product.name}`}>
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          />
        </Link>

        <motion.button
          onClick={handleAddToCart}
          whileHover={prefersReducedMotion ? {} : { scale: 1.02 }}
          whileTap={prefersReducedMotion ? {} : { scale: 0.97 }}
          className="absolute bottom-3 right-3 inline-flex min-h-11 items-center gap-2 rounded-full bg-primary px-4 py-2.5 text-xs font-semibold tracking-wide text-primary-foreground opacity-100 shadow-lg transition-all duration-300 md:opacity-0 md:group-hover:opacity-100"
          aria-label={`Add ${product.name} to cart`}
        >
          <ShoppingBag className="h-3.5 w-3.5" />
          Add to Cart
        </motion.button>
      </div>

      <div className="space-y-2 px-1">
        <p className="text-[11px] font-semibold tracking-[0.14em] text-muted-foreground uppercase">
          {product.category}
        </p>
        <h3 className="font-serif text-xl leading-snug font-semibold text-foreground transition-colors duration-300 group-hover:text-primary">
          <Link href={`/product/${product.slug}`}>{product.name}</Link>
        </h3>
        <p className="text-sm leading-relaxed text-muted-foreground line-clamp-2">{product.description}</p>
        <div className="flex items-baseline gap-2 pt-0.5">
          <span className="text-xl font-bold tracking-tight text-foreground">{formatPrice(product.price)}</span>
          {product.originalPrice && (
            <span className="text-sm font-medium text-muted-foreground/80 line-through">{formatPrice(product.originalPrice)}</span>
          )}
        </div>
      </div>
    </motion.article>
  )
}
