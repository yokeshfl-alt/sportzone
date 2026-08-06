import React from 'react'

type NavbarProps = {
  categories: string[]
  activeCategory: string
  onCategoryChange: (value: string) => void
  cartCount: number
  onCartToggle: () => void
  onNavigate: (section: string) => void
  mobileMenuOpen: boolean
  setMobileMenuOpen: (value: boolean) => void
}

const navLinks = ['Home', 'Products', 'Offers', 'Orders', 'About']

export default function Navbar({
  categories,
  activeCategory,
  onCategoryChange,
  cartCount,
  onCartToggle,
  onNavigate,
  mobileMenuOpen,
  setMobileMenuOpen,
}: NavbarProps) {
  

  return (
    <nav className="nav-glass fixed top-0 left-0 right-0 z-50 transition-all duration-300" style={{ backdropFilter: 'blur(30px) saturate(160%)' }}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between" style={{ height: 68 }}>
        <button type="button" onClick={() => onNavigate('Home')} className="flex items-center gap-2">
          <div
            className="flex items-center justify-center rounded-xl font-black text-lg iridescent-border"
            style={{
              width: 42,
              height: 42,
              background: 'linear-gradient(135deg, rgba(0,245,255,0.2), rgba(191,95,255,0.2))',
              border: '1px solid rgba(0,245,255,0.4)',
              fontFamily: 'Orbitron, sans-serif',
              color: '#00f5ff',
              fontSize: '0.85rem',
            }}
          >
            SZ
          </div>
          <span className="font-black tracking-wider" style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '1.05rem', color: '#e8eeff' }}>
            SPORT<span style={{ color: '#00f5ff' }}>ZONE</span>
          </span>
        </button>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map(link => (
            <button
              key={link}
              type="button"
              onClick={() => {
                onNavigate(link)
                setMobileMenuOpen(false)
              }}
              className="text-sm font-medium transition-all duration-200 hover:text-cyan-400"
              style={{
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                fontFamily: 'Rajdhani, sans-serif',
                letterSpacing: '0.08em',
                fontSize: '0.9rem',
                fontWeight: 600,
                color: 'rgba(220,230,255,0.75)',
              }}
            >
              {link}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          


          <button
            type="button"
            className="relative flex items-center justify-center rounded-xl transition-all duration-200"
            onClick={onCartToggle}
            style={{
              width: 42,
              height: 42,
              background: 'rgba(0,245,255,0.1)',
              border: '1px solid rgba(0,245,255,0.25)',
              color: '#00f5ff',
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
            {cartCount > 0 && (
              <span
                className="absolute -top-1 -right-1 rounded-full text-xs font-bold flex items-center justify-center"
                style={{ width: 18, height: 18, background: '#bf5fff', color: '#fff', fontSize: '0.65rem' }}
              >
                {cartCount}
              </span>
            )}
          </button>

          <button
            className="md:hidden flex flex-col gap-1.5 p-2"
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {[0, 1, 2].map(i => (
              <span key={i} style={{ width: 20, height: 2, background: '#00f5ff', display: 'block', borderRadius: 2 }} />
            ))}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden px-6 pb-4 flex flex-col gap-3" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          {navLinks.map(link => (
            <button
              key={link}
              type="button"
              onClick={() => {
                onNavigate(link)
                setMobileMenuOpen(false)
              }}
              style={{
                fontFamily: 'Rajdhani, sans-serif',
                fontWeight: 600,
                color: 'rgba(220,230,255,0.8)',
                fontSize: '1rem',
                letterSpacing: '0.06em',
                background: 'transparent',
                border: 'none',
                textAlign: 'left',
                padding: 0,
                cursor: 'pointer',
              }}
            >
              {link}
            </button>
          ))}

          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <button
                key={category}
                type="button"
                onClick={() => {
                  onCategoryChange(category)
                  setMobileMenuOpen(false)
                }}
                className="px-4 py-2 rounded-2xl text-sm transition-all duration-200"
                style={{
                  border: '1px solid rgba(255,255,255,0.1)',
                  background: activeCategory === category ? 'rgba(0,245,255,0.16)' : 'transparent',
                  color: activeCategory === category ? '#00f5ff' : 'rgba(220,230,255,0.8)',
                  fontFamily: 'Inter, sans-serif',
                }}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}
