import { Counter } from './Counter';
import { GRADIENT_TEXT } from '../constants';

const STATS = [
  { target: 50000, suffix: '+', label: 'Games Tracked' },
  { target: 30, suffix: '+', label: 'Store Partners' },
  { target: 3, suffix: '', label: 'Platforms Synced' },
];

export function Stats() {
  return (
    <section
      style={{
        display: 'flex',
        justifyContent: 'center',
        gap: 64,
        padding: '0 24px 80px',
        flexWrap: 'wrap',
      }}
    >
      {STATS.map((stat) => (
        <div key={stat.label} style={{ textAlign: 'center' }}>
          <div style={{ fontWeight: 800, fontSize: 44, ...GRADIENT_TEXT }}>
            <Counter target={stat.target} suffix={stat.suffix} />
          </div>
          <div
            style={{
              fontSize: 12,
              color: 'rgba(255,255,255,0.35)',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              marginTop: 6,
              fontWeight: 600,
            }}
          >
            {stat.label}
          </div>
        </div>
      ))}
    </section>
  );
}
