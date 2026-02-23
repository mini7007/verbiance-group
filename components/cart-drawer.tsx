'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react'
import { useCartStore } from '@/lib/cart-store'
import { formatPrice } from '@/lib/products'
import { fadeUp, transition } from '@/lib/motion'

export function CartDrawer() {
  const { items, isOpen, closeCart, updateQuantity, removeItem, totalPrice } =
    useCartStore()
  const prefersReducedMotion = useReducedMotion()

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeCart}
            className="fixed inset-0 z-[60] bg-foreground/40 backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={transition.spring}
            className="fixed right-0 top-0 z-[70] flex h-full w-full max-w-md flex-col bg-background shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border px-6 py-5">
              <div className="flex items-center gap-2">
                <ShoppingBag className="h-5 w-5 text-primary" />
                <h2 className="font-serif text-xl font-bold text-foreground">
                  Your Cart
                </h2>
                <span className="rounded-full bg-primary px-2 py-0.5 text-xs font-bold text-primary-foreground">
                  {items.length}
                </span>
              </div>
              <motion.button
                whileHover={prefersReducedMotion ? {} : { scale: 1.1 }}
                whileTap={prefersReducedMotion ? {} : { scale: 0.9 }}
                onClick={closeCart}
                className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                aria-label="Close cart"
              >
                <X className="h-5 w-5" />
              </motion.button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {items.length === 0 ? (
                <motion.div
                  variants={fadeUp}
                  initial="hidden"
                  animate="visible"
                  transition={transition.smooth}
                  className="flex h-full flex-col items-center justify-center gap-4 text-center"
                >
                  <motion.div
                    animate={prefersReducedMotion ? {} : { scale: [1, 1.05, 1] }}
                    transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
                    className="rounded-full bg-secondary p-6"
                  >
                    <ShoppingBag className="h-8 w-8 text-muted-foreground" />
                  </motion.div>
                  <p className="font-serif text-lg font-semibold text-foreground">
                    Your cart is empty
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Explore our collection and add items you love.
                  </p>
                  <motion.button
                    whileHover={prefersReducedMotion ? {} : { scale: 1.03 }}
                    whileTap={prefersReducedMotion ? {} : { scale: 0.97 }}
                    onClick={closeCart}
                    className="mt-2 rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
                  >
                    Continue Shopping
                  </motion.button>
                </motion.div>
              ) : (
                <AnimatePresence mode="popLayout">
                  <div className="space-y-4">
                    {items.map((item) => (
                      <motion.div
                        key={item.id}
                        layout
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -30, height: 0, marginBottom: 0 }}
                        transition={transition.smooth}
                        className="flex gap-4 rounded-lg border border-border/50 bg-card p-3"
                      >
                        <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md">
                          <Image
                            src={item.image}
                            alt={item.name}
                            width={80}
                            height={80}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="flex flex-1 flex-col justify-between">
                          <div>
                            <h3 className="text-sm font-semibold text-foreground">
                              {item.name}
                            </h3>
                            <p className="text-sm font-bold text-primary">
                              {formatPrice(item.price)}
                            </p>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <motion.button
                                whileTap={prefersReducedMotion ? {} : { scale: 0.85 }}
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity - 1)
                                }
                                className="flex h-7 w-7 items-center justify-center rounded-full border border-border transition-colors hover:bg-secondary"
                                aria-label="Decrease quantity"
                              >
                                <Minus className="h-3 w-3" />
                              </motion.button>
                              <motion.span
                                key={item.quantity}
                                initial={prefersReducedMotion ? {} : { scale: 1.3 }}
                                animate={{ scale: 1 }}
                                className="w-5 text-center text-sm font-semibold"
                              >
                                {item.quantity}
                              </motion.span>
                              <motion.button
                                whileTap={prefersReducedMotion ? {} : { scale: 0.85 }}
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity + 1)
                                }
                                className="flex h-7 w-7 items-center justify-center rounded-full border border-border transition-colors hover:bg-secondary"
                                aria-label="Increase quantity"
                              >
                                <Plus className="h-3 w-3" />
                              </motion.button>
                            </div>
                            <motion.button
                              whileHover={prefersReducedMotion ? {} : { scale: 1.1 }}
                              whileTap={prefersReducedMotion ? {} : { scale: 0.9 }}
                              onClick={() => removeItem(item.id)}
                              className="rounded-full p-1.5 text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                              aria-label={`Remove ${item.name}`}
                            >
                              <Trash2 className="h-4 w-4" />
                            </motion.button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </AnimatePresence>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...transition.smooth, delay: 0.1 }}
                className="border-t border-border px-6 py-5"
              >
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-sm font-medium text-muted-foreground">
                    Subtotal
                  </span>
                  <span className="text-lg font-bold text-foreground">
                    {formatPrice(totalPrice())}
                  </span>
                </div>
                <p className="mb-4 text-xs text-muted-foreground">
                  Shipping and taxes calculated at checkout.
                </p>
                <motion.div whileHover={prefersReducedMotion ? {} : { scale: 1.01 }} whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}>
                  <Link
                    href="/checkout"
                    onClick={closeCart}
                    className="block w-full rounded-full bg-primary py-3.5 text-center text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
                  >
                    Proceed to Checkout
                  </Link>
                </motion.div>
                <button
                  onClick={closeCart}
                  className="mt-3 block w-full rounded-full border border-border py-3 text-center text-sm font-medium text-foreground transition-colors hover:bg-secondary"
                >
                  Continue Shopping
                </button>
              </motion.div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
