'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import { Search, User, ShoppingBag, Menu, X, ChevronDown, ChevronRight } from 'lucide-react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { useCartStore } from '@/lib/cart-store'
import { ease } from '@/lib/motion'

interface MegaMenuColumn {
  heading: string
  links: { label: string; href: string }[]
}

interface NavItem {
  href: string
  label: string
  megaMenu?: MegaMenuColumn[]
}

const navLinks: NavItem[] = [
  { href: '#home', label: 'Home' },
  {
    href: '#shop',
    label: 'Shop',
    megaMenu: [
      {
        heading: 'By Category',
        links: [
          { label: 'Ghee', href: '#' },
          { label: 'Honey', href: '#' },
          { label: 'Spices', href: '#' },
          { label: 'Pulses & Grains', href: '#' },
        ],
      },
      {
        heading: 'Healthy Staples',
        links: [
          { label: 'Millets', href: '#' },
          { label: 'Flour', href: '#' },
          { label: 'Tea', href: '#' },
          { label: 'Superfoods', href: '#' },
        ],
      },
      {
        heading: 'Wellness',
        links: [
          { label: 'Essential Oils', href: '#' },
          { label: 'Skincare', href: '#' },
          { label: 'Supplements', href: '#' },
          { label: 'All Products', href: '#' },
        ],
      },
    ],
  },
  { href: '#about', label: 'About' },
  { href: '#blog', label: 'Blog' },
  { href: '#contact', label: 'Contact' },


]



export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [activeMega, setActiveMega] = useState<string | null>(null)
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null)
  const totalItems = useCartStore((s) => s.totalItems)
  const openCart = useCartStore((s) => s.openCart)
  const prefersReducedMotion = useReducedMotion()
  const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Close mega menu on outside click
  useEffect(() => {
    const handleClick = () => setActiveMega(null)
    if (activeMega) {
      document.addEventListener('click', handleClick)
      return () => document.removeEventListener('click', handleClick)
    }
  }, [activeMega])

  const handleMouseEnter = useCallback(
    (label: string, hasMega: boolean) => {
      if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current)
      if (hasMega) {
        hoverTimeoutRef.current = setTimeout(() => setActiveMega(label), 80)
      }
    },
    [],
  )

  const handleMouseLeave = useCallback(() => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current)
    hoverTimeoutRef.current = setTimeout(() => setActiveMega(null), 200)
  }, [])

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent, label: string, hasMega: boolean) => {
      if (hasMega && (e.key === 'Enter' || e.key === ' ')) {
        e.preventDefault()
        setActiveMega((prev) => (prev === label ? null : label))
      }
      if (e.key === 'Escape') setActiveMega(null)
    },
    [],
  )

  return (
    <motion.header
      initial={{ y: 0, opacity: 1 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: ease.out }}
      className="sticky top-0 z-50 border-b border-border/50 bg-background/95 backdrop-blur-xl"
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex-shrink-0">
          <span className="font-serif text-2xl font-bold tracking-tight text-primary">
            Valley Culture
          </span>
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <li
              key={link.href}
              className="relative"
              onMouseEnter={() => handleMouseEnter(link.label, !!link.megaMenu)}
              onMouseLeave={handleMouseLeave}
            >
              <a
                href={link.href}
                role={link.megaMenu ? 'button' : undefined}
                aria-expanded={link.megaMenu ? activeMega === link.label : undefined}
                aria-haspopup={link.megaMenu ? 'true' : undefined}
                tabIndex={0}
                onKeyDown={(e) => handleKeyDown(e, link.label, !!link.megaMenu)}
                onClick={(e) => {
                  if (link.megaMenu) {
                    e.preventDefault()
                    e.stopPropagation()
                    setActiveMega((prev) => (prev === link.label ? null : link.label))
                  }
                }}
                className="group relative flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium tracking-wide text-foreground/70 transition-colors duration-300 hover:bg-secondary hover:text-primary"
              >
                {link.label}
                {link.megaMenu && (
                  <ChevronDown
                    className={`h-3.5 w-3.5 transition-transform duration-200 ${activeMega === link.label ? 'rotate-180' : ''
                      }`}
                  />
                )}
              </a>

              {/* Mega Menu */}
              <AnimatePresence>
                {link.megaMenu && activeMega === link.label && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.2, ease: ease.out }}
                    className="absolute left-1/2 top-full z-50 mt-1 w-[560px] -translate-x-1/2 rounded-xl border border-border bg-card p-6 shadow-xl"
                    onClick={(e) => e.stopPropagation()}
                    onMouseEnter={() => {
                      if (hoverTimeoutRef.current)
                        clearTimeout(hoverTimeoutRef.current)
                    }}
                    onMouseLeave={handleMouseLeave}
                  >
                    <div className="grid grid-cols-3 gap-6">
                      {link.megaMenu.map((column) => (
                        <div key={column.heading}>
                          <p className="mb-3 text-[11px] font-bold tracking-[0.15em] uppercase text-muted-foreground">
                            {column.heading}
                          </p>
                          <ul className="flex flex-col gap-1">
                            {column.links.map((item) => (
                              <li key={item.label}>
                                <a
                                  href={item.href}
                                  className="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm text-foreground/70 transition-colors duration-150 hover:bg-secondary hover:text-primary"
                                >
                                  {item.label}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          ))}
        </ul>

        {/* Icons */}
        <div className="flex items-center gap-3">
          <button
            aria-label="Search"
            className="rounded-full p-2 text-foreground/70 transition-colors hover:bg-secondary hover:text-primary"
          >
            <Search className="h-5 w-5" />
          </button>

          <button
            aria-label="Account"
            className="hidden rounded-full p-2 text-foreground/70 transition-colors hover:bg-secondary hover:text-primary sm:flex"
          >
            <User className="h-5 w-5" />
          </button>

          <button
            onClick={openCart}
            aria-label="Cart"
            className="relative rounded-full p-2 text-foreground/70 transition-colors hover:bg-secondary hover:text-primary"
          >
            <ShoppingBag className="h-5 w-5" />
            {mounted && totalItems() > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                {totalItems()}
              </span>
            )}
          </button>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
            className="rounded-full p-2 text-foreground/70 transition-colors hover:bg-secondary md:hidden"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu stays same */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: ease.out }}
            className="overflow-hidden border-t border-border/50 bg-background md:hidden"
          >
            {/* (your existing mobile content unchanged) */}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}