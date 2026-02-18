import { useState, useEffect } from 'react';
import { FEATURES, COLORS, type Feature } from '../constants';

function FeatureCard({ feature }: { feature: Feature }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: 28,
        borderRadius: 14,
        background: hovered ? 'rgba(59,130,246,0.04)' : COLORS.card,
        border: `1px solid ${hovered ? 'rgba(59,130,246,0.2)' : COLORS.border}`,
        transform: hovered ? 'translateY(-3px)' : 'translateY(0)',
        transition: 'all 0.3s ease',
        cursor: 'default',
      }}
    >
      <div style={{ fontSize: 28, marginBottom: 14 }}>{feature.icon}</div>
      <h3 style={{ fontWeight: 700, fontSize: 18, color: '#fff', margin: '0 0 8px 0' }}>
        {feature.title}
      </h3>
      <p style={{ fontSize: 14, color: COLORS.muted, lineHeight: 1.65, margin: 0 }}>
        {feature.desc}
      </p>
    </div>
  );
}

export function Features() {
  const [cols, setCols] = useState(3);

  useEffect(() => {
    const update = () => setCols(window.innerWidth >= 900 ? 3 : window.innerWidth >= 600 ? 2 : 1);
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  return (
    <section id="features" style={{ padding: '80px 24px', maxWidth: 1300, margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: 56 }}>
        <h2 style={{ fontWeight: 800, fontSize: 40, margin: '0 0 12px 0' }}>
          Everything in One Place
        </h2>
        <p style={{ fontSize: 17, color: COLORS.muted, maxWidth: 460, margin: '0 auto' }}>
          Built for gamers who want less friction and better prices.
        </p>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${cols}, 1fr)`,
          gridAutoRows: '1fr',
          gap: 18,
        }}
      >
        {FEATURES.map((f, i) => (
          <FeatureCard key={i} feature={f} />
        ))}
      </div>
    </section>
  );
}
