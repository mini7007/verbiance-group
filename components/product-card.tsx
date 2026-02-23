'use client'

import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import { ShoppingBag } from 'lucide-react'
import { toast } from 'sonner'
import { useCartStore } from '@/lib/cart-store'
import { type Product, formatPrice } from '@/lib/products'
import { fadeUp, transition } from '@/lib/motion'

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
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      transition={{ ...transition.smooth, delay: index * 0.1 }}
      whileHover={prefersReducedMotion ? {} : { y: -6 }}
      className="group"
    >
      <div className="relative mb-4 overflow-hidden rounded-lg bg-secondary/50 shadow-sm transition-shadow duration-500 group-hover:shadow-xl group-hover:shadow-foreground/5">
        {product.badge && (
          <span className="absolute left-3 top-3 z-10 rounded-full bg-primary px-3 py-1 text-[11px] font-semibold tracking-wide text-primary-foreground uppercase">
            {product.badge}
          </span>
        )}
        <div className="aspect-square overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            width={500}
            height={500}
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        </div>
        <motion.button
          onClick={handleAddToCart}
          whileHover={prefersReducedMotion ? {} : { scale: 1.03 }}
          whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
          className="absolute bottom-3 right-3 flex items-center gap-2 rounded-full bg-primary px-4 py-2.5 text-xs font-semibold text-primary-foreground opacity-0 shadow-lg transition-all duration-300 group-hover:opacity-100"
          aria-label={`Add ${product.name} to cart`}
        >
          <ShoppingBag className="h-3.5 w-3.5" />
          Add to Cart
        </motion.button>
      </div>

      <div className="space-y-1.5 px-1">
        <p className="text-xs font-medium tracking-wider text-muted-foreground uppercase">
          {product.category}
        </p>
        <h3 className="font-serif text-lg font-semibold text-foreground transition-colors duration-300 group-hover:text-primary">
          {product.name}
        </h3>
        <p className="text-sm leading-relaxed text-muted-foreground line-clamp-2">
          {product.description}
        </p>
        <div className="flex items-center gap-2 pt-1">
          <span className="text-lg font-bold text-foreground">
            {formatPrice(product.price)}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-muted-foreground line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  )
}
