import { useState, type FormEvent } from 'react'
import type { CartItem } from '../types'

type CheckoutModalProps = {
  open: boolean
  orderId: string
  items: CartItem[]
  onClose: () => void
  onPlaceOrder: (payload: { name: string; email: string; phone: string; address: string }) => void
  placingOrder: boolean
}

export default function CheckoutModal({
  open,
  orderId,
  items,
  onClose,
  onPlaceOrder,
  placingOrder,
}: CheckoutModalProps) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
  const formIncomplete = !name.trim() || !email.trim() || !phone.trim() || !address.trim()

  if (!open) return null

  const clearFields = () => {
    setName('')
    setEmail('')
    setPhone('')
    setAddress('')
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (formIncomplete) return
    onPlaceOrder({ name: name.trim(), email: email.trim(), phone: phone.trim(), address: address.trim() })
    clearFields()
  }

  const handleClose = () => {
    clearFields()
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <div className="w-full max-w-3xl rounded-[32px] bg-[#050814]/95 border border-white/10 shadow-[0_30px_80px_rgba(0,0,0,0.5)] backdrop-blur-xl">
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
          <div>
            <p className="font-bold text-xl" style={{ fontFamily: 'Rajdhani, sans-serif', color: '#fff' }}>Order details</p>
            <p className="text-sm" style={{ color: 'rgba(200,210,240,0.7)' }}>Order ID: {orderId}</p>
          </div>
          <button type="button" onClick={onClose} className="text-white text-2xl leading-none">×</button>
        </div>

        <div className="px-6 py-6 grid gap-8 lg:grid-cols-[1.4fr_1fr]">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="mb-2 block text-sm font-semibold" style={{ fontFamily: 'Rajdhani, sans-serif', color: '#fff' }}>Name</label>
              <input value={name} onChange={event => setName(event.target.value)} className="w-full rounded-2xl border border-white/10 bg-[#060818]/90 px-4 py-3 text-white outline-none" placeholder="John Doe" />
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold" style={{ fontFamily: 'Rajdhani, sans-serif', color: '#fff' }}>Email</label>
              <input value={email} onChange={event => setEmail(event.target.value)} type="email" className="w-full rounded-2xl border border-white/10 bg-[#060818]/90 px-4 py-3 text-white outline-none" placeholder="you@example.com" />
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold" style={{ fontFamily: 'Rajdhani, sans-serif', color: '#fff' }}>Phone</label>
              <input value={phone} onChange={event => setPhone(event.target.value)} className="w-full rounded-2xl border border-white/10 bg-[#060818]/90 px-4 py-3 text-white outline-none" placeholder="+91 98765 43210" />
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold" style={{ fontFamily: 'Rajdhani, sans-serif', color: '#fff' }}>Address</label>
              <textarea value={address} onChange={event => setAddress(event.target.value)} rows={4} className="w-full resize-none rounded-2xl border border-white/10 bg-[#060818]/90 px-4 py-3 text-white outline-none" placeholder="123 Forest Ave, Chennai, India" />
            </div>
            <div className="flex flex-wrap gap-3">
              <button type="submit" disabled={placingOrder || formIncomplete} className="btn-primary rounded-2xl px-6 py-3">
                {placingOrder ? 'Placing order...' : 'Place Order'}
              </button>
                <button type="button" onClick={handleClose} className="rounded-2xl border border-white/10 bg-transparent px-6 py-3 text-white transition hover:bg-white/10">
                Edit cart
              </button>
            </div>
          </form>

          <div className="rounded-[28px] border border-white/10 bg-[#061025]/80 p-5">
            <p className="font-semibold mb-4" style={{ fontFamily: 'Rajdhani, sans-serif', color: '#fff' }}>Order summary</p>
            <div className="space-y-4">
              {items.map(item => (
                <div key={item.product.id} className="flex items-center justify-between gap-4 rounded-3xl bg-[#050a18]/90 p-4">
                  <span>{item.quantity} × {item.product.name}</span>
                  <span className="font-semibold" style={{ color: '#00f5ff' }}>₹{(item.product.price * item.quantity).toLocaleString()}</span>
                </div>
              ))}
            </div>
            <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4 text-white">
              <span className="text-sm">Subtotal</span>
              <span className="font-bold">₹{subtotal.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
