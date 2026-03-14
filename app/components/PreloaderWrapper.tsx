'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { AnimatePresence } from 'framer-motion';
import Preloader from '../preloader/preloader';

export default function PreloaderWrapper() {
  const pathname = usePathname();
  const isHomePage = pathname === '/';
  const [isLoading, setIsLoading] = useState(isHomePage);

  useEffect(() => {
    if (!isHomePage) return;

    const timer = setTimeout(() => {
      setIsLoading(false);
      document.body.style.cursor = 'default';
      window.scrollTo(0, 0);
    }, 2000);

    return () => clearTimeout(timer);
  }, [isHomePage]);

  return (
    <AnimatePresence mode="wait">
      {isLoading && <Preloader />}
    </AnimatePresence>
  );
}
