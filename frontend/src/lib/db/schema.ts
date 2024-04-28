import { sql } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const meetings = sqliteTable('meetings', {
  id: text('id').primaryKey(),
  uploaderId: text('uploader_id').notNull(),
  name: text('name').notNull(),
  patient: text('patient').notNull(),
  createdAt: integer('created_at')
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull()
});
