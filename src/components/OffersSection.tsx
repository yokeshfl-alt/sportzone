type OffersSectionProps = {
  onExplore: () => void
}

export default function OffersSection({ onExplore }: OffersSectionProps) {
  return (
    <section id="offers" className="py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="relative rounded-3xl overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 p-10 glass-card-strong" style={{ background: 'linear-gradient(135deg, rgba(0,245,255,0.1) 0%, rgba(191,95,255,0.1) 100%)', border: '1px solid rgba(0,245,255,0.2)', boxShadow: '0 0 60px rgba(0,245,255,0.06), 0 30px 80px rgba(0,0,0,0.4)' }}>
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-4" style={{ background: 'rgba(255,107,53,0.15)', border: '1px solid rgba(255,107,53,0.4)', color: '#ff6b35', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.08em', fontFamily: 'Inter, sans-serif' }}>
              ⚡ LIMITED TIME
            </div>
            <h2 className="font-black mb-2" style={{ fontFamily: 'Orbitron, sans-serif', fontSize: 'clamp(1.4rem, 3vw, 2rem)', color: '#fff' }}>
              SEASON SALE — UP TO 40% OFF
            </h2>
            <p style={{ fontFamily: 'Inter, sans-serif', color: 'rgba(200,210,240,0.6)', fontSize: '1rem' }}>
              On cricket kits, badminton rackets, and all balls. Ends 15 Aug.
            </p>
          </div>
          <div className="relative z-10 flex-shrink-0">
            <button type="button" className="btn-primary" style={{ fontSize: '1rem', padding: '16px 40px' }} onClick={onExplore}>
              Grab Deal →
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
