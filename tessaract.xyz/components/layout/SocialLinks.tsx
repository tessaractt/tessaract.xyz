/**
 * SocialLinks — Social media icons with labels
 * 
 * Per Figma:
 * - Fixed position, top right
 * - Each: 80x80px bordered container with icon
 * - Labels: Kode Mono, 9px
 * - Icons: Instagram (wave), Twitter (blue X), Are.na (tree)
 * - Responsive: hides on smaller screens
 */

import Image from 'next/image';
import styles from './SocialLinks.module.css';

interface SocialLink {
  name: string;
  href: string;
  icon: string;
}

const socialLinks: SocialLink[] = [
  {
    name: 'TWITTER',
    href: 'https://x.com/tessla0x0',
    icon: '/images/icons/twitter.svg',
  },
  {
    name: 'GITHUB',
    href: 'https://github.com/tessaractt',
    icon: '/images/icons/github.svg',
  },
];

export function SocialLinks() {
  return (
    <div className={styles.container}>
      {socialLinks.map((link) => (
        <a
          key={link.name}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.link}
          aria-label={`Visit ${link.name}`}
        >
          <span className={styles.iconBox}>
            <Image
              src={link.icon}
              alt=""
              width={50}
              height={44}
              className={styles.icon}
            />
          </span>
          <span className={styles.label}>{link.name}</span>
        </a>
      ))}
    </div>
  );
}
