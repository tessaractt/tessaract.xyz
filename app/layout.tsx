/**
 * Root Layout — Tessaract.xyz
 * 
 * App-wide providers and global styles.
 * Does not include site-specific UI (handled in (site) route group).
 */

import type { Metadata } from 'next';
import { Krona_One, IBM_Plex_Mono } from 'next/font/google';
import Script from 'next/script';
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
  description: 'Senior Product Designer based in Los Angeles. Product design, mini apps, AI tools, design systems, and physical-digital experiences.',
  icons: {
    icon: '/favicon.png?v=2',
    apple: '/touch-icon.png?v=2',
  },
  metadataBase: new URL('https://tessaract.xyz'),
  openGraph: {
    title: 'Tessaract.xyz — Creative Studio',
    description: 'Senior Product Designer based in Los Angeles. Product design, mini apps, AI tools, design systems, and physical-digital experiences.',
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
    description: 'Senior Product Designer based in Los Angeles. Product design, mini apps, AI tools, design systems, and physical-digital experiences.',
    images: ['/social-preview.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Tessa Maneewong',
  jobTitle: 'Senior Product Designer',
  description: 'Senior Product Designer specializing in 0→1 consumer products, AI tools, and Web3 infrastructure. Based in Los Angeles.',
  url: 'https://tessaract.xyz',
  email: 'tesmaneewong@gmail.com',
  sameAs: [
    'https://www.linkedin.com/in/tessaman',
    'https://x.com/tessla0x0',
    'https://github.com/tessaractt',
  ],
  knowsAbout: [
    'Product Design',
    'UX Architecture',
    'Design Systems',
    'Token Architecture',
    'AI-Native Products',
    'Web3',
    'Interaction Design',
    'Mobile Design',
    'Shopify Hydrogen',
    'User Research',
    'Physical-Digital Experience Design',
  ],
  hasOccupation: {
    '@type': 'Occupation',
    name: 'Senior Product Designer',
    occupationLocation: {
      '@type': 'City',
      name: 'Los Angeles',
    },
    skills: 'Product Design, UX Architecture, Design Systems, AI-Native Products, Web3, Interaction Design',
  },
  alumniOf: [
    { '@type': 'EducationalOrganization', name: 'FIDM' },
    { '@type': 'EducationalOrganization', name: 'Designlab' },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${kronaOne.variable} ${ibmPlexMono.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body>
        {children}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-JTYGR3LWXH"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-JTYGR3LWXH');
          `}
        </Script>
      </body>
    </html>
  );
}
