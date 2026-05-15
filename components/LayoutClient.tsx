'use client';

import { useCallback } from 'react';
import { usePathname } from 'next/navigation';
import Navigation from './Navigation';
import Footer from './Footer';
import CookieBanner from './CookieBanner';
import ScrollToTop from './ScrollToTop';
import MobileCTA from './MobileCTA';

const STANDALONE_PAGES = ['/mandantenaufnahme'];

export default function LayoutClient({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isStandalone = STANDALONE_PAGES.some((p) => pathname.startsWith(p));

  const handleOpenCookieSettings = useCallback(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const fn = (window as any).__openCookieSettings;
    if (typeof fn === 'function') fn();
  }, []);

  if (isStandalone) {
    return (
      <>
        {children}
        <CookieBanner />
      </>
    );
  }

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
