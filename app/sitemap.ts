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
import { EN_TENURE_ENTRIES } from '@/lib/en-tenure';

export const revalidate = 3600;

const BASE_URL = 'https://www.gekuendigt-abfindung.de';

/** Stable date: first Monday of current week — changes only once per week */
function weeklyDate(): Date {
  const now = new Date();
  const day = now.getDay();
  const diff = day === 0 ? 6 : day - 1; // Monday = 0 offset
  now.setDate(now.getDate() - diff);
  now.setHours(6, 0, 0, 0);
  return now;
}

/** Stable date: first day of current month */
function monthlyDate(): Date {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), 1);
}

export default function sitemap(): MetadataRoute.Sitemap {
  const weekly = weeklyDate();
  const monthly = monthlyDate();

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/`, lastModified: weekly, changeFrequency: 'daily', priority: 1.0 },
    { url: `${BASE_URL}/abfindung/`, lastModified: weekly, changeFrequency: 'daily', priority: 0.9 },
    { url: `${BASE_URL}/kuendigung/`, lastModified: weekly, changeFrequency: 'daily', priority: 0.9 },
    { url: `${BASE_URL}/aufhebungsvertrag/`, lastModified: weekly, changeFrequency: 'daily', priority: 0.9 },
    { url: `${BASE_URL}/abmahnung/`, lastModified: weekly, changeFrequency: 'daily', priority: 0.9 },
    { url: `${BASE_URL}/ratgeber/`, lastModified: weekly, changeFrequency: 'daily', priority: 0.8 },
    { url: `${BASE_URL}/ratgeber/arbeitsrecht/`, lastModified: weekly, changeFrequency: 'daily', priority: 0.8 },
    { url: `${BASE_URL}/ratgeber/urteile/`, lastModified: weekly, changeFrequency: 'daily', priority: 0.8 },
    { url: `${BASE_URL}/ratgeber/muster/`, lastModified: weekly, changeFrequency: 'daily', priority: 0.8 },
    { url: `${BASE_URL}/abfindungsrechner/`, lastModified: monthly, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/kuendigung-pruefen/`, lastModified: weekly, changeFrequency: 'daily', priority: 0.9 },
    { url: `${BASE_URL}/schwellenwert-rechner/`, lastModified: monthly, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/tools/`, lastModified: monthly, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/ueberstundenrechner/`, lastModified: monthly, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/kuendigungsfrist-rechner/`, lastModified: monthly, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/urlaubsabgeltung-rechner/`, lastModified: monthly, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/urlaub-teilzeit-rechner/`, lastModified: monthly, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/aufhebungsvertrag-pruefen/`, lastModified: monthly, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/abmahnung-pruefen/`, lastModified: weekly, changeFrequency: 'daily', priority: 0.9 },
    { url: `${BASE_URL}/abmahnung-pruefen/pruefung/`, lastModified: monthly, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/rvg-rechner/`, lastModified: monthly, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/glossar/`, lastModified: monthly, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/ratgeber/kuendigungsstatistik-arbeitsgerichte-deutschland/`, lastModified: monthly, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/team/`, lastModified: monthly, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE_URL}/autor/fatih-bektas/`, lastModified: monthly, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE_URL}/betriebsbedingte-kuendigung/`, lastModified: weekly, changeFrequency: 'daily', priority: 0.9 },
    { url: `${BASE_URL}/kuendigungsschutzklage/`, lastModified: weekly, changeFrequency: 'daily', priority: 0.9 },
    { url: `${BASE_URL}/kuendigungsfristen/`, lastModified: weekly, changeFrequency: 'daily', priority: 0.9 },
    { url: `${BASE_URL}/abfindungstabelle/`, lastModified: weekly, changeFrequency: 'daily', priority: 0.9 },
    { url: `${BASE_URL}/kuendigungsschutzgesetz-anwendung/`, lastModified: weekly, changeFrequency: 'daily', priority: 0.9 },
  ];

  const clusterAPages: MetadataRoute.Sitemap = entries.map((e) => ({
    url: `${BASE_URL}/abfindung-nach-${e.slug}-betriebszugehoerigkeit/`,
    lastModified: monthly,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  const clusterDPages: MetadataRoute.Sitemap = entries.map((e) => ({
    url: `${BASE_URL}/gekuendigt-nach-${e.slug}-betriebszugehoerigkeit/`,
    lastModified: monthly,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  const clusterGPages: MetadataRoute.Sitemap = abmahnungEntries.map((e) => ({
    url: `${BASE_URL}/kuendigung-nach-${e.slug}/`,
    lastModified: monthly,
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  const clusterHPages: MetadataRoute.Sitemap = lebenssituationData.map((e) => ({
    url: `${BASE_URL}/kuendigung/${e.slug}/`,
    lastModified: monthly,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  const clusterJPages: MetadataRoute.Sitemap = aufhebungsvertragData.map((e) => ({
    url: `${BASE_URL}/aufhebungsvertrag/${e.slug}/`,
    lastModified: monthly,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  const clusterFPages: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/fristlose-kuendigung/`,
      lastModified: weekly,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    ...entries.map((e) => ({
      url: `${BASE_URL}/fristlose-kuendigung-nach-${e.slug}-betriebszugehoerigkeit/`,
      lastModified: monthly as Date,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    })),
  ];

  const musterSubPages: MetadataRoute.Sitemap = musterPages.map((e) => ({
    url: `${BASE_URL}/ratgeber/muster/${e.slug}/`,
    lastModified: monthly,
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  const arbeitsrechtAnwaltPages: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/arbeitsrecht-anwalt/`,
      lastModified: weekly,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    ...staedte.map((ort) => ({
      url: `${BASE_URL}/arbeitsrecht-anwalt/${ort.slug}/`,
      lastModified: monthly as Date,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    })),
    ...gemeinden.map((ort) => ({
      url: `${BASE_URL}/arbeitsrecht-anwalt/${ort.slug}/`,
      lastModified: monthly as Date,
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    })),
    ...berlinBezirke.map((b) => ({
      url: `${BASE_URL}/arbeitsrecht-anwalt/${b.slug}/`,
      lastModified: monthly as Date,
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    })),
  ];

  const urteilPages: MetadataRoute.Sitemap = urteile.map((u) => ({
    url: `${BASE_URL}/urteile/${u.slug}/`,
    lastModified: monthly,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  /**
   * English subfolder. Only the routes that already have a corresponding
   * page file are listed here — programmatic /en/* routes will be added in
   * Phase 3 when the English content generation pipeline lands.
   */
  const enStaticPages: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/en/`, lastModified: weekly, changeFrequency: 'daily', priority: 0.95 },
    { url: `${BASE_URL}/en/severance-pay/`, lastModified: weekly, changeFrequency: 'daily', priority: 0.9 },
    { url: `${BASE_URL}/en/dismissal/`, lastModified: weekly, changeFrequency: 'daily', priority: 0.9 },
    { url: `${BASE_URL}/en/termination-agreement/`, lastModified: weekly, changeFrequency: 'daily', priority: 0.9 },
    { url: `${BASE_URL}/en/written-warning/`, lastModified: weekly, changeFrequency: 'daily', priority: 0.85 },
    { url: `${BASE_URL}/en/summary-dismissal/`, lastModified: weekly, changeFrequency: 'daily', priority: 0.85 },
    { url: `${BASE_URL}/en/notice-periods/`, lastModified: weekly, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/en/unfair-dismissal-claim/`, lastModified: weekly, changeFrequency: 'weekly', priority: 0.85 },
    { url: `${BASE_URL}/en/dismissal-protection-act/`, lastModified: weekly, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/en/redundancy-dismissal/`, lastModified: weekly, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/en/severance-table/`, lastModified: monthly, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/en/severance-calculator/`, lastModified: monthly, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${BASE_URL}/en/notice-period-calculator/`, lastModified: monthly, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/en/check-dismissal/`, lastModified: weekly, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE_URL}/en/tools/`, lastModified: monthly, changeFrequency: 'monthly', priority: 0.75 },
    { url: `${BASE_URL}/en/guides/`, lastModified: weekly, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/en/team/`, lastModified: monthly, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE_URL}/en/author/fatih-bektas/`, lastModified: monthly, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/en/legal-notice/`, lastModified: monthly, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE_URL}/en/privacy-policy/`, lastModified: monthly, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE_URL}/en/overtime-calculator/`, lastModified: monthly, changeFrequency: 'monthly', priority: 0.75 },
    { url: `${BASE_URL}/en/unused-holiday-pay-calculator/`, lastModified: monthly, changeFrequency: 'monthly', priority: 0.75 },
    { url: `${BASE_URL}/en/part-time-holiday-calculator/`, lastModified: monthly, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/en/small-business-threshold-calculator/`, lastModified: monthly, changeFrequency: 'monthly', priority: 0.75 },
    { url: `${BASE_URL}/en/legal-fees-calculator/`, lastModified: monthly, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/en/check-written-warning/`, lastModified: weekly, changeFrequency: 'weekly', priority: 0.85 },
    { url: `${BASE_URL}/en/check-termination-agreement/`, lastModified: weekly, changeFrequency: 'weekly', priority: 0.85 },
    { url: `${BASE_URL}/en/glossary/`, lastModified: monthly, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/en/employment-lawyer/`, lastModified: weekly, changeFrequency: 'weekly', priority: 0.85 },
    { url: `${BASE_URL}/en/client-intake/`, lastModified: monthly, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE_URL}/en/guides/employment-law/`, lastModified: weekly, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/en/guides/templates/`, lastModified: monthly, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/en/guides/court-rulings/`, lastModified: monthly, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/en/guides/dismissal-statistics-german-labour-courts/`, lastModified: monthly, changeFrequency: 'monthly', priority: 0.7 },
  ];

  // English programmatic pages — severance / dismissed / summary by tenure
  const enSeverancePages: MetadataRoute.Sitemap = EN_TENURE_ENTRIES.map((e) => ({
    url: `${BASE_URL}/en/severance-after-${e.slug}-years-of-employment/`,
    lastModified: monthly,
    changeFrequency: 'weekly',
    priority: 0.75,
  }));

  const enDismissedPages: MetadataRoute.Sitemap = EN_TENURE_ENTRIES.map((e) => ({
    url: `${BASE_URL}/en/dismissed-after-${e.slug}-years-of-employment/`,
    lastModified: monthly,
    changeFrequency: 'weekly',
    priority: 0.75,
  }));

  const enSummaryPages: MetadataRoute.Sitemap = EN_TENURE_ENTRIES.map((e) => ({
    url: `${BASE_URL}/en/summary-dismissal-after-${e.slug}-years-of-employment/`,
    lastModified: monthly,
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  const enCityPages: MetadataRoute.Sitemap = staedte.map((s) => ({
    url: `${BASE_URL}/en/employment-lawyer/${s.slug}/`,
    lastModified: monthly,
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [
    ...staticPages,
    ...clusterAPages,
    ...clusterDPages,
    ...clusterGPages,
    ...clusterHPages,
    ...clusterJPages,
    ...clusterFPages,
    ...musterSubPages,
    ...arbeitsrechtAnwaltPages,
    ...urteilPages,
    ...enStaticPages,
    ...enSeverancePages,
    ...enDismissedPages,
    ...enSummaryPages,
    ...enCityPages,
  ];
}
