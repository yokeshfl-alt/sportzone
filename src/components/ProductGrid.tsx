import ProductCard from './ProductCard'
import type { Product } from '../types'

type ProductGridProps = {
  products: Product[]
  onAddToCart: (product: Product) => void
  filteredCount: number
}

export default function ProductGrid({ products, onAddToCart, filteredCount }: ProductGridProps) {
  return (
    <section id="products" className="relative pb-24">
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="text-center mb-12 reveal">
          <h2 className="font-black mb-3" style={{ fontFamily: 'Orbitron, sans-serif', fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', color: '#fff' }}>
            Popular SportZone Gear
          </h2>
          <p style={{ fontFamily: 'Inter, sans-serif', color: 'rgba(200,210,240,0.5)', fontSize: '1rem' }}>
            {filteredCount} items available · Free shipping above ₹999
          </p>
        </div>

        <div className="products-grid">
          {products.map(product => (
            <ProductCard key={product.id} product={product} onAddToCart={() => onAddToCart(product)} />
          ))}
        </div>
      </div>
    </section>
  )
}
