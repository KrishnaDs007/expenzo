'use client';

// Individual expense card component
export default function ExpenseCard({
  expense,
}: {
  expense: {
    id: string;
    amount: number;
    description: string;
    category: string;
    date: string;
    paymentMethod: string;
  };
}) {
  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border">
      <div className="flex justify-between items-start">
        <div>
          <p className="font-medium">{expense.description}</p>
          <p className="text-xs text-gray-500">
            {expense.category} · {expense.paymentMethod}
          </p>
        </div>
        <span className="font-semibold">₹{expense.amount}</span>
      </div>
    </div>
  );
}
