import { Zoom } from 'arctic';

import { env } from '@/env';

export const zoom = new Zoom(
  env.ZOOM_CLIENT_ID,
  env.ZOOM_CLIENT_SECRET,
  'http://localhost:3000/zoom/callback'
);
