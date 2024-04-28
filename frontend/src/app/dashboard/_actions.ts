'use server';

import { getUser } from '@propelauth/nextjs/server/app-router';
import { z } from 'zod';

import { db } from '@/lib/db';
import { meetings } from '@/lib/db/schema';

const schema = z.object({
  meetingName: z.string().trim().min(1),
  patientName: z.string().trim().min(1),
  phoneNumber: z.string().trim().length(12).startsWith('+')
});

export async function createMeeting(
  meetingName: string,
  patientName: string,
  phoneNumber: string
) {
  const user = await getUser();
  if (!user) {
    throw new Error('Not authenticated');
  }

  const parseResult = schema.safeParse({
    meetingName,
    patientName,
    phoneNumber
  });
  if (!parseResult.success) {
    throw new Error('Schema validation failed');
  }

  const result = await db
    .insert(meetings)
    .values({
      uploaderId: user.userId,
      name: parseResult.data.meetingName,
      patient: parseResult.data.patientName,
      phoneNumber: parseResult.data.phoneNumber
    })
    .returning({ insertedId: meetings.id });

  return result[0].insertedId;
}
