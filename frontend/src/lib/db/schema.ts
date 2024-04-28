import { sql } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const notes = sqliteTable('notes', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull(),
  createdAt: integer('created_at')
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull()
});
