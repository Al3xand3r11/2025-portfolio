'use client';

import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import Preloader from '../preloader/preloader';

export default function PreloaderWrapper() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Hide preloader after animation completes
    const timer = setTimeout(() => {
      setIsLoading(false);
      document.body.style.cursor = 'default';
      window.scrollTo(0, 0);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence mode="wait">
      {isLoading && <Preloader />}
    </AnimatePresence>
  );
}
