import { useState, useEffect, useRef } from 'react';
import { Glow } from './Glow';
import { COLORS, API_BASE, type ApiDeal } from '../constants';

interface StoreInfo {
  storeID: string;
  storeName: string;
  images: { banner: string; logo: string; icon: string };
}

/* ─── Arrow Button ─── */
function ArrowButton({ direction, disabled, onClick }: {
  direction: 'left' | 'right';
  disabled: boolean;
  onClick: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: 40,
        height: 40,
        borderRadius: '50%',
        background: disabled
          ? 'rgba(255,255,255,0.03)'
          : hovered
            ? 'rgba(255,255,255,0.14)'
            : 'rgba(255,255,255,0.07)',
        border: `1px solid ${disabled ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.12)'}`,
        color: disabled ? 'rgba(255,255,255,0.15)' : '#fff',
        cursor: disabled ? 'default' : 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 20,
        padding: 0,
        transition: 'all 0.2s ease',
      }}
    >
      {direction === 'left' ? '\u2039' : '\u203A'}
    </button>
  );
}

/* ─── Deal Card ─── */
function DealCard({ deal, width, storeMap }: {
  deal: ApiDeal;
  width: number;
  storeMap: Record<string, StoreInfo>;
}) {
  const [hovered, setHovered] = useState(false);
  const discount = Math.round(parseFloat(deal.savings));
  const salePrice = parseFloat(deal.salePrice);
  const normalPrice = parseFloat(deal.normalPrice);
  const store = storeMap[deal.storeID];
  const coverHeight = Math.round(width * 1.33);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width,
        minWidth: width,
        flexShrink: 0,
        borderRadius: 14,
        background: COLORS.card,
        border: `1px solid ${hovered ? 'rgba(59,130,246,0.25)' : COLORS.border}`,
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        boxShadow: hovered ? '0 8px 30px rgba(59,130,246,0.08)' : 'none',
        transition: 'all 0.3s ease',
        overflow: 'hidden',
      }}
    >
      {/* Clean cover — no overlays */}
      <div style={{
        width: '100%',
        height: coverHeight,
        background: 'linear-gradient(135deg, rgba(59,130,246,0.12), rgba(6,182,212,0.08))',
        overflow: 'hidden',
      }}>
        {deal.rift?.coverUrl ? (
          <img
            src={deal.rift.coverUrl}
            alt={deal.title}
            loading="lazy"
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
        ) : (
          <div style={{
            width: '100%', height: '100%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 14, color: 'rgba(255,255,255,0.3)', fontWeight: 600, letterSpacing: '0.05em',
          }}>
            {deal.storeName.toUpperCase()}
          </div>
        )}
      </div>

      <div style={{ padding: '12px 14px 14px' }}>
        {/* Title */}
        <div
          style={{
            fontWeight: 700, fontSize: 14, color: '#fff',
            whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
          }}
          title={deal.title}
        >
          {deal.title}
        </div>

        {/* Store logo + name */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 8 }}>
          {store?.images?.icon && (
            <img
              src={store.images.icon}
              alt={deal.storeName}
              style={{ width: 16, height: 16, borderRadius: 3, flexShrink: 0 }}
            />
          )}
          <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', fontWeight: 600 }}>
            {deal.storeName}
          </span>
        </div>

        {/* Price line: sale price, original, discount % */}
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginTop: 10 }}>
          <span style={{ fontWeight: 800, fontSize: 18, color: '#fff' }}>
            {salePrice === 0 ? 'Free' : `$${salePrice.toFixed(2)}`}
          </span>
          {discount > 0 && normalPrice > 0 && salePrice !== normalPrice && (
            <>
              <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.25)', textDecoration: 'line-through' }}>
                ${normalPrice.toFixed(2)}
              </span>
              <span style={{ fontSize: 12, color: '#22c55e', fontWeight: 600 }}>
                -{discount}%
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─── Skeleton ─── */
function DealSkeleton({ width }: { width: number }) {
  const coverHeight = Math.round(width * 1.33);
  return (
    <div style={{
      width, minWidth: width, flexShrink: 0, borderRadius: 14,
      background: COLORS.card, border: `1px solid ${COLORS.border}`, overflow: 'hidden',
    }}>
      <div style={{
        width: '100%', height: coverHeight,
        background: 'linear-gradient(135deg, rgba(59,130,246,0.06), rgba(6,182,212,0.04))',
        animation: 'shimmer 2s infinite',
      }} />
      <div style={{ padding: '12px 14px 14px' }}>
        <div style={{ width: '80%', height: 14, borderRadius: 4, background: 'rgba(255,255,255,0.06)' }} />
        <div style={{ width: '55%', height: 12, borderRadius: 4, background: 'rgba(255,255,255,0.04)', marginTop: 10 }} />
        <div style={{ width: '45%', height: 18, borderRadius: 4, background: 'rgba(255,255,255,0.06)', marginTop: 12 }} />
      </div>
    </div>
  );
}

/* ─── Main Deals Section ─── */
export function Deals() {
  const [deals, setDeals] = useState<ApiDeal[]>([]);
  const [storeMap, setStoreMap] = useState<Record<string, StoreInfo>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [containerWidth, setContainerWidth] = useState(1300);
  const trackRef = useRef<HTMLDivElement>(null);

  const gap = 14;
  const visibleCount = containerWidth >= 1000 ? 5 : containerWidth >= 700 ? 3 : 2;
  const cardWidth = (containerWidth - (visibleCount - 1) * gap) / visibleCount;
  const maxIndex = Math.max(0, deals.length - visibleCount);
  const offset = currentIndex * (cardWidth + gap);

  /* Measure container */
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const observer = new ResizeObserver((entries) => {
      setContainerWidth(entries[0].contentRect.width);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  /* Clamp index when resize changes visibleCount */
  useEffect(() => {
    setCurrentIndex((prev) => Math.min(prev, maxIndex));
  }, [maxIndex]);

  /* Fetch deals + stores in parallel */
  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    Promise.all([
      fetch(`${API_BASE}/api/deals/top`, { signal, cache: 'no-store' }).then((r) => {
        if (!r.ok) throw new Error(`API error: ${r.status}`);
        return r.json();
      }),
      fetch(`${API_BASE}/api/deals/stores`, { signal, cache: 'no-store' })
        .then((r) => (r.ok ? r.json() : { data: [] })),
    ])
      .then(([dealsData, storesData]) => {
        const items: ApiDeal[] = Array.isArray(dealsData) ? dealsData : dealsData.data ?? [];
        setDeals(items.slice(0, 20));

        const stores: StoreInfo[] = Array.isArray(storesData) ? storesData : storesData.data ?? [];
        const map: Record<string, StoreInfo> = {};
        for (const s of stores) map[s.storeID] = s;
        setStoreMap(map);

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

  const goLeft = () => setCurrentIndex((prev) => Math.max(0, prev - visibleCount));
  const goRight = () => setCurrentIndex((prev) => Math.min(maxIndex, prev + visibleCount));

  return (
    <section id="deals" style={{ padding: '80px 24px', position: 'relative', overflow: 'visible' }}>
      <Glow color={COLORS.blue} style={{ top: '10%', left: '-5%', width: 400, height: 400, opacity: 0.08 }} />

      <div style={{ maxWidth: 1300, margin: '0 auto', position: 'relative', zIndex: 2 }}>
        {/* Header + arrows */}
        <div style={{
          display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
          marginBottom: 32, flexWrap: 'wrap', gap: 16,
        }}>
          <div>
            <h2 style={{ fontWeight: 800, fontSize: 40, margin: '0 0 12px 0' }}>Best Deals, Always</h2>
            <p style={{ fontSize: 17, color: COLORS.muted, maxWidth: 460, margin: 0 }}>
              We compare prices across 30+ authorized stores so you don't have to.
            </p>
          </div>
          {!loading && !error && deals.length > visibleCount && (
            <div style={{ display: 'flex', gap: 8 }}>
              <ArrowButton direction="left" disabled={currentIndex === 0} onClick={goLeft} />
              <ArrowButton direction="right" disabled={currentIndex >= maxIndex} onClick={goRight} />
            </div>
          )}
        </div>

        {/* Carousel */}
        <div ref={trackRef} style={{ overflow: 'hidden', paddingTop: 8 }}>
          <div style={{
            display: 'flex',
            gap,
            transform: `translateX(-${offset}px)`,
            transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          }}>
            {loading
              ? Array.from({ length: visibleCount }).map((_, i) => (
                <DealSkeleton key={i} width={cardWidth} />
              ))
              : error
                ? (
                  <div style={{ color: COLORS.muted, fontSize: 15, padding: '40px 0' }}>
                    {error}. Deals will appear here once the service is available.
                  </div>
                )
                : deals.map((deal) => (
                  <DealCard key={deal.dealID} deal={deal} width={cardWidth} storeMap={storeMap} />
                ))}
          </div>
        </div>

        {/* Wishlist callout */}
        <div
          style={{
            marginTop: 28, padding: 24, borderRadius: 14,
            background: 'rgba(59,130,246,0.04)', border: '1px solid rgba(59,130,246,0.1)',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            flexWrap: 'wrap', gap: 16,
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
