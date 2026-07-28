'use client';

import { useState } from 'react';
import styles from './VisualDiffDemo.module.css';

const diffAnnotations = {
  without: [
    { label: 'background', value: '#ffffff' },
    { label: 'font', value: 'Arial, sans-serif' },
    { label: 'button', value: '#2563EB solid fill' },
    { label: 'image', value: 'static placeholder' },
    { label: 'border', value: '1px solid #e5e7eb' },
  ],
  with: [
    { label: 'background', value: '--color-surface (glass)' },
    { label: 'font', value: 'Inter — weight 500 / 400' },
    { label: 'button', value: 'white fill, outside glass' },
    { label: 'image', value: 'animate-float, 6s loop' },
    { label: 'border', value: '--color-border (rgba white)' },
  ],
};

function WithoutCard() {
  return (
    <div style={{
      background: '#ffffff',
      border: '1px solid #e5e7eb',
      borderRadius: '8px',
      padding: '1.25rem',
      width: '100%',
      height: '100%',
      boxSizing: 'border-box',
      fontFamily: 'Arial, sans-serif',
      boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
      display: 'flex',
      flexDirection: 'column',
    }}>
      <div style={{
        background: '#f3f4f6',
        borderRadius: '4px',
        height: '160px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '0.75rem',
        color: '#9ca3af',
        fontSize: '0.75rem',
        flexShrink: 0,
      }}>
        product image
      </div>
      <p style={{ fontFamily: 'Arial', fontSize: '1rem', fontWeight: 600, color: '#111827', margin: '0 0 0.25rem' }}>
        Esmeralda 2026 Tee
      </p>
      <p style={{ fontFamily: 'Arial', fontSize: '1rem', color: '#374151', margin: '0 0 0.75rem' }}>
        $45.00
      </p>
      <button style={{
        width: '100%',
        background: '#2563EB',
        color: '#ffffff',
        border: 'none',
        borderRadius: '6px',
        padding: '0.6rem',
        fontFamily: 'Arial',
        fontSize: '0.875rem',
        cursor: 'pointer',
      }}>
        Add to Cart
      </button>
    </div>
  );
}

function WithCard() {
  return (
    <div style={{
      borderRadius: '1rem',
      overflow: 'hidden',
      backgroundImage: 'url(/images/tessaverse/edge-city-goods/component background.png)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      padding: '1rem',
      height: '100%',
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column',
    }}>
      <div style={{
        background: 'rgba(255,255,255,0.15)',
        border: '1px solid rgba(255,255,255,0.20)',
        borderRadius: '1rem',
        padding: '1.25rem',
        width: '100%',
        flex: 1,
        backdropFilter: 'blur(16px) saturate(120%)',
        display: 'flex',
        flexDirection: 'column',
      }}>
        <div style={{
          height: '160px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '0.75rem',
          flexShrink: 0,
        }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/tessaverse/edge-city-goods/coral shirt front.png"
            alt="Coral shirt"
            className={styles.floatingShirt}
            style={{ height: '130px', objectFit: 'contain' }}
          />
        </div>
        <p style={{ fontFamily: 'var(--font-sans, Inter, sans-serif)', fontSize: '1.1rem', fontWeight: 500, color: '#ffffff', margin: '0 0 0.25rem', textAlign: 'center' }}>
          Esmeralda 2026 Tee
        </p>
        <p style={{ fontFamily: 'var(--font-sans, Inter, sans-serif)', fontSize: '0.875rem', fontWeight: 400, color: 'rgba(255,255,255,0.5)', margin: '0 0 0.75rem', textAlign: 'center' }}>
          $45.00
        </p>
      </div>
      <button style={{
        width: '100%',
        background: '#ffffff',
        color: '#757575',
        border: 'none',
        borderRadius: '8px',
        padding: '0.65rem 1rem',
        fontFamily: 'var(--font-sans, Inter, sans-serif)',
        fontSize: '0.875rem',
        fontWeight: 600,
        letterSpacing: '0.06em',
        textTransform: 'uppercase',
        cursor: 'pointer',
        marginTop: '0.75rem',
        flexShrink: 0,
      }}>
        add to cart
      </button>
    </div>
  );
}

export function VisualDiffDemo() {
  const [active, setActive] = useState<'without' | 'with'>('without');

  return (
    <div className={styles.diffWrap}>
      <div className={styles.diffToggleRow}>
        <button
          className={`${styles.diffToggleBtn} ${active === 'without' ? styles.diffToggleBtnActive : ''}`}
          onClick={() => setActive('without')}
        >
          without DESIGN.md
        </button>
        <button
          className={`${styles.diffToggleBtn} ${active === 'with' ? styles.diffToggleBtnActive : ''}`}
          onClick={() => setActive('with')}
        >
          with DESIGN.md
        </button>
      </div>

      <div className={styles.diffScene}>
        <div className={styles.diffLayout}>
          <div className={styles.diffCardWrap}>
            {active === 'without' ? <WithoutCard /> : <WithCard />}
          </div>
          <div className={styles.diffAnnotations}>
            {diffAnnotations[active].map((a) => (
              <div key={a.label} className={styles.diffAnnotationRow}>
                <span className={styles.diffAnnotationLabel}>{a.label}</span>
                <span className={[
                  styles.diffAnnotationValue,
                  active === 'with' ? styles.diffAnnotationValueOn : '',
                ].filter(Boolean).join(' ')}>
                  {a.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
