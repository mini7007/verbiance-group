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
import TrustBadges from '@/components/ui/trust-badges'
import { PageTransition } from '@/components/page-transition'
import { products } from '@/lib/products'

const fallbackHero = {
  eyebrow: 'Handcrafted with love',
  title: "Nature's Finest, Delivered to Your Door",
  description:
    'Discover our curated collection of premium organic wellness products sourced directly from the pristine valleys of India.',
  imageUrl: '/images/hero.jpg',
}

const fallbackFeatured = {
  eyebrow: 'Our Collection',
  title: 'Handpicked for Your Wellness',
  description:
    'Each product is carefully sourced and crafted to bring you the purest nature has to offer.',
}

export default function Home() {
  const heroContent = fallbackHero
  const featuredProducts = products

  return (
    <PageTransition>
      <AnnouncementBar />
      <Navbar />
      <main className="space-y-0">
        <HeroSection
          eyebrow={heroContent.eyebrow}
          title={heroContent.title}
          description={heroContent.description}
          imageUrl={heroContent.imageUrl}
        />
        <TrustBadges />
        <CategoryCollection />
        <FeaturedProducts
          eyebrow={fallbackFeatured.eyebrow}
          title={fallbackFeatured.title}
          description={fallbackFeatured.description}
          products={featuredProducts}
        />
        <BrandStory />
        <VideoReels />
        <Testimonials />
        <BulkCta />
        <PartnerLogos />
        <BlogPreview />
      </main>
      <SiteFooter />
      <CartDrawer />
    </PageTransition>
  )
}
