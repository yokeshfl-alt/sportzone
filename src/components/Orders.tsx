import type { Order } from '../types'

type OrdersProps = {
  orders: Order[]
  onCancelOrder: (orderId: string) => void
  cancelingOrderId: string | null
}

export default function Orders({ orders, onCancelOrder, cancelingOrderId }: OrdersProps) {
  return (
    <section id="orders" className="py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.25em]" style={{ color: 'rgba(0,245,255,0.6)', fontFamily: 'Rajdhani, sans-serif' }}>
              My Orders
            </p>
            <h2 className="font-black" style={{ fontFamily: 'Orbitron, sans-serif', fontSize: 'clamp(1.8rem, 3vw, 2.7rem)', color: '#fff' }}>
              Your SportZone order history
            </h2>
          </div>
          <p style={{ color: 'rgba(200,210,240,0.65)', fontFamily: 'Inter, sans-serif', maxWidth: 540 }}>
            Review your recent orders, track status, and view item details in one place.
          </p>
        </div>

        {orders.length === 0 ? (
          <div className="rounded-3xl border border-white/10 bg-white/5 p-10 text-center" style={{ color: 'rgba(200,210,240,0.8)' }}>
            No orders yet. Place an order to see it appear here.
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map(order => (
              <div key={order.id} className="rounded-[28px] border border-white/10 bg-white/5 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="text-sm" style={{ color: 'rgba(200,210,240,0.65)', fontFamily: 'Inter, sans-serif' }}>
                      Order ID: <span className="font-semibold text-white">{order.id}</span>
                    </p>
                    <p className="text-sm" style={{ color: 'rgba(200,210,240,0.65)', fontFamily: 'Inter, sans-serif' }}>
                      Placed on {order.placedAt}
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="rounded-full px-3 py-1 text-xs font-semibold" style={{ background: 'rgba(0,245,255,0.12)', color: '#00f5ff' }}>{order.status}</span>
                    <span className="text-sm" style={{ color: 'rgba(200,210,240,0.7)', fontFamily: 'Inter, sans-serif' }}>
                      {order.items.length} item{order.items.length === 1 ? '' : 's'}
                    </span>
                    <span className="text-sm font-bold" style={{ color: '#fff', fontFamily: 'Rajdhani, sans-serif' }}>
                      ₹{order.total.toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  {order.items.map(item => (
                    <div key={item.product.id} className="flex items-center gap-4 rounded-3xl border border-white/10 bg-black/20 p-4">
                      <img src={item.product.image} alt={item.product.name} className="h-20 w-20 rounded-2xl object-cover" />
                      <div>
                        <p className="font-semibold text-white" style={{ fontFamily: 'Rajdhani, sans-serif' }}>{item.product.name}</p>
                        <p className="text-sm" style={{ color: 'rgba(200,210,240,0.65)' }}>
                          {item.quantity} × ₹{item.product.price.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                {order.status !== 'Cancelled' && (
                  <div className="mt-6 flex justify-end">
                    <button
                      type="button"
                      onClick={() => onCancelOrder(order.id)}
                      disabled={cancelingOrderId === order.id}
                      className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {cancelingOrderId === order.id ? 'Cancelling…' : 'Cancel Order'}
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
