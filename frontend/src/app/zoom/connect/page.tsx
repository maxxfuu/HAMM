import { generateCodeVerifier, generateState } from 'arctic';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { zoom } from '@/lib/auth';

export default function ZoomConnectPage() {
  async function redirectUser() {
    'use server';

    const state = generateState();
    const codeVerifier = generateCodeVerifier();

    const url: URL = await zoom.createAuthorizationURL(state, codeVerifier, {
      scopes: ['user:read:user']
    });

    cookies().set('zoom_oauth_state', state, {
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 10,
      sameSite: 'lax',
      httpOnly: true,
      path: '/'
    });

    cookies().set('zoom_code_verifier', codeVerifier, {
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 10,
      sameSite: 'lax',
      httpOnly: true,
      path: '/'
    });

    redirect(url.toString());
  }
  return (
    <form action={redirectUser}>
      <h1>Please connect your Zoom account</h1>
      <Button variant="outline">Continue to Zoom</Button>
    </form>
  );
}
