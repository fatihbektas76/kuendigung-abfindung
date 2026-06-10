import type { ReactNode } from 'react';

interface NormLinkProps {
  children: ReactNode;
  href: string;
  className?: string;
}

/**
 * Inline link to a legal norm on dejure.org (or other authoritative source).
 * Used for GEO citability — KI systems weight inline citations to primary
 * sources very highly.
 */
export default function NormLink({ children, href, className }: NormLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={
        className ??
        'text-gold-dark no-underline hover:underline decoration-gold underline-offset-2'
      }
    >
      {children}
    </a>
  );
}

/** Common normative URLs reused across pages */
export const NORM = {
  // KSchG
  kschg1: 'https://dejure.org/gesetze/KSchG/1.html',
  kschg1a: 'https://dejure.org/gesetze/KSchG/1a.html',
  kschg4: 'https://dejure.org/gesetze/KSchG/4.html',
  kschg5: 'https://dejure.org/gesetze/KSchG/5.html',
  kschg9: 'https://dejure.org/gesetze/KSchG/9.html',
  kschg10: 'https://dejure.org/gesetze/KSchG/10.html',
  kschg14: 'https://dejure.org/gesetze/KSchG/14.html',
  kschg15: 'https://dejure.org/gesetze/KSchG/15.html',
  kschg23: 'https://dejure.org/gesetze/KSchG/23.html',
  // BGB
  bgb242: 'https://dejure.org/gesetze/BGB/242.html',
  bgb622: 'https://dejure.org/gesetze/BGB/622.html',
  bgb623: 'https://dejure.org/gesetze/BGB/623.html',
  bgb626: 'https://dejure.org/gesetze/BGB/626.html',
  // Other
  arbgg12a: 'https://dejure.org/gesetze/ArbGG/12a.html',
  estg34: 'https://dejure.org/gesetze/EStG/34.html',
  sgb3158: 'https://dejure.org/gesetze/SGB_III/158.html',
  sgb3159: 'https://dejure.org/gesetze/SGB_III/159.html',
  sgb9168: 'https://dejure.org/gesetze/SGB_IX/168.html',
  muschg17: 'https://dejure.org/gesetze/MuSchG/17.html',
  beeg18: 'https://dejure.org/gesetze/BEEG/18.html',
  betrvg102: 'https://dejure.org/gesetze/BetrVG/102.html',
  betrvg83: 'https://dejure.org/gesetze/BetrVG/83.html',
  bgb314: 'https://dejure.org/gesetze/BGB/314.html',
} as const;

/** dejure.org Vernetzungs-URL für BAG-Urteile — landet zuverlässig auf der Trefferseite */
export function bagDejureUrl(datum: string | null, az: string): string {
  const base = 'https://dejure.org/dienste/vernetzung/rechtsprechung';
  const params = new URLSearchParams({ Gericht: 'BAG', Aktenzeichen: az });
  if (datum) params.set('Datum', datum);
  return `${base}?${params.toString()}`;
}
