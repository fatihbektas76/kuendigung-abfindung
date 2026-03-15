'use client';

import { useEffect, useRef, ReactNode } from 'react';

export default function FadeUp({
  children,
  className = '',
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('visible');
            observer.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const delayClass = delay === 1 ? 'delay-1' : delay === 2 ? 'delay-2' : delay === 3 ? 'delay-3' : '';

  return (
    <div ref={ref} className={`fade-up ${delayClass} ${className}`}>
      {children}
    </div>
  );
}
