'use client'

import Link from 'next/link'
import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { toast } from 'sonner'
import { fadeUp, staggerContainerSlow, transition } from '@/lib/motion'

const footerLinks = {
  shop: [
    { label: 'All Products', href: '#shop' },
    { label: 'Skincare', href: '#shop' },
    { label: 'Wellness', href: '#shop' },
    { label: 'Superfoods', href: '#shop' },
    { label: 'Aromatherapy', href: '#shop' },
  ],
  company: [
    { label: 'Our Story', href: '#about' },
    { label: 'Blog', href: '#blog' },
    { label: 'Sustainability', href: '#' },
    { label: 'Careers', href: '#' },
  ],
  support: [
    { label: 'Contact Us', href: '#contact' },
    { label: 'FAQs', href: '#' },
    { label: 'Shipping Policy', href: '#' },
    { label: 'Return Policy', href: '#' },
    { label: 'Privacy Policy', href: '#' },
  ],
}

export function SiteFooter() {
  const [email, setEmail] = useState('')
  const prefersReducedMotion = useReducedMotion()

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      toast.success('Thank you for subscribing!')
      setEmail('')
    }
  }

  return (
    <footer id="contact" className="border-t border-border bg-foreground text-primary-foreground">
      <div className="mx-auto max-w-7xl px-4 py-16 lg:px-8 lg:py-20">
        <motion.div
          variants={staggerContainerSlow}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid gap-10 md:grid-cols-2 lg:grid-cols-5"
        >
          {/* Brand */}
          <motion.div variants={fadeUp} transition={transition.smooth} className="lg:col-span-2">
            <Link href="/" className="inline-block">
              <span className="font-serif text-2xl font-bold">Valley Culture</span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-primary-foreground/60">
              Handcrafted organic wellness products sourced from the pristine
              valleys of India. Pure, natural, and delivered with love.
            </p>

            {/* Newsletter */}
            <form onSubmit={handleSubscribe} className="mt-6">
              <p className="mb-3 text-sm font-medium">
                Join our newsletter
              </p>
              <div className="flex max-w-sm">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  required
                  className="flex-1 rounded-l-lg border-0 bg-primary-foreground/10 px-4 py-2.5 text-sm text-primary-foreground placeholder:text-primary-foreground/40 focus:outline-none focus:ring-2 focus:ring-accent"
                />
                <motion.button
                  whileHover={prefersReducedMotion ? {} : { scale: 1.03 }}
                  whileTap={prefersReducedMotion ? {} : { scale: 0.97 }}
                  type="submit"
                  className="rounded-r-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/80"
                >
                  Subscribe
                </motion.button>
              </div>
            </form>

            {/* Social */}
            <div className="mt-6 flex gap-4">
              {['Instagram', 'Facebook', 'Twitter'].map((social) => (
                <motion.a
                  key={social}
                  href="#"
                  aria-label={social}
                  whileHover={prefersReducedMotion ? {} : { scale: 1.1, y: -2 }}
                  whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-foreground/10 text-xs font-bold text-primary-foreground/70 transition-colors hover:bg-primary hover:text-primary-foreground"
                >
                  {social[0]}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Links */}
          <motion.div variants={fadeUp} transition={transition.smooth}>
            <h4 className="mb-4 text-sm font-semibold tracking-wider uppercase">
              Shop
            </h4>
            <ul className="space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-primary-foreground/60 transition-colors duration-200 hover:text-primary-foreground"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
          <motion.div variants={fadeUp} transition={transition.smooth}>
            <h4 className="mb-4 text-sm font-semibold tracking-wider uppercase">
              Company
            </h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-primary-foreground/60 transition-colors duration-200 hover:text-primary-foreground"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
          <motion.div variants={fadeUp} transition={transition.smooth}>
            <h4 className="mb-4 text-sm font-semibold tracking-wider uppercase">
              Support
            </h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-primary-foreground/60 transition-colors duration-200 hover:text-primary-foreground"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ ...transition.smooth, delay: 0.3 }}
          className="mt-12 border-t border-primary-foreground/10 pt-8"
        >
          <p className="text-center text-xs text-primary-foreground/40">
            {'2026 Valley Culture. All rights reserved. Crafted with care in India.'}
          </p>
        </motion.div>
      </div>
    </footer>
  )
}
