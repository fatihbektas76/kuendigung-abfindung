import FadeUp from './FadeUp';
import { SEO_CONFIG } from '@/lib/seo-config';
import { getStrings, type Locale } from '@/lib/i18n/strings';

/**
 * Sprachunabhängige Hero-Komponente.
 * - Default locale='de'; EN übergibt locale='en'.
 * - ALLE Texte kommen aus lib/i18n/strings.ts.
 * - Wenn du einen Text änderst: einmal im Wörterbuch, beide Sprachen gleich strukturiert.
 */
export default function Hero({ locale = 'de' }: { locale?: Locale }) {
  const t = getStrings(locale);
  const secondaryHref = locale === 'de' ? '/abfindungsrechner/' : '/en/severance-calculator/';
  const kanzleiLabel = locale === 'de' ? 'Kanzlei für Arbeitsrecht' : 'German Employment Law Firm';
  const stat1Label = locale === 'de' ? 'Jahre Erfahrung' : 'Years experience';
  const stat2Label = locale === 'de' ? 'Fachanwaltstitel' : 'Fachanwalt title';
  const stat2Value = locale === 'de' ? 'seit 2011' : 'since 2011';
  const stat3Value = locale === 'de' ? '3 Wochen' : '3 weeks';
  const stat3Label = locale === 'de' ? 'Klagefrist beachten' : 'Filing deadline';
  const stat4Label = locale === 'de' ? 'Bewertung' : 'Client rating';

  return (
    <header className="pt-[150px] pb-[100px] px-8 bg-cream text-center relative overflow-hidden max-md:pt-[120px] max-md:pb-[70px] max-md:px-6" role="banner">
      <div className="absolute -top-[40%] -right-[15%] w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(166,139,75,0.07)_0%,transparent_70%)] z-[2]" />
      <div className="max-w-[800px] mx-auto relative z-[3]">
        <div className="font-serif text-[1.1rem] text-gold-dark font-semibold mb-1.5">
          {kanzleiLabel}{' '}
          <span className="inline-block text-[0.68rem] font-bold text-green bg-green-bg border-[1.5px] border-green/20 rounded px-2.5 py-[3px] tracking-wider uppercase ml-2.5 align-middle">
            {t.hero.eyebrowBadge}
          </span>
        </div>
        <h1 className="font-serif text-[clamp(2.1rem,4.5vw,3.2rem)] font-extrabold leading-[1.15] mt-[18px] mb-[22px] tracking-tight max-md:text-[1.9rem]">
          {t.hero.titleLine1}
          <br />
          {t.hero.titleLine2}
        </h1>
        <p className="text-[1.12rem] text-ink-muted max-w-[620px] mx-auto mb-6 leading-relaxed">
          {t.hero.lede}
        </p>
        <div className="flex items-center justify-center gap-x-5 gap-y-1.5 flex-wrap mb-8 text-[0.82rem] text-ink-light">
          {[t.hero.badge1, t.hero.badge2, t.hero.badge3].map((label) => (
            <span key={label} className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-green shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
              {label}
            </span>
          ))}
        </div>
        <div className="flex gap-3.5 justify-center flex-wrap max-md:flex-col max-md:items-center">
          <a
            href={locale === 'de' ? '#kontakt' : '#contact'} data-track="cta_hero_kontakt"
            className="inline-flex items-center gap-2 px-[30px] py-3.5 rounded-sm text-[0.95rem] font-semibold no-underline transition-all bg-gold-dark text-white hover:bg-[#735F32] hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(166,139,75,0.25)] max-md:w-full max-md:justify-center"
          >
            {t.hero.primaryCta} &rarr;
          </a>
          <a
            href={secondaryHref}
            className="inline-flex items-center gap-2 px-[30px] py-3.5 rounded-sm text-[0.95rem] font-semibold no-underline transition-all bg-transparent text-ink border-[1.5px] border-border hover:border-gold hover:text-gold max-md:w-full max-md:justify-center"
          >
            {t.hero.secondaryCta}
          </a>
        </div>
        <FadeUp className="flex gap-10 justify-center mt-12 pt-9 border-t border-border max-md:gap-5 max-md:flex-wrap">
          <div>
            <div className="font-serif text-[1.6rem] font-bold text-gold-dark">20+</div>
            <div className="text-[0.82rem] text-ink-muted mt-0.5">{stat1Label}</div>
          </div>
          <div>
            <div className="font-serif text-[1.6rem] font-bold text-gold-dark">{stat2Value}</div>
            <div className="text-[0.82rem] text-ink-muted mt-0.5">{stat2Label}</div>
          </div>
          <div>
            <div className="font-serif text-[1.6rem] font-bold text-gold-dark">{stat3Value}</div>
            <div className="text-[0.82rem] text-ink-muted mt-0.5">{stat3Label}</div>
          </div>
          <div>
            <div className="font-serif text-[1.6rem] font-bold text-gold-dark">{SEO_CONFIG.rating.ratingValue} &#9733;</div>
            <div className="text-[0.82rem] text-ink-muted mt-0.5">{stat4Label}</div>
          </div>
        </FadeUp>
      </div>
    </header>
  );
}
