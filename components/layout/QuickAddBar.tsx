'use client';

// Persistent bottom input bar for natural language expense entry
import { useState } from 'react';

export default function QuickAddBar() {
  const [input, setInput] = useState('');

  const handleSubmit = async () => {
    if (!input.trim()) return;
    // TODO: Integrate useParseExpense hook + AIPreviewModal
    console.log('Parse:', input);
    setInput('');
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t px-4 py-3 z-50">
      <div className="flex gap-2 max-w-2xl mx-auto">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
          placeholder='Try: "Paid 120 for auto with Ramesh"'
          className="flex-1 rounded-2xl border bg-gray-50 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleSubmit}
          disabled={!input.trim()}
          className="bg-blue-600 text-white px-4 py-2.5 rounded-2xl text-sm font-medium disabled:opacity-50"
        >
          Add
        </button>
      </div>
    </div>
  );
}
