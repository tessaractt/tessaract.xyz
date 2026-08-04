'use client';

/**
 * Home — Single scrollable page
 * Sections: About, Tessaverse, Contact
 */

import { useState, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrambleText } from './_components/ScrambleText';
import { projects } from '@/data/projects';
import { ProjectSection } from './tessaverse/_components/ProjectSection';
import { contactEmail } from '@/data/social';
import aboutStyles from './page.module.css';
import tessaverseStyles from './tessaverse/page.module.css';
import contactStyles from './contact/page.module.css';

const COLLAGE_DATA = [
  {
    id: 'skyCube3x',
    src: '/images/contact/new sky cube.png',
    alt: 'Sky with clouds and cube',
    className: contactStyles.skyCube,
    width: 200,
    height: 191,
    bubbleText: 'leave me a message',
    priority: false,
  },
  {
    id: 'edgeCityTee3x',
    src: '/images/contact/edge city tee3x.png',
    alt: 'Person wearing Edge City t-shirt',
    className: contactStyles.edgeCityTee,
    width: 354,
    height: 558,
    priority: true,
    bubbleText: 'A speculative blueprint for a frontier society. Buckminster Fuller meets Ethereum meets brainwave experiments. the unofficial-official Edge City fit.',
  },
  {
    id: 'cursiveConnectionApp3x',
    src: '/images/contact/cursive connection app3x.png',
    alt: 'Cursive Connection app on phone',
    className: contactStyles.cursiveApp,
    width: 179,
    height: 350,
    priority: false,
    bubbleText: 'Each connection starts as a bud. Share data privately through cryptographic PSI and watch it bloom as trust deepens.',
  },
  {
    id: 'cursiveConnection3x',
    src: '/images/contact/cursive connection3x.png',
    alt: 'Cursive Connection artwork',
    className: contactStyles.cursivePanel,
    width: 303,
    height: 197,
    priority: false,
    bubbleText: 'God creates Adam then Adam writes code. The cycle of creation just got recursive.',
  },
  {
    id: 'motusPet3x',
    src: '/images/contact/MOTUS PET3x.png',
    alt: 'Motus pet mascot',
    className: contactStyles.motusPet,
    width: 167,
    height: 112,
    priority: false,
    bubbleText: 'A tiny wellness companion that nudges you gently, because cute is sometimes a sound product strategy.',
  },
];

export default function HomePage() {
  const [activeAsset, setActiveAsset] = useState<string | null>(null);
  const collageRef = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);

  useGSAP(() => {
    if (tl.current) {
      tl.current.kill();
    }

    tl.current = gsap.timeline();

    if (activeAsset) {
      tl.current.to('.collageItem:not(.' + activeAsset + ')', {
        opacity: 0.3,
        filter: 'grayscale(1)',
        pointerEvents: 'none',
        duration: 0.45,
        ease: 'power2.out',
      }, 0);

      tl.current.set('.collageItem.' + activeAsset, {
        zIndex: 50,
        opacity: 1,
        filter: 'grayscale(0)',
      }, 0);

      tl.current.set('.bubble-' + activeAsset, { display: 'flex', opacity: 0, scale: 0.96, y: 6 }, 0);
      tl.current.to('.bubble-' + activeAsset, {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.45,
        ease: 'expo.out',
      }, 0);
    } else {
      tl.current.to('.collageItem', {
        opacity: 1,
        filter: 'grayscale(0)',
        pointerEvents: 'auto',
        duration: 0.45,
        ease: 'power2.out',
      }, 0);

      tl.current.set('.collageItem', { clearProps: 'zIndex' });

      tl.current.to('.bubble', {
        opacity: 0,
        scale: 0.96,
        y: 6,
        duration: 0.3,
        ease: 'power2.inOut',
      }, 0);
      tl.current.set('.bubble', { display: 'none' });
    }
  }, { dependencies: [activeAsset], scope: collageRef });

  const handleAssetEnter = (id: string) => {
    setActiveAsset(id);
  };

  const handleAssetLeave = () => {
    setActiveAsset(null);
  };

  return (
    <>
      {/* ABOUT */}
      <section id="about" className={aboutStyles.container}>
        <div className={aboutStyles.content}>
          <h1 className={aboutStyles.headline}>
            <ScrambleText
              text="TESSA IS A DESIGNER BASED IN"
              className={aboutStyles.headlineBlack}
              delay={0.1}
              duration={1.5}
            />
            <ScrambleText
              text="LOS ANGELES"
              className={aboutStyles.headlineGray}
              delay={0.6}
              duration={1.5}
            />
          </h1>

          <div className={aboutStyles.starbursts} aria-hidden="true">
            <Image src="/images/icons/starburst.svg" alt="" width={70} height={70} className={aboutStyles.starburst} />
            <Image src="/images/icons/starburst.svg" alt="" width={70} height={70} className={aboutStyles.starburst} />
            <Image src="/images/icons/starburst.svg" alt="" width={70} height={70} className={aboutStyles.starburst} />
          </div>

          <p className={aboutStyles.services}>
            <ScrambleText text="PRODUCT DESIGN, MINI APP, FASHION," delay={1.1} duration={1.5} />
            <ScrambleText text="DIGITAL AND PHYSICAL EXPERIENCES" delay={1.6} duration={1.5} />
          </p>
        </div>
      </section>

      {/* TESSAVERSE */}
      <section id="tessaverse" className={tessaverseStyles.container}>
        <div className={tessaverseStyles.projectGrid}>
          {projects.map((project) => (
            <ProjectSection key={project.id} project={project} />
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className={contactStyles.container}>

        <div className={contactStyles.content}>
          <h2 className={contactStyles.heading}>LET&apos;S TALK:</h2>
          <p className={contactStyles.types}>
            COLLABORATION<br />
            FREELANCE<br />
            PARTNERSHIP
          </p>
          <div className={contactStyles.contactInfo}>
            <span className={contactStyles.label}>(CONTACT)</span>
            <a href={`mailto:${contactEmail}`} className={contactStyles.email}>
              {contactEmail}
            </a>
          </div>
        </div>

        <div className={contactStyles.collage} ref={collageRef}>
          {COLLAGE_DATA.map((asset) => (
            <div
              key={asset.id}
              onMouseEnter={() => handleAssetEnter(asset.id)}
              onMouseLeave={handleAssetLeave}
              className={`collageItem ${asset.id} ${asset.className} ${contactStyles.collageItemWrapper}`}
            >
              <Image
                src={asset.src}
                alt={asset.alt}
                width={asset.width}
                height={asset.height}
                priority={asset.priority}
                className={contactStyles.collageItemImage}
              />
              <div className={`bubble bubble-${asset.id} ${contactStyles.speechBubble}`}>
                <p>{asset.bubbleText}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
