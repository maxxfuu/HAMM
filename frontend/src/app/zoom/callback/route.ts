import { getPropelAuthApis } from '@propelauth/nextjs/server';
import { getUserOrRedirect } from '@propelauth/nextjs/server/app-router';
import { OAuth2RequestError } from 'arctic';
import { cookies } from 'next/headers';

import { zoom } from '@/lib/auth';

export async function GET(request: Request): Promise<Response> {
  const user = await getUserOrRedirect({ returnToPath: '/dashboard' });
  const propel = getPropelAuthApis();

  const url = new URL(request.url);
  const code = url.searchParams.get('code');
  const state = url.searchParams.get('state');

  const storedState = cookies().get('zoom_oauth_state')?.value ?? null;
  const storedCodeVerifier = cookies().get('zoom_code_verifier')?.value ?? null;
  if (
    !code ||
    !state ||
    !storedState ||
    !storedCodeVerifier ||
    state !== storedState
  ) {
    return new Response(null, { status: 400 });
  }

  try {
    const tokens = await zoom.validateAuthorizationCode(
      code,
      storedCodeVerifier
    );
    const response = await fetch('https://api.zoom.us/v2/users/me', {
      headers: {
        Authorization: `Bearer ${tokens.accessToken}`
      }
    });
    const zoomUser = await response.json();
    console.log('zoomUser', zoomUser);

    await propel.updateUserMetadata(user.userId, {
      metadata: {
        zoom: {
          accessToken: tokens.accessToken,
          refreshToken: tokens.refreshToken
        }
      }
    });

    return new Response(null, {
      status: 302,
      headers: { Location: '/dashboard' }
    });
  } catch (e) {
    // the specific error message depends on the provider
    if (e instanceof OAuth2RequestError) {
      // invalid code
      return new Response(null, { status: 400 });
    }
    return new Response(null, { status: 500 });
  }
}
