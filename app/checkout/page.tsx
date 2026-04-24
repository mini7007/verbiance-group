'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowLeft, CheckCircle2, ShoppingBag } from 'lucide-react'
import { toast } from 'sonner'
import { useCartStore } from '@/lib/cart-store'
import { formatPrice } from '@/lib/products'

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '919999999999'

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCartStore()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const [form, setForm] = useState({
    fullName: '',
    phone: '',
    address: '',
    notes: '',
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    const orderTotal = totalPrice()
    const productLines = items
      .map(
        (item, index) =>
          `${index + 1}. ${item.name} x${item.quantity} - ${formatPrice(item.price * item.quantity)}`
      )
      .join('\n')

    const message = [
      '🛍️ *New Order Request*',
      '',
      '*Products:*',
      productLines,
      '',
      `*Total:* ${formatPrice(orderTotal)}`,
      '',
      '*Customer Details:*',
      `Name: ${form.fullName}`,
      `Phone: ${form.phone}`,
      `Address: ${form.address}`,
      form.notes ? `Notes: ${form.notes}` : '',
    ]
      .filter(Boolean)
      .join('\n')

    const encodedMessage = encodeURIComponent(message)
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`

    setIsSuccess(true)
    toast.success('Redirecting to WhatsApp...')

    setTimeout(() => {
      clearCart()
      window.location.href = whatsappUrl
    }, 1400)
  }

  if (isSuccess) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative max-w-md overflow-hidden rounded-2xl border border-border bg-card p-8 text-center shadow-sm"
        >
          <motion.div
            className="pointer-events-none absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {[...Array(7)].map((_, i) => (
              <motion.span
                // eslint-disable-next-line react/no-array-index-key
                key={i}
                className="absolute h-2.5 w-2.5 rounded-full bg-primary/40"
                style={{ left: `${15 + i * 11}%`, top: `${20 + (i % 2) * 35}%` }}
                initial={{ scale: 0, y: 10, opacity: 0 }}
                animate={{
                  scale: [0, 1, 0.7],
                  y: [10, -14, -4],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 1,
                  delay: 0.2 + i * 0.08,
                  ease: 'easeOut',
                }}
              />
            ))}
          </motion.div>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', delay: 0.2 }}
            className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10"
          >
            <CheckCircle2 className="h-10 w-10 text-primary" />
          </motion.div>
          <h1 className="mb-3 font-serif text-3xl font-bold text-foreground">
            Order Confirmed!
          </h1>
          <p className="mb-8 text-muted-foreground">
            Order details are ready. Opening WhatsApp so you can send your order
            in one tap.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </motion.div>
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-4">
        <div className="max-w-md text-center">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-secondary">
            <ShoppingBag className="h-10 w-10 text-muted-foreground" />
          </div>
          <h1 className="mb-3 font-serif text-3xl font-bold text-foreground">
            Cart is Empty
          </h1>
          <p className="mb-8 text-muted-foreground">
            Add some products to your cart before checking out.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            <ArrowLeft className="h-4 w-4" />
            Browse Products
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-6xl px-4 py-8 lg:px-8 lg:py-12">
        {/* Back link */}
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Shop
        </Link>

        <h1 className="mb-10 font-serif text-3xl font-bold text-foreground sm:text-4xl">
          Checkout
        </h1>

        <div className="grid gap-10 lg:grid-cols-5">
          {/* Form */}
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            onSubmit={handleSubmit}
            className="lg:col-span-3"
          >
            <div className="space-y-6 rounded-lg border border-border bg-card p-6 shadow-sm sm:p-8">
              <h2 className="font-serif text-xl font-bold text-foreground">
                Delivery Details
              </h2>

              <div className="grid gap-5 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label
                    htmlFor="fullName"
                    className="mb-1.5 block text-sm font-medium text-foreground"
                  >
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={form.fullName}
                    onChange={handleChange}
                    required
                    className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="mb-1.5 block text-sm font-medium text-foreground"
                  >
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    required
                    className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                    placeholder="+91 XXXXX XXXXX"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="address"
                    className="mb-1.5 block text-sm font-medium text-foreground"
                  >
                    Delivery Address *
                  </label>
                  <textarea
                    id="address"
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    required
                    rows={3}
                    className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                    placeholder="Full delivery address with PIN code"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="notes"
                    className="mb-1.5 block text-sm font-medium text-foreground"
                  >
                    Order Notes (optional)
                  </label>
                  <textarea
                    id="notes"
                    name="notes"
                    value={form.notes}
                    onChange={handleChange}
                    rows={2}
                    className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                    placeholder="Any special instructions..."
                  />
                </div>
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className="w-full rounded-full bg-primary py-3.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isSubmitting ? 'Processing Order...' : 'Place Order'}
              </motion.button>
            </div>
          </motion.form>

          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-2"
          >
            <div className="sticky top-8 rounded-lg border border-border bg-card p-6 shadow-sm sm:p-8">
              <h2 className="mb-6 font-serif text-xl font-bold text-foreground">
                Order Summary
              </h2>

              <div className="mb-6 space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md">
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={64}
                        height={64}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex flex-1 flex-col justify-between">
                      <div>
                        <p className="text-sm font-semibold text-foreground">
                          {item.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {'Qty: '}{item.quantity}
                        </p>
                      </div>
                      <p className="text-sm font-bold text-foreground">
                        {formatPrice(item.price * item.quantity)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-3 border-t border-border pt-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium text-foreground">
                    {formatPrice(totalPrice())}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="font-medium text-primary">Free</span>
                </div>
                <div className="flex justify-between border-t border-border pt-3">
                  <span className="font-semibold text-foreground">Total</span>
                  <span className="text-lg font-bold text-foreground">
                    {formatPrice(totalPrice())}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
