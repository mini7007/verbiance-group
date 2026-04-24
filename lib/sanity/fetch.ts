import 'server-only'

import { groq } from 'next-sanity'

import { sanityClient } from './client'

type SanityProduct = {
  _id: string
  name: string
  slug: string
  price: number
  originalPrice?: number
  category?: string
  description?: string
  badge?: string
  imageUrl?: string
}

type HomepageData = {
  _id: string
  title: string
  subtitle: string
  heroImageUrl?: string
  featuredProducts: SanityProduct[]
}

const productProjection = `{
  _id,
  name,
  "slug": slug.current,
  price,
  originalPrice,
  category,
  description,
  badge,
  "imageUrl": image.asset->url
}`

const allProductsQuery = groq`*[_type == "product" && defined(image.asset)] | order(_createdAt desc) ${productProjection}`
const featuredProductsQuery = groq`*[_type == "product" && featured == true && defined(image.asset)] | order(_updatedAt desc) ${productProjection}`
const homepageQuery = groq`*[_type == "homepage"][0]{
  _id,
  "title": coalesce(title, ""),
  "subtitle": coalesce(subtitle, ""),
  "heroImageUrl": heroImage.asset->url,
  "featuredProducts": featuredProducts[]->${productProjection}
}`

export async function fetchAllProducts(): Promise<SanityProduct[]> {
  try {
    const products = await sanityClient.fetch<SanityProduct[]>(allProductsQuery)
    return Array.isArray(products) ? products : []
  } catch (error) {
    console.error('Failed to fetch all products from Sanity:', error)
    return []
  }
}

export async function fetchFeaturedProducts(limit = 6): Promise<SanityProduct[]> {
  try {
    const products = await sanityClient.fetch<SanityProduct[]>(featuredProductsQuery)

    if (!Array.isArray(products)) {
      return []
    }

    return products.slice(0, limit)
  } catch (error) {
    console.error('Failed to fetch featured products from Sanity:', error)
    return []
  }
}

export async function fetchHomepage(): Promise<HomepageData | null> {
  try {
    const homepage = await sanityClient.fetch<HomepageData | null>(homepageQuery)
    return homepage ?? null
  } catch (error) {
    console.error('Failed to fetch homepage data from Sanity:', error)
    return null
  }
}
