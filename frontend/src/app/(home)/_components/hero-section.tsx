import Link from 'next/link';

import { buttonVariants } from '@/components/ui/button';

export function HeroSection() {
  return (
    <section className="flex flex-col justify-center gap-6 py-24 text-center">
      <h1 className="text-5xl font-bold tracking-tight sm:text-6xl">HAMM</h1>
      <p>Some description here</p>
      <div>
        <Link className={buttonVariants()} href="/dashboard">
          Get started
        </Link>
      </div>
    </section>
  );
}
