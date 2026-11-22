/**
 * BreadcrumbList-JSON-LD-Block für eine einzelne Seite.
 *
 * Breadcrumb-Rich-Results sind (anders als FAQ/HowTo) weiterhin fest in
 * Googles SERP integriert — statt der URL wird der Pfad angezeigt, was auf
 * Mobile spürbar die CTR hebt. Auf Seiten, die bereits via SeoGeoBase
 * breadcrumbs ausliefern, ist diese Komponente redundant; sie steht für
 * Standalone-Einsatz und für Seiten ohne SeoGeoBase-Base-Block bereit.
 *
 * Beispiel:
 *   <SchemaBreadcrumb items={[
 *     { name: 'Start', url: 'https://www.gekuendigt-abfindung.de/' },
 *     { name: 'Abfindung', url: 'https://www.gekuendigt-abfindung.de/abfindung/' },
 *     { name: 'Abfindung nach 10 Jahren', url: pageUrl },
 *   ]} />
 */
interface BreadcrumbItem {
  name: string;
  url: string;
}

interface SchemaBreadcrumbProps {
  items: ReadonlyArray<BreadcrumbItem>;
}

export default function SchemaBreadcrumb({ items }: SchemaBreadcrumbProps) {
  if (items.length === 0) return null;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
