// Groups CRUD API
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  // TODO: Fetch groups from Supabase via Drizzle
  return NextResponse.json({ groups: [] });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  // TODO: Create group in Supabase via Drizzle
  return NextResponse.json({ success: true, data: body });
}
