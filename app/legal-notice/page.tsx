import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Impressum',
  robots: 'noindex, nofollow',
};

const sections = [
  { id: 'ddg', label: 'Angaben gemäß §5 DDG' },
  { id: 'dlinfov', label: 'Angaben gemäß §2 DL-InfoV' },
  { id: 'versicherung', label: 'Berufshaftpflichtversicherung' },
  { id: 'berufsrecht', label: 'Berufsrechtliche Regelungen' },
  { id: 'schlichtung-brao', label: 'Schlichtungsstelle der Rechtsanwaltschaft' },
  { id: 'vsbg', label: 'Hinweis gemäß §§36, 37 VSBG' },
  { id: 'interessenkonflikte', label: 'Interessenkonflikte' },
  { id: 'datenschutz', label: 'Datenschutz' },
  { id: 'mstv', label: 'Verantwortlich gemäß §18 Abs. 2 MStV' },
];

function SectionHeader({ number, title, id }: { number: string; title: string; id: string }) {
  return (
    <div className="mb-5 flex items-baseline gap-4">
      <span className="font-serif text-gold text-base font-semibold tracking-[0.1em] tabular-nums">{number}</span>
      <h2 id={id} className="font-serif text-[1.35rem] md:text-[1.5rem] font-bold text-ink leading-tight scroll-mt-32">
        {title}
      </h2>
    </div>
  );
}

function Divider() {
  return (
    <div className="my-12 flex items-center gap-4" aria-hidden="true">
      <div className="h-px flex-1 bg-border" />
      <div className="h-1 w-1 rounded-full bg-gold/60" />
      <div className="h-px flex-1 bg-border" />
    </div>
  );
}

export default function LegalNoticePage() {
  return (
    <main className="bg-white">
      <header className="relative bg-gradient-to-b from-cream-dark via-cream to-white pt-[120px] pb-16 border-b border-border overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, #1A1A1A 1px, transparent 0)',
            backgroundSize: '22px 22px',
          }}
        />
        <div className="relative max-w-[760px] mx-auto px-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-ink-light text-[0.85rem] font-medium hover:text-gold transition-colors"
          >
            <span aria-hidden="true">&larr;</span> Zurück zur Startseite
          </Link>

          <div className="mt-7 flex flex-wrap items-end justify-between gap-5">
            <div>
              <p className="font-sans text-[0.7rem] tracking-[0.22em] uppercase text-gold font-semibold">
                Rechtliche Hinweise
              </p>
              <h1 className="font-serif text-[2.4rem] md:text-[3rem] font-bold text-ink mt-2 leading-[1.05]">
                Impressum
              </h1>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-white/70 backdrop-blur px-4 py-1.5 text-xs font-medium text-ink-light">
              <span className="h-1.5 w-1.5 rounded-full bg-gold" aria-hidden="true" />
              Angaben gemäß §5 DDG
            </div>
          </div>

          <div className="mt-7 h-[2px] w-16 bg-gold" />
        </div>
      </header>

      <div className="max-w-[760px] mx-auto px-6 pt-14 pb-24">
        <nav aria-label="Inhalt" className="mb-14 rounded-xl border border-border bg-cream/50 p-6">
          <p className="font-sans text-[0.7rem] tracking-[0.2em] uppercase text-ink-muted font-semibold mb-4">
            Inhalt
          </p>
          <ol className="grid gap-x-6 gap-y-2 sm:grid-cols-2 list-none m-0 p-0">
            {sections.map((s, i) => (
              <li key={s.id} className="flex items-baseline gap-3 text-[0.9rem]">
                <span className="font-serif text-gold text-xs tabular-nums">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <a
                  href={`#${s.id}`}
                  className="text-ink-light hover:text-gold transition-colors no-underline"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <section>
          <SectionHeader number="01" title="Angaben gemäß §5 DDG" id="ddg" />
          <div className="rounded-xl border border-border bg-cream/40 p-6 space-y-4">
            <p className="text-ink font-semibold text-base">
              APOS Legal Rechtsanwaltsgesellschaft mbH &amp; Co. KG
            </p>
            <p className="text-ink-light text-[0.92rem] leading-relaxed">
              Amtsgericht Mannheim, HRA 712218
              <br />
              Vertreten durch die APOS Legal Management- und Rechtsanwaltsgesellschaft mbH
              <br />
              Amtsgericht Mannheim, HRB 752469
            </p>
            <p className="text-ink-light text-[0.92rem] leading-relaxed">
              Vertreten durch die Geschäftsführer Fatih Bektas, Willem Büchler, Dr. Martin Duncker,
              Tobias Fürniß, Ph.D. (UIBE), Dr. Heiko Hofstätter
            </p>
            <dl className="grid grid-cols-[80px_1fr] gap-y-2 gap-x-4 text-[0.92rem] pt-2 border-t border-border">
              <dt className="text-ink-muted font-medium">Adresse</dt>
              <dd className="text-ink-light">Am Paradeplatz 20, 69126 Heidelberg</dd>
              <dt className="text-ink-muted font-medium">Telefon</dt>
              <dd>
                <a href="tel:+49622295992400" className="text-gold no-underline hover:underline">
                  +49 6222 9599 2400
                </a>
              </dd>
              <dt className="text-ink-muted font-medium">E-Mail</dt>
              <dd>
                <a href="mailto:info@apos.legal" className="text-gold no-underline hover:underline">
                  info@apos.legal
                </a>
              </dd>
            </dl>
          </div>
        </section>

        <Divider />

        <section>
          <SectionHeader number="02" title="Angaben gemäß §2 DL-InfoV" id="dlinfov" />
          <p className="text-ink-light text-[0.95rem] leading-relaxed mb-5">
            Die gesetzlichen Berufsbezeichnungen „Rechtsanwalt" und „Rechtsanwältin" sowie die
            Fachanwaltsbezeichnungen wurden in der Bundesrepublik Deutschland verliehen.
          </p>
          <div className="rounded-xl border border-border bg-cream/40 p-6 space-y-3">
            <p className="text-ink font-semibold text-[0.95rem]">
              Zuständige Kammer und Aufsichtsbehörde
            </p>
            <p className="text-ink-light text-[0.92rem] leading-relaxed">
              Rechtsanwaltskammer Karlsruhe
              <br />
              Reinhold-Frank-Straße 72
              <br />
              76133 Karlsruhe
            </p>
            <dl className="grid grid-cols-[80px_1fr] gap-y-2 gap-x-4 text-[0.92rem] pt-2 border-t border-border">
              <dt className="text-ink-muted font-medium">Telefon</dt>
              <dd>
                <a href="tel:+49721253400" className="text-gold no-underline hover:underline">
                  +49 721 253 40
                </a>
              </dd>
              <dt className="text-ink-muted font-medium">E-Mail</dt>
              <dd>
                <a
                  href="mailto:info@rak-karlsruhe.de"
                  className="text-gold no-underline hover:underline"
                >
                  info@rak-karlsruhe.de
                </a>
              </dd>
            </dl>
          </div>
        </section>

        <Divider />

        <section>
          <SectionHeader number="03" title="Berufshaftpflichtversicherung" id="versicherung" />
          <div className="rounded-xl border border-border bg-cream/40 p-6 space-y-3">
            <p className="text-ink font-semibold text-[0.95rem]">Allianz Deutschland AG</p>
            <p className="text-ink-light text-[0.92rem] leading-relaxed">
              Königinstraße 28
              <br />
              80802 München
            </p>
          </div>
          <p className="text-ink-light text-[0.92rem] leading-relaxed mt-5">
            Der räumliche Geltungsbereich des Versicherungsschutzes umfasst Tätigkeiten in den
            Mitgliedstaaten der Europäischen Union.
          </p>
        </section>

        <Divider />

        <section>
          <SectionHeader number="04" title="Berufsrechtliche Regelungen" id="berufsrecht" />
          <p className="text-ink-light text-[0.95rem] leading-relaxed mb-4">
            Berufsordnung für Rechtsanwälte (BORA), Bundesrechtsanwaltsordnung (BRAO),
            Rechtsanwaltsvergütungsgesetz (RVG), Berufsregeln der Rechtsanwälte der Europäischen
            Union (CCBE), Fachanwaltsordnung (FAO).
          </p>
          <p className="text-ink-light text-[0.95rem] leading-relaxed">
            Diese Regelungen sind im Bundesgesetzblatt veröffentlicht und über die
            Bundesrechtsanwaltskammer unter{' '}
            <a
              href="https://www.brak.de"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold no-underline hover:underline"
            >
              www.brak.de
            </a>{' '}
            abrufbar.
          </p>
        </section>

        <Divider />

        <section>
          <SectionHeader
            number="05"
            title="Schlichtungsstelle der Rechtsanwaltschaft (§191f BRAO)"
            id="schlichtung-brao"
          />
          <p className="text-ink-light text-[0.95rem] leading-relaxed">
            Bei der Bundesrechtsanwaltskammer ist eine Schlichtungsstelle eingerichtet. Näheres
            unter{' '}
            <a
              href="https://www.brak.de"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold no-underline hover:underline"
            >
              www.brak.de
            </a>
            , E-Mail:{' '}
            <a
              href="mailto:schlichtungsstelle@brak.de"
              className="text-gold no-underline hover:underline"
            >
              schlichtungsstelle@brak.de
            </a>
            .
          </p>
        </section>

        <Divider />

        <section>
          <SectionHeader number="06" title="Hinweis gemäß §§36, 37 VSBG" id="vsbg" />
          <p className="text-ink-light text-[0.95rem] leading-relaxed mb-4">
            Nach §§36, 37 Verbraucherstreitbeilegungsgesetz (VSBG) ist die APOS Legal
            Rechtsanwaltsgesellschaft mbH &amp; Co. KG verpflichtet, Auftraggeber, die Verbraucher
            im Sinne von §13 BGB sind, auf die Möglichkeit hinzuweisen, dass bei nicht beigelegten
            vermögensrechtlichen Streitigkeiten aus dem Mandatsverhältnis kostenlos auch eine
            Verbraucherschlichtungsstelle angerufen werden kann. Die hierfür zuständige
            Verbraucherschlichtungsstelle ist die Schlichtungsstelle der Rechtsanwaltschaft,
            Rauchstraße 26, 10787 Berlin (
            <a
              href="https://www.schlichtungsstelle-der-rechtsanwaltschaft.de"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold no-underline hover:underline"
            >
              www.schlichtungsstelle-der-rechtsanwaltschaft.de
            </a>
            ).
          </p>
          <div className="border-l-2 border-gold bg-cream-dark/40 pl-5 pr-4 py-4">
            <p className="text-ink-light text-[0.9rem] leading-relaxed">
              Die APOS Legal Rechtsanwaltsgesellschaft mbH &amp; Co. KG ist <strong>nicht bereit
              und nicht verpflichtet</strong>, an einem Verfahren vor dieser Schlichtungsstelle
              teilzunehmen.
            </p>
          </div>
        </section>

        <Divider />

        <section>
          <SectionHeader number="07" title="Interessenkonflikte" id="interessenkonflikte" />
          <p className="text-ink-light text-[0.95rem] leading-relaxed">
            Die Wahrnehmung widerstreitender Interessen ist Rechtsanwälten aufgrund
            berufsrechtlicher Regelungen untersagt (§43a Abs. 4 BRAO). Vor Annahme eines Mandats
            wird deshalb geprüft, ob ein Interessenkonflikt vorliegt.
          </p>
        </section>

        <Divider />

        <section>
          <SectionHeader number="08" title="Datenschutz" id="datenschutz" />
          <p className="text-ink-light text-[0.95rem] leading-relaxed">
            Unsere Datenschutzerklärung finden Sie{' '}
            <Link href="/privacy-policy" className="text-gold no-underline hover:underline">
              hier
            </Link>
            .
          </p>
        </section>

        <Divider />

        <section>
          <SectionHeader
            number="09"
            title="Verantwortlich gemäß §18 Abs. 2 MStV (V.i.S.d.P.)"
            id="mstv"
          />
          <div className="rounded-xl border border-border bg-cream/40 p-6 space-y-4">
            <p className="text-ink font-semibold text-base">
              APOS Legal Rechtsanwaltsgesellschaft mbH &amp; Co. KG
            </p>
            <p className="text-ink-light text-[0.92rem] leading-relaxed">
              Amtsgericht Mannheim, HRA 712218
            </p>
            <p className="text-ink-light text-[0.92rem] leading-relaxed">
              Vertreten durch die Geschäftsführer Fatih Bektas, Willem Büchler, Dr. Martin Duncker,
              Tobias Fürniß, Ph.D. (UIBE), Dr. Heiko Hofstätter
            </p>
            <dl className="grid grid-cols-[80px_1fr] gap-y-2 gap-x-4 text-[0.92rem] pt-2 border-t border-border">
              <dt className="text-ink-muted font-medium">Adresse</dt>
              <dd className="text-ink-light">Am Paradeplatz 20, 69126 Heidelberg</dd>
              <dt className="text-ink-muted font-medium">Telefon</dt>
              <dd>
                <a href="tel:+49622295992400" className="text-gold no-underline hover:underline">
                  +49 6222 9599 2400
                </a>
              </dd>
              <dt className="text-ink-muted font-medium">E-Mail</dt>
              <dd>
                <a href="mailto:info@apos.legal" className="text-gold no-underline hover:underline">
                  info@apos.legal
                </a>
              </dd>
            </dl>
          </div>
        </section>
      </div>
    </main>
  );
}
