/**
 * GridOverlay — Fixed dot grid overlay
 * 
 * Per interaction-rules.md:
 * - Fixed to viewport
 * - Visually above content
 * - pointer-events: none
 * 
 * CSS-based implementation (no image)
 * Dots: 2x2px, spaced 62px apart, starting at x:60
 */

import styles from './GridOverlay.module.css';

export function GridOverlay() {
  return (
    <div 
      className={styles.overlay}
      aria-hidden="true"
    />
  );
}
