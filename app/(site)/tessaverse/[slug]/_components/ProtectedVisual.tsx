'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from '../page.module.css';

interface ProtectedVisualProps {
  src: string;
  alt: string;
  caption?: string;
}

export function ProtectedVisual({ src, alt, caption }: ProtectedVisualProps) {
  const [open, setOpen] = useState(false);

  const blockContext = (e: React.MouseEvent) => e.preventDefault();

  // Close on Escape, lock body scroll when open
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <>
      <figure className={styles.visual}>
        <div className={styles.visualInner}>
          <Image
            src={src}
            alt={alt}
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: '100%', height: 'auto', display: 'block' }}
            draggable={false}
            onContextMenu={blockContext}
          />
          {/* Overlay — blocks right-click save, triggers modal on click */}
          <div
            className={styles.visualOverlay}
            onContextMenu={blockContext}
            onClick={() => setOpen(true)}
            aria-label={`View ${alt} full size`}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setOpen(true); }}
          />
        </div>
        {caption && <figcaption className={styles.visualCaption}>{caption}</figcaption>}
      </figure>

      {open && (
        <div
          className={styles.modalBackdrop}
          onClick={() => setOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label={alt}
        >
          <div
            className={styles.modalContent}
            onContextMenu={blockContext}
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={src}
              alt={alt}
              width={0}
              height={0}
              sizes="100vw"
              style={{ maxWidth: '90vw', maxHeight: '90vh', width: 'auto', height: 'auto', display: 'block' }}
              draggable={false}
              onContextMenu={blockContext}
            />
          </div>
        </div>
      )}
    </>
  );
}
