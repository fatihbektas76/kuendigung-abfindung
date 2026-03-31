import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'RVG Rechner 2025 – Anwaltskosten kostenlos berechnen | APOS Legal',
  description: 'Kostenloser RVG-Gebührenrechner nach KostBRÄG 2025. Berechnen Sie Anwaltsgebühren, Gerichtskosten und Ihr Prozesskostenrisiko – für Arbeitsgericht, Amtsgericht, Landgericht. Fachanwalt für Arbeitsrecht Heidelberg.',
  keywords: ['RVG Rechner', 'Anwaltskosten berechnen', 'Prozesskostenrechner', 'RVG 2025', 'Gerichtskosten', 'Anwaltsgebühren'],
  alternates: { canonical: 'https://www.gekuendigt-abfindung.de/rvg-rechner' },
  openGraph: {
    title: 'RVG Rechner 2025 – Kostenloser Prozesskostenrechner',
    description: 'Anwaltskosten & Gerichtskosten nach RVG 2025 berechnen. Inkl. Teilunterliegen, gegnerische Kosten & PDF-Export.',
    url: 'https://www.gekuendigt-abfindung.de/rvg-rechner',
    type: 'website',
  },
}

export default function RvgRechnerLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
