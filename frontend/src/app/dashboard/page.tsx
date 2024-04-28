import { getUserOrRedirect } from '@propelauth/nextjs/server/app-router';
import { desc, eq } from 'drizzle-orm';
import {
  ClockIcon,
  CopyPlusIcon,
  EyeIcon,
  SquareActivityIcon,
  TagIcon,
  WrenchIcon
} from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';

import { CopyButton } from '@/components/copy-button';
import { Time } from '@/components/time';
import { Badge } from '@/components/ui/badge';
import { buttonVariants } from '@/components/ui/button';
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
import { db } from '@/lib/db';
import { meetings } from '@/lib/db/schema';
import { DeleteDialog } from './_components/delete-dialog';
import { UploadDialog } from './_components/upload-dialog';

export const metadata: Metadata = { title: 'Dashboard' };

export default async function DashboardPage() {
  const user = await getUserOrRedirect({ returnToCurrentPath: true });

  const uploadedMeetings = await db.query.meetings.findMany({
    where: eq(meetings.uploaderId, user.userId),
    orderBy: desc(meetings.createdAt),
    columns: {
      id: true,
      name: true,
      patient: true,
      status: true,
      createdAt: true
    }
  });

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
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-between">
            <div>
              <CardTitle>Meeting Notes</CardTitle>
              <CardDescription>
                View and manage notes from past meetings
              </CardDescription>
            </div>
            <UploadDialog />
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-24">
                  <div className="flex items-center">
                    <SquareActivityIcon className="mr-1 size-4" /> Status
                  </div>
                </TableHead>
                <TableHead>
                  <div className="flex items-center">
                    <TagIcon className="mr-2 size-4" /> Name
                  </div>
                </TableHead>
                <TableHead>
                  <div className="flex items-center">
                    <ClockIcon className="mr-1 size-4" /> Upload date
                  </div>
                </TableHead>
                <TableHead className="text-right">
                  <div className="flex items-center justify-end">
                    <WrenchIcon className="mr-1 size-4" /> Actions
                  </div>
                </TableHead>
              </TableRow>
            </TableHeader>
            {uploadedMeetings.length > 0 ? (
              <TableBody>
                {uploadedMeetings.map((meeting) => (
                  <TableRow>
                    <TableCell className="whitespace-nowrap font-medium">
                      <Badge
                        className="border-muted-foreground/25 font-normal uppercase tracking-wider"
                        variant={
                          meeting.status === 'analyzing'
                            ? 'secondary'
                            : 'default'
                        }
                      >
                        {meeting.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="whitespace-nowrap">
                      Random placeholder
                    </TableCell>
                    <TableCell className="whitespace-nowrap">
                      <Time timestamp={meeting.createdAt} />
                    </TableCell>
                    <TableCell className="space-x-2 whitespace-nowrap text-right">
                      <Link
                        className={buttonVariants({ variant: 'outline' })}
                        href={`/meeting/${meeting.id}`}
                      >
                        <EyeIcon className="mr-2 size-4" /> View
                      </Link>
                      <CopyButton
                        text={`http://localhost:3000/meeting/${meeting.id}`}
                      />
                      <DeleteDialog meetingId={meeting.id} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            ) : (
              <div className="relative mt-4 block w-full rounded-lg border-2 border-dashed border-muted-foreground/50 p-12 text-center">
                <CopyPlusIcon className="mx-auto mb-3 size-12 text-muted-foreground" />
                <h3 className="text-lg font-semibold">No meetings</h3>
                <p className="text-sm text-muted-foreground">
                  Get started by uploading your first meeting!
                </p>
              </div>
            )}
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
