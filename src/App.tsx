import { useEffect, useMemo, useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import ProductGrid from './components/ProductGrid'
import Cart from './components/Cart'
import CheckoutModal from './components/CheckoutModal'
import Orders from './components/Orders'
import Footer from './components/Footer'
import OffersSection from './components/OffersSection'
import { } from './components/SectionBlocks'
import { products, categories } from './data'
import type { CartItem, Order, Product } from './types'

const sections: Record<string, string> = {
  Home: 'home',
  Products: 'products',
  Offers: 'offers',
  Orders: 'orders',
  About: 'about',
}

export default function App() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [cartOpen, setCartOpen] = useState(false)
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [orders, setOrders] = useState<Order[]>([])
  const [toast, setToast] = useState<string | null>(null)
  const [checkoutOpen, setCheckoutOpen] = useState(false)
  const [checkoutOrderId, setCheckoutOrderId] = useState('')
  const [placingOrder, setPlacingOrder] = useState(false)
  const [cancelingOrderId, setCancelingOrderId] = useState<string | null>(null)
  const [cancelConfirmOrderId, setCancelConfirmOrderId] = useState<string | null>(null)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const filteredProducts = useMemo(() => {
    return products.filter(product => activeCategory === 'All' || product.category === activeCategory)
  }, [activeCategory])

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  const showToast = (message: string) => {
    setToast(message)
    window.clearTimeout((window as any).__sportzoneToastTimeout)
    ;(window as any).__sportzoneToastTimeout = window.setTimeout(() => setToast(null), 2200)
  }

  const addToCart = (product: Product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.product.id === product.id)
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
        )
      }
      return [...prev, { product, quantity: 1 }]
    })
    showToast(`${product.name} added to cart`)
  }

  const updateQuantity = (productId: number, delta: number) => {
    setCartItems(prev =>
      prev
        .map(item =>
          item.product.id === productId ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item,
        )
        .filter(item => item.quantity > 0),
    )
  }

  const removeItem = (productId: number) => {
    setCartItems(prev => prev.filter(item => item.product.id !== productId))
  }

  const sendOrderEmail = async (order: Order, cancelled = false) => {
    try {
      const response = await fetch(cancelled ? '/api/order/cancel' : '/api/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderId: order.id,
          placedAt: order.placedAt,
          status: order.status,
          total: order.total,
          items: order.items,
          customerName: order.customerName,
          email: order.email,
          phone: order.phone,
          address: order.address,
          cancelled,
        }),
      })

      if (!response.ok) {
        throw new Error('Order email failed')
      }

      showToast(cancelled ? 'Cancellation email sent' : 'Order email sent successfully')
    } catch (error) {
      console.error('Order email error:', error)
      showToast(cancelled ? 'Order cancelled, but email could not be sent' : 'Order placed, but email could not be sent')
    }
  }


  const openCheckout = () => {
    if (cartItems.length === 0) {
      showToast('Add items before checking out')
      return
    }

    setCheckoutOrderId(`SZ${Date.now()}`)
    setCheckoutOpen(true)
  }

  const placeOrder = async (payload: { name: string; email: string; phone: string; address: string }) => {
    if (placingOrder) return
    setPlacingOrder(true)

    const total = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
    const order: Order = {
      id: checkoutOrderId || `SZ${Date.now()}`,
      placedAt: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
      status: 'Processing',
      items: cartItems,
      total,
      customerName: payload.name,
      email: payload.email,
      phone: payload.phone,
      address: payload.address,
    }

    setOrders(prev => [order, ...prev])
    setCartItems([])
    setCartOpen(false)
    setCheckoutOpen(false)
    setActiveCategory('All')
    showToast(`Order placed! Total ₹${total.toLocaleString()}`)
    await sendOrderEmail(order)
    setPlacingOrder(false)
    document.getElementById('orders')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const cancelOrderFromHistory = async (orderId: string) => {
    if (cancelingOrderId) return
    const existingOrder = orders.find(order => order.id === orderId)
    if (!existingOrder) return

    setCancelingOrderId(orderId)
    setOrders(prev => prev.filter(order => order.id !== orderId))
    setCancelConfirmOrderId(null)
    showToast('Order canceled')

    try {
      await sendOrderEmail(existingOrder, true)
    } catch {
      showToast('Order canceled, but email could not be sent')
    } finally {
      setCancelingOrderId(null)
    }
  }

  const requestCancelOrder = (orderId: string) => {
    setCancelConfirmOrderId(orderId)
  }


  const scrollToSection = (link: string) => {
    const targetId = sections[link] || 'home'
    const element = document.getElementById(targetId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(160deg, #060818 0%, #0a0f25 40%, #060818 100%)' }}>
      <Navbar
        categories={categories}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
        cartCount={cartCount}
        onCartToggle={() => setCartOpen(prev => !prev)}
        onNavigate={scrollToSection}
        mobileMenuOpen={false}
        setMobileMenuOpen={() => null}
      />

      <Cart
        open={cartOpen}
        items={cartItems}
        onClose={() => setCartOpen(false)}
        onCheckout={openCheckout}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeItem}
      />

      <CheckoutModal
        open={checkoutOpen}
        orderId={checkoutOrderId}
        items={cartItems}
        onClose={() => setCheckoutOpen(false)}
        onPlaceOrder={placeOrder}
        placingOrder={placingOrder}
      />

      {toast && (
        <div className="fixed right-6 bottom-6 z-50 rounded-2xl px-5 py-3 text-sm" style={{ background: 'rgba(10, 20, 48, 0.95)', border: '1px solid rgba(0, 245, 255, 0.2)', color: '#e8eeff', boxShadow: '0 16px 40px rgba(0, 0, 0, 0.35)' }}>
          {toast}
        </div>
      )}

      <Hero onShopNow={() => scrollToSection('Products')} onViewOffers={() => scrollToSection('Offers')} />

      <section className="relative py-16 overflow-hidden" id="about">
        <div className="max-w-7xl mx-auto px-6">
          <div className="rounded-2xl p-1 flex flex-wrap gap-2 justify-center" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', backdropFilter: 'blur(20px)' }}>
            {categories.map(category => (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className="px-6 py-3 rounded-xl font-semibold transition-all duration-200"
                style={{
                  fontFamily: 'Rajdhani, sans-serif',
                  fontSize: '0.95rem',
                  letterSpacing: '0.06em',
                  background: activeCategory === category ? 'linear-gradient(135deg, rgba(0,245,255,0.9), rgba(0,180,220,0.9))' : 'transparent',
                  color: activeCategory === category ? '#060818' : 'rgba(200,210,240,0.65)',
                  fontWeight: activeCategory === category ? 700 : 600,
                  boxShadow: activeCategory === category ? '0 0 20px rgba(0,245,255,0.3)' : 'none',
                }}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      <ProductGrid products={filteredProducts} onAddToCart={addToCart} filteredCount={filteredProducts.length} />
      <OffersSection onExplore={() => scrollToSection('Products')} />
      <Orders orders={orders} onCancelOrder={requestCancelOrder} cancelingOrderId={cancelingOrderId} />
      <Footer />
      {cancelConfirmOrderId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4 py-6">
          <div className="w-full max-w-md rounded-[32px] border border-white/10 bg-[#050814]/95 p-6 shadow-[0_30px_80px_rgba(0,0,0,0.5)] backdrop-blur-xl">
            <p className="text-sm uppercase tracking-[0.2em] mb-3" style={{ color: 'rgba(0,245,255,0.65)', fontFamily: 'Rajdhani, sans-serif' }}>
              Confirm cancellation
            </p>
            <h2 className="font-black text-2xl" style={{ fontFamily: 'Orbitron, sans-serif', color: '#fff' }}>
              Cancel this order?
            </h2>
            <p className="mt-4 text-sm leading-6" style={{ color: 'rgba(200,210,240,0.8)', fontFamily: 'Inter, sans-serif' }}>
              This will remove the order from your history and send a cancellation notification. Do you want to continue?
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => setCancelConfirmOrderId(null)}
                className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Keep order
              </button>
              <button
                type="button"
                onClick={() => cancelOrderFromHistory(cancelConfirmOrderId)}
                disabled={cancelingOrderId === cancelConfirmOrderId}
                className="rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-500 px-5 py-3 text-sm font-semibold text-[#060818] transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {cancelingOrderId === cancelConfirmOrderId ? 'Cancelling…' : 'Confirm cancel'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
