export type Product = {
  id: number
  name: string
  category: string
  price: number
  originalPrice: number
  rating: number
  reviews: number
  badge: string
  badgeColor: string
  badgeBorder: string
  badgeText: string
  image: string
  description: string
  glowColor: string
}

export type CartItem = {
  product: Product
  quantity: number
}

export type Order = {
  id: string
  placedAt: string
  status: string
  items: CartItem[]
  total: number
  customerName?: string
  email?: string
  phone?: string
  address?: string
}

export type Review = {
  name: string
  role: string
  quote: string
  rating: number
  avatar: string
}

export type FAQ = {
  question: string
  answer: string
}
