import type { MetadataRoute } from 'next';
import { entries } from '@/lib/betriebszugehoerigkeit';
import { abmahnungEntries } from '@/lib/abmahnung-content';
import { lebenssituationData } from '@/lib/lebenssituation-data';
import { aufhebungsvertragData } from '@/lib/aufhebungsvertrag-data';
import { musterPages } from '@/lib/muster-data';

const BASE_URL = 'https://www.gekuendigt-abfindung.de';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: 'weekly', priority: 1.0 },
    { url: `${BASE_URL}/abfindung`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/kuendigung`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/aufhebungsvertrag`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/abmahnung`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/ratgeber`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/ratgeber/urteile`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/ratgeber/muster`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/abfindungsrechner`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/schwellenwert-rechner`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/team`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE_URL}/legal-notice`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE_URL}/privacy-policy`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
  ];

  const clusterAPages: MetadataRoute.Sitemap = entries.map((e) => ({
    url: `${BASE_URL}/abfindung-nach-${e.slug}-betriebszugehoerigkeit`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  const clusterDPages: MetadataRoute.Sitemap = entries.map((e) => ({
    url: `${BASE_URL}/gekuendigt-nach-${e.slug}-betriebszugehoerigkeit`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  const clusterGPages: MetadataRoute.Sitemap = abmahnungEntries.map((e) => ({
    url: `${BASE_URL}/kuendigung-nach-${e.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  const clusterHPages: MetadataRoute.Sitemap = lebenssituationData.map((e) => ({
    url: `${BASE_URL}/kuendigung/${e.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  const clusterJPages: MetadataRoute.Sitemap = aufhebungsvertragData.map((e) => ({
    url: `${BASE_URL}/aufhebungsvertrag/${e.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  const clusterFPages: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/fristlose-kuendigung`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    ...entries.map((e) => ({
      url: `${BASE_URL}/fristlose-kuendigung-nach-${e.slug}-betriebszugehoerigkeit`,
      lastModified: new Date() as Date,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
  ];

  const musterSubPages: MetadataRoute.Sitemap = musterPages.map((e) => ({
    url: `${BASE_URL}/ratgeber/muster/${e.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [...staticPages, ...clusterAPages, ...clusterDPages, ...clusterGPages, ...clusterHPages, ...clusterJPages, ...clusterFPages, ...musterSubPages];
}
