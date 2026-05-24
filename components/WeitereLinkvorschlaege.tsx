import Link from 'next/link';
import { internalLinks } from '@/data/internal-links';

interface Props {
  currentPath: string;
}

export default function WeitereLinkvorschlaege({ currentPath }: Props) {
  const normalized = currentPath.replace(/\/$/, '') || '/';
  const links = internalLinks[normalized];

  if (!links || links.length === 0) return null;

  return (
    <section className="mt-10 mb-6">
      <h3 className="text-base font-semibold text-gray-500 uppercase tracking-wide mb-4">
        Weitere relevante Themen
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {links.map((link) => (
          <Link
            key={link.href}
            href={`${link.href}/`}
            className="block bg-white border border-gray-200 rounded-lg p-4 no-underline hover:border-[#8B7A3A] hover:bg-[#faf8f0] transition-colors group"
          >
            <p className="text-[15px] font-semibold text-gray-900 group-hover:text-[#6B6626] m-0">
              {link.label} &rarr;
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
