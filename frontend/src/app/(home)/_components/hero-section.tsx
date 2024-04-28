import Link from 'next/link';

import { buttonVariants } from '@/components/ui/button';

export function HeroSection() {
  return (
    <section className="flex flex-col justify-center gap-6 py-24 text-center">
      <h1 className="mx-auto max-w-3xl text-5xl font-bold tracking-tight md:text-5xl lg:text-6xl">
        Healthcare administration and medical management made simple.
      </h1>
      <p className="mx-auto max-w-3xl text-lg text-muted-foreground">
        Streamline patient care with HAMM, a multilingual AI Assistant
        that automates medical note-taking, simplifies terms, and ensures
        follow-up through automated text reminders.
      </p>
      <div className="flex justify-center gap-2">
        <Link className={buttonVariants()} href="/dashboard">
          Get started
        </Link>
        <Link
          className={buttonVariants({ variant: 'outline' })}
          href="/dashboard"
        >
          Dashboard
        </Link>
      </div>
    </section>
  );
}
