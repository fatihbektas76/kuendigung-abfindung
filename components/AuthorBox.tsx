import Image from 'next/image';

export default function AuthorBox() {
  return (
    <aside className="mt-16 p-8 bg-cream border border-border-light rounded flex gap-7 items-start max-md:flex-col max-md:items-center max-md:text-center">
      <div className="w-[100px] h-[100px] rounded-full overflow-hidden flex-shrink-0">
        <Image
          src="/Fatih.jpg"
          alt="Fatih Bektas — Rechtsanwalt & Fachanwalt für Arbeitsrecht"
          width={100}
          height={100}
          className="w-full h-full object-cover object-top"
        />
      </div>
      <div>
        <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-1">
          Über den Autor
        </div>
        <h3 className="font-serif text-[1.25rem] font-bold mb-0.5">Fatih Bektas</h3>
        <div className="text-[0.88rem] text-gold-dark font-semibold mb-3">
          Rechtsanwalt &amp; Fachanwalt für Arbeitsrecht
        </div>
        <p className="text-[0.9rem] text-ink-light leading-relaxed mb-4">
          Fatih Bektas ist Fachanwalt für Arbeitsrecht mit über 20 Jahren Erfahrung. Er vertritt
          Arbeitnehmer bei Kündigung, Abfindung und Aufhebungsvertrag — mit über 2.000 erfolgreichen
          Verfahren.
        </p>
        <div className="flex items-center gap-4 max-md:justify-center flex-wrap">
          <a
            href="https://www.linkedin.com/in/fatih-bektas"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-[0.82rem] font-semibold text-gold hover:text-gold-dark no-underline transition-colors"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
            LinkedIn
          </a>
          <a
            href="/#anwalt"
            className="inline-flex items-center gap-1.5 text-[0.82rem] font-semibold text-gold hover:text-gold-dark no-underline transition-colors"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            Profil ansehen
          </a>
          <a
            href="https://meet.brevo.com/fatih-bektas/erstberatung-per-telefon-kuendigung-arbeitsrechtde"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-[0.82rem] font-semibold text-gold hover:text-gold-dark no-underline transition-colors"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            Termin buchen
          </a>
        </div>
      </div>
    </aside>
  );
}
