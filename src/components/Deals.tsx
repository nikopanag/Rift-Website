import { useState, useEffect } from 'react';
import { Glow } from './Glow';
import { COLORS, API_BASE, type ApiDeal } from '../constants';

function DealCard({ deal }: { deal: ApiDeal }) {
  const [hovered, setHovered] = useState(false);
  const discount = Math.round(parseFloat(deal.savings));
  const salePrice = parseFloat(deal.salePrice);
  const normalPrice = parseFloat(deal.normalPrice);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        minWidth: 210,
        width: 210,
        padding: 0,
        borderRadius: 14,
        background: COLORS.card,
        border: `1px solid ${hovered ? 'rgba(59,130,246,0.3)' : COLORS.border}`,
        flexShrink: 0,
        transform: hovered ? 'translateY(-3px)' : 'translateY(0)',
        transition: 'all 0.3s ease',
        overflow: 'hidden',
      }}
    >
      {/* Game cover from IGDB */}
      <div
        style={{
          width: '100%',
          height: 280,
          background: 'linear-gradient(135deg, rgba(59,130,246,0.12), rgba(6,182,212,0.08))',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {deal.rift?.coverUrl ? (
          <img
            src={deal.rift.coverUrl}
            alt={deal.title}
            loading="lazy"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
            }}
          />
        ) : (
          <div
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 14,
              color: 'rgba(255,255,255,0.3)',
              fontWeight: 600,
              letterSpacing: '0.05em',
            }}
          >
            {deal.storeName.toUpperCase()}
          </div>
        )}
        {/* Discount badge */}
        {discount > 0 && (
          <div
            style={{
              position: 'absolute',
              top: 8,
              right: 8,
              padding: '4px 8px',
              borderRadius: 6,
              background: 'rgba(34,197,94,0.9)',
              color: '#fff',
              fontWeight: 700,
              fontSize: 12,
            }}
          >
            -{discount}%
          </div>
        )}
        {salePrice === 0 && (
          <div
            style={{
              position: 'absolute',
              top: 8,
              left: 8,
              padding: '4px 8px',
              borderRadius: 6,
              background: 'rgba(59,130,246,0.9)',
              color: '#fff',
              fontWeight: 700,
              fontSize: 12,
            }}
          >
            FREE
          </div>
        )}
      </div>

      <div style={{ padding: '14px 16px 16px' }}>
        <div
          style={{
            fontWeight: 700,
            fontSize: 14,
            color: '#fff',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
          title={deal.title}
        >
          {deal.title}
        </div>
        <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)', marginTop: 3 }}>
          {deal.storeName}
        </div>

        {deal.rift?.genres?.length > 0 && (
          <div style={{ display: 'flex', gap: 4, marginTop: 6, flexWrap: 'wrap' }}>
            {deal.rift.genres.slice(0, 2).map((genre) => (
              <span
                key={genre}
                style={{
                  fontSize: 10,
                  padding: '2px 6px',
                  borderRadius: 4,
                  background: 'rgba(255,255,255,0.06)',
                  color: 'rgba(255,255,255,0.4)',
                  fontWeight: 500,
                }}
              >
                {genre}
              </span>
            ))}
          </div>
        )}

        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 10 }}>
          <span style={{ fontWeight: 800, fontSize: 18, color: '#fff' }}>
            {salePrice === 0 ? 'Free' : `$${salePrice.toFixed(2)}`}
          </span>
          {discount > 0 && normalPrice > 0 && salePrice !== normalPrice && (
            <span
              style={{
                fontSize: 13,
                color: 'rgba(255,255,255,0.25)',
                textDecoration: 'line-through',
              }}
            >
              ${normalPrice.toFixed(2)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

function DealSkeleton() {
  return (
    <div
      style={{
        minWidth: 210,
        width: 210,
        borderRadius: 14,
        background: COLORS.card,
        border: `1px solid ${COLORS.border}`,
        flexShrink: 0,
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          width: '100%',
          height: 280,
          background: 'linear-gradient(135deg, rgba(59,130,246,0.06), rgba(6,182,212,0.04))',
          animation: 'shimmer 2s infinite',
        }}
      />
      <div style={{ padding: '14px 16px 16px' }}>
        <div
          style={{
            width: '80%',
            height: 14,
            borderRadius: 4,
            background: 'rgba(255,255,255,0.06)',
          }}
        />
        <div
          style={{
            width: '50%',
            height: 10,
            borderRadius: 4,
            background: 'rgba(255,255,255,0.04)',
            marginTop: 8,
          }}
        />
        <div
          style={{
            width: '40%',
            height: 18,
            borderRadius: 4,
            background: 'rgba(255,255,255,0.06)',
            marginTop: 14,
          }}
        />
      </div>
    </div>
  );
}

export function Deals() {
  const [deals, setDeals] = useState<ApiDeal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    fetch(`${API_BASE}/api/deals/top`, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error(`API error: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        const items: ApiDeal[] = Array.isArray(data) ? data : data.data ?? [];
        setDeals(items.slice(0, 12));
        setLoading(false);
      })
      .catch((err) => {
        if (err.name !== 'AbortError') {
          setError('Failed to load deals');
          setLoading(false);
        }
      });

    return () => controller.abort();
  }, []);

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

        <div
          style={{
            display: 'flex',
            gap: 14,
            overflowX: 'auto',
            paddingBottom: 16,
          }}
        >
          {loading
            ? Array.from({ length: 5 }).map((_, i) => <DealSkeleton key={i} />)
            : error
              ? (
                <div style={{ color: COLORS.muted, fontSize: 15, padding: '40px 0' }}>
                  {error}. Deals will appear here once the service is available.
                </div>
              )
              : deals.map((deal) => <DealCard key={deal.dealID} deal={deal} />)}
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
