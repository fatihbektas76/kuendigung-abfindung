/**
 * FAQPage-JSON-LD-Block für eine einzelne Seite.
 *
 * Google zeigt FAQ-Rich-Results seit August 2023 restriktiver an (vor allem
 * für Behörden- und Health-Seiten), nutzt das Schema aber weiter als
 * Zitationsquelle für AI Overviews, Perplexity und Gemini. Lohnt sich auf
 * jeder Content-Seite mit echten Q&A-Blöcken.
 *
 * Beispiel:
 *   <SchemaFAQ faqs={faqs.map(f => ({ question: f.q, answer: f.a }))} />
 */
interface FaqItem {
  question: string;
  answer: string;
}

interface SchemaFAQProps {
  faqs: ReadonlyArray<FaqItem>;
}

export default function SchemaFAQ({ faqs }: SchemaFAQProps) {
  if (faqs.length === 0) return null;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
