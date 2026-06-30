'use client';

import Link from 'next/link';

const linkClass = 'text-white/70 no-underline hover:text-gold-light transition-colors';
const headingClass = 'text-white/90 font-semibold text-[0.75rem] uppercase tracking-[0.12em] mb-3';

export default function Footer({ onOpenCookieSettings }: { onOpenCookieSettings: () => void }) {
  return (
    <footer className="pt-14 pb-8 px-8 bg-[#0f0f0f] text-[0.82rem] leading-relaxed max-md:px-6">
      <div className="max-w-content mx-auto">

        {/* ── Brand header ── */}
        <div className="flex justify-between items-start flex-wrap gap-6 mb-10 pb-10 border-b border-white/[0.08]">
          <div>
            <div className="font-serif text-gold text-[1.1rem] font-semibold tracking-tight">
              APOS Legal
            </div>
            <div className="text-white/70 mt-1.5 text-[0.8rem]">
              Am Paradeplatz 20 &middot; 69126 Heidelberg, Germany
            </div>
            <div className="text-white/70 mt-1 text-[0.8rem]">
              <a
                href="tel:+49622295992400"
                className="text-white/70 no-underline hover:text-gold-light transition-colors"
              >
                +49 6222 9599 2400
              </a>
              <span className="mx-1.5">&middot;</span>
              <a
                href="mailto:info@apos.legal"
                className="text-white/70 no-underline hover:text-gold-light transition-colors"
              >
                info@apos.legal
              </a>
            </div>
            <div className="text-white/70 mt-0.5 text-[0.8rem]">
              A service of APOS Legal Rechtsanwaltsgesellschaft mbH&nbsp;&amp;&nbsp;Co.&nbsp;KG
            </div>
          </div>
          <div className="flex items-center gap-5">
            <a
              href="https://www.linkedin.com/company/105863455"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/70 no-underline hover:text-gold-light transition-colors text-[0.8rem]"
            >
              LinkedIn
            </a>
            <span className="text-white/50">|</span>
            <Link
              href="/"
              className="text-white/70 no-underline hover:text-gold-light transition-colors text-[0.8rem]"
            >
              Deutsch
            </Link>
          </div>
        </div>

        {/* ── Link grid ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-10 mb-10 pb-10 border-b border-white/[0.08]">

          {/* Guides */}
          <div>
            <div className={headingClass}>Guides</div>
            <ul className="list-none flex flex-col gap-2">
              <li><Link href="/en/severance-pay" className={linkClass}>Severance pay</Link></li>
              <li><Link href="/en/dismissal" className={linkClass}>Dismissal</Link></li>
              <li><Link href="/en/termination-agreement" className={linkClass}>Termination agreement</Link></li>
              <li><Link href="/en/written-warning" className={linkClass}>Written warning</Link></li>
              <li><Link href="/en/summary-dismissal" className={linkClass}>Summary dismissal</Link></li>
              <li><Link href="/en/guides/employment-law" className={linkClass}>Employment-law guide</Link></li>
              <li><Link href="/en/guides/templates" className={linkClass}>Templates</Link></li>
              <li><Link href="/en/guides/court-rulings" className={linkClass}>Court rulings</Link></li>
              <li><Link href="/en/glossary" className={linkClass}>Glossary</Link></li>
            </ul>
          </div>

          {/* Severance by years */}
          <div>
            <div className={headingClass}>Severance by tenure</div>
            <ul className="list-none flex flex-col gap-2">
              <li><Link href="/en/severance-after-1-jahr-years-of-employment/" className={linkClass}>After 1 year</Link></li>
              <li><Link href="/en/severance-after-5-jahren-years-of-employment/" className={linkClass}>After 5 years</Link></li>
              <li><Link href="/en/severance-after-10-jahren-years-of-employment/" className={linkClass}>After 10 years</Link></li>
              <li><Link href="/en/severance-after-20-jahren-years-of-employment/" className={linkClass}>After 20 years</Link></li>
              <li><Link href="/en/severance-pay" className={linkClass}>See all &rarr;</Link></li>
            </ul>
          </div>

          {/* Dismissed by years */}
          <div>
            <div className={headingClass}>Dismissed by tenure</div>
            <ul className="list-none flex flex-col gap-2">
              <li><Link href="/en/dismissed-after-1-jahr-years-of-employment/" className={linkClass}>After 1 year</Link></li>
              <li><Link href="/en/dismissed-after-5-jahren-years-of-employment/" className={linkClass}>After 5 years</Link></li>
              <li><Link href="/en/dismissed-after-10-jahren-years-of-employment/" className={linkClass}>After 10 years</Link></li>
              <li><Link href="/en/dismissed-after-20-jahren-years-of-employment/" className={linkClass}>After 20 years</Link></li>
              <li><Link href="/en/dismissal" className={linkClass}>See all &rarr;</Link></li>
            </ul>
          </div>

          {/* Summary dismissal */}
          <div>
            <div className={headingClass}>Summary dismissal</div>
            <ul className="list-none flex flex-col gap-2">
              <li><Link href="/en/summary-dismissal-after-1-jahr-years-of-employment/" className={linkClass}>After 1 year</Link></li>
              <li><Link href="/en/summary-dismissal-after-5-jahren-years-of-employment/" className={linkClass}>After 5 years</Link></li>
              <li><Link href="/en/summary-dismissal-after-10-jahren-years-of-employment/" className={linkClass}>After 10 years</Link></li>
              <li><Link href="/en/summary-dismissal-after-20-jahren-years-of-employment/" className={linkClass}>After 20 years</Link></li>
              <li><Link href="/en/summary-dismissal" className={linkClass}>See all &rarr;</Link></li>
            </ul>
          </div>

          {/* Tools & calculators */}
          <div>
            <div className={headingClass}>Tools &amp; calculators</div>
            <ul className="list-none flex flex-col gap-2">
              <li><Link href="/en/severance-calculator" className={linkClass}>Severance calculator</Link></li>
              <li><Link href="/en/small-business-threshold-calculator" className={linkClass}>Small-business threshold</Link></li>
              <li><Link href="/en/check-dismissal" className={linkClass}>Check your dismissal</Link></li>
              <li><Link href="/en/check-written-warning" className={linkClass}>Check written warning</Link></li>
              <li><Link href="/en/overtime-calculator" className={linkClass}>Overtime calculator</Link></li>
              <li><Link href="/en/notice-period-calculator" className={linkClass}>Notice-period calculator</Link></li>
              <li><Link href="/en/unused-holiday-pay-calculator" className={linkClass}>Unused-holiday pay</Link></li>
              <li><Link href="/en/part-time-holiday-calculator" className={linkClass}>Part-time holiday</Link></li>
              <li><Link href="/en/tools" className={linkClass}>All tools &rarr;</Link></li>
            </ul>
          </div>

          {/* About */}
          <div>
            <div className={headingClass}>About</div>
            <ul className="list-none flex flex-col gap-2">
              <li><Link href="/en/team" className={linkClass}>Team</Link></li>
              <li><Link href="/en/author/fatih-bektas" className={linkClass}>About Fatih Bektas</Link></li>
              <li><Link href="/en/employment-lawyer" className={linkClass}>Employment lawyer</Link></li>
              <li><Link href="/en/unfair-dismissal-claim" className={linkClass}>Unfair-dismissal claim</Link></li>
            </ul>
          </div>

          {/* Topics */}
          <div>
            <div className={headingClass}>Topics</div>
            <ul className="list-none flex flex-col gap-2">
              <li><Link href="/en/notice-periods" className={linkClass}>Notice periods</Link></li>
              <li><Link href="/en/severance-table" className={linkClass}>Severance table</Link></li>
              <li><Link href="/en/redundancy-dismissal" className={linkClass}>Redundancy</Link></li>
              <li><Link href="/en/dismissal-protection-act" className={linkClass}>Dismissal Protection Act</Link></li>
            </ul>
          </div>

          {/* Locations */}
          <div>
            <div className={headingClass}>Locations</div>
            <ul className="list-none flex flex-col gap-2">
              <li><Link href="/en/employment-lawyer/berlin" className={linkClass}>Berlin</Link></li>
              <li><Link href="/en/employment-lawyer/hamburg" className={linkClass}>Hamburg</Link></li>
              <li><Link href="/en/employment-lawyer/muenchen" className={linkClass}>Munich</Link></li>
              <li><Link href="/en/employment-lawyer/heidelberg" className={linkClass}>Heidelberg</Link></li>
              <li><Link href="/en/employment-lawyer" className={linkClass}>All cities &rarr;</Link></li>
            </ul>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="flex justify-between items-center flex-wrap gap-4 text-[0.78rem] text-white/65">
          <ul className="list-none flex flex-wrap gap-x-5 gap-y-2">
            <li>
              <Link href="/en/privacy-policy" className="text-white/65 no-underline hover:text-white/90 transition-colors">
                Privacy
              </Link>
            </li>
            <li>
              <Link href="/en/legal-notice" className="text-white/65 no-underline hover:text-white/90 transition-colors">
                Legal notice
              </Link>
            </li>
            <li>
              <button
                onClick={onOpenCookieSettings}
                className="bg-transparent border-none text-white/65 text-[0.78rem] cursor-pointer p-0 hover:text-white/90 transition-colors"
              >
                Cookie settings
              </button>
            </li>
          </ul>
          <div>&copy; {new Date().getFullYear()} gekuendigt-abfindung.de</div>
        </div>
      </div>
    </footer>
  );
}
