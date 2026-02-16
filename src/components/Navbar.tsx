import { useState, useEffect } from 'react';
import { Logo } from './Logo';
import { GRADIENT_TEXT } from '../constants';

const NAV_LINKS = ['Features', 'Deals', 'Early Access'];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        height: 64,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 32px',
        background: scrolled ? 'rgba(6,10,23,0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(59,130,246,0.08)' : '1px solid transparent',
        transition: 'all 0.35s ease',
      }}
    >
      <a href="#" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <Logo size={32} />
        <span style={{ fontWeight: 800, fontSize: 20, letterSpacing: '0.08em', ...GRADIENT_TEXT }}>
          RIFT
        </span>
      </a>

      <div style={{ display: 'flex', gap: 28 }}>
        {NAV_LINKS.map((label) => (
          <a
            key={label}
            href={`#${label.toLowerCase().replace(' ', '-')}`}
            style={{
              color: 'rgba(255,255,255,0.55)',
              fontSize: 14,
              fontWeight: 500,
              transition: 'color 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#3b82f6')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.55)')}
          >
            {label}
          </a>
        ))}
      </div>
    </nav>
  );
}
