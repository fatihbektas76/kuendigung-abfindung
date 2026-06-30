import Link from 'next/link';

interface BreadcrumbItem {
  readonly href: string;
  readonly label: string;
}

interface TopicHeroProps {
  readonly eyebrow: string;
  readonly title: string;
  readonly lede: string;
  readonly breadcrumbs?: readonly BreadcrumbItem[];
  readonly primaryCta?: {
    readonly href: string;
    readonly label: string;
  };
  readonly secondaryCta?: {
    readonly href: string;
    readonly label: string;
  };
}

/**
 * Re-usable English page header for topic / hub pages.
 * Sits below the global Navigation and above the page body.
 */
export default function TopicHero({
  eyebrow,
  title,
  lede,
  breadcrumbs,
  primaryCta,
  secondaryCta,
}: TopicHeroProps) {
  return (
    <header
      className="pt-[130px] pb-[60px] px-8 bg-cream relative overflow-hidden max-md:pt-[110px] max-md:pb-[40px] max-md:px-6"
      role="banner"
    >
      <div className="absolute -top-[40%] -right-[15%] w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(166,139,75,0.07)_0%,transparent_70%)] z-[2]" />
      <div className="max-w-content mx-auto relative z-[3]">
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav
            aria-label="Breadcrumb"
            className="text-[0.8rem] text-ink-muted mb-4 flex flex-wrap gap-x-2"
          >
            {breadcrumbs.map((item, i) => (
              <span key={item.href} className="flex items-center gap-2">
                <Link
                  href={item.href}
                  className="text-ink-muted no-underline hover:text-gold-dark transition-colors"
                >
                  {item.label}
                </Link>
                {i < breadcrumbs.length - 1 && <span aria-hidden="true">/</span>}
              </span>
            ))}
          </nav>
        )}
        <div className="font-serif text-[1rem] text-gold-dark font-semibold mb-2 tracking-wide uppercase">
          {eyebrow}
        </div>
        <h1 className="font-serif text-[clamp(2rem,4vw,2.8rem)] font-extrabold leading-[1.15] mb-5 tracking-tight max-w-[820px] max-md:text-[1.75rem]">
          {title}
        </h1>
        <p className="text-[1.1rem] text-ink-muted max-w-[760px] leading-relaxed mb-6">
          {lede}
        </p>
        {(primaryCta || secondaryCta) && (
          <div className="flex gap-3.5 flex-wrap max-md:flex-col max-md:items-stretch">
            {primaryCta && (
              <Link
                href={primaryCta.href}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-sm text-[0.95rem] font-semibold no-underline transition-all bg-gold-dark text-white hover:bg-[#735F32] hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(166,139,75,0.25)]"
              >
                {primaryCta.label} &rarr;
              </Link>
            )}
            {secondaryCta && (
              <Link
                href={secondaryCta.href}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-sm text-[0.95rem] font-semibold no-underline transition-all bg-transparent text-ink border-[1.5px] border-border hover:border-gold hover:text-gold"
              >
                {secondaryCta.label}
              </Link>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
