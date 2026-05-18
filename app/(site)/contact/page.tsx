'use client';

/**
 * Contact Page
 * 
 * Interactive image collage using GSAP.
 */

import { useState, useRef } from 'react';
import Image from 'next/image';
import { contactEmail } from '@/data/social';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import styles from './page.module.css';

const COLLAGE_DATA = [
  {
    id: 'skyCube3x',
    src: '/images/contact/new sky cube.png',
    alt: 'Sky with clouds and cube',
    className: styles.skyCube,
    width: 200,
    height: 191,
    bubbleText: "leave me a message",
  },
  {
    id: 'edgeCityTee3x',
    src: '/images/contact/edge city tee3x.png',
    alt: 'Person wearing Edge City t-shirt',
    className: styles.edgeCityTee,
    width: 354,
    height: 558,
    priority: true,
    bubbleText: "A speculative blueprint for a frontier society. Buckminster Fuller meets Ethereum meets brainwave experiments. the unofficial-official Edge City fit.",
  },
  {
    id: 'cursiveConnectionApp3x',
    src: '/images/contact/cursive connection app3x.png',
    alt: 'Cursive Connection app on phone',
    className: styles.cursiveApp,
    width: 179,
    height: 350,
    bubbleText: "Each connection starts as a bud. Share data privately through cryptographic PSI and watch it bloom as trust deepens.",
  },
  {
    id: 'cursiveConnection3x',
    src: '/images/contact/cursive connection3x.png',
    alt: 'Cursive Connection artwork',
    className: styles.cursivePanel,
    width: 303,
    height: 197,
    bubbleText: "God creates Adam then Adam writes code. The cycle of creation just got recursive.",
  },
  {
    id: 'motusPet3x',
    src: '/images/contact/MOTUS PET3x.png',
    alt: 'Motus pet mascot',
    className: styles.motusPet,
    width: 167,
    height: 112,
    bubbleText: "A tiny wellness companion that nudges you gently— because cute is sometimes a sound product strategy.",
  }
];

export default function ContactPage() {
  const [activeAsset, setActiveAsset] = useState<string | null>(null);
  const collageRef = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);

  useGSAP(() => {
    if (tl.current) {
      tl.current.kill();
    }

    tl.current = gsap.timeline();

    if (activeAsset) {
      // Background overlay logic: handled conditionally in JSX
      // Dim inactive assets
      tl.current.to('.collageItem:not(.' + activeAsset + ')', {
        opacity: 0.3,
        filter: 'grayscale(1)',
        pointerEvents: 'none',
        duration: 0.45,
        ease: 'power2.out'
      }, 0);

      // Ensure active asset has full opacity and high z-index
      tl.current.set('.collageItem.' + activeAsset, {
        zIndex: 50,
        opacity: 1,
        filter: 'grayscale(0)'
      }, 0);

      // Animate Bubble
      tl.current.set('.bubble-' + activeAsset, { display: 'flex', opacity: 0, scale: 0.96, y: 6 }, 0);
      tl.current.to('.bubble-' + activeAsset, {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.45,
        ease: 'expo.out'
      }, 0);

    } else {
      // Revert assets
      tl.current.to('.collageItem', {
        opacity: 1,
        filter: 'grayscale(0)',
        pointerEvents: 'auto',
        duration: 0.45,
        ease: 'power2.out'
      }, 0);

      // Clear inline z-index to fall back to CSS stylesheet values
      tl.current.set('.collageItem', { clearProps: 'zIndex' });

      // Reverse bubble animation
      tl.current.to('.bubble', {
        opacity: 0,
        scale: 0.96,
        y: 6,
        duration: 0.3,
        ease: 'power2.inOut'
      }, 0);
      tl.current.set('.bubble', { display: 'none' });
    }
  }, { dependencies: [activeAsset], scope: collageRef });

  const handleAssetClick = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveAsset(prev => prev === id ? null : id);
  };

  return (
    <div className={styles.container}>
      {/* Click outside overlay to reset active asset */}
      {activeAsset && (
        <div
          className={styles.overlay}
          onClick={() => setActiveAsset(null)}
          aria-hidden="true"
        />
      )}

      {/* Left content */}
      <div className={styles.content}>
        <h1 className={styles.heading}>
          LET&apos;S TALK:
        </h1>

        <p className={styles.types}>
          COLLABORATION<br />
          FREELANCE<br />
          PARTNERSHIP
        </p>

        <div className={styles.contactInfo}>
          <span className={styles.label}>(CONTACT)</span>
          <a
            href={`mailto:${contactEmail}`}
            className={styles.email}
          >
            {contactEmail}
          </a>
        </div>
      </div>

      {/* Right side: GSAP Image Collage */}
      <div className={styles.collage} ref={collageRef}>
        {COLLAGE_DATA.map((asset) => (
          <div
            key={asset.id}
            onClick={(e) => handleAssetClick(asset.id, e)}
            className={`collageItem ${asset.id} ${asset.className} ${styles.collageItemWrapper}`}
          >
            <Image
              src={asset.src}
              alt={asset.alt}
              width={asset.width}
              height={asset.height}
              priority={asset.priority}
              className={styles.collageItemImage}
            />

            <div className={`bubble bubble-${asset.id} ${styles.speechBubble}`}>
              <p>{asset.bubbleText}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

