'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

const HIDDEN_PATHS = ['/en/check-dismissal', '/en/check-termination-agreement'];

export default function MobileCTA() {
  const [visible, setVisible] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (HIDDEN_PATHS.some((p) => pathname.startsWith(p))) {
      setVisible(false);
      return;
    }

    const onScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight;
      const winHeight = window.innerHeight;
      const nearBottom = scrollY + winHeight > docHeight - 300;

      setVisible(scrollY > 400 && !nearBottom);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [pathname]);

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden animate-[slideUp_0.3s_ease-out]">
      <div className="bg-white/95 backdrop-blur-sm border-t border-border shadow-[0_-4px_20px_rgba(0,0,0,0.08)] px-4 py-3 flex items-center gap-3">
        <div className="flex-1 min-w-0">
          <p className="text-[0.78rem] font-semibold text-ink leading-tight truncate">
            Don&apos;t miss the 3-week deadline
          </p>
          <p className="text-[0.68rem] text-ink-muted leading-tight">Free case review</p>
        </div>
        <a
          href="/en/check-dismissal"
          className="shrink-0 bg-gold-dark text-white text-[0.82rem] font-semibold px-5 py-2.5 rounded-sm no-underline transition-colors hover:bg-[#635428]"
        >
          Review now
        </a>
      </div>
    </div>
  );
}
