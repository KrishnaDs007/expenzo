// Expenses CRUD API
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  // TODO: Fetch expenses from Supabase via Drizzle
  return NextResponse.json({ expenses: [] });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  // TODO: Save expense to Supabase via Drizzle
  return NextResponse.json({ success: true, data: body });
}
