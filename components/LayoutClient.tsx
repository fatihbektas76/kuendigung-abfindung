'use client';

import { useCallback } from 'react';
import { usePathname } from 'next/navigation';
import Navigation from './Navigation';
import Footer from './Footer';
import LegalDisclaimer from './LegalDisclaimer';
import CookieBanner from './CookieBanner';
import ScrollToTop from './ScrollToTop';
import MobileCTA from './MobileCTA';
// TODO: Chatbot is not ready yet — re-enable when finished
// import ChatbotWidget from './chatbot/ChatbotWidget';

const NO_FOOTER_PAGES = ['/mandantenaufnahme'];
// Werbe-Landing-Pages: Navigation, Footer, Disclaimer, MobileCTA werden
// komplett unterdrückt. Jede Landing-Page bringt ihr eigenes Minimal-Chrome
// mit, damit der Werbe-Klicker keinen Wegfindungs-Ausweg hat.
const NO_CHROME_PAGES = ['/jetzt'];

export default function LayoutClient({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hideFooter = NO_FOOTER_PAGES.some((p) => pathname.startsWith(p));
  const hideChrome = NO_CHROME_PAGES.some((p) => pathname.startsWith(p));

  const handleOpenCookieSettings = useCallback(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const fn = (window as any).__openCookieSettings;
    if (typeof fn === 'function') fn();
  }, []);

  if (hideChrome) {
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
      {!hideFooter && <LegalDisclaimer />}
      {!hideFooter && <Footer onOpenCookieSettings={handleOpenCookieSettings} />}
      <CookieBanner />
      <ScrollToTop />
      {!hideFooter && <MobileCTA />}
      {/* TODO: Chatbot re-enable when ready */}
    </>
  );
}
