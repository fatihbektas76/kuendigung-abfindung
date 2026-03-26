import type { MetadataRoute } from 'next';
import { entries } from '@/lib/betriebszugehoerigkeit';
import { abmahnungEntries } from '@/lib/abmahnung-content';
import { lebenssituationData } from '@/lib/lebenssituation-data';
import { aufhebungsvertragData } from '@/lib/aufhebungsvertrag-data';
import { musterPages } from '@/lib/muster-data';
import { staedte } from '@/data/staedte';
import { gemeinden } from '@/data/gemeinden';
import { berlinBezirke } from '@/data/bezirke';
import { urteile } from '@/lib/urteile';

export const revalidate = 3600;

const BASE_URL = 'https://www.gekuendigt-abfindung.de';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: 'daily', priority: 1.0 },
    { url: `${BASE_URL}/abfindung`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${BASE_URL}/kuendigung`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${BASE_URL}/aufhebungsvertrag`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${BASE_URL}/abmahnung`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${BASE_URL}/ratgeber`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.8 },
    { url: `${BASE_URL}/ratgeber/urteile`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.8 },
    { url: `${BASE_URL}/ratgeber/muster`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.8 },
    { url: `${BASE_URL}/abfindungsrechner`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.8 },
    { url: `${BASE_URL}/kuendigung-pruefen`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${BASE_URL}/schwellenwert-rechner`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.8 },
    { url: `${BASE_URL}/tools`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.8 },
    { url: `${BASE_URL}/ueberstundenrechner`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.8 },
    { url: `${BASE_URL}/kuendigungsfrist-rechner`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.8 },
    { url: `${BASE_URL}/urlaubsabgeltung-rechner`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.8 },
    { url: `${BASE_URL}/urlaub-teilzeit-rechner`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.8 },
    { url: `${BASE_URL}/aufhebungsvertrag-pruefen`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.8 },
    { url: `${BASE_URL}/team`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE_URL}/legal-notice`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE_URL}/privacy-policy`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
  ];

  const clusterAPages: MetadataRoute.Sitemap = entries.map((e) => ({
    url: `${BASE_URL}/abfindung-nach-${e.slug}-betriebszugehoerigkeit`,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 0.8,
  }));

  const clusterDPages: MetadataRoute.Sitemap = entries.map((e) => ({
    url: `${BASE_URL}/gekuendigt-nach-${e.slug}-betriebszugehoerigkeit`,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 0.8,
  }));

  const clusterGPages: MetadataRoute.Sitemap = abmahnungEntries.map((e) => ({
    url: `${BASE_URL}/kuendigung-nach-${e.slug}`,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 0.7,
  }));

  const clusterHPages: MetadataRoute.Sitemap = lebenssituationData.map((e) => ({
    url: `${BASE_URL}/kuendigung/${e.slug}`,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 0.8,
  }));

  const clusterJPages: MetadataRoute.Sitemap = aufhebungsvertragData.map((e) => ({
    url: `${BASE_URL}/aufhebungsvertrag/${e.slug}`,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 0.8,
  }));

  const clusterFPages: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/fristlose-kuendigung`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    ...entries.map((e) => ({
      url: `${BASE_URL}/fristlose-kuendigung-nach-${e.slug}-betriebszugehoerigkeit`,
      lastModified: new Date() as Date,
      changeFrequency: 'daily' as const,
      priority: 0.8,
    })),
  ];

  const musterSubPages: MetadataRoute.Sitemap = musterPages.map((e) => ({
    url: `${BASE_URL}/ratgeber/muster/${e.slug}`,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 0.7,
  }));

  const arbeitsrechtAnwaltPages: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/arbeitsrecht-anwalt`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    ...[...staedte, ...gemeinden, ...berlinBezirke].map((ort) => ({
      url: `${BASE_URL}/arbeitsrecht-anwalt/${ort.slug}`,
      lastModified: new Date() as Date,
      changeFrequency: 'daily' as const,
      priority: 0.8,
    })),
  ];

  const urteilPages: MetadataRoute.Sitemap = urteile.map((u) => ({
    url: `${BASE_URL}/urteile/${u.slug}`,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 0.8,
  }));

  return [...staticPages, ...clusterAPages, ...clusterDPages, ...clusterGPages, ...clusterHPages, ...clusterJPages, ...clusterFPages, ...musterSubPages, ...arbeitsrechtAnwaltPages, ...urteilPages];
}
