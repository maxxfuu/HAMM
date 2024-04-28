import { getPropelAuthApis } from '@propelauth/nextjs/server';
import { getUserOrRedirect } from '@propelauth/nextjs/server/app-router';
import { redirect } from 'next/navigation';

export default async function DashboardPage() {
  const user = await getUserOrRedirect();
  const propel = getPropelAuthApis();

  const metadata = await propel.fetchUserMetadataByUserId(user.userId);
  if (!metadata?.metadata?.zoom) {
    throw redirect('/zoom/connect');
  }

  return <p>This is a protected page!</p>;
}
