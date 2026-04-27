import { SEO_CONFIG } from './seo-config';

export function generateArticleSchema({
  headline,
  description,
  datePublished = '2025-01-15',
  dateModified,
  url,
  articleSection,
}: {
  headline: string;
  description: string;
  datePublished?: string;
  dateModified: string;
  url: string;
  articleSection: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline,
    description,
    datePublished,
    dateModified,
    author: { '@id': `${SEO_CONFIG.baseUrl}/#author` },
    publisher: { '@id': SEO_CONFIG.organization.id },
    mainEntityOfPage: url,
    articleSection,
    inLanguage: 'de',
  };
}
