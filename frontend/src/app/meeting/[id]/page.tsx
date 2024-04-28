import { getPropelAuthApis } from '@propelauth/nextjs/server';
import { eq } from 'drizzle-orm';
import {
  BriefcaseMedicalIcon,
  ClockIcon,
  Loader2Icon,
  UserIcon
} from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { cache } from 'react';

import { AutoRefresher } from '@/components/auto-refresher';
import { Time } from '@/components/time';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';
import { buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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

  const propel = getPropelAuthApis();
  const uploader = await propel.fetchUserMetadataByUserId(meeting.uploaderId);
  if (!uploader) {
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
    <div className="grid gap-6">
      <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
        <div className="grid gap-1">
          <h1 className="text-3xl font-semibold tracking-tight">
            {meeting.name}
          </h1>
          <div className="flex items-center justify-center text-muted-foreground sm:justify-start">
            <ClockIcon className="mr-1 size-4" />{' '}
            <Time timestamp={meeting.createdAt} />
          </div>
        </div>
        <div>
          <div className="flex items-center justify-end text-muted-foreground">
            <UserIcon className="mr-1 size-4" /> <strong>Patient</strong>:{' '}
            {meeting.patient}
          </div>
          <div className="flex items-center justify-end text-muted-foreground">
            <BriefcaseMedicalIcon className="mr-1 size-4" />{' '}
            <strong>Doctor</strong>: {uploader.firstName} {uploader.lastName}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
        <Card className="h-fit md:col-span-8">
          <CardHeader>
            <CardTitle>Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{meeting.summary}</p>
          </CardContent>
        </Card>
        <Card className="md:col-span-4">
          <CardHeader className="pb-2">
            <CardTitle>Definitions</CardTitle>
          </CardHeader>
          <CardContent className="pb-2">
            <Accordion className="divide-y" type="multiple">
              {meeting.definitions?.map((entry) => (
                <AccordionItem key={entry.term} value={entry.term}>
                  <AccordionTrigger>{entry.term}</AccordionTrigger>
                  <AccordionContent>{entry.definition}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      </div>
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
