import Link from 'next/link';

export default function StatistikTeaser() {
  return (
    <div className="max-w-content mx-auto px-8 max-md:px-6">
      <div
        className="flex flex-col gap-2.5 rounded-sm mb-8"
        style={{
          background: '#f2f1ec',
          border: '0.5px solid #e2e0d8',
          padding: '20px 24px',
        }}
      >
        <span
          className="self-start"
          style={{
            background: '#eceae3',
            border: '0.5px solid #e2e0d8',
            fontSize: '11px',
            color: '#8a8880',
            padding: '2px 8px',
            borderRadius: '4px',
          }}
        >
          Statistisches Bundesamt &middot; Destatis
        </span>

        <p
          className="m-0"
          style={{ fontSize: '15px', color: '#0f0f0e', lineHeight: 1.75 }}
        >
          Rund <strong>80 %</strong> aller Kündigungsschutzklagen in Deutschland enden mit einem
          Vergleich &mdash; nur <strong>7 von 100</strong> Verfahren führen zu einem streitigen
          Urteil. 20 Jahre Arbeitsgerichtsstatistik zeigen, wie sich Klagezahlen, Erledigungsarten
          und regionale Unterschiede entwickelt haben.
        </p>

        <Link
          href="/ratgeber/kuendigungsstatistik-arbeitsgerichte-deutschland"
          className="self-start text-[14px] text-[#5a5850] no-underline hover:text-ink hover:underline transition-colors"
        >
          &rarr; Alle Daten &amp; Statistiken ansehen
        </Link>
      </div>
    </div>
  );
}
