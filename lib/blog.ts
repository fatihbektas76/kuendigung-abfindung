import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  lastModified?: string;
  description: string;
  category: string;
  author: string;
  featured: boolean;
  image?: string;
  keywords?: string[];
  content: string;
}

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog');

export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(BLOG_DIR)) return [];

  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith('.mdx'));

  const posts = files.map((filename) => {
    const filePath = path.join(BLOG_DIR, filename);
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { data, content } = matter(fileContent);

    return {
      slug: data.slug || filename.replace('.mdx', ''),
      title: data.title || '',
      date: data.date || '',
      lastModified: data.lastModified || undefined,
      description: data.description || '',
      category: data.category || '',
      author: data.author || '',
      featured: data.featured || false,
      image: data.image || undefined,
      keywords: data.keywords || [],
      content,
    };
  });

  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  const posts = getAllPosts();
  return posts.find((p) => p.slug === slug);
}

export function getPostSlugs(): string[] {
  return getAllPosts().map((p) => p.slug);
}

export interface TocHeading {
  id: string;
  text: string;
  level: number;
}

export function getRelatedPosts(currentSlug: string, count: number = 3): BlogPost[] {
  const allPosts = getAllPosts();
  const currentPost = allPosts.find((p) => p.slug === currentSlug);
  if (!currentPost) return [];

  const currentKeywordsArr = (currentPost.keywords || []).map((k) => k.toLowerCase());
  const currentKeywords = new Set(currentKeywordsArr);
  const currentWords = new Set(
    currentKeywordsArr.flatMap((k) => k.split(/\s+/)).filter((w) => w.length > 3)
  );

  const scored = allPosts
    .filter((p) => p.slug !== currentSlug)
    .map((post) => {
      const postKeywords = (post.keywords || []).map((k) => k.toLowerCase());

      // Exact keyword overlap (3 points each)
      const keywordOverlap = postKeywords.filter((k) => currentKeywords.has(k)).length;

      // Word-level overlap (0.5 points each, words > 3 chars)
      const postWords = postKeywords.flatMap((k) => k.split(/\s+/)).filter((w) => w.length > 3);
      const wordOverlap = postWords.filter((w) => currentWords.has(w)).length;

      // Category match (2 points)
      const categoryMatch = post.category === currentPost.category ? 2 : 0;

      const score = keywordOverlap * 3 + wordOverlap * 0.5 + categoryMatch;
      return { post, score };
    })
    .sort((a, b) => b.score - a.score);

  return scored.slice(0, count).map((s) => s.post);
}

export function extractHeadings(content: string): TocHeading[] {
  const lines = content.split('\n');
  const headings: TocHeading[] = [];

  for (const line of lines) {
    const match = line.match(/^(#{2,3})\s+(.+)$/);
    if (match) {
      const level = match[1].length;
      const text = match[2]
        .replace(/\*\*/g, '')
        .replace(/\*/g, '')
        .replace(/`/g, '')
        .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
        .trim();
      const id = text
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '');
      headings.push({ id, text, level });
    }
  }

  return headings;
}
