const BASE_URL = 'https://www.gekuendigt-abfindung.de';

const tools: Record<string, { name: string; description: string; url: string }> = {
  'cost-calculator': {
    name: 'German Litigation Cost Calculator',
    description:
      'Free tool to estimate German court fees and statutory attorney fees based on the amount in dispute. Covers Landgericht and Amtsgericht proceedings.',
    url: `${BASE_URL}/tools/cost-calculator`,
  },
  'deadline-checker': {
    name: 'German Lawsuit Deadline Checker',
    description:
      'Free tool to calculate response deadlines after being served with a German lawsuit, payment order, or other court document.',
    url: `${BASE_URL}/tools/deadline-checker`,
  },
  'dismissal-checker': {
    name: 'German Dismissal Protection Checker',
    description:
      'Free tool to assess whether a German employee dismissal is challengeable under the Kündigungsschutzgesetz (Dismissal Protection Act).',
    url: `${BASE_URL}/tools/dismissal-checker`,
  },
};

export default function ToolSchema({ tool }: { tool: string }) {
  const t = tools[tool];
  if (!t) return null;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'WebApplication',
          name: t.name,
          description: t.description,
          url: t.url,
          applicationCategory: 'Legal Tool',
          operatingSystem: 'Any',
          offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'EUR',
          },
          provider: {
            '@id': `${BASE_URL}/#organization`,
          },
          inLanguage: 'en',
        }),
      }}
    />
  );
}
