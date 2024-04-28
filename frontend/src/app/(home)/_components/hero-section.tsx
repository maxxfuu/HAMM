import Link from 'next/link';

import { buttonVariants } from '@/components/ui/button';

export function HeroSection() {
  return (
    <section className="flex flex-col justify-center gap-6 py-24 text-center">
      <h1 className="mx-auto max-w-3xl text-5xl font-bold tracking-tight md:text-5xl lg:text-6xl">
        Healthcare administration and medical management made simple.
      </h1>
      <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
        Some description here. Lorem ipsum dolor sit amet, consectetur
        adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua.
      </p>
      <div>
        <Link className={buttonVariants()} href="/dashboard">
          Get started
        </Link>
      </div>
    </section>
  );
}
