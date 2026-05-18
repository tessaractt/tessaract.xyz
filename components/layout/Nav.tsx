/**
 * Nav — Primary navigation
 * 
 * Per Figma:
 * - Centered horizontally at top
 * - Three items: ABOUT, TESSAVERSE, CONTACT
 * - Active: blue fill (#0038C6), white text, rounded-[20px]
 * - Inactive: black border, black text, rounded-[20px]
 * - Font: Krona One, 10px, tracking -1px
 */

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Nav.module.css';

interface NavItem {
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { label: 'ABOUT', href: '/' },
  { label: 'TESSAVERSE', href: '/tessaverse' },
  { label: 'CONTACT', href: '/contact' },
];

export function Nav() {
  const pathname = usePathname();
  
  return (
    <nav className={styles.nav} aria-label="Primary navigation">
      <ul className={styles.list}>
        {navItems.map((item) => {
          const isActive = pathname === item.href || 
            (item.href !== '/' && pathname?.startsWith(item.href));
          
          return (
            <li key={item.href}>
              <Link 
                href={item.href}
                className={`${styles.link} ${isActive ? styles.active : ''}`}
                aria-current={isActive ? 'page' : undefined}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
