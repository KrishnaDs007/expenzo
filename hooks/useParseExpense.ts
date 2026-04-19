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
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  return { parse, loading, result, error, reset: () => setResult(null) };
}
