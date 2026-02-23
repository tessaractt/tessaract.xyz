/**
 * Root Layout — Tessaract.xyz
 * 
 * App-wide providers and global styles.
 * Does not include site-specific UI (handled in (site) route group).
 */

import type { Metadata } from 'next';
import { Krona_One, IBM_Plex_Mono } from 'next/font/google';
import './globals.css';

// Load Krona One font (display headings)
const kronaOne = Krona_One({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

// Load IBM Plex Mono font (footer, labels, code)
const ibmPlexMono = IBM_Plex_Mono({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Tessaract.xyz — Creative Studio',
  description: 'Personal design and creative studio. Portfolio, signal, and high quality marketing site.',
  metadataBase: new URL('https://tessaract.xyz'),
  openGraph: {
    title: 'Tessaract.xyz — Creative Studio',
    description: 'Personal design and creative studio.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tessaract.xyz — Creative Studio',
    description: 'Personal design and creative studio.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${kronaOne.variable} ${ibmPlexMono.variable}`}>
      <body>
        {children}
      </body>
    </html>
  );
}
