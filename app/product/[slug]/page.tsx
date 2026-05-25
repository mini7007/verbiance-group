import type { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { Navbar } from '@/components/navbar'
import { SiteFooter } from '@/components/site-footer'
import { CartDrawer } from '@/components/cart-drawer'
import { Badge } from '@/components/ui/badge'
import { formatPrice, products, type Product } from '@/lib/products'
import { fetchProductBySlug, type SanityProduct } from '@/lib/sanity/fetch'

type ProductPageProps = {
  params: Promise<{ slug: string }>
}

const buildLocalFallbackProduct = (slug: string): Product | null => {
  return products.find((product) => product.slug === slug) ?? null
}

const mapSanityProductToUi = (item: SanityProduct): Product => ({
  id: Number.parseInt(item._id.replace(/\D/g, '').slice(0, 8), 10) || 1,
  name: item.name,
  slug: item.slug,
  price: item.price,
  originalPrice: item.originalPrice,
  image: item.imageUrl ?? '/images/product-1.jpg',
  images: item.images?.length ? item.images : item.imageUrl ? [item.imageUrl] : ['/images/product-1.jpg'],
  videoUrl: item.videoUrl,
  category: item.category ?? 'Wellness',
  description: item.description ?? 'Premium wellness product from our curated collection.',
  badge: item.badge,
})

const resolveProduct = async (slug: string): Promise<Product | null> => {
  const sanityProduct = await fetchProductBySlug(slug)

  if (sanityProduct) {
    return mapSanityProductToUi(sanityProduct)
  }

  return buildLocalFallbackProduct(slug)
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params
  const product = await resolveProduct(slug)

  if (!product) {
    return {
      title: 'Product Not Found | Verbiance Group',
      description: 'The requested product could not be found.',
      robots: {
        index: false,
        follow: false,
      },
    }
  }

  return {
    title: `${product.name} | Verbiance Group`,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: [{ url: product.image }],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: product.name,
      description: product.description,
      images: [product.image],
    },
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params
  const product = await resolveProduct(slug)

  if (!product) {
    notFound()
  }

  const images = product.images?.length ? product.images : [product.image]

  return (
    <>
      <Navbar />
      <main className="bg-background pb-20">
        <section className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 pt-28 sm:px-6 lg:grid-cols-2 lg:gap-14 lg:px-8 lg:pt-32">
          <div className="space-y-4">
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-border/70 bg-card shadow-[0_28px_60px_-32px_rgba(0,0,0,0.45)]">
              <Image
                src={images[0]}
                alt={product.name}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>

            {images.length > 1 && (
              <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
                {images.slice(1).map((imageUrl, index) => (
                  <div
                    key={`${product.slug}-${imageUrl}-${index}`}
                    className="relative aspect-square overflow-hidden rounded-2xl border border-border/70 bg-card"
                  >
                    <Image
                      src={imageUrl}
                      alt={`${product.name} image ${index + 2}`}
                      fill
                      sizes="(max-width: 768px) 33vw, 20vw"
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          <article className="rounded-3xl border border-border/70 bg-card/70 p-7 shadow-[0_26px_60px_-34px_rgba(0,0,0,0.35)] backdrop-blur-sm sm:p-10">
            <p className="text-xs font-semibold tracking-[0.2em] text-primary uppercase">{product.category}</p>
            <h1 className="mt-3 font-serif text-3xl leading-tight font-bold text-foreground sm:text-4xl">{product.name}</h1>

            <div className="mt-5 flex items-center gap-3">
              <p className="text-3xl font-bold tracking-tight text-foreground">{formatPrice(product.price)}</p>
              {product.originalPrice && (
                <p className="text-lg font-medium text-muted-foreground line-through">{formatPrice(product.originalPrice)}</p>
              )}
            </div>

            {product.badge && (
              <Badge className="mt-4 rounded-full bg-primary px-3 py-1.5 text-[11px] tracking-[0.12em] uppercase">
                {product.badge}
              </Badge>
            )}

            <p className="mt-7 text-base leading-relaxed text-muted-foreground sm:text-lg">{product.description}</p>

            {product.videoUrl && (
              <div className="mt-8 space-y-3">
                <h2 className="font-serif text-xl font-semibold text-foreground">Product Video</h2>
                <div className="overflow-hidden rounded-2xl border border-border/70 bg-black/80 shadow-inner">
                  <video
                    controls
                    preload="metadata"
                    className="h-full max-h-[420px] w-full"
                    src={product.videoUrl}
                  >
                    Sorry, your browser does not support embedded videos.
                  </video>
                </div>
              </div>
            )}
          </article>
        </section>
      </main>
      <SiteFooter />
      <CartDrawer />
    </>
  )
}
