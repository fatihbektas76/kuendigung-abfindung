/**
 * Zentrales Wörterbuch für wiederverwendete UI-Texte (Hero, Prozess,
 * CTAs, Trust-Elemente, Kontaktbereich etc.).
 *
 * Zweck: DE und EN sollen strukturell garantiert gleich aufgebaut sein.
 * Jeder Schlüssel existiert in *beiden* Sprachen (TypeScript erzwingt das).
 *
 * Verwendung in Server Components:
 *
 *   import { getStrings } from '@/lib/i18n/strings';
 *   const t = getStrings('de'); // oder 'en'
 *   <h1>{t.hero.title}</h1>
 *
 * Verwendung in Client Components: Locale per Prop/Context reinreichen
 * und denselben getStrings() aufrufen.
 *
 * NEUE SCHLÜSSEL: Immer zu BEIDEN Sprachen hinzufügen — TypeScript
 * verweigert sonst die Kompilierung (siehe Typcheck unten).
 */

export type Locale = 'de' | 'en';

const de = {
  hero: {
    eyebrowBadge: 'Kostenlose Ersteinschätzung',
    titleLine1: 'Gekündigt?',
    titleLine2: 'Holen Sie das Maximum aus Ihrer Abfindung.',
    lede: 'Nach einer Kündigung haben Sie nur 3 Wochen Zeit für eine Klage (§ 4 KSchG). Schildern Sie uns Ihren Fall: In der Regel innerhalb von 48 Stunden erhalten Sie eine kostenlose Ersteinschätzung – ob sich ein Vorgehen lohnt, welche Fristen laufen und was unsere Hilfe kostet.',
    badge1: 'Fachanwalt seit 2011',
    badge2: 'Kostenlose Ersteinschätzung',
    badge3: 'Deutsch & Englisch',
    primaryCta: 'Kostenlose Ersteinschätzung',
    secondaryCta: 'Abfindung berechnen',
  },
  keyPoints: {
    headline: 'Das Wichtigste in Kürze',
    freeCheck: 'Kostenlose Ersteinschätzung: Ein Fachanwalt sagt Ihnen, ob sich ein Vorgehen lohnt und was es kostet – unverbindlich.',
  },
  process: {
    eyebrow: 'So funktioniert es',
    headline: 'Von der ersten Anfrage bis zum Ergebnis — in vier Schritten',
    tagline: 'Kosten klar, bevor Sie beauftragen.',
    step1Title: 'Kostenlose Ersteinschätzung',
    step1Desc: 'Schildern Sie Ihren Fall. In der Regel innerhalb von 48 Stunden sagen wir Ihnen, ob sich ein Vorgehen lohnt, welche Fristen laufen und was es kostet.',
    step2Title: 'Angebot & Auftrag',
    step2Desc: 'Sie erhalten ein Kostenangebot oder wir klären die Kostenübernahme mit Ihrer Rechtsschutzversicherung. Erst mit Ihrem Auftrag entstehen Kosten.',
    step3Title: 'Prüfung, Verhandlung oder Klage',
    step3Desc: 'Wir prüfen Ihre Unterlagen, verhandeln mit dem Arbeitgeber oder reichen fristgerecht Kündigungsschutzklage ein.',
    step4Title: 'Ergebnis',
    step4Desc: 'Abfindung, optimierter Aufhebungsvertrag oder Weiterbeschäftigung. Die meisten Verfahren enden mit einem Vergleich.',
  },
  contact: {
    headline: 'Schildern Sie uns Ihren Fall.',
    lede: 'Füllen Sie das Formular aus – in der Regel innerhalb von 48 Stunden erhalten Sie eine kostenlose Ersteinschätzung und, wenn sinnvoll, ein Kostenangebot.',
    whatHappensNextTitle: 'Was passiert danach?',
    whatHappensNextBody: 'Wir melden uns mit einer Ersteinschätzung: ob Ihre Kündigung oder Ihr Aufhebungsvertrag Ansatzpunkte bietet, welche Fristen laufen und was die nächsten Schritte kosten.',
    primaryCta: 'Kostenlose Ersteinschätzung anfordern',
    phoneCta: 'Telefontermin für die Ersteinschätzung buchen',
  },
  closingCta: {
    headline: 'Kündigung erhalten? Die Zeit läuft.',
    body: 'Schildern Sie uns Ihren Fall – Sie erhalten kostenlos eine Ersteinschätzung, ob Ihre Kündigung angreifbar ist und was die nächsten Schritte kosten. In der Regel innerhalb von 48 Stunden.',
  },
  faqFirstCheck: {
    q: 'Was umfasst die kostenlose Ersteinschätzung?',
    a: 'Eine kurze Rückmeldung per E-Mail oder Telefon (bis ca. 15 Minuten): ob sich ein Vorgehen lohnt, welche Fristen laufen und was unsere Hilfe kostet. Eine Prüfung von Verträgen oder anderen Unterlagen und eine Rechtsberatung im Einzelnen sind darin nicht enthalten.',
  },
  faqTerminationReviewCost: {
    q: 'Was kostet die Prüfung eines Aufhebungsvertrags?',
    a: 'Nach der kostenlosen Ersteinschätzung erhalten Sie ein Kostenangebot für die ausführliche Prüfung und, wenn gewünscht, für die Verhandlung mit Ihrem Arbeitgeber. Kosten entstehen erst mit Ihrem Auftrag. Eine Rechtsschutzversicherung übernimmt die Prüfung eines Aufhebungsvertrags nicht immer; wir klären das für Sie.',
  },
};

// Widen literal types: EN soll beliebige Strings liefern können.
// Translation = dieselbe Baum-Form wie de, aber Blätter als string.
type Widen<T> = T extends string ? string : { [K in keyof T]: Widen<T[K]> };
type Translation = Widen<typeof de>;

const en: Translation = {
  hero: {
    eyebrowBadge: 'Free First Check',
    titleLine1: 'Dismissed in Germany?',
    titleLine2: 'Maximize your severance.',
    lede: 'After a dismissal you have only 3 weeks to file a claim (§ 4 KSchG). Tell us what happened: usually within 48 hours you get a free first check – whether action is worthwhile, which deadlines apply and what our help would cost.',
    badge1: 'Specialist lawyer since 2011',
    badge2: 'Free first check',
    badge3: 'German & English',
    primaryCta: 'Free first check',
    secondaryCta: 'Calculate severance',
  },
  keyPoints: {
    headline: 'Key points',
    freeCheck: 'Free first check: a specialist employment lawyer tells you whether action is worthwhile and what it would cost – no obligation.',
  },
  process: {
    eyebrow: 'Process',
    headline: 'From enquiry to outcome — in four steps',
    tagline: 'Costs clear before you instruct us.',
    step1Title: 'Free first check',
    step1Desc: 'Tell us what happened. Usually within 48 hours we tell you whether action is worthwhile, which deadlines apply and what it would cost.',
    step2Title: 'Offer & mandate',
    step2Desc: 'You receive a cost quote, or we clarify cover with your legal-expenses insurance. Costs arise only once you instruct us.',
    step3Title: 'Review, negotiation or claim',
    step3Desc: 'We review your documents, negotiate with your employer or file the unfair-dismissal claim within the deadline.',
    step4Title: 'Outcome',
    step4Desc: 'Severance, an improved termination agreement or continued employment. Most cases end in a settlement.',
  },
  contact: {
    headline: 'Tell us about your case.',
    lede: 'Fill in the form – usually within 48 hours you receive a free first check and, where useful, a cost quote.',
    whatHappensNextTitle: 'What happens next?',
    whatHappensNextBody: 'We reply with a first check: whether your dismissal or termination agreement offers points of attack, which deadlines apply and what the next steps would cost.',
    primaryCta: 'Request free first check',
    phoneCta: 'Book a phone slot for your first check',
  },
  closingCta: {
    headline: 'Dismissed? The clock is ticking.',
    body: 'Tell us about your case – you get a free first check of whether your dismissal can be challenged and what the next steps would cost. Usually within 48 hours.',
  },
  faqFirstCheck: {
    q: 'What does the free first check include?',
    a: 'A short reply by email or phone (up to about 15 minutes): whether action is worthwhile, which deadlines apply and what our help would cost. It does not include a review of contracts or other documents or detailed legal advice.',
  },
  faqTerminationReviewCost: {
    q: 'What does a termination agreement review cost?',
    a: 'After the free first check you receive a cost quote for the detailed review and, if you wish, for negotiation with your employer. Costs arise only once you instruct us. Legal-expenses insurance does not always cover the review of a termination agreement; we clarify this for you.',
  },
};

const dict: Record<Locale, Translation> = { de, en };

export function getStrings(locale: Locale): Translation {
  return dict[locale];
}
