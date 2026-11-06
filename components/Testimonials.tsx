import FadeUp from './FadeUp';
import { SEO_CONFIG } from '@/lib/seo-config';

const Star = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="none">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);

// Mandantenstimmen von anwalt.de/fatihbektas — authentische, verifizierte
// Bewertungen (keine fiktiven Testimonials). Veröffentlichung mit Angabe der
// Quelle; Verlinkung des Original-Profils im Footer der Sektion.
const testimonials = [
  {
    quote:
      'Als mein Arbeitgeber Ende letzten Jahres auf mich zukam, um mir mitzuteilen, dass er das Arbeitsverhältnis beenden wolle und mir im gleichen Zuge einen Aufhebungsvertrag anbot, wandte ich mich glücklicherweise an Rechtsanwalt Bektas. Auf Empfehlung von Herrn Bektas habe ich den Aufhebungsvertrag nicht unterschrieben und es stattdessen auf eine Kündigung ankommen lassen. Im Laufe des Kündigungsschutzverfahrens konnten wir uns mit dem Arbeitgeber einigen. Herr Bektas hat aufgrund seines Verhandlungsgeschickes die ursprünglich angebotene Abfindung fast verdoppelt.',
    initials: 'E. J.',
    date: '24. Oktober 2023',
    topic: 'Arbeitsrecht · Aufhebungsvertrag & Kündigungsschutzklage',
  },
  {
    quote:
      'Als klar wurde, dass mich mein ehemaliger Arbeitgeber loswerden und aus dem Unternehmen „herausmanagen" wollte, bin ich auf persönliche Empfehlung zum Glück an Herrn Bektas geraten. Er hat mir zu einer eher unkonventionellen Reaktion auf die Aktivitäten meines ehemaligen Arbeitgebers geraten, die letztlich mit einer üppigen Abfindung (Einigung vor Gericht) belohnt wurde. In den vergangenen Monaten stand er mir mit seiner ruhigen und sachlichen Art zudem mental zur Seite und hat letztlich alle Winkelzüge der Gegenseite vorhergesagt und vorbeugend entgegengewirkt.',
    initials: 'A. U.',
    date: '13. November 2023',
    topic: 'Arbeitsrecht · Trennungsvereinbarung',
  },
  {
    quote:
      'Ich habe mich von Fatih Bektas bezüglich meines Aufhebungsvertrages und dessen optimaler Gestaltung beraten lassen. Herr Bektas hat mich sehr professionell (und vor allem sehr kurzfristig) beraten und alle Aspekte auch für mich als Laien sehr verständlich erläutert. Ich würde jederzeit wieder Herrn Bektas aufsuchen und kann ihn daher jedem nur weiterempfehlen.',
    initials: 'D. J.',
    date: '6. März 2024',
    topic: 'Arbeitsrecht · Aufhebungsvertrag',
  },
];

const stats = [
  { value: 'Fachanwalt', label: 'für Arbeitsrecht' },
  { value: `${SEO_CONFIG.rating.ratingValue} \u2605`, label: 'Mandantenbewertung' },
  { value: '20+', label: 'Jahre Erfahrung' },
  { value: '48h', label: 'Ersteinschätzung' },
];

export default function Testimonials() {
  return (
    <section className="py-[90px] px-8 bg-cream max-md:py-[60px] max-md:px-6">
      <div className="max-w-content mx-auto">
        <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2.5">
          Mandantenstimmen
        </div>
        <h2 className="font-serif text-[clamp(1.6rem,3vw,2.2rem)] font-bold leading-[1.25] mb-3.5 max-md:text-2xl">
          Was unsere Mandanten sagen
        </h2>
        <p className="text-[1.05rem] text-ink-muted max-w-[580px] leading-relaxed mb-10">
          Verifizierte Mandantenbewertungen zu Kündigung, Abfindung und Aufhebungsvertrag.
        </p>
        <div className="grid grid-cols-3 gap-5 max-md:grid-cols-1">
          {testimonials.map((t, i) => (
            <FadeUp key={t.initials + t.date} delay={i}>
              <article className="bg-white border border-border-light rounded py-8 px-7 transition-all hover:border-gold hover:-translate-y-1 h-full flex flex-col">
                <div className="flex gap-0.5 text-gold-dark mb-4">
                  <Star />
                  <Star />
                  <Star />
                  <Star />
                  <Star />
                </div>
                <p className="text-[0.92rem] text-ink-light leading-relaxed italic mb-6 flex-1">
                  &bdquo;{t.quote}&ldquo;
                </p>
                <div>
                  <div className="text-[0.95rem] font-bold text-ink">{t.initials}</div>
                  <div className="text-[0.82rem] text-ink-muted">{t.topic}</div>
                  <div className="text-[0.78rem] text-ink-muted mt-0.5">{t.date} · anwalt.de</div>
                </div>
              </article>
            </FadeUp>
          ))}
        </div>
        <p className="text-[0.82rem] text-ink-muted mt-6">
          Verifizierte Mandantenbewertungen von{' '}
          <a
            href="https://www.anwalt.de/fatihbektas"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gold-dark no-underline hover:underline"
          >
            anwalt.de/fatihbektas
          </a>
          .
        </p>
        <FadeUp className="flex gap-10 justify-center mt-12 pt-9 border-t border-border max-md:gap-5 max-md:flex-wrap">
          {stats.map((s) => (
            <div key={s.label}>
              <div className="font-serif text-[1.6rem] font-bold text-gold-dark">{s.value}</div>
              <div className="text-[0.82rem] text-ink-muted mt-0.5">{s.label}</div>
            </div>
          ))}
        </FadeUp>
      </div>
    </section>
  );
}
