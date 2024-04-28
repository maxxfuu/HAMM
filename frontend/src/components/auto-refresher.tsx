'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const FIVE_SECONDS = 5000;

export function AutoRefresher() {
  const router = useRouter();

  useEffect(() => {
    const intervalId = setInterval(() => {
      console.log('Refreshing page...');
      router.refresh();
    }, FIVE_SECONDS);
    return () => clearInterval(intervalId);
  }, []);

  return null;
}
