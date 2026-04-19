'use client';

// Summary cards: total this month, daily average, etc.
export default function SummaryCards() {
  return (
    <div className="grid grid-cols-2 gap-3">
      <div className="bg-white rounded-xl p-4 shadow-sm border">
        <p className="text-xs text-gray-500">This Month</p>
        <p className="text-xl font-bold">₹0</p>
      </div>
      <div className="bg-white rounded-xl p-4 shadow-sm border">
        <p className="text-xs text-gray-500">Today</p>
        <p className="text-xl font-bold">₹0</p>
      </div>
    </div>
  );
}
