'use client';

// AI-parsed expense preview modal with editable fields
export default function AIPreviewModal({
  parsed,
  rawInput,
  onClose,
  onSave,
}: {
  parsed: Record<string, unknown>;
  rawInput: string;
  onClose: () => void;
  onSave: () => void;
}) {
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center">
      <div className="bg-white rounded-t-2xl w-full max-w-lg p-6">
        <h2 className="text-lg font-semibold mb-4">Review Expense</h2>
        <p className="text-sm text-gray-500 mb-4">Original: &ldquo;{rawInput}&rdquo;</p>
        {/* TODO: Editable fields from parsed data */}
        <pre className="text-xs bg-gray-50 p-3 rounded-lg mb-4 overflow-auto">
          {JSON.stringify(parsed, null, 2)}
        </pre>
        <div className="flex gap-3">
          <button onClick={onClose} className="flex-1 py-2 border rounded-xl">
            Cancel
          </button>
          <button onClick={onSave} className="flex-1 py-2 bg-blue-600 text-white rounded-xl">
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
