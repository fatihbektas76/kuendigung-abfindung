import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'RVG Rechner 2026 — Anwaltskosten berechnen | APOS Legal',
  description: 'Kostenloser RVG-Rechner: Anwaltsgebühren, Gerichtskosten & Prozesskostenrisiko berechnen. Für alle Instanzen.',
  keywords: ['RVG Rechner', 'RVG Rechner 2026', 'Anwaltskosten berechnen', 'Prozesskostenrechner', 'RVG 2025', 'Gerichtskosten', 'Anwaltsgebühren'],
  alternates: { canonical: 'https://www.gekuendigt-abfindung.de/rvg-rechner' },
  openGraph: {
    title: 'RVG Rechner 2026 – Kostenloser Prozesskostenrechner',
    description: 'Anwaltskosten & Gerichtskosten nach RVG 2026 berechnen. Inkl. Teilunterliegen, gegnerische Kosten & PDF-Export.',
    url: 'https://www.gekuendigt-abfindung.de/rvg-rechner',
    type: 'website',
  },
}

export default function RvgRechnerLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
