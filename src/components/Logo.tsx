import { COLORS } from '../constants';

interface LogoProps {
  size?: number;
}

export function Logo({ size = 40 }: LogoProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <defs>
        <linearGradient id="riftGrad" x1="0" y1="0" x2="48" y2="48">
          <stop offset="0%" stopColor={COLORS.blue} />
          <stop offset="100%" stopColor={COLORS.cyan} />
        </linearGradient>
      </defs>
      <rect x="2" y="2" width="44" height="44" rx="10" fill={COLORS.bg} stroke="url(#riftGrad)" strokeWidth="2" />
      <path d="M14 12 L24 8 L34 12 L34 36 L24 40 L14 36Z" fill="none" stroke="url(#riftGrad)" strokeWidth="2" strokeLinejoin="round" />
      <path d="M14 24 L24 20 L34 24" fill="none" stroke="url(#riftGrad)" strokeWidth="1.5" opacity="0.6" />
      <circle cx="24" cy="24" r="3" fill="url(#riftGrad)" opacity="0.9" />
    </svg>
  );
}
