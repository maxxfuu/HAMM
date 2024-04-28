import { sql } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { alphabet, generateRandomString } from 'oslo/crypto';

type DefinitionEntry = {
  term: string;
  definition: string;
};

export const meetings = sqliteTable('meetings', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => generateRandomString(16, alphabet('a-z', 'A-Z', '0-9'))),
  uploaderId: text('uploader_id').notNull(),
  name: text('name').notNull(),
  patient: text('patient').notNull(),
  phoneNumber: text('phone_number').notNull(),
  status: text('status', { enum: ['analyzing', 'processed'] })
    .default('analyzing')
    .notNull(),
  summary: text('summary'),
  definitions: text('definitions', { mode: 'json' }).$type<DefinitionEntry[]>(),
  createdAt: integer('created_at')
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull()
});
