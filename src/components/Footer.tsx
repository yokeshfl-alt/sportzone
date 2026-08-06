export default function Footer() {
  return (
    <footer id="footer" className="py-12 px-6" style={{ borderTop: '1px solid rgba(255,255,255,0.07)', background: 'rgba(6,8,24,0.8)' }}>
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center justify-center rounded-xl font-black" style={{ width: 36, height: 36, background: 'linear-gradient(135deg, rgba(0,245,255,0.2), rgba(191,95,255,0.2))', border: '1px solid rgba(0,245,255,0.3)', fontFamily: 'Orbitron, sans-serif', color: '#00f5ff', fontSize: '0.75rem' }}>
              SZ
            </div>
            <span style={{ fontFamily: 'Orbitron, sans-serif', fontWeight: 700, fontSize: '1rem', color: '#e8eeff' }}>
              SPORT<span style={{ color: '#00f5ff' }}>ZONE</span>
            </span>
          </div>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.85rem', color: 'rgba(200,210,240,0.45)', lineHeight: 1.7 }}>
            Your one-stop destination for premium sports equipment across India.
          </p>
        </div>

        {[
          { title: 'Products', links: ['Badminton Bats', 'Cricket Bats', 'Kit Bags', 'Volleyballs', 'Stumper Balls', 'Cosco Balls', 'Shuttlecocks'] },
          { title: 'Company', links: ['About Us', 'Careers', 'Blog', 'Press'] },
          { title: 'Support', links: ['Track Order', 'Returns', 'Contact Us', 'FAQ', 'Size Guide'] },
        ].map(col => (
          <div key={col.title}>
            <h4 className="font-bold mb-4" style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: '0.95rem', letterSpacing: '0.08em', color: 'rgba(255,255,255,0.85)', textTransform: 'uppercase' }}>
              {col.title}
            </h4>
            <ul className="flex flex-col gap-2">
              {col.links.map(link => (
                <li key={link}>
                  <a href="#" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.85rem', color: 'rgba(200,210,240,0.45)' }} className="hover:text-cyan-400 transition-colors duration-200">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto mt-10 pt-6 flex flex-col md:flex-row items-center justify-between gap-3" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.8rem', color: 'rgba(200,210,240,0.35)' }}>
          © 2026 SportZone. All rights reserved.
        </p>
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.8rem', color: 'rgba(200,210,240,0.25)' }}>
          Made with passion for champions 🏆
        </p>
      </div>
    </footer>
  )
}
