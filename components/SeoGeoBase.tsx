import { SEO_CONFIG } from '@/lib/seo-config';

interface SeoGeoBaseProps {
  pageUrl?: string;
  pageTitle?: string;
  pageDescription?: string;
  pageType?: 'WebPage' | 'WebApplication' | 'CollectionPage' | 'Article';
  appName?: string;
  appCategory?: string;
  isBasedOn?: Array<{ name: string; url: string }>;
  speakableSelectors?: string[];
  breadcrumbs?: Array<{ name: string; url: string }>;
  datePublished?: string;
  dateModified?: string;
  includeRating?: boolean;
  includeOrganization?: boolean;
}

const { baseUrl, author, organization, rating, reviews } = SEO_CONFIG;

export default function SeoGeoBase({
  pageUrl = '',
  pageTitle = '',
  pageDescription = '',
  pageType = 'WebPage',
  appName,
  appCategory = 'Legal Tool',
  isBasedOn,
  speakableSelectors,
  breadcrumbs,
  datePublished = '2025-01-15',
  // Falls die Seite kein eigenes dateModified übergibt, sagen wir "seit
  // Veröffentlichung nicht geändert" statt "heute geändert". Das verhindert,
  // dass jede ISR-Revalidation ein neues dateModified in die Schemas kippt —
  // was Google als Content-Freshness-Rauschen wertet.
  dateModified,
  includeRating = false,
  includeOrganization = false,
}: SeoGeoBaseProps) {
  const effectiveDateModified = dateModified ?? datePublished;
  // Speakable ohne explizite Selektoren: '#direktantwort' + 'h1' sind der
  // Site-weite GEO-Standard. Explizite Werte werden weiterhin angehängt.
  const effectiveSpeakable = speakableSelectors && speakableSelectors.length > 0
    ? ['#direktantwort', 'h1', ...speakableSelectors]
    : ['#direktantwort', 'h1'];
  const schemas: Record<string, unknown>[] = [];

  // Block 1: Person / Author (immer)
  schemas.push({
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${baseUrl}/#author`,
    name: author.name,
    jobTitle: author.jobTitle,
    hasCredential: author.hasCredential,
    memberOf: author.memberOf,
    worksFor: { '@id': organization.id },
    telephone: author.telephone,
    email: author.email,
    sameAs: author.sameAs,
  });

  // Block 2: Organization / LegalService (optional)
  if (includeOrganization) {
    const orgSchema: Record<string, unknown> = {
      '@context': 'https://schema.org',
      '@type': 'LegalService',
      '@id': organization.id,
      name: organization.name,
      url: organization.url,
      description: organization.description,
      telephone: organization.telephone,
      email: organization.email,
      address: {
        '@type': 'PostalAddress',
        ...organization.address,
      },
      areaServed: organization.areaServed,
      serviceType: organization.serviceType,
      knowsLanguage: organization.knowsLanguage,
      founder: { '@id': `${baseUrl}/#author` },
    };
    if (includeRating) {
      orgSchema.aggregateRating = {
        '@type': 'AggregateRating',
        ...rating,
      };
      orgSchema.review = reviews;
    }
    schemas.push(orgSchema);
  }

  // Block 3: WebPage / WebApplication (nur wenn pageUrl gesetzt)
  if (pageType === 'WebApplication' && pageUrl) {
    const appSchema: Record<string, unknown> = {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: appName || pageTitle,
      applicationCategory: appCategory,
      operatingSystem: 'Any',
      url: pageUrl,
      description: pageDescription,
      inLanguage: 'de',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
      provider: { '@id': organization.id },
      author: { '@id': `${baseUrl}/#author` },
      datePublished,
      dateModified: effectiveDateModified,
    };
    if (isBasedOn && isBasedOn.length > 0) {
      appSchema.isBasedOn = isBasedOn.map((ref) => ({
        '@type': 'Legislation',
        name: ref.name,
        url: ref.url,
      }));
    }
    schemas.push(appSchema);

    // Zusätzlicher WebPage+Speakable-Block für WebApplication-Seiten —
    // wird immer emittiert, damit auch Tools als LLM-Quelle zitierbar sind.
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: pageTitle,
      url: pageUrl,
      speakable: {
        '@type': 'SpeakableSpecification',
        cssSelector: effectiveSpeakable,
      },
      ...(isBasedOn && isBasedOn.length > 0
        ? {
            isBasedOn: isBasedOn.map((ref) => ({
              '@type': 'Legislation',
              name: ref.name,
              url: ref.url,
            })),
          }
        : {}),
    });
  } else if (pageUrl) {
    // WebPage, CollectionPage, Article
    const pageSchema: Record<string, unknown> = {
      '@context': 'https://schema.org',
      '@type': pageType,
      name: pageTitle,
      url: pageUrl,
      description: pageDescription,
      inLanguage: 'de',
      author: { '@id': `${baseUrl}/#author` },
      publisher: { '@id': organization.id },
      datePublished,
      dateModified: effectiveDateModified,
    };
    // Speakable-Selektoren werden immer emittiert — auch ohne explizite
    // Angabe fällt die Seite auf den Site-Standard '#direktantwort' + 'h1'
    // zurück. So bleibt jede Seite mindestens rudimentär voice-search-ready.
    pageSchema.speakable = {
      '@type': 'SpeakableSpecification',
      cssSelector: effectiveSpeakable,
    };
    if (isBasedOn && isBasedOn.length > 0) {
      pageSchema.isBasedOn = isBasedOn.map((ref) => ({
        '@type': 'Legislation',
        name: ref.name,
        url: ref.url,
      }));
    }
    schemas.push(pageSchema);
  }

  // Block 4: BreadcrumbList (optional)
  if (breadcrumbs && breadcrumbs.length > 0) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbs.map((crumb, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: crumb.name,
        item: crumb.url,
      })),
    });
  }

  return (
    <>
      {/* JSON-LD Blocks */}
      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      {/* Block 5: GEO-Microdata (versteckt) */}
      <div itemScope itemType={`https://schema.org/${pageType}`} style={{ display: 'none' }}>
        <meta itemProp="name" content={pageTitle} />
        <meta itemProp="description" content={pageDescription} />
        <meta itemProp="author" content={author.name} />
        <meta itemProp="inLanguage" content="de" />
        <meta itemProp="url" content={pageUrl} />
        {pageType === 'WebApplication' && (
          <meta itemProp="applicationCategory" content={appCategory} />
        )}
      </div>

    </>
  );
}
