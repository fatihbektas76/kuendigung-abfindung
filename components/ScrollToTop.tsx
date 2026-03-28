'use client';

import { useState, useEffect } from 'react';

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Scroll to top"
      className={`fixed bottom-20 right-4 md:bottom-6 md:right-6 z-50 w-11 h-11 rounded-full bg-gold text-white border-none cursor-pointer shadow-[0_4px_16px_rgba(166,139,75,0.3)] flex items-center justify-center text-lg transition-all hover:bg-gold-dark hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(166,139,75,0.4)] ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
    >
      &#9650;
    </button>
  );
}
