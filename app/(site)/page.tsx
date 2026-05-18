/**
 * About Page (Landing) — Tessaract.xyz
 * 
 * Per Figma:
 * - Main headline: "TESSA IS A CREATIVE BASED IN" (black)
 * - Second line: "LOS ANGELES & THAILAND" (gray #646464)
 * - Three blue radial starburst decorations (from Figma asset)
 * - Services text in blue (#0038C6): "MINI APP, UX/UI, MERCH DESIGN, PHYSICAL EXPERIENCES"
 */

import Image from 'next/image';
import styles from './page.module.css';
import { ScrambleText } from './_components/ScrambleText';

export default function AboutPage() {
  return (
    <div className={styles.container}>
      {/* Main content block */}
      <div className={styles.content}>
        {/* Main headline */}
        <h1 className={styles.headline}>
          <ScrambleText
            text="TESSA IS A CREATIVE BASED IN"
            className={styles.headlineBlack}
            delay={0.1}
            duration={1.5}
          />
          <ScrambleText
            text="LOS ANGELES"
            className={styles.headlineGray}
            delay={0.6}
            duration={1.5}
          />
        </h1>

        {/* Starburst decorations - using Figma asset */}
        <div className={styles.starbursts} aria-hidden="true">
          <Image
            src="/images/icons/starburst.svg"
            alt=""
            width={70}
            height={70}
            className={styles.starburst}
          />
          <Image
            src="/images/icons/starburst.svg"
            alt=""
            width={70}
            height={70}
            className={styles.starburst}
          />
          <Image
            src="/images/icons/starburst.svg"
            alt=""
            width={70}
            height={70}
            className={styles.starburst}
          />
        </div>

        {/* Services text in blue */}
        <p className={styles.services}>
          <ScrambleText
            text="DESIGN, MINI APP, UX/UI, FASHION, DIGITAL AND"
            delay={1.1}
            duration={1.5}
          />
          <ScrambleText
            text="PHYSICAL EXPERIENCES"
            delay={1.6}
            duration={1.5}
          />
        </p>
      </div>
    </div>
  );
}
