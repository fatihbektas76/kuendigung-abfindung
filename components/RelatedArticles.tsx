import Link from 'next/link';
import Image from 'next/image';
import type { BlogPost } from '@/lib/blog';

interface RelatedArticlesProps {
  posts: BlogPost[];
}

export default function RelatedArticles({ posts }: RelatedArticlesProps) {
  if (posts.length === 0) return null;

  return (
    <section className="mt-16 pt-12 border-t border-border">
      <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold-dark mb-2.5">
        Continue Reading
      </div>
      <h2 className="font-serif text-[clamp(1.3rem,2.5vw,1.6rem)] font-bold leading-tight mb-6 text-ink">
        Related Articles
      </h2>

      <div className="grid grid-cols-3 gap-5 max-md:grid-cols-1">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="bg-cream border border-border-light rounded overflow-hidden transition-all no-underline text-inherit hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(0,0,0,0.06)] block"
          >
            {post.image ? (
              <div className="h-32 overflow-hidden relative">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 240px"
                />
              </div>
            ) : (
              <div className="h-32 bg-gradient-to-br from-cream-dark to-border flex items-center justify-center font-serif text-[2rem] text-gold opacity-40">
                &sect;
              </div>
            )}
            <div className="py-4 px-5">
              <div className="text-[0.65rem] font-bold text-gold uppercase tracking-wider mb-1.5">
                {post.category}
              </div>
              <h3 className="font-serif text-[0.95rem] font-bold leading-tight mb-1.5">
                {post.title}
              </h3>
              <p className="text-[0.8rem] text-ink-muted leading-relaxed line-clamp-2">
                {post.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
