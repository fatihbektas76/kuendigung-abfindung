import { Metadata } from "next";
import { staedte } from "@/data/staedte";
import { gemeinden } from "@/data/gemeinden";
import { berlinBezirke } from "@/data/bezirke";

export const metadata: Metadata = {
  title: "Anwalt für Arbeitsrecht – Alle Städte | APOS Legal",
  description: "Fachanwalt für Arbeitsrecht in Ihrer Stadt. Kündigung, Abfindung, Aufhebungsvertrag – bundesweit und digital. Jetzt kostenlose Ersteinschätzung.",
  alternates: { canonical: "https://www.gekuendigt-abfindung.de/arbeitsrecht-anwalt" },
};

// Städte nach Region gruppieren
const regionen = ["West", "Süd", "Nord", "Mitte", "Ost"] as const;
type Region = typeof regionen[number];

const alleOrte = [...staedte, ...gemeinden, ...berlinBezirke];

export default function ArbeitsrechtAnwaltPage() {
  const byRegion = regionen.reduce((acc, r) => {
    acc[r] = alleOrte.filter((s) => s.region === r);
    return acc;
  }, {} as Record<Region, typeof alleOrte>);

  return (
    <main className="max-w-4xl mx-auto px-4 py-12">

      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-8">
        <a href="/">Startseite</a> {" / "}
        <span className="text-[#8B7A3A]">Arbeitsrecht Anwalt</span>
      </nav>

      <h1 className="text-3xl md:text-4xl font-semibold text-[#6B6626] mb-4 leading-tight">
        Anwalt für Arbeitsrecht – Bundesweit in Ihrer Stadt
      </h1>
      <p className="text-lg text-gray-600 mb-8 leading-relaxed">
        Als Fachanwalt für Arbeitsrecht vertreten wir Arbeitnehmer in ganz Deutschland – vollständig digital.
        Wählen Sie Ihre Stadt für stadtspezifische Informationen zu Arbeitsgericht, Instanzenzug und Abfindung.
      </p>

      {/* CTA */}
      <div className="border-l-4 border-[#8B7A3A] bg-white border border-gray-200 rounded-r-lg p-5 mb-10 flex justify-between items-center gap-4">
        <div>
          <p className="font-semibold text-[#6B6626] mb-1">Kostenlose Ersteinschätzung</p>
          <p className="text-sm text-gray-600">3-Wochen-Frist für Kündigungsschutzklage beachten. Jetzt prüfen lassen.</p>
        </div>
        <a href="/#kontakt" className="shrink-0 bg-[#6B6626] text-white px-5 py-2.5 rounded text-sm font-medium">
          Jetzt anfragen →
        </a>
      </div>

      {/* Städte + Gemeinden nach Region */}
      {regionen.map((region) => (
        <div key={region} className="mb-8">
          <h2 className="text-base font-semibold text-gray-500 uppercase tracking-wide mb-3 border-b border-gray-100 pb-2">
            {region}deutschland
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {byRegion[region].map((ort) => (
              <a
                key={ort.slug}
                href={`/arbeitsrecht-anwalt/${ort.slug}`}
                className="group bg-white border border-gray-200 rounded-lg p-3 hover:border-[#8B7A3A] hover:bg-[#faf8f0] transition-colors"
              >
                <p className="text-sm font-medium text-gray-900 group-hover:text-[#6B6626] mb-0.5">{ort.name}</p>
                <p className="text-xs text-gray-400">{ort.bundesland}</p>
              </a>
            ))}
          </div>
        </div>
      ))}

    </main>
  );
}
