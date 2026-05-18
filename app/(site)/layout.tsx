/**
 * Site Layout — Main site wrapper
 * 
 * Per Figma & interaction-rules.md:
 * - Dot grid overlay (fixed, above content, pointer-events: none)
 * - Left side rail (above grid)
 * - Navigation (centered top)
 * - Social links (fixed top right)
 * - Footer (bottom right)
 * - Main content area
 */

import { GridOverlay, Nav, Footer, SocialLinks } from '@/components/layout';
import styles from './layout.module.css';

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.wrapper}>
      {/* Dot grid overlay - fixed, above content */}
      <GridOverlay />

      {/* Navigation - centered top */}
      <Nav />

      {/* Social links - fixed top right */}
      <SocialLinks />

      {/* Main content */}
      <main className={styles.main}>
        {children}
      </main>

      {/* Footer - bottom right */}
      <Footer />
    </div>
  );
}
