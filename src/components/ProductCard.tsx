import { useRef, useState, type MouseEvent } from 'react'
import type { Product } from '../types'

type ProductCardProps = {
  product: Product
  onAddToCart: () => void
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect()
    if (!rect) return
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 16
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -16
    setTilt({ x, y })
  }

  const handleMouseLeave = () => setTilt({ x: 0, y: 0 })

  const discount = Math.round((1 - product.price / product.originalPrice) * 100)

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="shine-sweep card-3d rounded-2xl overflow-hidden cursor-pointer"
      style={{
        background: 'rgba(255,255,255,0.055)',
        border: '1px solid rgba(255,255,255,0.12)',
        borderTopColor: 'rgba(255,255,255,0.22)',
        boxShadow: `0 8px 32px rgba(0,0,0,0.4), 0 0 40px ${product.glowColor}`,
        transform: `perspective(600px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg) translateZ(0)`,
        transition: 'transform 0.1s ease-out, box-shadow 0.2s ease',
      }}
    >
      <div className="relative overflow-hidden" style={{ height: 220, background: '#0d1535' }}>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
          style={{ opacity: 0.85 }}
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(6,8,24,0.7) 0%, transparent 60%)' }} />
        <div className="absolute top-3 right-3 badge" style={{ background: 'rgba(57,255,20,0.15)', border: '1px solid rgba(57,255,20,0.4)', color: '#39ff14' }}>
          -{discount}%
        </div>
        <div className="absolute top-3 left-3 badge" style={{ background: product.badgeColor, border: `1px solid ${product.badgeBorder}`, color: product.badgeText }}>
          {product.badge}
        </div>
      </div>

      <div className="p-5" style={{ transformStyle: 'preserve-3d' }}>
        <p className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: 'rgba(255,255,255,0.45)', fontFamily: 'Inter, sans-serif' }}>
          {product.category}
        </p>
        <h3 className="font-bold text-white mb-1 leading-tight" style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: '1.1rem' }}>
          {product.name}
        </h3>
        <p className="text-sm mb-3 leading-relaxed" style={{ color: 'rgba(200,210,240,0.6)', fontFamily: 'Inter, sans-serif' }}>
          {product.description}
        </p>

        <div className="flex items-center gap-2 mb-4">
          <span className="stars text-sm">{'★'.repeat(Math.floor(product.rating))}{'☆'.repeat(5 - Math.floor(product.rating))}</span>
          <span className="text-xs" style={{ color: 'rgba(255,255,255,0.45)' }}>
            {product.rating} ({product.reviews})
          </span>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-baseline gap-2">
            <span className="font-bold" style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: '1.4rem', color: '#00f5ff' }}>
              ₹{product.price.toLocaleString()}
            </span>
            <span className="text-sm line-through" style={{ color: 'rgba(255,255,255,0.3)' }}>
              ₹{product.originalPrice.toLocaleString()}
            </span>
          </div>
        </div>

        <button type="button" className="btn-cart" onClick={onAddToCart}>
          Add to Cart
        </button>
      </div>
    </div>
  )
}
