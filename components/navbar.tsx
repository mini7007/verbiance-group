'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import { Search, User, ShoppingBag, Menu, X, ChevronDown } from 'lucide-react'
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

  useEffect(() => setMounted(true), [])

  useEffect(() => {
    const handleClick = () => setActiveMega(null)
    if (activeMega) {
      document.addEventListener('click', handleClick)
      return () => document.removeEventListener('click', handleClick)
    }
  }, [activeMega])

  const handleMouseEnter = useCallback((label: string, hasMega: boolean) => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current)
    if (hasMega) hoverTimeoutRef.current = setTimeout(() => setActiveMega(label), 70)
  }, [])

  const handleMouseLeave = useCallback(() => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current)
    hoverTimeoutRef.current = setTimeout(() => setActiveMega(null), 150)
  }, [])

  const handleKeyDown = useCallback((e: React.KeyboardEvent, label: string, hasMega: boolean) => {
    if (!hasMega) return
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      setActiveMega((prev) => (prev === label ? null : label))
    }
    if (e.key === 'Escape') setActiveMega(null)
  }, [])

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/95 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6 lg:px-8">
        <Link href="/" className="flex-shrink-0">
          <span className="font-serif text-xl font-bold tracking-tight text-primary sm:text-2xl">Verbiance Group</span>
        </Link>

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
                aria-haspopup={link.megaMenu ? 'menu' : undefined}
                tabIndex={0}
                onKeyDown={(e) => handleKeyDown(e, link.label, !!link.megaMenu)}
                onClick={(e) => {
                  if (!link.megaMenu) return
                  e.preventDefault()
                  e.stopPropagation()
                  setActiveMega((prev) => (prev === link.label ? null : link.label))
                }}
                className="group relative flex min-h-10 items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium tracking-wide text-foreground/75 transition-all duration-200 hover:bg-secondary/80 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/25"
              >
                {link.label}
                {link.megaMenu && (
                  <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${activeMega === link.label ? 'rotate-180' : ''}`} />
                )}
              </a>

              <AnimatePresence>
                {link.megaMenu && activeMega === link.label && (
                  <motion.div
                    initial={prefersReducedMotion ? false : { opacity: 0, y: 10, scale: 0.985 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 8, scale: 0.99 }}
                    transition={{ duration: 0.22, ease: ease.out }}
                    className="absolute left-1/2 top-full z-50 mt-2 w-[620px] -translate-x-1/2 rounded-2xl border border-border/80 bg-card/95 p-6 shadow-[0_24px_60px_-30px_rgba(0,0,0,0.35)] backdrop-blur-sm"
                    onClick={(e) => e.stopPropagation()}
                    onMouseEnter={() => hoverTimeoutRef.current && clearTimeout(hoverTimeoutRef.current)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <div className="grid grid-cols-3 gap-6">
                      {link.megaMenu.map((column) => (
                        <div key={column.heading}>
                          <p className="mb-3 text-[11px] font-bold tracking-[0.15em] uppercase text-muted-foreground">{column.heading}</p>
                          <ul className="flex flex-col gap-1.5" role="menu">
                            {column.links.map((item) => (
                              <li key={item.label} role="none">
                                <a
                                  href={item.href}
                                  className="flex min-h-9 items-center rounded-md px-2.5 py-1.5 text-sm text-foreground/75 transition-colors duration-150 hover:bg-secondary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/25"
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

        <div className="flex items-center gap-2 sm:gap-3">
          <button aria-label="Search" className="rounded-full p-2.5 text-foreground/70 transition-colors hover:bg-secondary hover:text-primary">
            <Search className="h-5 w-5" />
          </button>

          <button aria-label="Account" className="hidden rounded-full p-2.5 text-foreground/70 transition-colors hover:bg-secondary hover:text-primary sm:flex">
            <User className="h-5 w-5" />
          </button>

          <button onClick={openCart} aria-label="Cart" className="relative rounded-full p-2.5 text-foreground/70 transition-colors hover:bg-secondary hover:text-primary">
            <ShoppingBag className="h-5 w-5" />
            {mounted && totalItems() > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold text-primary-foreground">
                {totalItems()}
              </span>
            )}
          </button>

          <button onClick={() => setMobileOpen((prev) => !prev)} aria-label="Toggle menu" className="rounded-full p-2.5 text-foreground/70 transition-colors hover:bg-secondary md:hidden">
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={prefersReducedMotion ? false : { height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
            transition={{ duration: 0.24, ease: ease.out }}
            className="overflow-hidden border-t border-border/60 bg-background md:hidden"
          >
            <div className="space-y-1 px-4 py-4">
              {navLinks.map((link) => {
                const expanded = mobileExpanded === link.label
                return (
                  <div key={link.label}>
                    <button
                      onClick={() => {
                        if (link.megaMenu) {
                          setMobileExpanded(expanded ? null : link.label)
                          return
                        }
                        setMobileOpen(false)
                        window.location.href = link.href
                      }}
                      className="flex min-h-11 w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm font-medium text-foreground/80 transition-colors hover:bg-secondary hover:text-primary"
                    >
                      <span>{link.label}</span>
                      {link.megaMenu && <ChevronDown className={`h-4 w-4 transition-transform ${expanded ? 'rotate-180' : ''}`} />}
                    </button>
                    {link.megaMenu && expanded && (
                      <div className="mt-1 space-y-1 rounded-lg bg-secondary/55 p-2">
                        {link.megaMenu.flatMap((column) => column.links).map((item) => (
                          <a key={item.label} href={item.href} className="flex min-h-10 items-center rounded-md px-3 text-sm text-foreground/75 hover:bg-background hover:text-primary">
                            {item.label}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
