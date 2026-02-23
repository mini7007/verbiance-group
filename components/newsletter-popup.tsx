'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Check, Loader2, X } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ease } from '@/lib/motion'

const DISMISS_KEY = 'valley-culture-newsletter-dismissed'

type FormState = {
  name: string
  email: string
  phone: string
}

const initialForm: FormState = {
  name: '',
  email: '',
  phone: '',
}

type SubmitState = 'idle' | 'submitting' | 'success'

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function NewsletterPopup() {
  const prefersReducedMotion = useReducedMotion()
  const [mounted, setMounted] = useState(false)
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState<FormState>(initialForm)
  const [submitState, setSubmitState] = useState<SubmitState>('idle')
  const [error, setError] = useState<string | null>(null)
  const startTimeRef = useRef<number>(0)
  const openTriggeredRef = useRef(false)
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const containerVariants = useMemo(
    () => ({
      hidden: prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.96 },
      visible: prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 },
      exit: prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.98 },
    }),
    [prefersReducedMotion],
  )

  const markDismissed = useCallback(() => {
    localStorage.setItem(DISMISS_KEY, 'true')
  }, [])

  const handleClose = useCallback(() => {
    setOpen(false)
    markDismissed()
  }, [markDismissed])

  const scheduleOpen = useCallback(() => {
    if (openTriggeredRef.current) {
      return
    }

    openTriggeredRef.current = true
    const elapsed = Date.now() - startTimeRef.current
    const minSessionMs = 5000

    const openPopup = () => {
      const dismissed = localStorage.getItem(DISMISS_KEY) === 'true'
      if (!dismissed) {
        setOpen(true)
      }
    }

    if (elapsed < minSessionMs) {
      window.setTimeout(openPopup, minSessionMs - elapsed)
      return
    }

    openPopup()
  }, [])

  useEffect(() => {
    setMounted(true)
    startTimeRef.current = Date.now()
  }, [])

  useEffect(() => {
    if (!mounted) {
      return
    }

    const dismissed = localStorage.getItem(DISMISS_KEY) === 'true'
    if (dismissed) {
      return
    }

    const timeoutId = window.setTimeout(scheduleOpen, 6000)

    const onScroll = () => {
      const scrollTop = window.scrollY
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      if (maxScroll <= 0) {
        return
      }

      const progress = scrollTop / maxScroll
      if (progress >= 0.4) {
        scheduleOpen()
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      window.clearTimeout(timeoutId)
      window.removeEventListener('scroll', onScroll)
    }
  }, [mounted, scheduleOpen])

  useEffect(() => {
    if (submitState !== 'success') {
      return
    }

    closeTimerRef.current = window.setTimeout(() => {
      setOpen(false)
      markDismissed()
    }, 2500)

    return () => {
      if (closeTimerRef.current) {
        window.clearTimeout(closeTimerRef.current)
      }
    }
  }, [markDismissed, submitState])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (submitState === 'submitting') {
      return
    }

    if (!emailRegex.test(form.email.trim())) {
      setError('Please enter a valid email address.')
      return
    }

    setError(null)
    setSubmitState('submitting')

    await new Promise((resolve) => {
      window.setTimeout(resolve, 1200)
    })

    setSubmitState('success')
    setForm(initialForm)
  }

  if (!mounted) {
    return null
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: prefersReducedMotion ? 0.15 : 0.22, ease: ease.out }}
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/25 px-3 pb-[calc(env(safe-area-inset-bottom)+0.75rem)] backdrop-blur-sm sm:items-center sm:px-6 sm:pb-6"
          aria-live="polite"
        >
          <motion.section
            role="dialog"
            aria-modal="true"
            aria-label="Newsletter signup"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: prefersReducedMotion ? 0.16 : 0.26, ease: ease.out }}
            className="relative w-full max-w-lg rounded-3xl border border-white/40 bg-gradient-to-b from-[#fffdf9] to-[#f9f3ea] p-5 pt-8 shadow-2xl shadow-black/10 sm:p-8"
          >
            <button
              type="button"
              onClick={handleClose}
              aria-label="Close newsletter popup"
              className="absolute right-3 top-3 inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#d9cebf] bg-white/90 text-[#6a5e4d] transition-colors hover:bg-white sm:right-4 sm:top-4"
            >
              <X className="h-5 w-5" />
            </button>

            <AnimatePresence mode="wait">
              {submitState === 'success' ? (
                <motion.div
                  key="success"
                  initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.98, y: 10 }}
                  animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: prefersReducedMotion ? 0.16 : 0.24, ease: ease.out }}
                  className="flex min-h-56 flex-col items-center justify-center gap-4 text-center"
                >
                  <motion.span
                    initial={prefersReducedMotion ? { opacity: 1 } : { scale: 0.8, opacity: 0 }}
                    animate={prefersReducedMotion ? { opacity: 1 } : { scale: 1, opacity: 1 }}
                    transition={{ duration: prefersReducedMotion ? 0.01 : 0.32, ease: ease.out }}
                    className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-[#2d5a3d]/10"
                  >
                    <Check className="h-8 w-8 text-[#2d5a3d]" />
                  </motion.span>
                  <div className="space-y-2">
                    <h3 className="font-serif text-2xl text-[#2d5a3d]">You&apos;re in! Welcome to Valley Culture.</h3>
                    <p className="text-sm text-[#6d6458]">We&apos;ll send curated wellness drops and thoughtful offers.</p>
                  </div>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-4"
                >
                  <div className="space-y-2 pr-8 sm:pr-10">
                    <p className="text-xs font-medium uppercase tracking-[0.24em] text-[#8f806b]">Exclusive Access</p>
                    <h3 className="font-serif text-3xl leading-tight text-[#2d5a3d]">Join our inner circle.</h3>
                    <p className="text-sm text-[#6d6458]">Early product releases, ritual guides, and member-only offers.</p>
                  </div>

                  <div className="space-y-3">
                    <Input
                      type="text"
                      placeholder="Name (optional)"
                      value={form.name}
                      onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
                      className="h-11 rounded-xl border-[#d9cebf] bg-white/80"
                      autoComplete="name"
                    />
                    <Input
                      type="email"
                      placeholder="Email address"
                      value={form.email}
                      onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
                      className="h-11 rounded-xl border-[#d9cebf] bg-white/80"
                      autoComplete="email"
                      required
                    />
                    <Input
                      type="tel"
                      placeholder="Phone (optional)"
                      value={form.phone}
                      onChange={(event) => setForm((prev) => ({ ...prev, phone: event.target.value }))}
                      className="h-11 rounded-xl border-[#d9cebf] bg-white/80"
                      autoComplete="tel"
                    />
                  </div>

                  {error ? <p className="text-sm text-[#b54a32]">{error}</p> : null}

                  <Button
                    type="submit"
                    disabled={submitState === 'submitting'}
                    className="h-11 w-full rounded-xl bg-[#2d5a3d] text-sm tracking-wide text-white hover:bg-[#224731]"
                  >
                    {submitState === 'submitting' ? (
                      <span className="inline-flex items-center gap-2">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Joining...
                      </span>
                    ) : (
                      'Get updates'
                    )}
                  </Button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.section>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
