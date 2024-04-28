import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  server: {
    PROPELAUTH_API_KEY: z.string(),
    PROPELAUTH_VERIFIER_KEY: z.string(),
    PROPELAUTH_REDIRECT_URI: z.string().url(),
    ZOOM_CLIENT_ID: z.string(),
    ZOOM_CLIENT_SECRET: z.string(),
    TURSO_DB_URL: z.string().url(),
    TURSO_AUTH_TOKEN: z.string()
  },
  client: {
    NEXT_PUBLIC_AUTH_URL: z.string().url()
  },
  experimental__runtimeEnv: {
    NEXT_PUBLIC_AUTH_URL: process.env.NEXT_PUBLIC_AUTH_URL
  }
});
