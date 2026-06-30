'use client';

import { useCallback } from 'react';
import { usePathname } from 'next/navigation';
import Navigation from './Navigation';
import Footer from './Footer';
import LegalDisclaimer from './LegalDisclaimer';
import CookieBanner from '../CookieBanner';
import ScrollToTop from '../ScrollToTop';
import MobileCTA from './MobileCTA';

const NO_FOOTER_PAGES = ['/en/client-intake', '/en/client-intake-dismissal'];

interface WindowWithCookieSettings extends Window {
  __openCookieSettings?: () => void;
}

export default function LayoutClient({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hideFooter = NO_FOOTER_PAGES.some((p) => pathname.startsWith(p));

  const handleOpenCookieSettings = useCallback(() => {
    const fn = (window as unknown as WindowWithCookieSettings).__openCookieSettings;
    if (typeof fn === 'function') fn();
  }, []);

  return (
    <>
      <Navigation />
      {children}
      {!hideFooter && <LegalDisclaimer />}
      {!hideFooter && <Footer onOpenCookieSettings={handleOpenCookieSettings} />}
      <CookieBanner />
      <ScrollToTop />
      {!hideFooter && <MobileCTA />}
    </>
  );
}
