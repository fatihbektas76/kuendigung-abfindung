/**
 * Layout-Wrapper für alle Werbe-Landing-Pages unter /jetzt/*.
 *
 * - Global noindex/nofollow via Metadata-Default.
 * - Kein Rendering von Navigation/Footer – das macht bereits
 *   `components/LayoutClient.tsx` über die NO_CHROME_PAGES-Liste.
 * - Hier NUR der weiße Seitenhintergrund + sauberes Top-Spacing.
 */
import type { Metadata } from 'next';

export const metadata: Metadata = {
  // Default für alle Kinder – einzelne Pages dürfen das überschreiben.
  robots: { index: false, follow: false, nocache: true },
};

export default function JetztLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen bg-white">{children}</div>;
}
