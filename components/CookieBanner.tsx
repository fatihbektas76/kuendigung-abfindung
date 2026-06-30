'use client';

import { useState, useEffect, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import Script from 'next/script';

interface CookieConsent {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
}

interface CookieCopy {
  bannerTitle: string;
  bannerBody: string;
  privacyLabel: string;
  privacyHref: string;
  accept: string;
  reject: string;
  customise: string;
  modalTitle: string;
  modalIntro: string;
  necessaryLabel: string;
  alwaysOn: string;
  necessaryBody: string;
  analyticsLabel: string;
  analyticsBody: string;
  marketingLabel: string;
  marketingBody: string;
  saveSelection: string;
  acceptAll: string;
}

const COPY_DE: CookieCopy = {
  bannerTitle: 'Cookie-Hinweis',
  bannerBody:
    'Wir verwenden Cookies um die Nutzererfahrung zu verbessern. Analyse- und Marketing-Cookies werden nur mit Ihrer Zustimmung gesetzt.',
  privacyLabel: 'Datenschutzerklärung',
  privacyHref: '/privacy-policy',
  accept: 'Akzeptieren',
  reject: 'Ablehnen',
  customise: 'Anpassen',
  modalTitle: 'Cookie-Einstellungen',
  modalIntro:
    'Wählen Sie, welche Cookies Sie zulassen möchten. Sie können diese Einstellungen jederzeit ändern.',
  necessaryLabel: 'Technisch notwendig',
  alwaysOn: 'Immer aktiv',
  necessaryBody:
    'Für die Grundfunktionen der Website erforderlich. Diese Cookies speichern keine personenbezogenen Daten.',
  analyticsLabel: 'Analyse (Google Analytics)',
  analyticsBody:
    'Helfen uns zu verstehen, wie Besucher unsere Website nutzen. Daten werden anonymisiert. Anbieter: Google Ireland Limited.',
  marketingLabel: 'Marketing (Brevo)',
  marketingBody:
    'Werden verwendet, um Besucherinteraktionen zu verfolgen und die Wirksamkeit unserer Kommunikation zu messen. Anbieter: Brevo SAS (Frankreich, EU).',
  saveSelection: 'Auswahl speichern',
  acceptAll: 'Alle akzeptieren',
};

const COPY_EN: CookieCopy = {
  bannerTitle: 'Cookie notice',
  bannerBody:
    'We use cookies to improve the user experience. Analytics and marketing cookies are only set with your consent.',
  privacyLabel: 'Privacy policy',
  privacyHref: '/en/privacy-policy',
  accept: 'Accept',
  reject: 'Reject',
  customise: 'Customise',
  modalTitle: 'Cookie settings',
  modalIntro:
    'Choose which cookies you want to allow. You can change these settings at any time.',
  necessaryLabel: 'Strictly necessary',
  alwaysOn: 'Always on',
  necessaryBody:
    'Required for the basic functions of the site. These cookies do not store any personal data.',
  analyticsLabel: 'Analytics (Google Analytics)',
  analyticsBody:
    'Help us understand how visitors use the site. Data is anonymised. Provider: Google Ireland Limited.',
  marketingLabel: 'Marketing (Brevo)',
  marketingBody:
    'Used to track visitor interactions and measure the effectiveness of our communications. Provider: Brevo SAS (France, EU).',
  saveSelection: 'Save selection',
  acceptAll: 'Accept all',
};

export default function CookieBanner() {
  const pathname = usePathname();
  const copy = pathname?.startsWith('/en') ? COPY_EN : COPY_DE;
  const [consent, setConsent] = useState<CookieConsent | null>(null);
  const [showBanner, setShowBanner] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [analyticsChecked, setAnalyticsChecked] = useState(false);
  const [marketingChecked, setMarketingChecked] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('cookie_consent');
      if (stored) {
        const parsed = JSON.parse(stored) as CookieConsent;
        setConsent(parsed);
        setAnalyticsChecked(parsed.analytics);
        setMarketingChecked(parsed.marketing);
      } else {
        setShowBanner(true);
      }
    } catch {
      setShowBanner(true);
    }
  }, []);

  const saveConsent = useCallback((newConsent: CookieConsent) => {
    localStorage.setItem('cookie_consent', JSON.stringify(newConsent));
    setConsent(newConsent);
    setShowBanner(false);
    setShowModal(false);
  }, []);

  const acceptAll = () => saveConsent({ necessary: true, analytics: true, marketing: true });
  const rejectOptional = () => saveConsent({ necessary: true, analytics: false, marketing: false });
  const saveCustom = () =>
    saveConsent({ necessary: true, analytics: analyticsChecked, marketing: marketingChecked });

  const openSettings = useCallback(() => {
    if (consent) {
      setAnalyticsChecked(consent.analytics);
      setMarketingChecked(consent.marketing);
    }
    setShowModal(true);
  }, [consent]);

  // Expose openSettings globally for Footer to call
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).__openCookieSettings = openSettings;
  }, [openSettings]);

  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <>
      {/* Google Analytics - only if consent given */}
      {consent?.analytics && gaId && gaId !== 'your_ga_id_here' && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            strategy="afterInteractive"
          />
          <Script id="ga-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${gaId}', { anonymize_ip: true });
            `}
          </Script>
        </>
      )}

      {/* Brevo Tracking - only if consent given */}
      {consent?.marketing && process.env.NEXT_PUBLIC_BREVO_CLIENT_KEY && (
        <Script
          src={`https://sibautomation.com/sa.js?key=${process.env.NEXT_PUBLIC_BREVO_CLIENT_KEY}`}
          strategy="afterInteractive"
        />
      )}

      {/* Cookie Banner */}
      {showBanner && (
        <div className="fixed bottom-0 left-0 right-0 z-[9999] bg-white border-t border-border shadow-[0_-4px_24px_rgba(0,0,0,0.1)] p-6 px-8">
          <div className="max-w-content mx-auto flex items-start gap-6 flex-wrap max-md:flex-col max-md:gap-4">
            <div className="flex-1 min-w-[300px]">
              <p className="text-[0.95rem] font-bold mb-1.5">{copy.bannerTitle}</p>
              <p className="text-[0.84rem] text-ink-muted leading-relaxed m-0">
                {copy.bannerBody}{' '}
                <a href={copy.privacyHref} className="text-gold-dark underline">
                  {copy.privacyLabel}
                </a>
              </p>
            </div>
            <div className="flex gap-2.5 items-center flex-wrap max-md:w-full">
              <button
                onClick={acceptAll}
                className="py-2.5 px-[22px] rounded-sm text-[0.85rem] font-semibold cursor-pointer border-none font-sans transition-all bg-gold-dark text-white hover:bg-[#635428] max-md:flex-1"
              >
                {copy.accept}
              </button>
              <button
                onClick={rejectOptional}
                className="py-2.5 px-[22px] rounded-sm text-[0.85rem] font-semibold cursor-pointer font-sans transition-all bg-transparent text-ink-light border border-border hover:border-gold hover:text-gold max-md:flex-1"
              >
                {copy.reject}
              </button>
              <button
                onClick={() => {
                  setShowBanner(false);
                  openSettings();
                }}
                className="bg-none border-none text-ink-muted text-[0.82rem] cursor-pointer underline p-0 hover:text-gold"
              >
                {copy.customise}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Cookie Settings Modal */}
      {showModal && (
        <div
          className="fixed inset-0 bg-black/50 z-[10000] flex items-center justify-center p-8"
          onClick={(e) => e.target === e.currentTarget && setShowModal(false)}
        >
          <div className="bg-white rounded max-w-[560px] w-full max-h-[80vh] overflow-y-auto p-8 max-md:mx-4 max-md:p-6">
            <p className="font-serif text-[1.2rem] font-bold mb-4">{copy.modalTitle}</p>
            <p className="text-[0.88rem] text-ink-muted mb-5">{copy.modalIntro}</p>

            <div className="py-4 border-b border-border">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-[0.92rem] font-semibold m-0">{copy.necessaryLabel}</p>
                  <span className="text-[0.78rem] text-ink-muted">{copy.alwaysOn}</span>
                </div>
                <label className="cookie-toggle">
                  <input type="checkbox" checked disabled />
                  <span className="cookie-slider" />
                </label>
              </div>
              <p className="text-[0.82rem] text-ink-muted mt-1.5 leading-relaxed">
                {copy.necessaryBody}
              </p>
            </div>

            <div className="py-4 border-b border-border">
              <div className="flex justify-between items-center">
                <p className="text-[0.92rem] font-semibold m-0">{copy.analyticsLabel}</p>
                <label className="cookie-toggle">
                  <input
                    type="checkbox"
                    checked={analyticsChecked}
                    onChange={(e) => setAnalyticsChecked(e.target.checked)}
                  />
                  <span className="cookie-slider" />
                </label>
              </div>
              <p className="text-[0.82rem] text-ink-muted mt-1.5 leading-relaxed">
                {copy.analyticsBody}
              </p>
            </div>

            <div className="py-4">
              <div className="flex justify-between items-center">
                <p className="text-[0.92rem] font-semibold m-0">{copy.marketingLabel}</p>
                <label className="cookie-toggle">
                  <input
                    type="checkbox"
                    checked={marketingChecked}
                    onChange={(e) => setMarketingChecked(e.target.checked)}
                  />
                  <span className="cookie-slider" />
                </label>
              </div>
              <p className="text-[0.82rem] text-ink-muted mt-1.5 leading-relaxed">
                {copy.marketingBody}
              </p>
            </div>

            <div className="flex gap-2.5 mt-5">
              <button
                onClick={saveCustom}
                className="flex-1 py-2.5 px-[22px] rounded-sm text-[0.85rem] font-semibold cursor-pointer font-sans transition-all bg-transparent text-ink-light border border-border hover:border-gold hover:text-gold"
              >
                {copy.saveSelection}
              </button>
              <button
                onClick={acceptAll}
                className="flex-1 py-2.5 px-[22px] rounded-sm text-[0.85rem] font-semibold cursor-pointer border-none font-sans transition-all bg-gold-dark text-white hover:bg-[#635428]"
              >
                {copy.acceptAll}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
