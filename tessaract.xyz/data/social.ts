/**
 * Social Links Data
 */

export interface SocialLink {
  name: string;
  href: string;
  platform: 'instagram' | 'twitter' | 'arena';
}

export const socialLinks: SocialLink[] = [
  {
    name: 'INSTAGRAM',
    href: 'https://instagram.com/tessaract',
    platform: 'instagram',
  },
  {
    name: 'TWITTER',
    href: 'https://twitter.com/tessaract',
    platform: 'twitter',
  },
  {
    name: 'ARE.NA',
    href: 'https://are.na/tessaract',
    platform: 'arena',
  },
];

export const contactEmail = 'tesmaneewong@gmail.com';
