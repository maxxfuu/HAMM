import { eq } from 'drizzle-orm';
import { Loader2Icon } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { cache } from 'react';

import { AutoRefresher } from '@/components/auto-refresher';
import { buttonVariants } from '@/components/ui/button';
import { db } from '@/lib/db';
import { meetings } from '@/lib/db/schema';

interface MeetingDataPageProps {
  params: {
    id: string;
  };
}

const getMeeting = cache(async (id: string) =>
  db.query.meetings.findFirst({
    where: eq(meetings.id, id)
  })
);

export default async function MeetingDataPage({
  params
}: MeetingDataPageProps) {
  const meeting = await getMeeting(params.id);
  if (!meeting) {
    notFound();
  }

  // still processing
  if (meeting.status !== 'processed') {
    return (
      <>
        <AutoRefresher />
        <div className="translate-center flex flex-col items-center gap-6 text-center">
          <Loader2Icon className="size-12 animate-spin text-muted-foreground" />
          <div>
            <h1 className="text-4xl font-bold tracking-tight">
              Processing recording&hellip;
            </h1>
            <p className="text-lg text-muted-foreground">
              This may take a moment.
            </p>
          </div>
          <Link
            className={buttonVariants({ variant: 'outline' })}
            href="/dashboard"
          >
            Return to dashboard
          </Link>
        </div>
      </>
    );
  }

  return (
    <div>
      <p>Meeting data page</p>
      <p>Meeting id: {params.id}</p>
    </div>
  );
}

export async function generateMetadata({ params }: MeetingDataPageProps) {
  const meeting = await getMeeting(params.id);
  if (!meeting) {
    notFound();
  }
  return { title: meeting.name };
}
