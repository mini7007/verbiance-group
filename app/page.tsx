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
import { type Product, products } from '@/lib/products'
import { fetchFeaturedProducts, fetchHomepage, type SanityProduct } from '@/lib/sanity/fetch'

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

const toStableNumericId = (sourceId: string, fallback: number) => {
  const hash = Array.from(sourceId).reduce((acc, char) => ((acc << 5) - acc + char.charCodeAt(0)) | 0, 0)
  return Math.abs(hash) || fallback
}

const mapSanityProductsToUiProducts = (items: SanityProduct[]): Product[] => {
  return items
    .filter((item) => Boolean(item?.name && item?.imageUrl))
    .map((item, index) => ({
      id: toStableNumericId(item._id, index + 1),
      name: item.name,
      price: item.price,
      originalPrice: item.originalPrice,
      image: item.imageUrl ?? '/images/product-1.jpg',
      category: item.category ?? 'Wellness',
      description: item.description ?? 'Premium wellness product from our curated collection.',
      badge: item.badge,
    }))
}

export default async function Home() {
  const [homepage, featuredFromCms] = await Promise.all([fetchHomepage(), fetchFeaturedProducts(6)])

  const heroContent = {
    eyebrow: fallbackHero.eyebrow,
    title: homepage?.title || fallbackHero.title,
    description: homepage?.subtitle || fallbackHero.description,
    imageUrl: homepage?.heroImageUrl || fallbackHero.imageUrl,
  }

  const featuredProducts = featuredFromCms.length
    ? mapSanityProductsToUiProducts(featuredFromCms)
    : homepage?.featuredProducts?.length
      ? mapSanityProductsToUiProducts(homepage.featuredProducts)
      : products

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
