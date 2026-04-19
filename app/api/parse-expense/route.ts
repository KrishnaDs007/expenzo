// AI expense parsing endpoint
// Will integrate with Anthropic Haiku or Gemini Flash
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { text } = await req.json();

  if (!text?.trim()) {
    return NextResponse.json({ error: 'No text provided' }, { status: 400 });
  }

  // TODO: Add Clerk auth check
  // TODO: Integrate AI model (Anthropic Haiku / Gemini Flash)

  return NextResponse.json({
    success: true,
    data: {
      amount: 0,
      description: text,
      category: 'Other',
      date: new Date().toISOString().split('T')[0],
      paymentMethod: 'Cash',
      splitWith: [],
      splitType: 'none',
      confidence: 0,
    },
  });
}
