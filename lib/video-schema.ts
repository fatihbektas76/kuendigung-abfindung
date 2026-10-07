export interface VideoSchemaInput {
  readonly youtubeId: string;
  readonly name: string;
  readonly description: string;
  /** ISO 8601 upload date, e.g. '2026-10-05'. */
  readonly uploadDate: string;
  /** ISO 8601 duration, e.g. 'PT1M26S' for 1 min 26 s. Omit if unknown. */
  readonly duration?: string;
  /** URL of the page the video is embedded on (used as `inLanguage` anchor). */
  readonly pageUrl?: string;
  /** 'de' or 'en'. Default: 'de'. */
  readonly inLanguage?: 'de' | 'en';
}

/**
 * Produce a schema.org `VideoObject` entry for inclusion in a page's `@graph`.
 *
 * The thumbnail URL is derived from the YouTube video ID. The content/embed URLs
 * use the no-cookie host because that is what we actually load client-side.
 */
export function videoObjectSchema(input: VideoSchemaInput) {
  const {
    youtubeId,
    name,
    description,
    uploadDate,
    duration,
    pageUrl,
    inLanguage = 'de',
  } = input;

  const schema: Record<string, unknown> = {
    '@type': 'VideoObject',
    name,
    description,
    thumbnailUrl: [
      `https://i.ytimg.com/vi/${youtubeId}/maxresdefault.jpg`,
      `https://i.ytimg.com/vi/${youtubeId}/hq720.jpg`,
    ],
    uploadDate,
    contentUrl: `https://www.youtube.com/watch?v=${youtubeId}`,
    embedUrl: `https://www.youtube-nocookie.com/embed/${youtubeId}`,
    inLanguage,
  };

  if (duration) schema.duration = duration;
  if (pageUrl) schema.mainEntityOfPage = pageUrl;

  return schema;
}
