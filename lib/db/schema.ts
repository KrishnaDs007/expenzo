// Drizzle ORM schema for Supabase/Postgres
// See expenzo-developer-guide.md Section 7 for full schema

import { pgTable, text, numeric, timestamp, uuid, pgEnum } from 'drizzle-orm/pg-core';

export const categoryEnum = pgEnum('category', [
  'Food', 'Travel', 'Auto', 'Shopping',
  'Entertainment', 'Utilities', 'Health', 'Other',
]);

export const paymentMethodEnum = pgEnum('payment_method', [
  'Cash', 'UPI', 'GPay', 'PhonePe', 'Card', 'Other',
]);

export const users = pgTable('users', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  createdAt: timestamp('created_at').defaultNow(),
});

export const groups = pgTable('groups', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  createdBy: text('created_by').references(() => users.id),
  createdAt: timestamp('created_at').defaultNow(),
});

export const groupMembers = pgTable('group_members', {
  groupId: uuid('group_id').references(() => groups.id),
  userId: text('user_id').references(() => users.id),
  joinedAt: timestamp('joined_at').defaultNow(),
});

export const expenses = pgTable('expenses', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: text('user_id').references(() => users.id),
  groupId: uuid('group_id').references(() => groups.id),
  amount: numeric('amount', { precision: 10, scale: 2 }).notNull(),
  description: text('description').notNull(),
  category: categoryEnum('category').notNull(),
  date: timestamp('date').notNull(),
  paymentMethod: paymentMethodEnum('payment_method').notNull(),
  rawInput: text('raw_input'),
  aiParsed: text('ai_parsed'),
  isRecurring: text('is_recurring').default('false'),
  recurringInterval: text('recurring_interval'), // e.g., 'monthly', 'weekly', 'yearly'
  createdAt: timestamp('created_at').defaultNow(),
});

export const splits = pgTable('splits', {
  id: uuid('id').defaultRandom().primaryKey(),
  expenseId: uuid('expense_id').references(() => expenses.id),
  userId: text('user_id').references(() => users.id),
  amount: numeric('amount', { precision: 10, scale: 2 }).notNull(),
  settled: text('settled').default('false'),
});
