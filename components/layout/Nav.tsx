/**
 * Nav — Primary navigation with scroll spy
 *
 * Buttons highlight automatically as the user scrolls between sections.
 * Clicking a button smooth-scrolls to that section.
 */

'use client';

import { useEffect, useState } from 'react';
import styles from './Nav.module.css';

const navItems = [
  { label: 'ABOUT', id: 'about' },
  { label: 'TESSAVERSE', id: 'tessaverse' },
  { label: 'CONTACT', id: 'contact' },
];

export function Nav() {
  const [activeSection, setActiveSection] = useState('about');

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    navItems.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        {
          // Section becomes active when it enters the middle band of the viewport
          rootMargin: '-30% 0px -30% 0px',
          threshold: 0,
        }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className={styles.nav} aria-label="Primary navigation">
      <ul className={styles.list}>
        {navItems.map((item) => (
          <li key={item.id}>
            <button
              className={`${styles.link} ${activeSection === item.id ? styles.active : ''}`}
              onClick={() => scrollToSection(item.id)}
            >
              {item.label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
