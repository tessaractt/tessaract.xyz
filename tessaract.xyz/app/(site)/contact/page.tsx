/**
 * Contact Page
 * 
 * Per Figma (tessaract.xyz / contact):
 * - Left content: "LET'S TALK:" heading
 * - "COLLABORATION FREELANCE PARTNERSHIP" text
 * - "(CONTACT)" label with email
 * - Right side: Image collage with individual hoverable components
 * 
 * Each collage element is its own component for future interaction design
 */

import Image from 'next/image';
import { contactEmail } from '@/data/social';
import styles from './page.module.css';

// Collage element components - each will support hover interactions later

function SkyCube() {
  return (
    <div className={styles.skyCube}>
      <Image
        src="/images/contact/sky cube3x.png"
        alt="Sky with clouds and cube"
        width={200}
        height={191}
        className={styles.skyCubeImage}
      />
    </div>
  );
}

function EdgeCityTee() {
  return (
    <div className={styles.edgeCityTee}>
      <Image
        src="/images/contact/edge city tee3x.png"
        alt="Person wearing Edge City t-shirt"
        width={354}
        height={558}
        className={styles.edgeCityImage}
        priority
      />
    </div>
  );
}

function CursiveConnectionApp() {
  return (
    <div className={styles.cursiveApp}>
      <Image
        src="/images/contact/cursive connection app3x.png"
        alt="Cursive Connection app on phone"
        width={179}
        height={350}
        className={styles.cursiveAppImage}
      />
    </div>
  );
}

function CursiveConnection() {
  return (
    <div className={styles.cursivePanel}>
      <Image
        src="/images/contact/cursive connection3x.png"
        alt="Cursive Connection artwork"
        width={303}
        height={197}
        className={styles.cursivePanelImage}
      />
    </div>
  );
}

function MotusPet() {
  return (
    <div className={styles.motusPet}>
      <Image
        src="/images/contact/MOTUS PET3x.png"
        alt="Motus pet mascot"
        width={167}
        height={112}
        className={styles.motusPetImage}
      />
    </div>
  );
}

export default function ContactPage() {
  return (
    <div className={styles.container}>
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

      {/* Right side: Image collage - each element is a separate component */}
      <div className={styles.collage}>
        <SkyCube />
        <EdgeCityTee />
        <CursiveConnectionApp />
        <CursiveConnection />
        <MotusPet />
      </div>
    </div>
  );
}

