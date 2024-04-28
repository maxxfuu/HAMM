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

import { CopyButton } from '@/components/copy-button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog';
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
          <CardTitle>Meeting Notes</CardTitle>
          <CardDescription>
            View and manage notes from past Zoom meetings
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
                    <TagIcon className="mr-2 size-4" /> Name
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
                  <Button>
                    <EyeIcon className="mr-2 size-4" /> View
                  </Button>
                  <CopyButton text="adsklasd" />
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive" size="icon">
                        <TrashIcon className="size-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Are you absolutely sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently
                          delete the notes for this meeting.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogAction className="w-full bg-red-500 hover:bg-red-400">
                          Yes, I&apos;m sure
                        </AlertDialogAction>
                        <AlertDialogCancel className="w-full">
                          Cancel
                        </AlertDialogCancel>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
