/**
 * Navigation Data
 */

export interface NavItem {
  label: string;
  href: string;
}

export const navItems: NavItem[] = [
  { label: 'ABOUT', href: '/' },
  { label: 'TESSAVERSE', href: '/tessaverse' },
  { label: 'CONTACT', href: '/contact' },
];
