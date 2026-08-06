import type { CartItem } from '../types'

type CartProps = {
  open: boolean
  items: CartItem[]
  onClose: () => void
  onCheckout: () => void
  onUpdateQuantity: (productId: number, delta: number) => void
  onRemoveItem: (productId: number) => void
}

export default function Cart({ open, items, onClose, onCheckout, onUpdateQuantity, onRemoveItem }: CartProps) {
  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0)

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 p-4 md:items-center">
      <div className="w-full max-w-lg rounded-[32px] bg-[#050814]/95 border border-white/10 shadow-[0_30px_80px_rgba(0,0,0,0.5)] backdrop-blur-xl" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
          <div>
            <p className="font-bold text-lg" style={{ fontFamily: 'Rajdhani, sans-serif' }}>Your Cart</p>
            <p className="text-sm" style={{ color: 'rgba(200,210,240,0.65)' }}>{items.length} item{items.length === 1 ? '' : 's'} in cart</p>
          </div>
          <button type="button" onClick={onClose} style={{ color: '#00f5ff', fontSize: '1.1rem', lineHeight: 1, background: 'transparent', border: 'none', cursor: 'pointer' }}>×</button>
        </div>

        <div className="max-h-[calc(100vh-280px)] overflow-y-auto px-6 py-4 space-y-4">
          {items.length === 0 ? (
            <div style={{ color: 'rgba(200,210,240,0.8)' }}>Your cart is empty. Add a product to see it here.</div>
          ) : (
            items.map(item => (
              <div key={item.product.id} className="flex flex-col gap-4 rounded-3xl p-4" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <div className="flex items-center gap-4">
                  <img src={item.product.image} alt={item.product.name} className="h-16 w-16 rounded-2xl object-cover" />
                  <div className="flex-1">
                    <p className="font-semibold text-white" style={{ fontFamily: 'Rajdhani, sans-serif' }}>{item.product.name}</p>
                    <p className="text-sm" style={{ color: 'rgba(200,210,240,0.65)' }}>{item.quantity} × ₹{item.product.price.toLocaleString()}</p>
                  </div>
                  <button type="button" onClick={() => onRemoveItem(item.product.id)} className="text-sm font-semibold" style={{ color: '#ff6b35', background: 'transparent', border: 'none', cursor: 'pointer' }}>Remove</button>
                </div>

                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2 rounded-full border border-white/10 bg-[#0b1228] px-2 py-1">
                    <button type="button" onClick={() => onUpdateQuantity(item.product.id, -1)} className="px-3 py-2 rounded-full bg-white/5 text-white transition-colors duration-200 hover:bg-white/10">-</button>
                    <span className="min-w-[24px] text-center" style={{ color: '#e8eeff' }}>{item.quantity}</span>
                    <button type="button" onClick={() => onUpdateQuantity(item.product.id, 1)} className="px-3 py-2 rounded-full bg-white/5 text-white transition-colors duration-200 hover:bg-white/10">+</button>
                  </div>
                  <p className="font-bold" style={{ color: '#00f5ff' }}>₹{(item.product.price * item.quantity).toLocaleString()}</p>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="px-6 pb-6">
          <div className="mb-4 flex items-center justify-between text-sm" style={{ color: 'rgba(200,210,240,0.75)' }}>
            <span>Subtotal</span>
            <span>₹{subtotal.toLocaleString()}</span>
          </div>
          <button type="button" onClick={onCheckout} className="btn-primary w-full">Checkout</button>
        </div>
      </div>
    </div>
  )
}
