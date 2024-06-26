import { AuthProvider } from '@propelauth/nextjs/client';
import { GeistSans } from 'geist/font/sans';
import type { Metadata } from 'next';
import NextTopLoader from 'nextjs-toploader';
import type { PropsWithChildren } from 'react';
import { Toaster } from 'sonner';

import { env } from '@/env';
import { cn } from '@/lib/utils';
import { BackgroundEffects } from './_components/background-effects';
import { Header } from './_components/header';

import './globals.css';

export const metadata: Metadata = {
  title: {
    template: '%s | HAMM',
    default: 'HAMM'
  }
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          'relative flex min-h-screen flex-col pb-8 font-sans antialiased',
          GeistSans.variable
        )}
      >
        <BackgroundEffects />
        <AuthProvider authUrl={env.NEXT_PUBLIC_AUTH_URL}>
          <Header />
          <main className="container flex-1">{children}</main>
        </AuthProvider>
        <NextTopLoader color="#17A34A" showSpinner={false} />
        <Toaster richColors />
      </body>
    </html>
  );
}
