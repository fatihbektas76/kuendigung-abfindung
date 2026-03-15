'use client';

import Image from 'next/image';
import FadeUp from './FadeUp';

function downloadVCard() {
  const vcard = `BEGIN:VCARD
VERSION:3.0
N:Bektas;Fatih;;;
FN:Fatih Bektas
TITLE:Attorney-at-Law & Litigation Specialist (Rechtsanwalt)
ORG:APOS Legal Rechtsanwaltsgesellschaft mbH & Co. KG
EMAIL:bektas@apos.legal
TEL:+49 151 2700 3173
ADR:;;Am Paradeplatz 20;Heidelberg;;69126;Germany
URL:https://www.german-litigation-lawyer.com
X-SOCIALPROFILE;type=linkedin:https://www.linkedin.com/in/fatihbektas
END:VCARD`;
  const blob = new Blob([vcard], { type: 'text/vcard' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'Fatih-Bektas.vcf';
  a.click();
  URL.revokeObjectURL(url);
}

export default function AttorneyProfile() {
  return (
    <section className="py-[90px] px-8 bg-white max-md:py-[60px] max-md:px-6" id="attorney">
      <div className="max-w-content mx-auto">
        <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2.5">
          Your Attorney
        </div>
        <div className="grid grid-cols-[280px_1fr] gap-14 items-start max-md:grid-cols-1 max-md:gap-8">
          <FadeUp>
            <div className="w-full aspect-[4/5] rounded overflow-hidden max-md:max-w-[260px]">
              <Image
                src="/Fatih.png"
                alt="Fatih Bektas — Attorney-at-Law & Litigation Specialist (Rechtsanwalt)"
                width={280}
                height={350}
                className="w-full h-full object-cover"
              />
            </div>
          </FadeUp>
          <FadeUp delay={1}>
            <div>
              <h2 className="font-serif text-[1.8rem] font-bold mb-1">Fatih Bektas</h2>
              <div className="text-[0.95rem] text-gold-dark font-semibold mb-1.5">
                Attorney-at-Law & Litigation Specialist (Rechtsanwalt)
              </div>
              <div className="text-[0.88rem] text-ink-muted mb-5">
                APOS Legal &middot; Heidelberg &amp; Berlin
              </div>
              <div className="text-gold-dark text-base mb-1">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
              <div className="text-[0.82rem] text-ink-muted mb-6">
                5.0 rating &middot; 5000+ clients represented
              </div>
              <p className="text-[0.95rem] text-ink-light leading-relaxed mb-5">
                Fatih has spent 20+ years litigating in German courts — and 10 years running FinTech
                companies as CEO and board member. That dual perspective means he doesn&rsquo;t just know
                the law; he understands what&rsquo;s at stake for your business. He fights strategically,
                communicates clearly, and delivers results.
              </p>
              <p className="text-[0.95rem] text-ink-light leading-relaxed mb-5">
                Certified specialist in employment law (Fachanwalt) since 2011 and qualified mediator, he
                resolves disputes through whichever path is fastest — litigation, arbitration, or
                negotiation.
              </p>
              <ul className="list-none flex flex-wrap gap-2 mt-5">
                {[
                  'Attorney-at-Law',
                  'Certified Mediator',
                  '20+ Years in German Courts',
                  'Former FinTech CEO & Board Member',
                  'Deutscher Anwaltverein',
                  'BVAU Founding Member',
                ].map((q) => (
                  <li
                    key={q}
                    className="text-[0.78rem] font-semibold text-ink-light bg-cream border border-border rounded-full py-1.5 px-4"
                  >
                    {q}
                  </li>
                ))}
              </ul>
              <button
                onClick={downloadVCard}
                className="inline-flex items-center gap-2 mt-5 text-[0.78rem] font-semibold text-gold bg-gold-bg border border-gold/20 rounded-full py-1.5 px-4 cursor-pointer transition-all hover:bg-gold hover:text-white"
              >
                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                Save Contact
              </button>
              <blockquote className="mt-7 py-5 px-6 bg-cream border-l-[3px] border-gold rounded-r-sm font-serif italic text-[0.95rem] text-ink-light leading-relaxed">
                &ldquo;Loyalty is a two-way street. If I&rsquo;m asking for it from you, then you&rsquo;re
                getting it from me.&rdquo;
              </blockquote>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
