import { createClient } from "@/lib/supabase/server";

export default async function ExpensesPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // For now, mock data
  const expenses = [
    { id: 1, desc: "Lunch with Amit", amount: "₹450", date: "Today", category: "Food" },
    { id: 2, desc: "Uber to Airport", amount: "₹850", date: "Yesterday", category: "Travel" },
    { id: 3, desc: "Netflix Subscription", amount: "₹649", date: "Apr 15", category: "Entertainment" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Expenses</h1>
        <span className="text-sm text-muted-foreground">Showing recent</span>
      </div>

      <div className="space-y-4">
        {expenses.map((exp) => (
          <div key={exp.id} className="flex items-center justify-between p-4 rounded-2xl border border-border/60 bg-card hover:border-expenzo/30 transition-colors">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-expenzo/10 text-expenzo text-xl">
                {exp.category === "Food" && "🍔"}
                {exp.category === "Travel" && "🚕"}
                {exp.category === "Entertainment" && "🎟️"}
              </div>
              <div>
                <p className="font-semibold text-[15px]">{exp.desc}</p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground mt-0.5">
                  <span className="bg-muted px-2 py-0.5 rounded-md">{exp.category}</span>
                  <span>{exp.date}</span>
                </div>
              </div>
            </div>
            <p className="font-bold whitespace-nowrap">{exp.amount}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
