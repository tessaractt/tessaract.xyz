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
  description: 'Design and creative studio. Mini app, UX, UI, fashion, digital and physical experiences.',
  icons: {
    icon: '/favicon.png?v=2',
    apple: '/touch-icon.png?v=2',
  },
  metadataBase: new URL('https://tessaract.xyz'),
  openGraph: {
    title: 'Tessaract.xyz — Creative Studio',
    description: 'Design and creative studio. Mini app, UX, UI, fashion, digital and physical experiences.',
    url: 'https://tessaract.xyz',
    siteName: 'Tessaract.xyz',
    images: [
      {
        url: '/social-preview.png',
        width: 1200,
        height: 630,
      },
    ],
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tessaract.xyz — Creative Studio',
    description: 'Design and creative studio. Mini app, UX, UI, fashion, digital and physical experiences.',
    images: ['/social-preview.png'],
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
