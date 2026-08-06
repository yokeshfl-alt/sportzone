import { FormEvent, useState } from 'react'
import type { Review, FAQ } from '../types'

type FeaturedProps = {
  products: { id: number; name: string; price: number; image: string; badge: string }[]
}

type ReviewsProps = {
  reviews: Review[]
}

type FAQProps = {
  faqs: FAQ[]
}


export function FeaturedProducts({ products }: FeaturedProps) {
  return (
    <section id="featured" className="py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10 text-center">
          <p className="text-sm uppercase tracking-[0.25em]" style={{ color: 'rgba(0,245,255,0.6)', fontFamily: 'Rajdhani, sans-serif' }}>Featured Products</p>
          <h2 className="font-black" style={{ fontFamily: 'Orbitron, sans-serif', fontSize: 'clamp(1.8rem, 3vw, 2.7rem)', color: '#fff' }}>
            Shop the best sellers
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {products.map(product => (
            <div key={product.id} className="glass-card rounded-[28px] p-6 transition-all duration-200 hover:-translate-y-1">
              <img src={product.image} alt={product.name} className="mb-5 h-56 w-full rounded-[28px] object-cover" />
              <span className="badge mb-3" style={{ background: 'rgba(0,245,255,0.1)', border: '1px solid rgba(0,245,255,0.25)', color: '#00f5ff' }}>{product.badge}</span>
              <h3 className="font-bold mb-3" style={{ fontFamily: 'Rajdhani, sans-serif', color: '#fff' }}>{product.name}</h3>
              <p className="font-semibold" style={{ color: '#00f5ff', fontFamily: 'Orbitron, sans-serif' }}>₹{product.price.toLocaleString()}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function ReviewsSection({ reviews }: ReviewsProps) {
  return (
    <section id="reviews" className="py-16 px-6 bg-[#060818]">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10 text-center">
          <p className="text-sm uppercase tracking-[0.25em]" style={{ color: 'rgba(0,245,255,0.6)', fontFamily: 'Rajdhani, sans-serif' }}>Customer Reviews</p>
          <h2 className="font-black" style={{ fontFamily: 'Orbitron, sans-serif', fontSize: 'clamp(1.8rem, 3vw, 2.7rem)', color: '#fff' }}>
            Trusted by champions
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {reviews.map(review => (
            <div key={review.name} className="glass-card rounded-[28px] p-6 transition-all duration-200 hover:-translate-y-1">
              <div className="flex items-center gap-4 mb-4">
                <img src={review.avatar} alt={review.name} className="h-14 w-14 rounded-full object-cover" />
                <div>
                  <p className="font-semibold" style={{ fontFamily: 'Rajdhani, sans-serif', color: '#fff' }}>{review.name}</p>
                  <p className="text-sm" style={{ color: 'rgba(200,210,240,0.65)' }}>{review.role}</p>
                </div>
              </div>
              <p className="mb-4 text-sm" style={{ color: 'rgba(200,210,240,0.8)' }}>{review.quote}</p>
              <div className="stars text-sm">{'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function FAQSection({ faqs }: FAQProps) {
  return (
    <section id="faq" className="py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10 text-center">
          <p className="text-sm uppercase tracking-[0.25em]" style={{ color: 'rgba(0,245,255,0.6)', fontFamily: 'Rajdhani, sans-serif' }}>FAQ</p>
          <h2 className="font-black" style={{ fontFamily: 'Orbitron, sans-serif', fontSize: 'clamp(1.8rem, 3vw, 2.7rem)', color: '#fff' }}>
            Have questions? We have answers
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {faqs.map(faq => (
            <div key={faq.question} className="glass-card rounded-[28px] p-6">
              <h3 className="font-semibold mb-3" style={{ fontFamily: 'Rajdhani, sans-serif', color: '#fff' }}>{faq.question}</h3>
              <p style={{ color: 'rgba(200,210,240,0.7)' }}>{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function NewsletterSection() {
  return (
    <section id="newsletter" className="py-16 px-6 bg-[#0a0f25]">
      <div className="max-w-7xl mx-auto rounded-[28px] border border-white/10 bg-white/5 p-10 shadow-[0_30px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl">
        <div className="grid gap-8 md:grid-cols-2 md:items-center">
          <div>
            <p className="text-sm uppercase tracking-[0.25em]" style={{ color: 'rgba(0,245,255,0.6)', fontFamily: 'Rajdhani, sans-serif' }}>Newsletter</p>
            <h2 className="font-black mb-3" style={{ fontFamily: 'Orbitron, sans-serif', color: '#fff' }}>Get the inside edge on new arrivals</h2>
            <p style={{ color: 'rgba(200,210,240,0.75)', fontFamily: 'Inter, sans-serif' }}>Subscribe for product drops, offers, and pro tips from SportZone.</p>
          </div>
          <form className="flex flex-col gap-4 sm:flex-row">
            <input type="email" placeholder="Enter your email" className="rounded-2xl border border-white/10 bg-[#060818]/90 px-4 py-3 text-white outline-none" style={{ fontFamily: 'Inter, sans-serif' }} />
            <button type="submit" className="btn-primary rounded-2xl px-6 py-3">Subscribe</button>
          </form>
        </div>
      </div>
    </section>
  )
}

export function ContactSection() {
  return (
    <section id="contact" className="py-16 px-6">
      <div className="max-w-7xl mx-auto grid gap-8 lg:grid-cols-2">
        <div className="glass-card rounded-[28px] p-10">
          <p className="text-sm uppercase tracking-[0.25em]" style={{ color: 'rgba(0,245,255,0.6)', fontFamily: 'Rajdhani, sans-serif' }}>Contact</p>
          <h2 className="font-black mb-4" style={{ fontFamily: 'Orbitron, sans-serif', color: '#fff' }}>Need help finding the right gear?</h2>
          <p style={{ color: 'rgba(200,210,240,0.75)', fontFamily: 'Inter, sans-serif' }}>Reach out to our support team for personalized recommendations, order help, or bulk enquiries.</p>
          <div className="mt-8 space-y-4">
            <div>
              <p className="font-semibold" style={{ color: '#fff', fontFamily: 'Rajdhani, sans-serif' }}>support@sportzone.com</p>
              <p style={{ color: 'rgba(200,210,240,0.65)' }}>Email us anytime and we’ll get back within 24 hours.</p>
            </div>
            <div>
              <p className="font-semibold" style={{ color: '#fff', fontFamily: 'Rajdhani, sans-serif' }}>+91 98765 43210</p>
              <p style={{ color: 'rgba(200,210,240,0.65)' }}>Call our team Monday–Friday from 10AM to 7PM.</p>
            </div>
          </div>
        </div>

        <div className="glass-card rounded-[28px] p-10 space-y-4">
          <p className="text-sm uppercase tracking-[0.25em]" style={{ color: 'rgba(0,245,255,0.6)', fontFamily: 'Rajdhani, sans-serif' }}>Support</p>
          <h3 className="font-semibold" style={{ fontFamily: 'Orbitron, sans-serif', color: '#fff' }}>If you need support, use the information below.</h3>
          <p style={{ color: 'rgba(200,210,240,0.75)', fontFamily: 'Inter, sans-serif' }}>Our support team is available for order questions, returns, and product assistance.</p>
          <div className="space-y-4">
            <div>
              <p className="font-semibold" style={{ color: '#fff', fontFamily: 'Rajdhani, sans-serif' }}>support@sportzone.com</p>
              <p style={{ color: 'rgba(200,210,240,0.65)' }}>Send us an email and we’ll reply within 24 hours.</p>
            </div>
            <div>
              <p className="font-semibold" style={{ color: '#fff', fontFamily: 'Rajdhani, sans-serif' }}>+91 98765 43210</p>
              <p style={{ color: 'rgba(200,210,240,0.65)' }}>Call Monday–Friday from 10AM to 7PM.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
