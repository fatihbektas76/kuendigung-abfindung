'use client';

import { useState } from 'react';

interface VideoEmbedProps {
  /** YouTube video ID (the part after `?v=` or `/shorts/`). */
  youtubeId: string;
  /** Visible caption / title shown next to the player. */
  title: string;
  /** Optional one-liner shown under the title. */
  teaser?: string;
  /** 'portrait' (9:16, 340 px max) or 'landscape' (16:9, full width). Default: 'portrait'. */
  aspect?: 'portrait' | 'landscape';
}

/**
 * Click-to-load YouTube facade. Loads only a static thumbnail until the user
 * clicks play — then swaps in the real iframe with autoplay.
 *
 * No YouTube JS, no cookies, no third-party requests until interaction.
 */
export default function VideoEmbed({
  youtubeId,
  title,
  teaser,
  aspect = 'portrait',
}: VideoEmbedProps) {
  const [playing, setPlaying] = useState(false);

  const thumb = `https://i.ytimg.com/vi/${youtubeId}/maxresdefault.jpg`;
  const embedUrl = `https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0&modestbranding=1`;

  const aspectClass =
    aspect === 'portrait' ? 'aspect-[9/16] max-w-[340px]' : 'aspect-video w-full';

  return (
    <figure className="m-0 flex flex-col items-center gap-3">
      <div
        className={`relative w-full ${aspectClass} overflow-hidden rounded-lg bg-black shadow-[0_12px_32px_rgba(0,0,0,0.18)]`}
      >
        {playing ? (
          <iframe
            src={embedUrl}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            loading="lazy"
            className="absolute inset-0 w-full h-full border-0"
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            aria-label={`Video abspielen: ${title}`}
            className="group absolute inset-0 w-full h-full border-0 p-0 cursor-pointer bg-cover bg-center"
            style={{ backgroundImage: `url("${thumb}")` }}
          >
            <span className="absolute inset-0 bg-black/15 group-hover:bg-black/5 transition-colors" />
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center w-16 h-16 rounded-full bg-white/95 shadow-[0_6px_18px_rgba(0,0,0,0.35)] group-hover:scale-110 transition-transform">
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="w-6 h-6 fill-ink translate-x-[1px]"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
          </button>
        )}
      </div>

      <figcaption className="text-center max-w-[320px]">
        <div className="font-serif text-[1rem] font-bold text-ink leading-snug">{title}</div>
        {teaser ? (
          <p className="text-[0.88rem] text-ink-light leading-relaxed mt-1 mb-0">{teaser}</p>
        ) : null}
      </figcaption>
    </figure>
  );
}
