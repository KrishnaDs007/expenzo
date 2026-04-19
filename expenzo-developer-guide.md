# Expenzo — Developer Guide

> AI-first expense tracker | Next.js 14 + PWA + Free-tier stack

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [AI Model Recommendation (Budget-Friendly)](#2-ai-model-recommendation-budget-friendly)
3. [Full Stack](#3-full-stack)
4. [Free Tier Limits & Costs](#4-free-tier-limits--costs)
5. [Project Structure](#5-project-structure)
6. [Environment Setup](#6-environment-setup)
7. [Database Schema](#7-database-schema)
8. [AI Parsing — Core Feature](#8-ai-parsing--core-feature)
9. [Key Pages & Components](#9-key-pages--components)
10. [PWA Setup](#10-pwa-setup)
11. [Deployment](#11-deployment)
12. [Development Roadmap](#12-development-roadmap)
13. [Cost Optimization Tips](#13-cost-optimization-tips)

---

## 1. Project Overview

Expenzo lets users add expenses in plain natural language:

```
"Paid 850 for pizza with Amit and Rohan on gpay yesterday"
```

The AI parses this into a structured expense — no forms, no friction.

**Core flows:**
- Natural language → AI parse → editable preview → save
- Group expense splitting with balance tracking
- Dashboard with category charts and monthly trends
- Mobile-first PWA (installable, offline-friendly)

---

## 2. AI Model Recommendation (Budget-Friendly)

### ✅ Recommended: `claude-haiku-4-5` (Anthropic)

This is the **best low-cost model** for Expenzo's parsing task.

| Model | Cost (Input) | Cost (Output) | Speed | Quality for parsing |
|---|---|---|---|---|
| **claude-haiku-4-5** ✅ | ~$0.80/M tokens | ~$4/M tokens | Very Fast | Excellent |
| claude-sonnet-4-5 | ~$3/M tokens | ~$15/M tokens | Fast | Overkill for parsing |
| GPT-4o mini | ~$0.15/M tokens | ~$0.60/M tokens | Fast | Good alternative |
| Gemini 1.5 Flash | Free (quota) | Free (quota) | Fast | Good free option |

### Why Haiku is the right pick

- Expense parsing is a **structured extraction task**, not complex reasoning — Haiku handles it perfectly
- Each parse call uses ~200–400 tokens total (input + output)
- At $0.80/M input tokens: **1,000 expense parses ≈ $0.08–0.16**
- You can comfortably handle thousands of users before spending even $1/day

### Free Alternative: Gemini 1.5 Flash

If you want **zero API cost** during development and early launch:

```
Google AI Studio → Gemini 1.5 Flash
Free tier: 15 requests/min, 1M tokens/day
```

Use this for dev and beta. Switch to Haiku when you scale.

### Prompt for expense parsing (works on both models)

```typescript
const SYSTEM_PROMPT = `You are an expense parser. Extract structured data from natural language expense descriptions.
Always respond with valid JSON only. No explanation, no markdown.

JSON schema:
{
  "amount": number,
  "description": string,
  "category": "Food" | "Travel" | "Auto" | "Shopping" | "Entertainment" | "Utilities" | "Health" | "Other",
  "date": "YYYY-MM-DD",
  "paymentMethod": "Cash" | "UPI" | "GPay" | "PhonePe" | "Card" | "Other",
  "paidBy": "me",
  "splitWith": string[],
  "splitType": "none" | "equal" | "custom",
  "confidence": number
}

Rules:
- "yesterday" → subtract 1 day from today
- "gpay" → paymentMethod: "GPay"
- If people are mentioned after "with", add them to splitWith
- Default splitType to "equal" when splitWith is non-empty
- confidence: 0–1 based on how clear the input was
- Today's date: ${new Date().toISOString().split('T')[0]}`;
```

---

## 3. Full Stack

### Chosen Stack (100% free tier for MVP)

```
Frontend      → Next.js 14 (App Router)
Styling       → Tailwind CSS + shadcn/ui
State         → Zustand
Animations    → Framer Motion
Charts        → Recharts
Forms         → React Hook Form + Zod
AI            → Anthropic Haiku (pay-as-you-go, near zero for MVP)
Auth          → Clerk (free tier: 10,000 MAU)
Database      → Supabase (free tier: 500MB, 2GB bandwidth)
ORM           → Drizzle ORM
Hosting       → Vercel (free tier: hobby plan)
PWA           → next-pwa
```

### Why this combination

- **Clerk free tier** covers 10,000 monthly active users — more than enough for MVP
- **Supabase free tier** gives you Postgres + Realtime + Auth fallback + Storage
- **Vercel hobby** is free for personal projects with generous limits
- **Haiku API** costs fractions of a cent per user action

---

## 4. Free Tier Limits & Costs

| Service | Free Limit | When to upgrade |
|---|---|---|
| Vercel | 100GB bandwidth/mo, 100hr build | When you go commercial |
| Supabase | 500MB DB, 50k rows, 2GB bandwidth | ~500+ active users |
| Clerk | 10,000 MAU | When you hit 10k users |
| Anthropic Haiku | Pay-as-you-go (~$0/mo for <1k parses) | Never cheap to begin with |
| Gemini Flash | 1M tokens/day free | Production traffic |

**Estimated cost for first 6 months at 100 active users: ~$0–5/month**

---

## 5. Project Structure

```
expenzo/
├── app/
│   ├── (auth)/
│   │   └── login/
│   │       └── page.tsx
│   ├── (dashboard)/
│   │   ├── layout.tsx              # Bottom nav + QuickAddBar
│   │   ├── page.tsx                # Dashboard
│   │   ├── expenses/
│   │   │   └── [id]/page.tsx       # Expense detail
│   │   ├── groups/
│   │   │   ├── page.tsx            # Groups list
│   │   │   └── [id]/page.tsx       # Group dashboard
│   │   └── settings/page.tsx
│   ├── api/
│   │   ├── parse-expense/
│   │   │   └── route.ts            # AI parsing endpoint
│   │   ├── expenses/
│   │   │   └── route.ts
│   │   └── groups/
│   │       └── route.ts
│   ├── globals.css
│   └── layout.tsx
│
├── components/
│   ├── ui/                         # shadcn/ui components
│   ├── layout/
│   │   ├── BottomNav.tsx
│   │   └── QuickAddBar.tsx         # Persistent bottom input
│   ├── expenses/
│   │   ├── AIPreviewModal.tsx      # Editable parsed result
│   │   ├── ExpenseFeed.tsx
│   │   ├── ExpenseCard.tsx
│   │   └── SplitBreakdown.tsx
│   ├── dashboard/
│   │   ├── SummaryCards.tsx
│   │   ├── CategoryPieChart.tsx
│   │   ├── MonthlyBarChart.tsx
│   │   └── PaymentMethodChart.tsx
│   └── groups/
│       ├── GroupCard.tsx
│       └── BalanceTable.tsx
│
├── lib/
│   ├── ai/
│   │   └── parser.ts               # Anthropic/Gemini parsing logic
│   ├── db/
│   │   ├── schema.ts               # Drizzle schema
│   │   └── index.ts                # DB client
│   ├── stores/
│   │   ├── useExpenseStore.ts      # Zustand expense state
│   │   └── useUIStore.ts           # Modal/drawer state
│   └── utils/
│       ├── currency.ts             # ₹ formatting
│       └── date.ts
│
├── hooks/
│   ├── useParseExpense.ts          # AI parse + modal trigger
│   └── useExpenses.ts
│
├── types/
│   └── expense.ts
│
├── public/
│   ├── manifest.json               # PWA manifest
│   └── icons/
│
├── drizzle.config.ts
├── next.config.js
├── tailwind.config.ts
└── middleware.ts                   # Clerk auth middleware
```

---

## 6. Environment Setup

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm
- Supabase account (free)
- Clerk account (free)
- Anthropic account (pay-as-you-go) OR Google AI Studio (free)

### Installation

```bash
# 1. Create Next.js app
pnpm create next-app@latest expenzo --typescript --tailwind --app

cd expenzo

# 2. Install core dependencies
pnpm add zustand framer-motion recharts
pnpm add @clerk/nextjs
pnpm add drizzle-orm postgres
pnpm add react-hook-form @hookform/resolvers zod
pnpm add @anthropic-ai/sdk          # or use fetch directly
pnpm add next-pwa

# 3. Dev dependencies
pnpm add -D drizzle-kit @types/pg

# 4. shadcn/ui setup
pnpm dlx shadcn@latest init
pnpm dlx shadcn@latest add button card dialog input sheet badge
```

### Environment Variables

Create `.env.local`:

```bash
# Clerk Auth
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/login
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/

# Supabase
DATABASE_URL=postgresql://postgres:[password]@db.[project].supabase.co:5432/postgres

# AI — pick one
ANTHROPIC_API_KEY=sk-ant-...
# OR
GEMINI_API_KEY=AIza...

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

## 7. Database Schema

```typescript
// lib/db/schema.ts
import { pgTable, text, numeric, timestamp, uuid, pgEnum } from 'drizzle-orm/pg-core';

export const categoryEnum = pgEnum('category', [
  'Food', 'Travel', 'Auto', 'Shopping',
  'Entertainment', 'Utilities', 'Health', 'Other'
]);

export const paymentMethodEnum = pgEnum('payment_method', [
  'Cash', 'UPI', 'GPay', 'PhonePe', 'Card', 'Other'
]);

export const users = pgTable('users', {
  id: text('id').primaryKey(),           // Clerk user ID
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
  groupId: uuid('group_id').references(() => groups.id),   // null = personal
  amount: numeric('amount', { precision: 10, scale: 2 }).notNull(),
  description: text('description').notNull(),
  category: categoryEnum('category').notNull(),
  date: timestamp('date').notNull(),
  paymentMethod: paymentMethodEnum('payment_method').notNull(),
  rawInput: text('raw_input'),           // original user text
  aiParsed: text('ai_parsed'),           // JSON of AI response
  createdAt: timestamp('created_at').defaultNow(),
});

export const splits = pgTable('splits', {
  id: uuid('id').defaultRandom().primaryKey(),
  expenseId: uuid('expense_id').references(() => expenses.id),
  userId: text('user_id').references(() => users.id),
  amount: numeric('amount', { precision: 10, scale: 2 }).notNull(),
  settled: text('settled').default('false'),
});
```

### Run migrations

```bash
pnpm drizzle-kit generate
pnpm drizzle-kit migrate
```

---

## 8. AI Parsing — Core Feature

### API Route

```typescript
// app/api/parse-expense/route.ts
import Anthropic from '@anthropic-ai/sdk';
import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export async function POST(req: NextRequest) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { text } = await req.json();
  if (!text?.trim()) return NextResponse.json({ error: 'No text provided' }, { status: 400 });

  try {
    const message = await client.messages.create({
      model: 'claude-haiku-4-5',       // cheapest Anthropic model
      max_tokens: 300,
      system: SYSTEM_PROMPT,
      messages: [{ role: 'user', content: text }],
    });

    const content = message.content[0];
    if (content.type !== 'text') throw new Error('Unexpected response type');

    const parsed = JSON.parse(content.text);
    return NextResponse.json({ success: true, data: parsed });

  } catch (err) {
    console.error('Parse error:', err);
    return NextResponse.json({ error: 'Failed to parse expense' }, { status: 500 });
  }
}
```

### Custom Hook

```typescript
// hooks/useParseExpense.ts
import { useState } from 'react';

export interface ParsedExpense {
  amount: number;
  description: string;
  category: string;
  date: string;
  paymentMethod: string;
  splitWith: string[];
  splitType: 'none' | 'equal' | 'custom';
  confidence: number;
}

export function useParseExpense() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ParsedExpense | null>(null);
  const [error, setError] = useState<string | null>(null);

  const parse = async (text: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/parse-expense', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.error);
      setResult(data.data);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return { parse, loading, result, error, reset: () => setResult(null) };
}
```

### QuickAddBar Component

```tsx
// components/layout/QuickAddBar.tsx
'use client';
import { useState } from 'react';
import { useParseExpense } from '@/hooks/useParseExpense';
import AIPreviewModal from '@/components/expenses/AIPreviewModal';

export default function QuickAddBar() {
  const [input, setInput] = useState('');
  const [showModal, setShowModal] = useState(false);
  const { parse, loading, result, reset } = useParseExpense();

  const handleSubmit = async () => {
    if (!input.trim()) return;
    await parse(input);
    setShowModal(true);
  };

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t px-4 py-3 pb-safe z-50">
        <div className="flex gap-2 max-w-2xl mx-auto">
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSubmit()}
            placeholder='Try: "Paid 120 for auto with Ramesh"'
            className="flex-1 rounded-2xl border bg-gray-50 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSubmit}
            disabled={loading || !input.trim()}
            className="bg-blue-600 text-white px-4 py-2.5 rounded-2xl text-sm font-medium disabled:opacity-50"
          >
            {loading ? '...' : 'Add'}
          </button>
        </div>
      </div>

      {showModal && result && (
        <AIPreviewModal
          parsed={result}
          rawInput={input}
          onClose={() => { setShowModal(false); reset(); setInput(''); }}
          onSave={() => { setShowModal(false); reset(); setInput(''); }}
        />
      )}
    </>
  );
}
```

---

## 9. Key Pages & Components

### Dashboard layout (bottom nav always visible)

```tsx
// app/(dashboard)/layout.tsx
import QuickAddBar from '@/components/layout/QuickAddBar';
import BottomNav from '@/components/layout/BottomNav';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50 pb-32">
      {children}
      <QuickAddBar />
      <BottomNav />
    </div>
  );
}
```

### Zustand expense store

```typescript
// lib/stores/useExpenseStore.ts
import { create } from 'zustand';

interface Expense {
  id: string;
  amount: number;
  description: string;
  category: string;
  date: string;
  paymentMethod: string;
}

interface ExpenseStore {
  expenses: Expense[];
  addExpense: (expense: Expense) => void;
  removeExpense: (id: string) => void;
}

export const useExpenseStore = create<ExpenseStore>((set) => ({
  expenses: [],
  addExpense: (expense) =>
    set((state) => ({ expenses: [expense, ...state.expenses] })),
  removeExpense: (id) =>
    set((state) => ({ expenses: state.expenses.filter(e => e.id !== id) })),
}));
```

### Currency utility (Indian Rupee)

```typescript
// lib/utils/currency.ts
export const formatINR = (amount: number): string =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);

// Usage: formatINR(1234) → "₹1,234"
```

---

## 10. PWA Setup

```javascript
// next.config.js
const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
});

module.exports = withPWA({
  experimental: { serverActions: true },
});
```

```json
// public/manifest.json
{
  "name": "Expenzo",
  "short_name": "Expenzo",
  "description": "AI expense tracker",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#2563eb",
  "orientation": "portrait",
  "icons": [
    { "src": "/icons/icon-192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "/icons/icon-512.png", "sizes": "512x512", "type": "image/png" }
  ]
}
```

Add to `app/layout.tsx`:

```tsx
export const metadata = {
  manifest: '/manifest.json',
  themeColor: '#2563eb',
  appleWebApp: { capable: true, statusBarStyle: 'default', title: 'Expenzo' },
};
```

---

## 11. Deployment

### Vercel (free hobby plan)

```bash
# Install Vercel CLI
pnpm add -g vercel

# Deploy
vercel

# Set environment variables in Vercel dashboard or:
vercel env add ANTHROPIC_API_KEY
vercel env add DATABASE_URL
vercel env add NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
vercel env add CLERK_SECRET_KEY
```

### Supabase setup

1. Go to [supabase.com](https://supabase.com) → New project
2. Copy connection string from Settings → Database
3. Paste as `DATABASE_URL` in your env
4. Run `pnpm drizzle-kit migrate` to push schema

### Clerk setup

1. Go to [clerk.com](https://clerk.com) → Create application
2. Enable Google OAuth + Email providers
3. Copy publishable and secret keys to env

---

## 12. Development Roadmap

### Phase 1 — Core (2–3 weeks)
- [ ] Auth (Clerk — Google + Email)
- [ ] QuickAddBar + AI parsing endpoint
- [ ] AIPreviewModal with editable fields
- [ ] Save expense to Supabase
- [ ] Expense feed on dashboard
- [ ] Basic summary cards (this month total)

### Phase 2 — Groups (1–2 weeks)
- [ ] Create group + invite members
- [ ] Add expense to group
- [ ] Balance table (who owes whom)
- [ ] Settle action

### Phase 3 — Analytics (1 week)
- [ ] Category pie chart (Recharts)
- [ ] Monthly bar chart
- [ ] Payment method distribution
- [ ] Filters (date range, category)

### Phase 4 — Polish (1 week)
- [ ] PWA manifest + offline support
- [ ] Framer Motion transitions
- [ ] Empty states with guidance text
- [ ] "Syncing..." indicator
- [ ] Category icons (food, travel, auto, etc.)

---

## 13. Cost Optimization Tips

### Reduce AI API calls

```typescript
// Cache identical inputs for 1 hour (simple in-memory)
const parseCache = new Map<string, { result: any; ts: number }>();

function getCached(text: string) {
  const normalized = text.toLowerCase().trim();
  const cached = parseCache.get(normalized);
  if (cached && Date.now() - cached.ts < 3_600_000) return cached.result;
  return null;
}
```

### Reduce token usage

- Keep system prompt under 300 tokens (the one above is ~250)
- Set `max_tokens: 200` — parsed JSON is always small
- Only call AI on explicit submit, never on keystroke

### Switch model based on environment

```typescript
const model = process.env.NODE_ENV === 'production'
  ? 'claude-haiku-4-5'           // cheap, fast for prod
  : 'claude-haiku-4-5';          // same in dev to keep costs zero

// OR use Gemini Flash in dev (free):
// const model = process.env.USE_GEMINI ? 'gemini-1.5-flash' : 'claude-haiku-4-5';
```

### Supabase optimization

- Use `select('id, amount, description, category, date')` — never `select('*')`
- Add indexes on `user_id` and `date` columns
- Enable RLS (Row Level Security) — isolates data per user, prevents over-fetching

```sql
-- Enable RLS on expenses table
ALTER TABLE expenses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users see own expenses"
  ON expenses FOR ALL
  USING (user_id = auth.uid()::text);
```

---

## Quick Reference

| Command | Description |
|---|---|
| `pnpm dev` | Start dev server |
| `pnpm build` | Production build |
| `pnpm drizzle-kit generate` | Generate migration files |
| `pnpm drizzle-kit migrate` | Run migrations |
| `pnpm drizzle-kit studio` | Visual DB browser |
| `vercel` | Deploy to Vercel |
| `vercel env pull` | Sync env vars locally |

---

*Last updated: April 2026 | Stack: Next.js 14 · Haiku AI · Supabase · Clerk · Vercel*
