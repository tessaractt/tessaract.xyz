'use client';

/**
 * CopyGuard — client wrapper that blocks text selection copy and right-click.
 * Applied to the case study page container.
 * Note: prevents casual copying; does not block browser devtools.
 */

import styles from '../page.module.css';

export function CopyGuard({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={styles.container}
      onCopy={(e) => e.preventDefault()}
      onContextMenu={(e) => e.preventDefault()}
    >
      {children}
    </div>
  );
}
