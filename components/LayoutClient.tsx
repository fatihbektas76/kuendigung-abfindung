'use client';

import { useCallback } from 'react';
import Navigation from './Navigation';
import Footer from './Footer';
import CookieBanner from './CookieBanner';
import ScrollToTop from './ScrollToTop';
import MobileCTA from './MobileCTA';

export default function LayoutClient({ children }: { children: React.ReactNode }) {
  const handleOpenCookieSettings = useCallback(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const fn = (window as any).__openCookieSettings;
    if (typeof fn === 'function') fn();
  }, []);

  return (
    <>
      <Navigation />
      {children}
      <Footer onOpenCookieSettings={handleOpenCookieSettings} />
      <CookieBanner />
      <ScrollToTop />
      <MobileCTA />
    </>
  );
}
