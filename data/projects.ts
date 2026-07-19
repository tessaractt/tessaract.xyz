/**
 * Projects Data — Tessaverse portfolio
 * 
 * Source: Figma (tessaract.xyz / tessaverse page)
 * Structure supports scalable content per product-brief.md
 */

export interface Project {
  id: string;
  slug: string;
  title: string;
  tags: string[];
  description: string;
  ctas?: {
    text: string;
    url: string;
  }[];
  media?: {
    src: string;
    alt: string;
    width?: number;
    height?: number;
  }[];
  colSpan?: 1 | 2; // For grid layout
  featured?: boolean;
}

export const projects: Project[] = [
  {
    id: '1',
    slug: 'edge-city-goods',
    title: 'edge city goods',
    tags: ['merch design', 'branding'],
    description: 'Designed the merch collection and built a full Shopify storefront from scratch for Edge City\'s merch line — custom theme, product architecture, and end-to-end brand system. Took it from zero to live for a 1,000+ person network of builders, founders, and researchers.',
    ctas: [
      { text: 'website', url: 'https://goods.edgecity.live/' },
      { text: 'see merch in action', url: 'https://x.com/timourxyz/status/1935012109076873280' }
    ],
    media: [
      { src: '/images/tessaverse/edge-city-goods/egde-city-goods-banner3.png', alt: 'Edge City Goods Merch', width: 1114, height: 559 }
    ],
    colSpan: 2,
    featured: true,
  },
  {
    id: '2',
    slug: 'innermost',
    title: 'innermost',
    tags: ['mini app', 'wellness', 'digital experience'],
    description: 'Led the end-to-end design of Innermost, a mindfulness mini app shipped on the World App platform. Directed brand system, UX, and app architecture in close collaboration with a developer, from concept to live deployment.',
    ctas: [
      { text: 'website', url: 'https://www.innermost.life' },
      { text: 'download innermost', url: 'https://world.org/ecosystem/app_7e60435ce14a92c8fe155fa02c07b2f1' },
      { text: 'video', url: 'https://x.com/FWBtweets/status/2016611604150858042?s=20' }
    ],
    media: [
      { src: '/images/tessaverse/innermost/innermostbannernew3.png', alt: 'Innermost App UI', width: 2228, height: 1254 }
    ],
    colSpan: 2,
    featured: true,
  },
  {
    id: '3',
    slug: 'cursive-connection',
    title: 'cursive connection',
    tags: ['web app', 'exhibition', 'merch design'],
    description: 'Designed a privacy-preserving social app built on zero-knowledge cryptography, deployed to 20,000+ participants at Edge City Lanna and Devcon SEA 2024. Also directed a Cryptography Museum exhibition and crypto-themed merch collection, translating protocol-level ideas into physical and cultural expression.',
    ctas: [
      { text: 'read recap', url: 'https://x.com/tessla0x0/status/1860267327629197677' }
    ],
    media: [
      { src: '/images/tessaverse/cursive-connection/cursive connection banner3.png', alt: 'Cursive Connection App', width: 1114, height: 860 }
    ],
    colSpan: 2,
    featured: true,
  },
  {
    id: '4',
    slug: 'verify-media',
    title: 'verify media',
    tags: ['product design', 'web3'],
    description: 'Product design lead at FOX Corporation\'s blockchain Creative Lab, building a tokenized media verification platform. Owned UX/UI end-to-end, working at the intersection of media, trust infrastructure, and web3.',
    ctas: [
      { text: 'website', url: 'https://www.verifymedia.com/' }
    ],
    media: [
      { src: '/images/tessaverse/verify/VERIFY Logo Proposal_6.png', alt: 'Verify Media', width: 1590, height: 1311 }
    ],
    colSpan: 1,
    featured: true,
  },
  {
    id: '5',
    slug: 'myosin-hivemind',
    title: 'myosin hivemind',
    tags: ['AI', 'design audit', 'ux/ui'],
    description: 'Full design audit and redesign of Myosin\'s AI chatbot product, Hivemind. Identified structural UX issues across conversational flows and shipped a cleaner, more usable interface, improving clarity and reducing friction in AI-human interaction.',
    ctas: [
      { text: 'website', url: 'https://myosin.xyz/hivemind' }
    ],
    media: [
      { src: '/images/tessaverse/myosin/hivemindbanner1.png', alt: 'Myosin Hivemind', width: 1590, height: 1311 } // Reusing the asset specified
    ],
    colSpan: 1,
    featured: true,
  },
  {
    id: '6',
    slug: 'breathing-ai',
    title: 'breathing.ai',
    tags: ['ux/ui', 'branding', 'prototype'],
    description: 'Designed the UX, brand identity, and interactive prototype for Breathing.ai, an AI-powered wellness companion for guided breathwork. End-to-end design ownership from visual identity through clickable prototype.',
    ctas: [
      { text: 'website', url: 'https://www.breathing.ai/' }
    ],
    media: [
      { src: '/images/tessaverse/breathingai/breathing.ai2.png', alt: 'Breathing AI', width: 1114, height: 559 }
    ],
    colSpan: 2,
    featured: true,
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getAllProjects(): Project[] {
  return projects;
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured);
}
