"use client";

/**
 * SideRail — Left side information panel
 * 
 * Per Figma:
 * - Width: 200px
 * - Contains: TESSARACT NEWS, location, year range
 * - Color bars at bottom (blue shades)
 * - Rotated "TESSARACTT 2026" text
 * - TASTE, CONSISTENCY, MOMENTUM labels with dots
 */

import { usePathname } from 'next/navigation';
import styles from './SideRail.module.css';

export function SideRail() {
  return (
    <aside className={styles.rail} aria-label="Site information">
      {/* Header */}
      <div className={styles.header}>
        <span className={styles.title}>TESSARACT NEWS</span>
      </div>

      {/* Location info */}
      <div className={styles.info}>
        <span className={styles.infoLine}>LOS ANGELES, CA</span>
        <span className={styles.infoLine}>100 Y. TRADEMARK</span>
      </div>

      {/* Dashed divider */}
      <div className={styles.divider} />

      {/* Year range with arrow */}
      <div className={styles.yearRange}>
        <svg
          className={styles.arrow}
          width="1"
          height="15"
          viewBox="0 0 1 15"
          aria-hidden="true"
        >
          <line x1="0.5" y1="0" x2="0.5" y2="12" stroke="currentColor" strokeWidth="1" />
          <polygon points="0.5,15 0,12 1,12" fill="currentColor" />
        </svg>
        <span className={styles.years}>2026 - 3026</span>
      </div>

      {/* Color bars */}
      <div className={styles.colorBars}>
        <div className={styles.colorBar} style={{ backgroundColor: '#FFFFFF' }} />
        <div className={styles.colorBar} style={{ backgroundColor: '#1E3A8A' }} />
        <div className={styles.colorBar} style={{ backgroundColor: '#3B82F6' }} />
        <div className={styles.colorBar} style={{ backgroundColor: '#0038C6' }} />
      </div>

      {/* Rotated branding */}
      <div className={styles.branding}>
        <span className={styles.brandingText}>TESSARACTT 2026</span>
      </div>

      {/* Values section */}
      <div className={styles.values}>
        <div className={styles.valueItem}>
          <div className={styles.valueDots}>
            <span className={styles.dot} />
          </div>
          <span className={styles.valueLabel}>TASTE</span>
        </div>

        <div className={styles.valueItem}>
          <div className={styles.valueDots}>
            <span className={styles.dot} />
            <span className={styles.dot} />
          </div>
          <span className={styles.valueLabel}>CONSISTENCY</span>
        </div>

        <div className={styles.valueItem}>
          <div className={styles.valueDots}>
            <span className={styles.dot} style={{ backgroundColor: 'var(--color-royal-blue)' }} />
            <span className={styles.dot} style={{ backgroundColor: 'var(--color-royal-blue)' }} />
            <span className={styles.dot} style={{ backgroundColor: 'var(--color-royal-blue)' }} />
          </div>
          <span className={styles.valueLabelBlue}>MOMENTUM</span>
        </div>
      </div>

      {/* Bottom arrows */}
      <div className={styles.bottomArrows}>
        <Arrow />
        <Arrow />
        <span className={styles.arrowSpacer} />
        <Arrow />
      </div>
    </aside>
  );
}

function Arrow() {
  return (
    <svg width="27" height="8" viewBox="0 0 27 8" fill="none">
      <line x1="0" y1="4" x2="24" y2="4" stroke="currentColor" strokeWidth="1" />
      <polygon points="27,4 24,2 24,6" fill="currentColor" />
    </svg>
  );
}
