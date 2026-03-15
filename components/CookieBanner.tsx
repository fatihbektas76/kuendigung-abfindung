'use client';

import { useState, useEffect, useCallback } from 'react';
import Script from 'next/script';

interface CookieConsent {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
}

export default function CookieBanner() {
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
              <p className="text-[0.95rem] font-bold mb-1.5">We value your privacy</p>
              <p className="text-[0.84rem] text-ink-muted leading-relaxed m-0">
                We use cookies to analyze website traffic and optimize your experience. Analytics and
                marketing cookies are only set with your consent.{' '}
                <a href="/privacy-policy" className="text-gold-dark underline">
                  Privacy Policy
                </a>
              </p>
            </div>
            <div className="flex gap-2.5 items-center flex-wrap max-md:w-full">
              <button
                onClick={acceptAll}
                className="py-2.5 px-[22px] rounded-sm text-[0.85rem] font-semibold cursor-pointer border-none font-sans transition-all bg-gold-dark text-white hover:bg-[#635428] max-md:flex-1"
              >
                Accept All
              </button>
              <button
                onClick={rejectOptional}
                className="py-2.5 px-[22px] rounded-sm text-[0.85rem] font-semibold cursor-pointer font-sans transition-all bg-transparent text-ink-light border border-border hover:border-gold hover:text-gold max-md:flex-1"
              >
                Necessary Only
              </button>
              <button
                onClick={() => {
                  setShowBanner(false);
                  openSettings();
                }}
                className="bg-none border-none text-ink-muted text-[0.82rem] cursor-pointer underline p-0 hover:text-gold"
              >
                Customize
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
            <p className="font-serif text-[1.2rem] font-bold mb-4">Cookie Settings</p>
            <p className="text-[0.88rem] text-ink-muted mb-5">
              Choose which cookies you want to allow. You can change these settings at any time.
            </p>

            <div className="py-4 border-b border-border">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-[0.92rem] font-semibold m-0">Strictly Necessary</p>
                  <span className="text-[0.78rem] text-ink-muted">Always active</span>
                </div>
                <label className="cookie-toggle">
                  <input type="checkbox" checked disabled />
                  <span className="cookie-slider" />
                </label>
              </div>
              <p className="text-[0.82rem] text-ink-muted mt-1.5 leading-relaxed">
                Essential for the website to function. These cookies do not store any personally
                identifiable information.
              </p>
            </div>

            <div className="py-4 border-b border-border">
              <div className="flex justify-between items-center">
                <p className="text-[0.92rem] font-semibold m-0">Analytics (Google Analytics)</p>
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
                Help us understand how visitors interact with our website. Data is anonymized. Provider:
                Google Ireland Limited.
              </p>
            </div>

            <div className="py-4">
              <div className="flex justify-between items-center">
                <p className="text-[0.92rem] font-semibold m-0">Marketing (Brevo)</p>
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
                Used to track visitor interactions and measure communication effectiveness. Provider: Brevo
                SAS (France, EU).
              </p>
            </div>

            <div className="flex gap-2.5 mt-5">
              <button
                onClick={saveCustom}
                className="flex-1 py-2.5 px-[22px] rounded-sm text-[0.85rem] font-semibold cursor-pointer font-sans transition-all bg-transparent text-ink-light border border-border hover:border-gold hover:text-gold"
              >
                Save Preferences
              </button>
              <button
                onClick={acceptAll}
                className="flex-1 py-2.5 px-[22px] rounded-sm text-[0.85rem] font-semibold cursor-pointer border-none font-sans transition-all bg-gold-dark text-white hover:bg-[#635428]"
              >
                Accept All
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
