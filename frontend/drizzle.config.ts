import 'dotenv/config';

import type { Config } from 'drizzle-kit';

if (!process.env.TURSO_DB_URL || !process.env.TURSO_AUTH_TOKEN) {
  throw new Error('Turso environment variables are not set');
}

export default {
  driver: 'turso',
  out: 'drizzle/migrations',
  schema: './src/lib/db/schema.ts',
  dbCredentials: {
    url: process.env.TURSO_DB_URL,
    authToken: process.env.TURSO_AUTH_TOKEN
  }
} satisfies Config;
