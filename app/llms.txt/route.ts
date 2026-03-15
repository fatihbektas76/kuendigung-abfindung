import { NextResponse } from 'next/server';
import { readFile, readdir } from 'fs/promises';
import { join } from 'path';
import matter from 'gray-matter';

const BASE_URL = 'https://www.gekuendigt-abfindung.de';

async function getBlogEntries(): Promise<string[]> {
  const blogDir = join(process.cwd(), 'content', 'blog');
  const files = await readdir(blogDir);
  const mdxFiles = files.filter((f) => f.endsWith('.mdx'));

  const entries: { title: string; slug: string; description: string; date: string }[] = [];

  for (const file of mdxFiles) {
    const raw = await readFile(join(blogDir, file), 'utf-8');
    const { data } = matter(raw);
    entries.push({
      title: data.title ?? file.replace('.mdx', ''),
      slug: data.slug ?? file.replace('.mdx', ''),
      description: data.description ?? '',
      date: data.date ?? '',
    });
  }

  entries.sort((a, b) => (b.date > a.date ? 1 : -1));

  return entries.map(
    (e) => `- [${e.title}](${BASE_URL}/blog/${e.slug}): ${e.description}`
  );
}

export async function GET() {
  const blogLines = await getBlogEntries();

  const content = `# gekuendigt-abfindung.de — Kündigung & Abfindung for International Businesses

> gekuendigt-abfindung.de (Kanzlei Fatih Bektas) is a German law firm specialising in commercial litigation and arbitration for US and UK companies. All client communication is in English. The firm is based in Heidelberg and Berlin.

gekuendigt-abfindung.de represents international businesses as plaintiff or defendant in German courts (Amtsgericht, Landgericht, Oberlandesgericht) and in international arbitration (ICC, DIS, LCIA). Fatih Bektas is a certified specialist in employment law (Fachanwalt für Arbeitsrecht) since 2011 and a qualified mediator with 20+ years of litigation experience.

## Core Services

- [Commercial Disputes](${BASE_URL}/#disputes): Breach of contract, trade disputes, distributor and agency claims, unfair competition, product liability before German Landgericht commercial chambers.
- [Employment Litigation](${BASE_URL}/#disputes): Wrongful dismissal claims, severance disputes, non-compete enforcement, works council conflicts. Fachanwalt (certified specialist) since 2011.
- [Contract Enforcement](${BASE_URL}/#disputes): Payment claims, warranty disputes, service agreements, licensing conflicts under German BGB/HGB.
- [Shareholder Disputes](${BASE_URL}/#disputes): Minority shareholder protection, squeeze-outs, breach of fiduciary duties, GmbH and AG conflicts.
- [International Arbitration](${BASE_URL}/#disputes): ICC, DIS, LCIA proceedings seated in Germany. Enforcement of foreign arbitral awards under the New York Convention.
- [Judgment Enforcement](${BASE_URL}/#disputes): Enforcing foreign judgments and arbitral awards in Germany. Exequatur proceedings, attachment of German assets.

## Free Tools

- [Litigation Cost Calculator](${BASE_URL}/tools/cost-calculator): Estimates German court fees and statutory attorney fees based on dispute value.
- [Deadline Checker](${BASE_URL}/tools/deadline-checker): Calculates response deadlines after being served with a German lawsuit.
- [Dismissal Checker](${BASE_URL}/tools/dismissal-checker): Assesses whether a German employee dismissal is challengeable under the Kündigungsschutzgesetz.

## The Team

- [Full Team Overview](${BASE_URL}/team): Fatih Bektas (Attorney-at-Law & Certified Specialist), Georg Willem Büchler (Attorney-at-Law & Certified Specialist), Dr. Martin Duncker (Attorney-at-Law & Certified Specialist).

## Blog — Practical Guides on Kündigung & Abfindung

${blogLines.join('\n')}

## Contact & Booking

- [Free Case Assessment](${BASE_URL}/#contact): Submit case details for a free initial assessment, usually within 48 hours.
- [Book a Consultation](https://meet.brevo.com/fatih-bektas/initial-free-consultation-by-phone-lp): Schedule a free phone consultation directly via Brevo.
- Email: bektas@apos.legal
- Phone: +49 151 2700 3173
- Address: Am Paradeplatz 20, 69126 Heidelberg, Germany

## Legal

- [Privacy Policy](${BASE_URL}/privacy-policy)
- [Legal Notice / Impressum](${BASE_URL}/legal-notice)
`;

  return new NextResponse(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
}
