import { useState } from 'react';
import { Glow } from './Glow';
import { DEALS, COLORS, type Deal } from '../constants';

function DealCard({ deal }: { deal: Deal }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        minWidth: 210,
        padding: 20,
        borderRadius: 14,
        background: COLORS.card,
        border: `1px solid ${hovered ? 'rgba(59,130,246,0.3)' : COLORS.border}`,
        flexShrink: 0,
        transform: hovered ? 'translateY(-3px)' : 'translateY(0)',
        transition: 'all 0.3s ease',
      }}
    >
      <div
        style={{
          width: '100%',
          height: 90,
          borderRadius: 10,
          background: 'linear-gradient(135deg, rgba(59,130,246,0.12), rgba(6,182,212,0.08))',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 14,
          color: 'rgba(255,255,255,0.3)',
          marginBottom: 14,
          fontWeight: 600,
          letterSpacing: '0.05em',
        }}
      >
        {deal.store.toUpperCase()}
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <div style={{ fontWeight: 700, fontSize: 15, color: '#fff' }}>{deal.title}</div>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)', marginTop: 3 }}>
            {deal.store}
          </div>
        </div>
        <div
          style={{
            padding: '3px 8px',
            borderRadius: 6,
            background: 'rgba(34,197,94,0.1)',
            color: '#4ade80',
            fontWeight: 700,
            fontSize: 12,
          }}
        >
          {deal.discount}
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 12 }}>
        <span style={{ fontWeight: 800, fontSize: 20, color: '#fff' }}>{deal.price}</span>
        <span
          style={{
            fontSize: 13,
            color: 'rgba(255,255,255,0.25)',
            textDecoration: 'line-through',
          }}
        >
          {deal.original}
        </span>
      </div>
    </div>
  );
}

export function Deals() {
  return (
    <section id="deals" style={{ padding: '80px 24px', position: 'relative', overflow: 'hidden' }}>
      <Glow color={COLORS.blue} style={{ top: '10%', left: '-5%', width: 400, height: 400, opacity: 0.08 }} />

      <div style={{ maxWidth: 1100, margin: '0 auto', position: 'relative', zIndex: 2 }}>
        <div style={{ marginBottom: 40 }}>
          <h2 style={{ fontWeight: 800, fontSize: 40, margin: '0 0 12px 0' }}>Best Deals, Always</h2>
          <p style={{ fontSize: 17, color: COLORS.muted, maxWidth: 460 }}>
            We compare prices across 30+ authorized stores so you don't have to.
          </p>
        </div>

        <div style={{ display: 'flex', gap: 14, overflowX: 'auto', paddingBottom: 16 }}>
          {DEALS.map((deal, i) => (
            <DealCard key={i} deal={deal} />
          ))}
        </div>

        {/* Wishlist callout */}
        <div
          style={{
            marginTop: 28,
            padding: 24,
            borderRadius: 14,
            background: 'rgba(59,130,246,0.04)',
            border: '1px solid rgba(59,130,246,0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 16,
          }}
        >
          <div>
            <div style={{ fontWeight: 700, fontSize: 17 }}>Wishlist a game, set your price.</div>
            <div style={{ fontSize: 14, color: COLORS.muted, marginTop: 4 }}>
              We notify you the instant it drops. Across every store. Automatically.
            </div>
          </div>
          <div style={{ color: '#60a5fa', fontWeight: 600, fontSize: 14 }}>
            Smart Alerts Built In
          </div>
        </div>
      </div>
    </section>
  );
}
