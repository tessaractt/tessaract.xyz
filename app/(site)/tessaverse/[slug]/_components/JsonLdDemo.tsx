'use client';

import { useState } from 'react';
import styles from './JsonLdDemo.module.css';

const productJsonLd = {
  "@context": "https://schema.org",
  "@type": "Product",
  "productID": "ecg-001",
  "name": "Edge City Unisex Tee",
  "description": "permanent piece documenting Edge City's foundational design language",
  "brand": { "@type": "Brand", "name": "Edge City Goods" },
  "color": "black",
  "material": "100% cotton",
  "size": ["S", "M", "L", "XL", "2XL"],
  "additionalProperty": [
    { "@type": "PropertyValue", "name": "fit",          "value": "unisex oversized" },
    { "@type": "PropertyValue", "name": "effect",       "value": "acid wash"        },
    { "@type": "PropertyValue", "name": "type",         "value": "permanent"        },
    { "@type": "PropertyValue", "name": "event",        "value": null               },
    { "@type": "PropertyValue", "name": "edition_size", "value": null               },
  ],
  "offers": {
    "@type": "Offer",
    "availability": "https://schema.org/InStock",
    "priceCurrency": "USD",
  },
  "creator": [
    { "@type": "Person", "name": "Tessa Maneewong"  },
    { "@type": "Person", "name": "Timour Kastour"   },
  ],
  "isBasedOn": "Buckminster Fuller patent 3197927",
};

function highlightJson(json: string): string {
  const safe = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  return safe
    .replace(/"((?:[^"\\]|\\.)*)"/g, (match, _inner, offset, fullStr: string) => {
      const after = fullStr.slice(offset + match.length).trimStart();
      if (after.startsWith(':')) {
        return `<span style="color:rgba(255,255,255,0.42)">${match}</span>`;
      }
      return `<span style="color:rgba(255,255,255,0.92)">${match}</span>`;
    })
    .replace(/: (null)(?=[,\s\n\r}]|$)/g,
      ': <span style="color:rgba(255,255,255,0.25);font-style:italic">null</span>'
    );
}

export function JsonLdDemo() {
  const [view, setView] = useState<'front' | 'back'>('front');
  const highlighted = highlightJson(JSON.stringify(productJsonLd, null, 2));

  return (
    <div className={styles.scene}>

      {/* Left: image viewer */}
      <div className={styles.imageCol}>
        <div className={styles.imageWrap}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/tessaverse/edge-city-goods/black tee front.png"
            alt="Black tee — front"
            className={`${styles.image} ${view === 'front' ? styles.imageVisible : styles.imageHidden}`}
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/tessaverse/edge-city-goods/black tee back.png"
            alt="Black tee — back"
            className={`${styles.image} ${view === 'back' ? styles.imageVisible : styles.imageHidden}`}
          />
        </div>
        <div className={styles.dots}>
          <button
            className={`${styles.dot} ${view === 'front' ? styles.dotActive : ''}`}
            onClick={() => setView('front')}
            aria-label="Front view"
          />
          <button
            className={`${styles.dot} ${view === 'back' ? styles.dotActive : ''}`}
            onClick={() => setView('back')}
            aria-label="Back view"
          />
        </div>
      </div>

      {/* Right: scrollable JSON-LD */}
      <div className={styles.meta}>
        <p className={styles.tag}>{'<script type="application/ld+json">'}</p>
        <pre
          className={styles.code}
          dangerouslySetInnerHTML={{ __html: highlighted }}
        />
        <p className={styles.tag}>{'</script>'}</p>
      </div>

    </div>
  );
}
