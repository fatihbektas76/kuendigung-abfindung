interface SchemaOrgProps {
  schema: Record<string, unknown> | Record<string, unknown>[];
}

/**
 * Renders one or multiple JSON-LD schema objects as <script> tags.
 * Place in the <head> via Next.js metadata or directly in a layout/page.
 *
 * Usage (single schema):
 *   <SchemaOrg schema={getLegalServiceSchema()} />
 *
 * Usage (multiple schemas on one page):
 *   <SchemaOrg schema={[getLegalServiceSchema(), getFAQSchema(), getPersonSchema()]} />
 */
export default function SchemaOrg({ schema }: SchemaOrgProps) {
  const schemas = Array.isArray(schema) ? schema : [schema];

  return (
    <>
      {schemas.map((s, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(s, null, 0) }}
        />
      ))}
    </>
  );
}
