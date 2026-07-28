'use client';

import { useState } from 'react';
import styles from './ComponentKitDemo.module.css';

const ecSizeGuideData = {
  columns: ['S', 'M', 'L', 'XL', '2XL', '3XL'],
  rows: [
    { label: 'LENGTH',          values: ['27.56"', '28.35"', '29.13"', '29.92"', '30.71"', '31.10"'] },
    { label: 'SHLDER',          values: ['20.87"', '21.65"', '22.44"', '23.23"', '24.02"', '24.80"'] },
    { label: 'CHEST',           values: ['22.05"', '22.83"', '23.62"', '24.41"', '25.20"', '26.38"'] },
    { label: 'SLEEVE\nLENGTH', values: ['8.19"',  '8.46"',  '8.74"',  '9.02"',  '9.29"',  '9.29"']  },
  ],
};

export function ComponentKitDemo() {
  const [navExpanded, setNavExpanded] = useState(true);
  const [selectedSize, setSelectedSize] = useState<string>('M');

  return (
    <div className={styles.ecScene}>
      <div className={styles.ecColumns}>

        {/* ── Left column: Cart + Size Guide ───────── */}
        <div className={styles.ecLeftCol}>

          {/* Cart */}
          <div className={styles.ecCart}>
            <div className={styles.ecCartHeader}>
              <span className={styles.ecCartHeading}>CART</span>
              <button className={styles.ecXBtn}>×</button>
            </div>
            <div className={styles.ecDivider} />
            <div className={styles.ecCartItem}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/tessaverse/edge-city-goods/coral shirt front.png"
                alt="product"
                className={styles.ecCartThumb}
              />
              <div className={styles.ecCartItemBody}>
                <div className={styles.ecCartItemTopRow}>
                  <span className={styles.ecCartItemName}>Edge Esmeralda Tee</span>
                  <span className={styles.ecCartItemPrice}>40$</span>
                </div>
                <p className={styles.ecCartItemAttr}>CORAL</p>
                <div className={styles.ecCartItemBottomRow}>
                  <span className={styles.ecCartItemAttr}>QTY 1</span>
                  <button className={styles.ecDeleteBtn}>DELETE</button>
                </div>
              </div>
            </div>
            <div className={styles.ecDivider} />
            <div className={styles.ecCartMeta}>
              <div className={styles.ecCartMetaRow}>
                <span className={styles.ecCartMetaLabel}>shipping</span>
                <span className={styles.ecCartMetaValue}>calculate at checkout</span>
              </div>
              <div className={styles.ecCartMetaRow}>
                <span className={styles.ecCartMetaLabel}>subtotal</span>
                <span className={styles.ecCartMetaValue}>40$</span>
              </div>
            </div>
            <button className={styles.ecCheckoutBtn}>CHECK OUT</button>
          </div>

          {/* Size guide */}
          <div className={styles.ecSizeGuide}>
            <div className={styles.ecSizeGuideHeader}>
              <span className={styles.ecSizeGuideTitle}>OVERSIZED TEE (SIZE GUIDE)</span>
              <button className={styles.ecXBtn}>×</button>
            </div>
            <table className={styles.ecSizeTable}>
              <thead>
                <tr>
                  <th className={styles.ecSizeThRow} />
                  {ecSizeGuideData.columns.map(col => (
                    <th key={col} className={styles.ecSizeTh}>{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {ecSizeGuideData.rows.map(row => (
                  <tr key={row.label} className={styles.ecSizeTr}>
                    <td className={styles.ecSizeRowLabel} style={{ whiteSpace: 'pre-line' }}>{row.label}</td>
                    {row.values.map((v, i) => (
                      <td key={i} className={styles.ecSizeTd}>{v}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            <p className={styles.ecSizeGuideNote}>All measurements in inches. Sizes may vary slightly.</p>
          </div>

        </div>

        {/* ── Right column: Product card + CTA + Nav ─ */}
        <div className={styles.ecRightCol}>

          {/* Product card (glass — no CTA inside) */}
          <div className={styles.ecProductCard}>
            <h2 className={styles.ecProductTitle}>EDGE ESMERALDA TEE</h2>
            <p className={styles.ecProductDesc}>
              A speculative sketch of what flourishing looks like when you build it on purpose: part summer field journal, part
              founding document. Hilltop conversations, open-air dinners, whiteboard sessions past midnight, and mornings
              that feel like permission — each moment suspended between transience and permanence.
            </p>
            <div className={styles.ecDivider} />
            <div className={styles.ecProductAttrs}>
              <p className={styles.ecProductAttrRow}>Fabric: <strong>100% cotton</strong></p>
              <p className={styles.ecProductAttrRow}>Color: <strong>CORAL</strong></p>
              <div className={styles.ecSizePickerWrap}>
                <p className={styles.ecProductAttrRow}>Size:</p>
                <div className={styles.ecSizePills}>
                  {['S', 'M', 'L', 'XL'].map(s => (
                    <button
                      key={s}
                      className={[styles.ecSizePill, selectedSize === s ? styles.ecSizePillActive : ''].filter(Boolean).join(' ')}
                      onClick={() => setSelectedSize(s)}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
              <button className={styles.ecSizingLink}>sizing info &gt;</button>
            </div>
          </div>

          {/* Add to cart — outside glass, full column width */}
          <button className={styles.ecAddToCartBtn}>
            <span>ADD TO CART</span>
            <span>$40</span>
          </button>

          {/* Nav pill */}
          <div className={styles.ecNavPill}>
            <span className={styles.ecNavCount}>0</span>
            {navExpanded && (
              <span className={styles.ecNavLinks}>
                merch &nbsp;&nbsp; market place &nbsp;&nbsp; policy &nbsp;&nbsp; Edge City
              </span>
            )}
            <button className={styles.ecNavClose} onClick={() => setNavExpanded(v => !v)}>×</button>
          </div>

        </div>

      </div>
    </div>
  );
}
