import { useState, useEffect } from 'react';
import { Glow } from './Glow';
import { COLORS, GRADIENT_TEXT } from '../constants';

export function Hero() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '120px 24px 80px',
        overflow: 'hidden',
      }}
    >
      <Glow color={COLORS.blue} style={{ top: '-10%', left: '-10%', width: 600, height: 600 }} />
      <Glow color={COLORS.cyan} style={{ bottom: '-5%', right: '-5%', opacity: 0.08 }} />

      {/* Grid background */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'linear-gradient(rgba(59,130,246,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.03) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
          opacity: 0.5,
        }}
      />

      <div
        style={{
          position: 'relative',
          zIndex: 2,
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(30px)',
          transition: 'all 0.9s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {/* Badge */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            padding: '6px 16px',
            borderRadius: 100,
            border: '1px solid rgba(59,130,246,0.25)',
            background: 'rgba(59,130,246,0.08)',
            fontSize: 13,
            color: '#60a5fa',
            fontWeight: 500,
            marginBottom: 32,
          }}
        >
          <span
            style={{
              display: 'inline-block',
              width: 7,
              height: 7,
              borderRadius: '50%',
              background: COLORS.blue,
              animation: 'pulse 2s infinite',
            }}
          />
          Early Access Coming Soon
        </div>

        {/* Heading */}
        <h1
          style={{
            fontWeight: 800,
            fontSize: 'clamp(44px, 7vw, 80px)',
            lineHeight: 1.08,
            margin: '0 0 20px 0',
            letterSpacing: '-0.03em',
          }}
        >
          One Launcher.
          <br />
          <span
            style={{
              ...GRADIENT_TEXT,
              backgroundSize: '200% 200%',
              animation: 'shimmer 4s ease infinite',
            }}
          >
            Every Deal.
          </span>
        </h1>

        {/* Subtitle */}
        <p
          style={{
            fontSize: 'clamp(16px, 2vw, 19px)',
            color: COLORS.muted,
            maxWidth: 520,
            margin: '0 auto 40px auto',
            lineHeight: 1.7,
          }}
        >
          Your Steam, Epic, and GOG libraries — unified. The best game deals
          across every store — aggregated. Stop switching. Start playing.
        </p>

        {/* CTAs */}
        <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
          <a
            href="#early-access"
            style={{
              display: 'inline-block',
              padding: '14px 32px',
              borderRadius: 10,
              background: `linear-gradient(135deg, ${COLORS.blue}, #2563eb)`,
              color: '#fff',
              fontWeight: 600,
              fontSize: 15,
              boxShadow: '0 0 40px rgba(59,130,246,0.3)',
              transition: 'all 0.25s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 0 60px rgba(59,130,246,0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 0 40px rgba(59,130,246,0.3)';
            }}
          >
            Join Early Access
          </a>
          <a
            href="#features"
            style={{
              display: 'inline-block',
              padding: '14px 32px',
              borderRadius: 10,
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.1)',
              color: 'rgba(255,255,255,0.7)',
              fontWeight: 500,
              fontSize: 15,
              transition: 'all 0.25s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'rgba(59,130,246,0.3)';
              e.currentTarget.style.color = '#fff';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
              e.currentTarget.style.color = 'rgba(255,255,255,0.7)';
            }}
          >
            See Features
          </a>
        </div>
      </div>

      {/* Platform badges */}
      <div
        style={{
          display: 'flex',
          gap: 32,
          marginTop: 60,
          opacity: visible ? 0.4 : 0,
          transition: 'opacity 1.2s ease 0.6s',
          position: 'relative',
          zIndex: 2,
        }}
      >
        {['STEAM', 'EPIC GAMES', 'GOG'].map((p) => (
          <span
            key={p}
            style={{
              fontSize: 11,
              letterSpacing: '0.12em',
              color: 'rgba(255,255,255,0.4)',
              fontWeight: 600,
            }}
          >
            {p}
          </span>
        ))}
      </div>
    </section>
  );
}
