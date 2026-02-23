'use client'

import { AnnouncementBar } from '@/components/announcement-bar'
import { Navbar } from '@/components/navbar'
import { HeroSection } from '@/components/hero-section'
import { CategoryCollection } from '@/components/category-collection'
import { FeaturedProducts } from '@/components/featured-products'
import { BrandStory } from '@/components/brand-story'
import { VideoReels } from '@/components/video-reels'
import { Testimonials } from '@/components/testimonials'
import { BulkCta } from '@/components/bulk-cta'
import { PartnerLogos } from '@/components/partner-logos'
import { BlogPreview } from '@/components/blog-preview'
import { SiteFooter } from '@/components/site-footer'
import { CartDrawer } from '@/components/cart-drawer'
import TrustBadges from "@/components/ui/trust-badges"

export default function Home() {
  return (
    <>
      <AnnouncementBar />
      <Navbar />
      <main>
        <HeroSection />
        <TrustBadges />
        <CategoryCollection />
        <FeaturedProducts />
        <BrandStory />
        <VideoReels />
        <Testimonials />
        <BulkCta />
        <PartnerLogos />
        <BlogPreview />
      </main>
      <SiteFooter />
      <CartDrawer />
    </>
  )
}
