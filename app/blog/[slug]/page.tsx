import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import remarkDejure from '@/lib/remark-dejure';
import { getPostBySlug, getPostSlugs, extractHeadings, getRelatedPosts } from '@/lib/blog';
import SidebarToc from '@/components/SidebarToc';
import RelatedArticles from '@/components/RelatedArticles';
import AuthorBox from '@/components/AuthorBox';

export const revalidate = 86400;

interface PageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const post = getPostBySlug(params.slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.description,
    authors: [{ name: post.author }],
    keywords: post.keywords,
    alternates: {
      canonical: `https://www.gekuendigt-abfindung.de/blog/${post.slug}`,
    },
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.description,
      url: `https://www.gekuendigt-abfindung.de/blog/${post.slug}`,
      publishedTime: post.date,
      authors: [post.author],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
    },
  };
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

function extractText(children: React.ReactNode): string {
  if (typeof children === 'string') return children;
  if (Array.isArray(children)) return children.map(extractText).join('');
  if (children && typeof children === 'object' && 'props' in children) {
    return extractText((children as React.ReactElement).props.children);
  }
  return '';
}

const mdxComponents = {
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => {
    const text = extractText(props.children);
    const id = slugify(text);
    return <h2 id={id} {...props} />;
  },
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => {
    const text = extractText(props.children);
    const id = slugify(text);
    return <h3 id={id} {...props} />;
  },
};

export default function BlogPostPage({ params }: PageProps) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();

  const headings = extractHeadings(post.content);
  const relatedPosts = getRelatedPosts(params.slug, 3);

  // Split content by H2 headings for mid-article CTA insertion
  const sections = post.content.split(/(?=\n## )/);
  const totalSections = sections.length;
  const firstCtaIndex = Math.max(1, Math.floor(totalSections / 3));
  const secondCtaIndex = Math.max(firstCtaIndex + 1, Math.floor((2 * totalSections) / 3));

  const part1 = sections.slice(0, firstCtaIndex).join('');
  const part2 = sections.slice(firstCtaIndex, secondCtaIndex).join('');
  const part3 = sections.slice(secondCtaIndex).join('');

  const mdxOptions = {
    mdxOptions: {
      remarkPlugins: [remarkGfm, remarkDejure],
    },
  };

  const keywords = post.keywords
    ? Array.isArray(post.keywords)
      ? post.keywords.join(', ')
      : post.keywords
    : `German litigation, ${post.category || 'legal guide'}, international business Germany`;

  return (
    <main>
      {/* Schema.org - BlogPosting */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            '@id': `https://www.gekuendigt-abfindung.de/blog/${post.slug}`,
            headline: post.title,
            description: post.description,
            datePublished: post.date,
            dateModified: post.lastModified || post.date,
            image: {
              '@type': 'ImageObject',
              url: `https://www.gekuendigt-abfindung.de/blog/${post.slug}.webp`,
            },
            author: {
              '@type': 'Person',
              '@id': 'https://www.gekuendigt-abfindung.de/#fatih-bektas',
              name: post.author,
              jobTitle: 'Rechtsanwalt & Fachanwalt für Arbeitsrecht',
              url: 'https://www.gekuendigt-abfindung.de/team',
              sameAs: [
                'https://www.linkedin.com/in/fatihbektas',
                'https://www.anwalt.de/bektas',
              ],
              image: 'https://www.gekuendigt-abfindung.de/Fatih.png',
            },
            publisher: {
              '@type': 'LegalService',
              '@id': 'https://www.gekuendigt-abfindung.de/#organization',
              name: 'APOS Legal',
              url: 'https://www.gekuendigt-abfindung.de',
              logo: {
                '@type': 'ImageObject',
                url: 'https://www.gekuendigt-abfindung.de/logo.png',
              },
            },
            mainEntityOfPage: {
              '@type': 'WebPage',
              '@id': `https://www.gekuendigt-abfindung.de/blog/${post.slug}`,
            },
            articleSection: post.category || 'Legal Guide',
            inLanguage: 'en',
            keywords,
          }),
        }}
      />
      {/* Schema.org - BreadcrumbList */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: 'Home',
                item: 'https://www.gekuendigt-abfindung.de',
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: 'Insights',
                item: 'https://www.gekuendigt-abfindung.de/blog',
              },
              {
                '@type': 'ListItem',
                position: 3,
                name: post.title,
                item: `https://www.gekuendigt-abfindung.de/blog/${post.slug}`,
              },
            ],
          }),
        }}
      />

      <div className="bg-cream pt-[120px] pb-[50px] px-8 border-b border-border">
        <div className="max-w-content mx-auto">
          <div className="flex items-center gap-2 text-[0.84rem] text-ink-muted mb-4">
            <Link href="/" className="text-gold no-underline hover:underline">
              Home
            </Link>
            <span>/</span>
            <Link href="/blog" className="text-gold no-underline hover:underline">
              Insights
            </Link>
            <span>/</span>
            <span>{post.category}</span>
          </div>
          <div className="text-[0.72rem] font-bold text-gold uppercase tracking-wider mb-3">
            {post.category}
          </div>
          <h1 className="font-serif text-[clamp(1.6rem,3.5vw,2.2rem)] font-bold leading-tight text-ink">
            {post.title}
          </h1>
          <div className="flex items-center gap-4 mt-4 text-[0.88rem] text-ink-muted">
            <span>{post.author}</span>
            <span>&middot;</span>
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
          </div>
        </div>
      </div>

      {/* Content with sidebar ToC */}
      <div className="max-w-content mx-auto px-8 pt-12 pb-20 grid grid-cols-[220px_1fr] gap-12 items-start max-lg:grid-cols-1">
        <aside className="max-lg:hidden">
          <SidebarToc headings={headings} />
        </aside>
        <article className="max-w-[720px]">
          {/* Disclaimer */}
          <div className="bg-[#FAF8F3] border border-[#E8E4DC] rounded-xl p-6 mb-8">
            <p className="text-[0.88rem] text-[#7A7A7A] italic m-0 leading-relaxed">
              This article is for informational purposes only and does not constitute legal advice. For advice on your specific situation, please{' '}
              <a href="/#contact" className="text-gold underline">contact us directly</a>.
            </p>
          </div>

          {/* Part 1 */}
          <div className="prose">
            <MDXRemote source={part1} components={mdxComponents} options={mdxOptions} />
          </div>

          {/* Mid-article CTA 1 */}
          <div className="my-12 p-8 bg-cream border border-border-light rounded text-center">
            <h3 className="font-serif text-[1.3rem] font-bold mb-3">Need Clarity on Your German Legal Dispute?</h3>
            <p className="text-[0.95rem] text-ink-muted mb-5 max-w-[500px] mx-auto">
              Get a free initial assessment of your case from a German litigation attorney. All communication in English.
            </p>
            <a
              href="https://meet.brevo.com/fatih-bektas/initial-free-consultation-by-phone-lp"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-sm text-[0.95rem] font-semibold no-underline transition-all bg-gold text-white hover:bg-gold-dark hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(166,139,75,0.25)]"
              target="_blank"
              rel="noopener noreferrer"
            >
              Book a Free Consultation &rarr;
            </a>
          </div>

          {/* Part 2 */}
          <div className="prose">
            <MDXRemote source={part2} components={mdxComponents} options={mdxOptions} />
          </div>

          {/* Mid-article CTA 2 */}
          <div className="my-12 p-8 bg-cream border border-border-light rounded text-center">
            <h3 className="font-serif text-[1.3rem] font-bold mb-3">Ready to Take Action?</h3>
            <p className="text-[0.95rem] text-ink-muted mb-5 max-w-[500px] mx-auto">
              Send us the details of your dispute and we&rsquo;ll outline your options within 48 hours.
            </p>
            <a
              href="/#contact"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-sm text-[0.95rem] font-semibold no-underline transition-all bg-gold text-white hover:bg-gold-dark hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(166,139,75,0.25)]"
            >
              Send Us Your Case Details &rarr;
            </a>
          </div>

          {/* Part 3 */}
          <div className="prose">
            <MDXRemote source={part3} components={mdxComponents} options={mdxOptions} />
          </div>

          {/* CTA at end of post */}
          <div className="mt-16 p-8 bg-cream border border-border-light rounded text-center">
            <h3 className="font-serif text-[1.3rem] font-bold mb-3">Need Help With a German Lawsuit?</h3>
            <p className="text-[0.95rem] text-ink-muted mb-5 max-w-[500px] mx-auto">
              Whether you need to sue or have been sued in Germany — we can help. Free case assessment,
              usually within 48 hours.
            </p>
            <a
              href="https://meet.brevo.com/fatih-bektas/initial-free-consultation-by-phone-lp"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-sm text-[0.95rem] font-semibold no-underline transition-all bg-gold text-white hover:bg-gold-dark hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(166,139,75,0.25)]"
              target="_blank"
              rel="noopener noreferrer"
            >
              Book Free Case Assessment &rarr;
            </a>
          </div>

          {/* Author Box */}
          <AuthorBox />

          {/* Related Articles */}
          <RelatedArticles posts={relatedPosts} />
        </article>
      </div>
    </main>
  );
}
