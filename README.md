# Expenzo

> AI-first expense tracker | Next.js 14 + PWA + Free-tier stack

Expenzo lets users add expenses in plain natural language — no forms, no friction. The AI parses your input into a structured expense.

```
"Paid 850 for pizza with Amit and Rohan on gpay yesterday"
```

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 14 (App Router) |
| Styling | Tailwind CSS + shadcn/ui |
| State | Zustand |
| Animations | Framer Motion |
| Charts | Recharts |
| Forms | React Hook Form + Zod |
| AI | Anthropic Haiku / Gemini Flash |
| Auth | Clerk |
| Database | Supabase (Postgres) |
| ORM | Drizzle ORM |
| Hosting | Vercel |
| PWA | next-pwa |

## Getting Started

### Prerequisites

- Node.js 18+
- npm or pnpm

### Setup

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local
# Fill in your keys in .env.local

# Run dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

### Environment Variables

See `.env.example` for required variables:
- **Clerk** — Auth (free tier: 10,000 MAU)
- **Supabase** — Database (free tier: 500MB)
- **Anthropic / Gemini** — AI parsing
- **App URL** — For local dev

## Project Structure

```
expenzo/
├── app/
│   ├── (auth)/login/          # Auth pages
│   ├── (dashboard)/           # Main app pages
│   │   ├── expenses/[id]/     # Expense detail
│   │   ├── groups/            # Groups list + detail
│   │   └── settings/          # User settings
│   └── api/                   # API routes
│       ├── parse-expense/     # AI parsing endpoint
│       ├── expenses/          # CRUD
│       └── groups/            # CRUD
├── components/
│   ├── ui/                    # shadcn/ui
│   ├── layout/                # BottomNav, QuickAddBar
│   ├── expenses/              # ExpenseCard, Feed, etc.
│   ├── dashboard/             # Charts, Summary cards
│   └── groups/                # GroupCard, BalanceTable
├── lib/
│   ├── ai/                    # AI parser
│   ├── db/                    # Drizzle schema + client
│   ├── stores/                # Zustand stores
│   └── utils/                 # Currency, date helpers
├── hooks/                     # Custom React hooks
├── types/                     # TypeScript types
└── public/                    # PWA manifest + icons
```

## Development Roadmap

- **Phase 1** — Core: Auth, QuickAdd, AI parsing, expense feed
- **Phase 2** — Groups: Create groups, split expenses, balances
- **Phase 3** — Analytics: Charts, filters, trends
- **Phase 4** — Polish: PWA, animations, offline support

## License

[Apache-2.0](LICENSE)
