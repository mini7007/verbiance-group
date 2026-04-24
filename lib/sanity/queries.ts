import { groq } from 'next-sanity'

import { sanityClient } from './client'

const productCardProjection = `{
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

const homepageProjection = `{
  _id,
  "title": coalesce(title, ""),
  "subtitle": coalesce(subtitle, ""),
  "heroImageUrl": heroImage.asset->url,
  "featuredProducts": featuredProducts[]->${productCardProjection}
}`

const allProductsQuery = groq`*[_type == "product" && defined(image.asset)] | order(_createdAt desc) ${productCardProjection}`
const featuredProductsQuery = groq`*[_type == "product" && featured == true && defined(image.asset)] | order(_updatedAt desc) [0...$limit] ${productCardProjection}`
const homepageDataQuery = groq`*[_type == "homepage"][0] ${homepageProjection}`

export const getAllProducts = () => {
  return sanityClient.fetch(allProductsQuery)
}

export const getFeaturedProducts = (limit = 6) => {
  return sanityClient.fetch(featuredProductsQuery, { limit })
}

export const getHomepageData = () => {
  return sanityClient.fetch(homepageDataQuery)
}
