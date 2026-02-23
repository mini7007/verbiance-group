export interface Product {
  id: number
  name: string
  price: number
  originalPrice?: number
  image: string
  category: string
  description: string
  badge?: string
}

export const products: Product[] = [
  {
    id: 1,
    name: 'Radiance Face Serum',
    price: 1490,
    originalPrice: 1890,
    image: '/images/product-1.jpg',
    category: 'Skincare',
    description: 'A luxurious blend of organic oils for glowing, youthful skin.',
    badge: 'Best Seller',
  },
  {
    id: 2,
    name: 'Wild Forest Honey',
    price: 890,
    image: '/images/product-2.jpg',
    category: 'Superfoods',
    description: 'Raw, unprocessed honey sourced from pristine forest reserves.',
  },
  {
    id: 3,
    name: 'Golden Turmeric Blend',
    price: 690,
    originalPrice: 850,
    image: '/images/product-3.jpg',
    category: 'Wellness',
    description: 'Premium Lakadong turmeric with high curcumin content.',
    badge: 'New',
  },
  {
    id: 4,
    name: 'Lavender Essential Oil',
    price: 750,
    image: '/images/product-4.jpg',
    category: 'Aromatherapy',
    description: 'Steam-distilled pure lavender oil for calm and relaxation.',
  },
  {
    id: 5,
    name: 'Shea Body Butter',
    price: 1290,
    originalPrice: 1590,
    image: '/images/product-5.jpg',
    category: 'Skincare',
    description: 'Deep nourishing body butter with organic shea and cocoa.',
    badge: 'Best Seller',
  },
  {
    id: 6,
    name: 'Himalayan Herbal Tea',
    price: 490,
    image: '/images/product-6.jpg',
    category: 'Wellness',
    description: 'A soothing blend of hand-picked Himalayan herbs and botanicals.',
  },
]

export const formatPrice = (price: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
  }).format(price)
}
