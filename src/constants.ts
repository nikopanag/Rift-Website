export const COLORS = {
  bg: '#060a17',
  card: 'rgba(255,255,255,0.025)',
  border: 'rgba(255,255,255,0.06)',
  blue: '#3b82f6',
  cyan: '#06b6d4',
  text: '#ffffff',
  muted: 'rgba(255,255,255,0.45)',
  dim: 'rgba(255,255,255,0.25)',
} as const;

export const GRADIENT = `linear-gradient(135deg, ${COLORS.blue}, ${COLORS.cyan})`;

export const GRADIENT_TEXT: React.CSSProperties = {
  background: GRADIENT,
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
};

export interface Feature {
  icon: string;
  title: string;
  desc: string;
}

export interface ApiDeal {
  dealID: string;
  title: string;
  salePrice: string;
  normalPrice: string;
  savings: string;
  dealRating: string;
  storeID: string;
  storeName: string;
  steamAppID: string;
  metacriticScore: string;
  steamRatingText: string;
  steamRatingPercent: string;
  releaseDate: number;
  thumb: string;
  isOnSale: boolean;
  rift: {
    id: string;
    igdbId: number;
    slug: string;
    coverUrl: string;
    rating: string | null;
    genres: string[];
    matchType: string;
  };
}

export const API_BASE = import.meta.env.VITE_API_URL;

export const FEATURES: Feature[] = [
  { icon: '🔗', title: 'Unified Library', desc: 'Sync your Steam, Epic Games, and GOG libraries into one seamless collection. Every game you own, in a single view.' },
  { icon: '💰', title: 'Deal Aggregation', desc: 'Real-time price comparison across authorized retailers. Never overpay — we find the best deal for you.' },
  { icon: '🔔', title: 'Wishlist Alerts', desc: 'Get notified the moment a wishlisted game drops in price across any store.' },
  { icon: '📅', title: 'Release Calendar', desc: 'Track upcoming releases in one place. Never miss a launch day.' },
  { icon: '📊', title: 'Playtime Tracking', desc: 'Monitor your gaming habits across all platforms at a glance.' },
  { icon: '📖', title: 'Game Pages', desc: 'Rich detail pages — reviews, metadata, screenshots, and where to buy.' },
];

