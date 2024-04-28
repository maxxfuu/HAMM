import type { Metadata } from 'next';

import { HeroSection } from './_components/hero-section';

export const metadata: Metadata = { title: 'Home' };

export default function HomePage() {
  return (
    <>
      <HeroSection />
    </>
  );
}
