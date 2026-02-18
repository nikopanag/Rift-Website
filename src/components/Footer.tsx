import { Logo } from './Logo';
import { COLORS } from '../constants';

export function Footer() {
  return (
    <footer
      style={{
        padding: '40px 32px',
        borderTop: '1px solid rgba(255,255,255,0.04)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        maxWidth: 1300,
        margin: '0 auto',
        flexWrap: 'wrap',
        gap: 16,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <Logo size={24} />
        <span
          style={{
            fontWeight: 700,
            fontSize: 15,
            color: 'rgba(255,255,255,0.35)',
            letterSpacing: '0.06em',
          }}
        >
          RIFT
        </span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap' }}>
        <div style={{ fontSize: 12, color: COLORS.dim }}>
          Game data provided by{' '}
          <a
            href="https://www.igdb.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'rgba(255,255,255,0.4)', textDecoration: 'none' }}
          >
            IGDB
          </a>
        </div>
        <div style={{ fontSize: 13, color: COLORS.dim }}>
          &copy; {new Date().getFullYear()} Rift Launcher. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
