import { getPropelAuthApis } from '@propelauth/nextjs/server';
import { getUserOrRedirect } from '@propelauth/nextjs/server/app-router';
import { redirect } from 'next/navigation';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';

export default async function DashboardPage() {
  const user = await getUserOrRedirect();
  const propel = getPropelAuthApis();

  const metadata = await propel.fetchUserMetadataByUserId(user.userId);
  if (!metadata?.metadata?.zoom) {
    throw redirect('/zoom/connect');
  }

  return (
    <div className="grid gap-6">
      <div className="grid gap-1">
        <h1 className="text-3xl font-semibold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back, {user.firstName}! 👋
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Notes</CardTitle>
          <CardDescription>
            View past notes from previous Zoom meetings
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>[Card Content]</p>
        </CardContent>
      </Card>
    </div>
  );
}
