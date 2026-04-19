import { NextResponse } from 'next/server';
import { parseExpenseWithGemini } from '@/lib/ai/parser';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { input } = body;

    if (!input || typeof input !== 'string') {
      return NextResponse.json(
        { error: 'Valid input string is required' },
        { status: 400 }
      );
    }

    const parsedData = await parseExpenseWithGemini(input);

    return NextResponse.json({ success: true, data: parsedData });
  } catch (error) {
    console.error('Parse Expense API Error:', error);
    return NextResponse.json(
      { error: 'Failed to process expense' },
      { status: 500 }
    );
  }
}
