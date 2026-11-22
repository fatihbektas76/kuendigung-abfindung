import { SEO_CONFIG } from '@/lib/seo-config';

/**
 * AggregateRating + Review-JSON-LD, gekoppelt an eine bestehende Entität.
 *
 * Google-Review-Snippets-Policy: Reviews müssen das Subjekt beschreiben, das
 * auf der Seite steht. Daher bindet diese Komponente das Rating über `@id`
 * an einen schon deklarierten LegalService (`subject="firm"`) oder Person
 * (`subject="person"`). Für `firm` muss die LegalService-Entität auf der
 * Seite bereits existieren (z. B. über SeoGeoBase mit `includeOrganization`,
 * oder im globalen @graph der Homepage); für `person` muss das Person-
 * Schema mit `@id = SEO_CONFIG.author.id` emittiert sein.
 *
 * NICHT auf beliebige Artikel-/Ratgeber-Seiten hängen — Google wertet das
 * als Review-Spam. Empfohlene Einsätze: Autor-Seite, Team-Seite, Kontakt,
 * Impressum, Landing-Pages, auf denen die Kanzlei/Person Hauptgegenstand ist.
 *
 * Beispiel (Autor-Seite):
 *   <SchemaReview subject="person" />
 *
 * Beispiel (Kanzlei-Standortseite):
 *   <SchemaReview subject="firm" />
 */
interface SchemaReviewProps {
  subject: 'firm' | 'person';
}

export default function SchemaReview({ subject }: SchemaReviewProps) {
  const { rating, reviews, organization, author } = SEO_CONFIG;
  const subjectId = subject === 'firm' ? organization.id : author.id;
  const subjectType =
    subject === 'firm' ? 'LegalService' : (['Person', 'Attorney'] as const);

  const schema = {
    '@context': 'https://schema.org',
    '@type': subjectType,
    '@id': subjectId,
    aggregateRating: {
      '@type': 'AggregateRating',
      ...rating,
    },
    review: reviews,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
