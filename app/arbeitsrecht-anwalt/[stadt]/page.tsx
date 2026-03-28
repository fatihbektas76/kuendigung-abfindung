import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getStadtBySlug, staedte, Stadt } from "@/data/staedte";
import { gemeinden, getGemeindeBySlug } from "@/data/gemeinden";
import { berlinBezirke, getBezirkBySlug } from "@/data/bezirke";
import { StadtContent, GemeindeContent } from "@/types/content";
import { arbeitsgerichteUrls } from "@/data/arbeitsgerichte-urls";
import Image from "next/image";
import stadtContentsRaw from "@/data/generated/stadt-contents.json";
import gemeindenContentsRaw from "@/data/generated/gemeinden-contents.json";
import bezirkeContentsRaw from "@/data/generated/bezirke-contents.json";

const stadtContents = stadtContentsRaw as Record<string, StadtContent>;
const gemeindenContents = gemeindenContentsRaw as Record<string, GemeindeContent>;
const bezirkeContents = bezirkeContentsRaw as Record<string, GemeindeContent>;

// ─── Helpers ─────────────────────────────────────────────────────────────────
/** Heidelberg & Berlin (inkl. Bezirke) = Kanzleistandorte */
function isKanzleistandort(slug: string): boolean {
  return slug === "heidelberg" || slug === "berlin" || slug.startsWith("berlin-");
}

function lookupOrt(slug: string): { ort: Stadt; content: StadtContent | GemeindeContent; isGemeinde: boolean } | null {
  const stadt = getStadtBySlug(slug);
  if (stadt && stadtContents[slug]) return { ort: stadt, content: stadtContents[slug], isGemeinde: false };
  const gemeinde = getGemeindeBySlug(slug);
  if (gemeinde && gemeindenContents[slug]) return { ort: gemeinde, content: gemeindenContents[slug], isGemeinde: true };
  const bezirk = getBezirkBySlug(slug);
  if (bezirk && bezirkeContents[slug]) return { ort: bezirk, content: bezirkeContents[slug], isGemeinde: true };
  return null;
}

function isStadtContent(c: StadtContent | GemeindeContent): c is StadtContent {
  return "arbeitsgerichtSection" in c;
}

// ─── Static Params ────────────────────────────────────────────────────────────
export async function generateStaticParams() {
  return [
    ...staedte.map((s) => ({ stadt: s.slug })),
    ...gemeinden.map((g) => ({ stadt: g.slug })),
    ...berlinBezirke.map((b) => ({ stadt: b.slug })),
  ];
}

// ─── Metadata ─────────────────────────────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: { stadt: string };
}): Promise<Metadata> {
  const result = lookupOrt(params.stadt);
  if (!result) return {};
  const { ort, content } = result;
  const url = `https://www.gekuendigt-abfindung.de/arbeitsrecht-anwalt/${ort.slug}/`;

  return {
    title: `Fachanwalt Arbeitsrecht ${ort.name} | APOS Legal`,
    description: content?.metaDescription ??
      `Kündigung erhalten in ${ort.name}? Fachanwalt für Arbeitsrecht – Abfindung, Aufhebungsvertrag, ${ort.arbeitsgericht}. Kostenlose Ersteinschätzung.`,
    alternates: { canonical: url },
    other: {
      "geo.region": `DE-${ort.bundesland === "Berlin" ? "BE" : ort.bundesland === "Hamburg" ? "HH" : ort.bundesland === "Bremen" ? "HB" : ort.bundesland === "Bayern" ? "BY" : ort.bundesland === "Baden-Württemberg" ? "BW" : ort.bundesland === "Hessen" ? "HE" : ort.bundesland === "Nordrhein-Westfalen" ? "NW" : ort.bundesland === "Niedersachsen" ? "NI" : ort.bundesland === "Sachsen" ? "SN" : ort.bundesland === "Sachsen-Anhalt" ? "ST" : ort.bundesland === "Schleswig-Holstein" ? "SH" : ort.bundesland === "Rheinland-Pfalz" ? "RP" : ort.bundesland === "Thüringen" ? "TH" : ort.bundesland === "Mecklenburg-Vorpommern" ? "MV" : "DE"}`,
      "geo.placename": ort.name,
    },
    openGraph: {
      title: `Fachanwalt Arbeitsrecht ${ort.name} – Kündigung & Abfindung`,
      description: content?.metaDescription ?? "",
      url,
      type: "website",
    },
  };
}

// ─── Schema Markup ────────────────────────────────────────────────────────────
function buildSchema(slug: string) {
  const result = lookupOrt(slug);
  if (!result) return null;
  const { ort, content } = result;

  const url = `https://www.gekuendigt-abfindung.de/arbeitsrecht-anwalt/${ort.slug}/`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": isKanzleistandort(ort.slug)
          ? ["LegalService", "LocalBusiness"]
          : "LegalService",
        "@id": `${url}#legalservice`,
        name: "APOS Legal – Kanzlei Fatih Bektas",
        description: `Fachanwalt für Arbeitsrecht mit Beratung für Arbeitnehmer in ${ort.name}`,
        url,
        telephone: "+4962213214470",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Am Paradeplatz 20",
          addressLocality: "Heidelberg",
          postalCode: "69126",
          addressRegion: "Baden-Württemberg",
          addressCountry: "DE",
        },
        areaServed: {
          "@type": "City",
          name: ort.name,
          containedIn: { "@type": "State", name: ort.bundesland },
        },
        knowsAbout: [
          "Kündigungsschutzklage",
          "Abfindungsverhandlung",
          "Aufhebungsvertrag",
          "Betriebsbedingte Kündigung",
          "Arbeitsrecht",
        ],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Arbeitsrechtliche Leistungen",
          itemListElement: [
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Prüfung der Kündigung" } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Abfindungsverhandlung" } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Aufhebungsvertrag prüfen" } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Kündigungsschutzklage" } },
          ],
        },
        priceRange: "$$",
      },
      {
        "@type": "Person",
        "@id": "https://www.gekuendigt-abfindung.de/#author",
      },
      {
        "@type": "FAQPage",
        "@id": `${url}#faq`,
        mainEntity: content.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.frage,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.antwort.replace(/<[^>]+>/g, ""),
          },
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Startseite", item: "https://www.gekuendigt-abfindung.de/" },
          { "@type": "ListItem", position: 2, name: "Arbeitsrecht Anwalt", item: "https://www.gekuendigt-abfindung.de/arbeitsrecht-anwalt/" },
          { "@type": "ListItem", position: 3, name: `Anwalt ${ort.name}`, item: url },
        ],
      },
    ],
  };
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function StadtPage({ params }: { params: { stadt: string } }) {
  const result = lookupOrt(params.stadt);
  if (!result) notFound();
  const { ort, content } = result;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildSchema(params.stadt)) }}
      />

      <main className="max-w-4xl mx-auto px-4 py-12">

        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 mb-8">
          <a href="/">Startseite</a> {" / "}
          <a href="/arbeitsrecht-anwalt">Arbeitsrecht Anwalt</a> {" / "}
          <span className="text-[#8B7A3A]">{ort.name}</span>
        </nav>

        {/* H1 */}
        <h1 className="text-3xl md:text-4xl font-semibold text-[#6B6626] mb-4 leading-tight">
          Fachanwalt für Arbeitsrecht für Arbeitnehmer in {ort.name} – Kündigung & Abfindung
        </h1>
        <p className="text-lg text-gray-600 mb-4 leading-relaxed">
          Kündigung erhalten in {ort.name}? Als Fachanwalt für Arbeitsrecht vertreten wir Arbeitnehmer
          aus {ort.name} bei Kündigung, Abfindungsverhandlung und Aufhebungsvertrag – bundesweit und vollständig digital.
        </p>

        {/* Badges */}
        <div className="flex flex-wrap gap-2 mb-8">
          {["Fachanwalt für Arbeitsrecht", "Zugelassen seit 2005", "Bundesweite Vertretung", "Kein Vor-Ort-Termin nötig"].map((b) => (
            <span key={b} className="text-xs text-[#6B6626] bg-[#f5f2e8] border border-[#d4c98a] rounded px-2 py-1">{b}</span>
          ))}
        </div>

        {/* Kanzleisitz-Hinweis für Nicht-Standorte */}
        {!isKanzleistandort(params.stadt) && (
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="shrink-0 text-[#8B7A3A]">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            Kanzleisitz Heidelberg – wir vertreten Arbeitnehmer bundesweit
          </div>
        )}

        {/* CTA Box */}
        <div className="border-l-4 border-[#8B7A3A] bg-white border border-gray-200 rounded-r-lg p-5 mb-8 flex justify-between items-center gap-4">
          <div>
            <p className="font-semibold text-[#6B6626] mb-1">Kostenlose Ersteinschätzung</p>
            <p className="text-sm text-gray-600">Für Kündigungsschutzklage gilt eine 3-Wochen-Frist. Jetzt Kündigung prüfen lassen.</p>
          </div>
          <a href="/#kontakt" className="shrink-0 bg-[#6B6626] text-white px-5 py-2.5 rounded text-sm font-medium hover:bg-[#8B7A3A] transition-colors">
            Jetzt anfragen →
          </a>
        </div>

        {/* Prozess */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 mb-8">
          <h2 className="text-lg font-semibold text-[#6B6626] mb-5">So läuft die Beratung ab</h2>
          <div className="grid grid-cols-5 gap-2 text-center">
            {[
              { n: 1, title: "Kündigung erhalten", sub: "Datum notieren" },
              { n: 2, title: "Frist prüfen", sub: "3 Wochen ab Zugang" },
              { n: 3, title: "Ersteinschätzung", sub: "Kostenlos, per E-Mail" },
              { n: 4, title: "Mandat erteilen", sub: "Digital" },
              { n: 5, title: "Wir übernehmen", sub: "Klage oder Verhandlung" },
            ].map((step) => (
              <div key={step.n} className="flex flex-col items-center">
                <div className="w-9 h-9 rounded-full bg-[#f5f2e8] border-2 border-[#8B7A3A] flex items-center justify-center text-sm font-semibold text-[#6B6626] mb-2">
                  {step.n}
                </div>
                <p className="text-xs font-medium text-gray-800 leading-tight mb-1">{step.title}</p>
                <p className="text-xs text-gray-400 leading-tight">{step.sub}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Fakten-Kacheln */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Klagefrist", value: "3 Wochen", sub: "ab Zugang der Kündigung" },
            { label: "Abfindungsformel", value: "0,5 × Gehalt × Jahre", sub: "Faustformel, kein Rechtsanspruch" },
            { label: "Kündigungsschutz", value: "Ab 6 Monate", sub: "Betriebszugehörigkeit + >10 MA" },
            { label: "Berufungsfrist", value: "1 Monat", sub: `ab Urteilszustellung, ${ort.lagName}` },
          ].map((f) => (
            <div key={f.label} className="bg-white border border-gray-200 rounded-xl p-4 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-[#8B7A3A]" />
              <p className="text-xs font-medium text-[#8B7A3A] uppercase tracking-wide mb-2">{f.label}</p>
              <p className="text-base font-semibold text-gray-900 leading-tight mb-1">{f.value}</p>
              <p className="text-xs text-gray-500 leading-tight">{f.sub}</p>
            </div>
          ))}
        </div>

        {/* Abfindungsformel */}
        <div className="bg-[#f9f6ec] border border-[#d4c98a] rounded-xl p-6 mb-8">
          <h2 className="text-lg font-semibold text-[#6B6626] mb-4">Die Abfindungsformel</h2>
          <div className="flex items-center gap-3 flex-wrap mb-4">
            {["0,5", "×", "Bruttomonatsgehalt", "×", "Beschäftigungsjahre"].map((p, i) => (
              ["×"].includes(p)
                ? <span key={i} className="text-[#8B7A3A] font-semibold text-lg">{p}</span>
                : <span key={i} className="bg-white border border-[#d4c98a] rounded px-3 py-2 text-sm font-semibold text-[#6B6626]">{p}</span>
            ))}
          </div>
          <div className="bg-white border border-[#d4c98a] rounded-lg p-3 text-sm text-[#6B6626] mb-2">
            Beispiel: 8 Jahre, 5.000 € brutto → 0,5 × 5.000 € × 8 = <strong>20.000 € Abfindung</strong>
          </div>
          <p className="text-xs text-gray-500">Kein gesetzlicher Anspruch. Mit anwaltlicher Unterstützung ist häufig ein höherer Faktor erzielbar.</p>
          <a href="/kuendigung-pruefen" className="inline-block mt-4 text-sm font-medium text-[#6B6626] hover:underline">
            Jetzt Abfindung berechnen lassen →
          </a>
        </div>

        {/* Definitionen */}
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Wichtige Begriffe kurz erklärt</h2>
          <div className="divide-y divide-gray-200">
            {[
              { term: "Betriebsbedingte Kündigung", def: "Eine betriebsbedingte Kündigung liegt vor, wenn der Arbeitsplatz aus unternehmerischen Gründen wegfällt und keine zumutbare Weiterbeschäftigung möglich ist. Der Arbeitgeber muss eine soziale Auswahl durchführen." },
              { term: "Kündigungsschutzklage", def: "Die Kündigungsschutzklage ist der rechtliche Weg, die Unwirksamkeit einer Kündigung festzustellen. Sie muss binnen 3 Wochen nach Zugang beim zuständigen Arbeitsgericht eingereicht werden." },
              { term: "Aufhebungsvertrag", def: "Ein Aufhebungsvertrag ist eine einvernehmliche Auflösung des Arbeitsverhältnisses. Er sollte nie ohne anwaltliche Prüfung unterschrieben werden, da er oft eine Sperrzeit beim Arbeitslosengeld auslöst." },
            ].map(({ term, def }) => (
              <div key={term} className="py-3">
                <p className="text-sm font-semibold text-gray-900 mb-1">{term}</p>
                <p className="text-sm text-gray-600 leading-relaxed">{def}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Mit / ohne Anwalt */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Mit Anwalt vs. ohne Anwalt bei Kündigung</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-sm font-semibold text-red-800 mb-3">Ohne Anwalt</p>
              {["Abfindung oft unter Faustformel", "Fristen werden häufig versäumt", "Formfehler bleiben unerkannt", "Betriebsratsanhörung ungeprüft", "Kein Verhandlungsdruck"].map((i) => (
                <p key={i} className="text-xs text-red-700 mb-1.5">✗ {i}</p>
              ))}
            </div>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <p className="text-sm font-semibold text-green-800 mb-3">Mit Fachanwalt (APOS Legal)</p>
              {["Abfindung häufig 30–100 % höher", "Fristgerechte Klageeinreichung", "Jede Unwirksamkeit wird geprüft", "Betriebsratsanhörung analysiert", "Außergerichtliche Einigung möglich"].map((i) => (
                <p key={i} className="text-xs text-green-700 mb-1.5">✓ {i}</p>
              ))}
            </div>
          </div>
        </div>

        {/* CTA nach Vergleich */}
        <div className="bg-[#f9f6ec] border border-[#d4c98a] rounded-xl p-5 mb-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div>
            <p className="font-semibold text-[#6B6626] text-sm">Kündigung erhalten?</p>
            <p className="text-sm text-gray-600">Lassen Sie Ihre Kündigung jetzt kostenlos prüfen – die 3-Wochen-Frist läuft.</p>
          </div>
          <a href="/kuendigung-pruefen" className="shrink-0 bg-[#6B6626] text-white px-5 py-2.5 rounded text-sm font-medium hover:bg-[#8B7A3A] transition-colors">
            Kündigung prüfen →
          </a>
        </div>

        {/* Stadtspezifisch */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <h2 className="text-base font-semibold text-gray-900 mb-3">Ihre Rechte als Arbeitnehmer in {ort.name}</h2>
            <div className="text-sm text-gray-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: content.rechteSection }} />
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <h2 className="text-base font-semibold text-gray-900 mb-3">Wie wir Mandanten aus {ort.name} vertreten</h2>
            <div className="text-sm text-gray-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: content.vertretungSection }} />
          </div>
        </div>

        {/* Arbeitsgericht */}
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">
            {arbeitsgerichteUrls[ort.arbeitsgericht] ? (
              <a href={arbeitsgerichteUrls[ort.arbeitsgericht]} target="_blank" rel="noopener noreferrer" className="hover:text-[#6B6626] transition-colors">
                {ort.arbeitsgericht} <span className="text-xs font-normal text-gray-400">↗</span>
              </a>
            ) : ort.arbeitsgericht} – was Sie wissen müssen
          </h2>
          <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm text-gray-700 mb-4">
            <span><strong>Adresse:</strong> {ort.arbeitsgerichtAdresse}</span>
            <span><strong>Berufung:</strong> {ort.lagName}</span>
            {arbeitsgerichteUrls[ort.arbeitsgericht] && (
              <a href={arbeitsgerichteUrls[ort.arbeitsgericht]} target="_blank" rel="noopener noreferrer" className="text-[#6B6626] hover:underline">
                Webseite des Gerichts ↗
              </a>
            )}
          </div>
          {isStadtContent(content) ? (
            <div className="text-sm text-gray-600 leading-relaxed mb-4" dangerouslySetInnerHTML={{ __html: content.arbeitsgerichtSection }} />
          ) : (
            <p className="text-sm text-gray-600 leading-relaxed mb-4">
              Für {ort.name} ist das {ort.arbeitsgericht} zuständig. Kündigungsschutzklagen müssen binnen 3 Wochen nach Zugang der Kündigung eingereicht werden.
            </p>
          )}
          {/* Instanzenzug */}
          <div className="flex items-center gap-3 mt-4 pt-4 border-t border-gray-200">
            {[
              { label: "1. Instanz", name: ort.arbeitsgericht.replace("Arbeitsgericht ", "ArbG ") },
              { label: "Berufung (2. Instanz)", name: ort.lagName.replace("Landesarbeitsgericht", "LAG").replace("Hessisches", "Hess.").replace("Sächsisches", "Sächs.").replace("Thüringer", "Thür.") },
              { label: "Revision (3. Instanz)", name: "Bundesarbeitsgericht" },
            ].map((box, i, arr) => (
              <>
                <div key={box.label} className={`flex-1 rounded-lg p-2.5 text-center border text-xs ${i === 0 ? "border-[#8B7A3A] bg-[#f9f6ec]" : "border-gray-200 bg-white"}`}>
                  <p className={`text-xs mb-1 ${i === 0 ? "text-[#8B7A3A]" : "text-gray-400"}`}>{box.label}</p>
                  <p className={`font-semibold leading-tight ${i === 0 ? "text-[#6B6626]" : "text-gray-700"}`}>{box.name}</p>
                </div>
                {i < arr.length - 1 && <span key={`arr-${i}`} className="text-gray-400 shrink-0">→</span>}
              </>
            ))}
          </div>
        </div>

        {/* Leistungen */}
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Unsere Leistungen für Mandanten aus {ort.name}</h2>
        <div className="grid grid-cols-2 gap-4 mb-8">
          {[
            { title: "Kündigung prüfen", text: "Formfehler, Betriebsratsanhörung, soziale Auswahl – wir prüfen jede Unwirksamkeit." },
            { title: "Abfindung verhandeln", text: "Außergerichtlich oder per Vergleich im Gütetermin – wir holen die maximale Abfindung." },
            { title: "Aufhebungsvertrag", text: "Nie ohne Prüfung unterschreiben. Wir sichern Ihre Rechte bei Sperrzeit und Abfindung." },
            { title: "Kündigungsschutzklage", text: `Fristgerechte Einreichung beim ${ort.arbeitsgericht}. 3-Wochen-Frist beachten.` },
          ].map((l) => (
            <div key={l.title} className="bg-white border border-gray-200 rounded-lg p-4">
              <h3 className="text-sm font-semibold text-gray-900 mb-1.5">{l.title}</h3>
              <p className="text-xs text-gray-600 leading-relaxed">{l.text}</p>
            </div>
          ))}
        </div>

        {/* CTA nach Leistungen */}
        <div className="border-l-4 border-[#8B7A3A] bg-white border border-gray-200 rounded-r-lg p-5 mb-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div>
            <p className="font-semibold text-[#6B6626] mb-1">Aufhebungsvertrag erhalten?</p>
            <p className="text-sm text-gray-600">Nie ohne anwaltliche Prüfung unterschreiben. Wir prüfen kostenlos.</p>
          </div>
          <a href="/#kontakt" className="shrink-0 bg-[#6B6626] text-white px-5 py-2.5 rounded text-sm font-medium hover:bg-[#8B7A3A] transition-colors">
            Jetzt anfragen →
          </a>
        </div>

        {/* Anwaltsprofil */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 mb-8 flex gap-5">
          <Image
            src="/Fatih.jpg"
            alt="Fatih Bektas – Fachanwalt für Arbeitsrecht"
            width={64}
            height={64}
            className="w-16 h-16 rounded-full object-cover border-2 border-[#d4c98a] shrink-0"
          />
          <div className="flex-1">
            <h2 className="text-base font-semibold text-gray-900 mb-0.5">Fatih Bektas</h2>
            <p className="text-sm font-medium text-[#8B7A3A] mb-2">Fachanwalt für Arbeitsrecht</p>
            <p className="text-sm text-gray-600 leading-relaxed mb-3">
              Zugelassen seit 2005, Fachanwalt für Arbeitsrecht seit 2011 (Rechtsanwaltskammer Karlsruhe).
              Ich verteidige Arbeitnehmer bundesweit bei Kündigung, Abfindung und Aufhebungsvertrag – vollständig digital.
            </p>
            <div className="flex flex-wrap gap-2 mb-3">
              {["Zugelassen seit 2005", "Fachanwalt für Arbeitsrecht seit 2011", "RAK Karlsruhe", "APOS Legal", "Bundesweite Vertretung"].map((t) => (
                <span key={t} className="text-xs text-gray-500 bg-gray-100 border border-gray-200 rounded px-2 py-0.5">{t}</span>
              ))}
            </div>
            <div className="flex items-center gap-2 pt-3 border-t border-gray-100">
              <span className="text-[#BA7517] tracking-wide">★★★★★</span>
              <span className="text-xs text-gray-600"><strong>5,0 / 5,0</strong> – 68 Bewertungen auf anwalt.de</span>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Häufige Fragen – Arbeitsrecht in {ort.name}</h2>
        <div className="space-y-2 mb-10">
          {content.faqs.map((faq, i) => (
            <details key={i} className="bg-white border border-gray-200 rounded-lg p-4 group">
              <summary className="font-medium text-sm text-gray-900 cursor-pointer list-none flex justify-between items-center">
                {faq.frage}
                <span className="text-gray-400 text-xs ml-3 shrink-0">▼</span>
              </summary>
              <div
                className="mt-3 text-sm text-gray-600 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: faq.antwort }}
              />
            </details>
          ))}
        </div>

        {/* CTA nach FAQ */}
        <div className="text-center mb-8">
          <p className="text-sm text-gray-500 mb-3">Ihre Frage war nicht dabei?</p>
          <a href="/#kontakt" className="inline-block border-2 border-[#6B6626] text-[#6B6626] px-6 py-2.5 rounded text-sm font-medium hover:bg-[#6B6626] hover:text-white transition-colors">
            Individuelle Frage stellen →
          </a>
        </div>

        {/* Final CTA */}
        <div className="bg-[#6B6626] rounded-xl p-8 text-center">
          <h2 className="text-xl font-semibold text-white mb-2">Jetzt kostenlose Ersteinschätzung anfordern</h2>
          <p className="text-sm text-white/75 mb-6">
            Für Arbeitnehmer aus {ort.name} und ganz {ort.bundesland}.<br />
            Vollständig digital – keine Anreise erforderlich.
          </p>
          <a href="/kuendigung-pruefen" className="inline-block bg-white text-[#6B6626] px-7 py-3 rounded font-semibold text-sm hover:opacity-90 transition-opacity">
            Ersteinschätzung anfordern →
          </a>
        </div>

      </main>
    </>
  );
}
