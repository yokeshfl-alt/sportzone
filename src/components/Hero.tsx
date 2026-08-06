type HeroProps = {
  onShopNow: () => void
  onViewOffers: () => void
}

function HeroOrbs() {
  return (
    <>
      <div className="orb-1 absolute rounded-full pointer-events-none" style={{ width: 520, height: 520, top: '-12%', right: '-5%', background: 'radial-gradient(circle, rgba(0,245,255,0.12) 0%, transparent 70%)', filter: 'blur(60px)' }} />
      <div className="orb-2 absolute rounded-full pointer-events-none" style={{ width: 420, height: 420, top: '18%', left: '-10%', background: 'radial-gradient(circle, rgba(191,95,255,0.1) 0%, transparent 70%)', filter: 'blur(60px)' }} />
      <div className="orb-3 absolute rounded-full pointer-events-none" style={{ width: 360, height: 360, bottom: '10%', right: '18%', background: 'radial-gradient(circle, rgba(255,107,53,0.08) 0%, transparent 70%)', filter: 'blur(50px)' }} />
    </>
  )
}

export default function Hero({ onShopNow, onViewOffers }: HeroProps) {
  return (
    <section id="home" className="relative flex items-center overflow-hidden" style={{ minHeight: '100vh', paddingTop: 68 }}>
      <HeroOrbs />
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: `linear-gradient(rgba(0,245,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,245,255,0.03) 1px, transparent 1px)`, backgroundSize: '60px 60px' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
        <div className="reveal" style={{ animationDelay: '0ms' }}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6" style={{ background: 'rgba(0,245,255,0.08)', border: '1px solid rgba(0,245,255,0.25)', color: '#00f5ff', fontFamily: 'Inter, sans-serif', fontSize: '0.8rem', fontWeight: 500, letterSpacing: '0.08em' }}>
            <span className="rounded-full" style={{ width: 6, height: 6, background: '#00f5ff', display: 'inline-block', boxShadow: '0 0 8px #00f5ff' }} />
            SHIPPING ACROSS INDIA
          </div>

          <h1 className="font-black leading-none mb-4" style={{ fontFamily: 'Orbitron, sans-serif', fontSize: 'clamp(2.4rem, 5vw, 4rem)', color: '#fff', lineHeight: 1.05 }}>
            PLAY LIKE A<br />
            <span style={{ background: 'linear-gradient(90deg, #00f5ff, #bf5fff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              CHAMPION
            </span>
          </h1>

          <p className="mb-8 max-w-lg leading-relaxed" style={{ fontFamily: 'Inter, sans-serif', fontSize: '1.05rem', color: 'rgba(200,210,240,0.65)', lineHeight: 1.7 }}>
            Premium sports gear for badminton, cricket, and volleyball. From English willow bats to tournament-grade shuttles — everything a champion needs, at SportZone.
          </p>

          <div className="flex flex-wrap gap-4 mb-12">
            <button type="button" className="btn-primary" onClick={onShopNow}>Shop Now →</button>
            <button type="button" className="btn-glass" onClick={onViewOffers}>View Offers</button>
          </div>

          <div className="flex flex-wrap gap-6">
            {[
              { value: '500+', label: 'Products' },
              { value: '50K+', label: 'Happy Players' },
              { value: '4.9★', label: 'Avg Rating' },
            ].map(stat => (
              <div key={stat.label}>
                <div className="font-black" style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '1.6rem', color: '#00f5ff' }}>{stat.value}</div>
                <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.78rem', color: 'rgba(200,210,240,0.45)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="hidden lg:flex items-center justify-center reveal" style={{ animationDelay: '100ms' }}>
          <div className="relative rounded-3xl overflow-hidden" style={{ width: 420, height: 520, background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(30px)', WebkitBackdropFilter: 'blur(30px)', border: '1px solid rgba(255,255,255,0.14)', borderTopColor: 'rgba(255,255,255,0.28)', boxShadow: '0 40px 100px rgba(0,0,0,0.6), 0 0 60px rgba(0,245,255,0.08)', transform: 'perspective(800px) rotateY(-8deg) rotateX(3deg)' }}>
            <img
              src="https://images.unsplash.com/photo-1594470117722-de4b9a02ebed?w=500&h=600&fit=crop&auto=format"
              alt="Cricket stadium action"
              className="w-full h-full object-cover"
              style={{ opacity: 0.75 }}
            />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(6,8,24,0.85) 0%, rgba(6,8,24,0.2) 50%, transparent 100%)' }} />
            <div className="absolute bottom-6 left-6 right-6 rounded-2xl p-4" style={{ background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.16)', borderTopColor: 'rgba(255,255,255,0.3)' }}>
              <p style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: '1.05rem', fontWeight: 700, color: '#fff' }}>English Willow Bat</p>
              <div className="flex items-center justify-between mt-1">
                <span style={{ fontFamily: 'Orbitron, sans-serif', color: '#00f5ff', fontWeight: 700 }}>₹3,499</span>
                <div className="stars text-sm">★★★★★</div>
              </div>
            </div>
            <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)' }} />
          </div>
        </div>
      </div>
    </section>
  )
}
