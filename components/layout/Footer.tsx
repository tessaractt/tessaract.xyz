/**
 * Footer — Bottom attribution
 * 
 * Per Figma:
 * - Black background
 * - Font: Kode Mono, 15px
 * - Text: #F3F5F8 (Nothing White)
 * - Triangle polygons on each side
 */

import styles from './Footer.module.css';

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        {/* Left triangle - pointing up */}
        <svg 
          className={styles.triangle} 
          width="12" 
          height="9" 
          viewBox="0 0 12 9"
          aria-hidden="true"
        >
          <polygon points="6,0 12,9 0,9" fill="currentColor" />
        </svg>
        
        <span className={styles.text}>
          TESSA MANEEWONG {currentYear}
        </span>
        
        {/* Right triangle - pointing down */}
        <svg 
          className={styles.triangle}
          width="12" 
          height="9" 
          viewBox="0 0 12 9"
          aria-hidden="true"
        >
          <polygon points="6,9 0,0 12,0" fill="currentColor" />
        </svg>
      </div>
    </footer>
  );
}
