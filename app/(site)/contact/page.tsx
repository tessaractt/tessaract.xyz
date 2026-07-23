'use client';

/**
 * Contact route — redirects to the contact section on the home page.
 * Content now lives at /#contact on the single scrollable page.
 */

import { useEffect } from 'react';

export default function ContactPage() {
  useEffect(() => {
    window.location.replace('/#contact');
  }, []);
  return null;
}
