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

export interface Deal {
  title: string;
  store: string;
  price: string;
  original: string;
  discount: string;
}

export const FEATURES: Feature[] = [
  { icon: '🔗', title: 'Unified Library', desc: 'Sync your Steam, Epic Games, and GOG libraries into one seamless collection. Every game you own, in a single view.' },
  { icon: '💰', title: 'Deal Aggregation', desc: 'Real-time price comparison across authorized retailers. Never overpay — we find the best deal for you.' },
  { icon: '🔔', title: 'Wishlist Alerts', desc: 'Get notified the moment a wishlisted game drops in price across any store.' },
  { icon: '📅', title: 'Release Calendar', desc: 'Track upcoming releases in one place. Never miss a launch day.' },
  { icon: '📊', title: 'Playtime Tracking', desc: 'Monitor your gaming habits across all platforms at a glance.' },
  { icon: '📖', title: 'Game Pages', desc: 'Rich detail pages — reviews, metadata, screenshots, and where to buy.' },
];

export const DEALS: Deal[] = [
  { title: 'Elden Ring', store: 'Steam', price: '$23.99', original: '$59.99', discount: '-60%' },
  { title: "Baldur's Gate 3", store: 'GOG', price: '$35.99', original: '$59.99', discount: '-40%' },
  { title: 'Cyberpunk 2077', store: 'Epic', price: '$14.99', original: '$49.99', discount: '-70%' },
  { title: 'Hades II', store: 'Steam', price: '$19.49', original: '$29.99', discount: '-35%' },
  { title: 'Disco Elysium', store: 'GOG', price: '$9.99', original: '$39.99', discount: '-75%' },
];
