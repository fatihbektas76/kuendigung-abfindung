import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllPosts } from '@/lib/blog';
import BlogListClient from './BlogListClient';

export const metadata: Metadata = {
  title: 'Insights & Guides — German Litigation Explained',
  description:
    'Practical guides on German court procedure, costs, enforcement, and litigation strategy for US and UK companies.',
  alternates: {
    canonical: 'https://www.german-litigation-lawyer.com/blog',
  },
};

export default function BlogPage() {
  const posts = getAllPosts();
  const categories = ['All', ...Array.from(new Set(posts.map((p) => p.category)))];

  return (
    <main>
      <div className="bg-cream pt-[120px] pb-[50px] px-8 border-b border-border">
        <div className="max-w-content mx-auto">
          <Link href="/" className="text-gold no-underline text-[0.88rem] font-medium hover:underline">
            &larr; Back to Home
          </Link>
          <h1 className="font-serif text-[2rem] font-bold mt-4">Insights &amp; Guides</h1>
          <p className="text-[1.05rem] text-ink-muted max-w-[580px] leading-relaxed mt-3">
            Practical guides on German court procedure, costs, and strategy for US and UK companies.
          </p>
        </div>
      </div>
      <BlogListClient
        posts={posts.map((p) => ({
          slug: p.slug,
          title: p.title,
          date: p.date,
          description: p.description,
          category: p.category,
          author: p.author,
          image: p.image,
        }))}
        categories={categories}
      />
    </main>
  );
}
