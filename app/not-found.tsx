import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="min-h-[60vh] flex items-center justify-center px-6 py-20">
      <div className="text-center max-w-md">
        <p className="text-6xl font-serif font-bold text-[#8B7A3A] mb-4">404</p>
        <h1 className="text-2xl font-serif font-bold text-gray-900 mb-3">
          Seite nicht gefunden
        </h1>
        <p className="text-gray-600 mb-8 leading-relaxed">
          Die gesuchte Seite existiert leider nicht oder wurde verschoben.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="inline-block bg-[#6B6626] text-white px-6 py-3 rounded text-sm font-semibold hover:bg-[#8B7A3A] transition-colors"
          >
            Zur Startseite
          </Link>
          <Link
            href="/#kontakt"
            className="inline-block border-2 border-[#6B6626] text-[#6B6626] px-6 py-3 rounded text-sm font-semibold hover:bg-[#6B6626] hover:text-white transition-colors"
          >
            Kontakt aufnehmen
          </Link>
        </div>
        <div className="mt-10 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-500 mb-3">Häufig gesucht:</p>
          <div className="flex flex-wrap gap-2 justify-center">
            {[
              { label: 'Kündigung prüfen', href: '/kuendigung-pruefen' },
              { label: 'Abfindungsrechner', href: '/abfindungsrechner' },
              { label: 'Aufhebungsvertrag', href: '/aufhebungsvertrag' },
              { label: 'Ratgeber', href: '/ratgeber' },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-xs text-[#6B6626] bg-[#f5f2e8] border border-[#d4c98a] rounded px-3 py-1.5 hover:bg-[#d4c98a]/30 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
