import { getPropelAuthApis } from '@propelauth/nextjs/server';
import { getUserOrRedirect } from '@propelauth/nextjs/server/app-router';
import {
  ClipboardCopyIcon,
  ClockIcon,
  EyeIcon,
  HashIcon,
  TagIcon,
  TrashIcon,
  WrenchIcon
} from 'lucide-react';
import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';

export const metadata: Metadata = { title: 'Dashboard' };

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
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-24">
                  <div className="flex items-center">
                    <HashIcon className="mr-1 size-4" /> ID
                  </div>
                </TableHead>
                <TableHead className="w-[1%]">
                  <div className="flex items-center">
                    <ClockIcon className="mr-1 size-4" /> Date
                  </div>
                </TableHead>
                <TableHead>
                  <div className="flex items-center">
                    <TagIcon className="mr-1 size-4" /> Name
                  </div>
                </TableHead>
                <TableHead className="text-right">
                  <div className="flex items-center justify-end">
                    <WrenchIcon className="mr-1 size-4" /> Actions
                  </div>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="whitespace-nowrap font-medium">
                  1
                </TableCell>
                <TableCell className="whitespace-nowrap">
                  {new Date().toLocaleString()}
                </TableCell>
                <TableCell className="whitespace-nowrap">
                  Random placeholder
                </TableCell>
                <TableCell className="space-x-2 whitespace-nowrap text-right">
                  <Button size="icon">
                    <EyeIcon className="size-4" />
                  </Button>
                  <Button className="border" variant="secondary" size="icon">
                    <ClipboardCopyIcon className="size-4" />
                  </Button>
                  <Button variant="destructive" size="icon">
                    <TrashIcon className="size-4" />
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
