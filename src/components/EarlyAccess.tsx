import { useState } from 'react';
import { Logo } from './Logo';
import { Glow } from './Glow';
import { COLORS } from '../constants';

export function EarlyAccess() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleJoin = async () => {
    if (!email.includes('@') || !email.includes('.')) return;

    setStatus('submitting');
    try {
      const res = await fetch('https://formspree.io/f/xgolzodq', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <section
      id="early-access"
      style={{ padding: '100px 24px', position: 'relative', overflow: 'visible' }}
    >
      <Glow color={COLORS.blue} style={{ top: '-20%', right: '-8%', opacity: 0.08 }} />

      <div
        style={{
          maxWidth: 560,
          margin: '0 auto',
          textAlign: 'center',
          position: 'relative',
          zIndex: 2,
        }}
      >
        <div
          style={{
            width: 64,
            height: 64,
            margin: '0 auto 24px auto',
            borderRadius: 16,
            background: 'linear-gradient(135deg, rgba(59,130,246,0.12), rgba(6,182,212,0.08))',
            border: '1px solid rgba(59,130,246,0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Logo size={36} />
        </div>

        <h2 style={{ fontWeight: 800, fontSize: 40, margin: '0 0 12px 0' }}>Get Early Access</h2>
        <p
          style={{
            fontSize: 17,
            color: COLORS.muted,
            lineHeight: 1.65,
            margin: '0 0 36px 0',
          }}
        >
          Be the first to experience Rift. Join the waitlist and help shape the
          future of game management.
        </p>

        {status === 'success' ? (
          <div
            style={{
              padding: '16px 24px',
              borderRadius: 12,
              background: 'rgba(34,197,94,0.08)',
              border: '1px solid rgba(34,197,94,0.2)',
              color: '#4ade80',
              fontSize: 16,
              fontWeight: 500,
            }}
          >
            You are on the list! We will be in touch soon.
          </div>
        ) : (
          <div
            style={{
              display: 'flex',
              gap: 10,
              maxWidth: 440,
              margin: '0 auto',
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}
          >
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleJoin();
              }}
              disabled={status === 'submitting'}
              style={{
                flex: 1,
                minWidth: 220,
                padding: '14px 18px',
                borderRadius: 10,
                border: '1px solid rgba(255,255,255,0.1)',
                background: 'rgba(255,255,255,0.04)',
                color: '#ffffff',
                fontSize: 15,
                outline: 'none',
                fontFamily: 'inherit',
                opacity: status === 'submitting' ? 0.6 : 1,
              }}
            />
            <button
              onClick={handleJoin}
              disabled={status === 'submitting'}
              style={{
                padding: '14px 28px',
                borderRadius: 10,
                border: 'none',
                background: `linear-gradient(135deg, ${COLORS.blue}, #2563eb)`,
                color: '#ffffff',
                fontWeight: 700,
                fontSize: 15,
                cursor: status === 'submitting' ? 'wait' : 'pointer',
                fontFamily: 'inherit',
                boxShadow: '0 0 30px rgba(59,130,246,0.25)',
                transition: 'all 0.25s',
                opacity: status === 'submitting' ? 0.7 : 1,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 0 50px rgba(59,130,246,0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 0 30px rgba(59,130,246,0.25)';
              }}
            >
              {status === 'submitting' ? 'Joining...' : 'Join Waitlist'}
            </button>
          </div>
        )}

        {status === 'error' && (
          <p style={{ fontSize: 13, color: '#f87171', marginTop: 12 }}>
            Something went wrong. Please try again.
          </p>
        )}

        <p style={{ fontSize: 12, color: COLORS.dim, marginTop: 16 }}>
          No spam. Just early access updates and launch notifications.
        </p>
      </div>
    </section>
  );
}
