'use client';

import { useState } from 'react';
import Image from 'next/image';
import styles from './MotionDemo.module.css';

const products = [
  {
    id: 'tote',
    src: '/images/tessaverse/edge-city-goods/green tote front.png',
    alt: 'Edge City Goods green tote',
    width: 220,
    height: 220,
    className: styles.productTote,
    delay: '0s',
  },
  {
    id: 'cap',
    src: '/images/tessaverse/edge-city-goods/green cap.png',
    alt: 'Edge City Goods green cap',
    width: 80,
    height: 80,
    className: styles.productCap,
    delay: '1.8s',
  },
];

export function MotionDemo() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <div className={styles.layout}>
      {/* Top: copy */}
      <div className={styles.textCol}>
        <p className={styles.intro}>Two motion patterns define the brand feel.</p>
        <div className={styles.principles}>
          <div className={styles.principle}>
            <p className={styles.principleLabel}>float</p>
            <p className={styles.principleDesc}>
              product images drift -12px vertically on a 6s ease-in-out loop. Ambient, unhurried. Every floating element has a staggered delay so nothing moves in unison.
            </p>
          </div>
          <div className={styles.principle}>
            <p className={styles.principleLabel}>sibling dim</p>
            <p className={styles.principleDesc}>
              when one product is hovered, siblings drop to 70% opacity. The hovered item scales to 1.05× and rotates 1°. The effect pulls focus without hiding anything.
            </p>
          </div>
        </div>
        <p className={styles.footer}>Both animations respect <span className={styles.code}>prefers-reduced-motion</span>. No exceptions.</p>
      </div>

      {/* Bottom: interactive scene */}
      <div className={styles.sceneWrap}>
        <div
          className={styles.scene}
          style={{
            backgroundImage: `url('/images/tessaverse/edge-city-goods/motion example background.png')`,
          }}
        >
          {products.map((p) => {
            const isHovered = hoveredId === p.id;
            const isDimmed = hoveredId !== null && !isHovered;

            return (
              <div
                key={p.id}
                className={[
                  styles.productWrap,
                  p.className,
                  isHovered ? styles.productActive : '',
                  isDimmed ? styles.productDimmed : '',
                ].filter(Boolean).join(' ')}
                style={{ '--delay': p.delay } as React.CSSProperties}
                onMouseEnter={() => setHoveredId(p.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <Image
                  src={p.src}
                  alt={p.alt}
                  width={p.width}
                  height={p.height}
                  className={styles.productImage}
                  draggable={false}
                />
              </div>
            );
          })}

          <p className={styles.hint}>^ try hover over a product ^</p>
        </div>
      </div>
    </div>
  );
}
