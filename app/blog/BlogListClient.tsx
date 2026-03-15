'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface PostSummary {
  slug: string;
  title: string;
  date: string;
  description: string;
  category: string;
  author: string;
  image?: string;
}

export default function BlogListClient({
  posts,
  categories,
}: {
  posts: PostSummary[];
  categories: string[];
}) {
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered =
    activeCategory === 'All' ? posts : posts.filter((p) => p.category === activeCategory);

  return (
    <section className="py-[60px] px-8">
      <div className="max-w-content mx-auto">
        <div className="flex gap-3 mb-8 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`py-2 px-5 rounded-full text-[0.82rem] font-semibold cursor-pointer border transition-all ${
                activeCategory === cat
                  ? 'bg-gold text-white border-gold'
                  : 'bg-transparent text-ink-muted border-border hover:border-gold hover:text-gold'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-6 max-md:grid-cols-1">
          {filtered.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="bg-cream border border-border-light rounded overflow-hidden transition-all no-underline text-inherit hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(0,0,0,0.06)] block"
            >
              {post.image ? (
                <div className="h-40 overflow-hidden relative">
                  <Image src={post.image} alt={post.title} fill className="object-cover" />
                </div>
              ) : (
                <div className="h-40 bg-gradient-to-br from-cream-dark to-border flex items-center justify-center font-serif text-[2rem] text-gold opacity-40">
                  &sect;
                </div>
              )}
              <div className="py-[22px] px-6">
                <div className="text-[0.68rem] font-bold text-gold uppercase tracking-wider mb-2">
                  {post.category}
                </div>
                <h3 className="font-serif text-[1.05rem] font-bold leading-tight mb-2">{post.title}</h3>
                <p className="text-[0.84rem] text-ink-muted leading-relaxed">{post.description}</p>
                <div className="text-[0.78rem] text-ink-muted mt-3">
                  {post.author} &middot;{' '}
                  {new Date(post.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-center text-ink-muted py-12">No posts found in this category.</p>
        )}
      </div>
    </section>
  );
}
