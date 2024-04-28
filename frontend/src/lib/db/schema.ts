import { sql } from 'drizzle-orm';
import { index, integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

type DefinitionEntry = {
  term: string;
  definition: string;
};

export const meetings = sqliteTable(
  'meetings',
  {
    id: text('id')
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    uploaderId: text('uploader_id').notNull(),
    name: text('name').notNull(),
    patient: text('patient').notNull(),
    phoneNumber: text('phone_number').notNull(),
    status: text('status', { enum: ['analyzing', 'processed'] })
      .default('analyzing')
      .notNull(),
    summary: text('summary'),
    definitions: text('definitions', { mode: 'json' }).$type<
      DefinitionEntry[]
    >(),
    createdAt: integer('created_at')
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull()
  },
  (table) => ({
    uploaderIdIdx: index('meetings_uploader_id_idx').on(table.uploaderId)
  })
);
