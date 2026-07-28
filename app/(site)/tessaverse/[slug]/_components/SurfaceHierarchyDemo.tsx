'use client';

import { useState } from 'react';
import styles from './SurfaceHierarchyDemo.module.css';

const surfaces = [
  {
    name: 'glass light',
    token: '--color-surface',
    bg: 'rgba(255,255,255,0.15)',
    border: '1px solid rgba(255,255,255,0.20)',
    blur: 'blur(16px)',
    textColor: 'rgba(255,255,255,0.9)',
    use: 'Product cards, nav pill, cart panel. The default surface — sits lightly on top of the cloud.',
  },
  {
    name: 'glass dark',
    token: '--color-surface-dark',
    bg: 'rgba(0,0,0,0.35)',
    border: '1px solid rgba(255,255,255,0.10)',
    blur: 'blur(16px)',
    textColor: '#ffffff',
    use: 'Modals, overlays, size guide. Higher contrast — pulls focus, everything behind recedes.',
  },
  {
    name: 'glass solid',
    token: '--color-surface-solid',
    bg: 'rgba(255,255,255,0.80)',
    border: '1px solid rgba(255,255,255,0.50)',
    blur: 'blur(16px)',
    textColor: '#484848',
    use: 'Form inputs, focused states. Opaque enough to read text against, still lets the background breathe.',
  },
];

export function SurfaceHierarchyDemo() {
  const [active, setActive] = useState<typeof surfaces[0] | null>(null);
  const [displayed, setDisplayed] = useState<typeof surfaces[0]>(surfaces[0]);

  return (
    <div className={styles.container}>
      <div className={styles.layout}>
        <div className={styles.chips}>
          {surfaces.map((s) => (
            <div
              key={s.name}
              className={styles.chip}
              style={{ background: s.bg, border: s.border, backdropFilter: s.blur }}
              onMouseEnter={() => { setDisplayed(s); setActive(s); }}
              onMouseLeave={() => setActive(null)}
            >
              <span className={styles.chipLabel} style={{ color: s.textColor }}>{s.name}</span>
            </div>
          ))}
        </div>

        <div className={`${styles.info} ${active ? styles.infoVisible : ''}`}>
          <p className={styles.infoToken}>{displayed.token}</p>
          <p className={styles.infoUse}>{displayed.use}</p>
        </div>
      </div>
      <p className={styles.hint}>^ hover to preview ^</p>
    </div>
  );
}
