'use client';

import { useCallback } from 'react';
import { usePathname } from 'next/navigation';
import Navigation from './Navigation';
import Footer from './Footer';
import CookieBanner from './CookieBanner';
import ScrollToTop from './ScrollToTop';
import MobileCTA from './MobileCTA';
import ChatbotWidget from './chatbot/ChatbotWidget';

const NO_FOOTER_PAGES = ['/mandantenaufnahme'];
const NO_CHATBOT_PAGES = ['/mandantenaufnahme'];

export default function LayoutClient({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hideFooter = NO_FOOTER_PAGES.some((p) => pathname.startsWith(p));
  const hideChatbot = NO_CHATBOT_PAGES.some((p) => pathname.startsWith(p));

  const handleOpenCookieSettings = useCallback(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const fn = (window as any).__openCookieSettings;
    if (typeof fn === 'function') fn();
  }, []);

  return (
    <>
      <Navigation />
      {children}
      {!hideFooter && <Footer onOpenCookieSettings={handleOpenCookieSettings} />}
      <CookieBanner />
      <ScrollToTop />
      {!hideFooter && <MobileCTA />}
      {!hideChatbot && <ChatbotWidget />}
    </>
  );
}
