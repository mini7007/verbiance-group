'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { fadeUp, staggerContainer, transition } from '@/lib/motion'

const partners = [
  { name: 'Organic India', initials: 'OI' },
  { name: 'Nature Basket', initials: 'NB' },
  { name: 'BigBasket', initials: 'BB' },
  { name: 'Amazon Fresh', initials: 'AF' },
  { name: 'Flipkart Grocery', initials: 'FK' },
  { name: 'Whole Foods', initials: 'WF' },
  { name: 'Reliance Fresh', initials: 'RF' },
  { name: 'DMart', initials: 'DM' },
]

export function PartnerLogos() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <section className="bg-card py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={fadeUp}
          transition={transition.smooth}
          className="mb-12 text-center lg:mb-16"
        >
          <p className="mb-3 text-xs font-semibold tracking-[0.2em] uppercase text-accent">
            Trusted partners
          </p>
          <h2 className="font-serif text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl text-balance">
            Find Us At
          </h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={staggerContainer}
          className="grid grid-cols-2 gap-6 sm:grid-cols-4 lg:gap-8"
        >
          {partners.map((partner) => (
            <motion.div
              key={partner.name}
              variants={fadeUp}
              transition={transition.smooth}
              whileHover={prefersReducedMotion ? {} : { y: -4 }}
              className="group flex flex-col items-center justify-center rounded-xl border border-border bg-background p-8 transition-all duration-300 hover:border-primary/30 hover:shadow-lg lg:p-10"
            >
              {/* Logo placeholder as styled initials */}
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full border-2 border-border bg-secondary text-xl font-bold text-muted-foreground grayscale transition-all duration-500 group-hover:border-primary/40 group-hover:text-primary group-hover:grayscale-0">
                {partner.initials}
              </div>
              <p className="text-sm font-medium text-muted-foreground transition-colors duration-300 group-hover:text-foreground">
                {partner.name}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
