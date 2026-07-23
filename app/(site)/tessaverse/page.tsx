'use client';

/**
 * Tessaverse route — redirects to the tessaverse section on the home page.
 * Content now lives at /#tessaverse on the single scrollable page.
 */

import { useEffect } from 'react';

export default function TessaversePage() {
  useEffect(() => {
    window.location.replace('/#tessaverse');
  }, []);
  return null;
}
