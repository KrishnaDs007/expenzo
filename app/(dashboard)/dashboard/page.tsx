import { createClient } from "@/lib/supabase/server";

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="space-y-8">
      {/* Welcome section */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
          Welcome back{user?.user_metadata?.full_name ? `, ${user.user_metadata.full_name}` : ""} 👋
        </h1>
        <p className="text-muted-foreground mt-1">
          Here&apos;s your spending overview
        </p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Today", amount: "₹0", icon: "📅", change: "" },
          { label: "This Week", amount: "₹0", icon: "📊", change: "" },
          { label: "This Month", amount: "₹0", icon: "📈", change: "" },
          { label: "Groups Owed", amount: "₹0", icon: "👥", change: "" },
        ].map((card) => (
          <div
            key={card.label}
            className="rounded-2xl border border-border/60 bg-card p-4 sm:p-5"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                {card.label}
              </span>
              <span className="text-lg">{card.icon}</span>
            </div>
            <p className="text-xl sm:text-2xl font-bold">{card.amount}</p>
          </div>
        ))}
      </div>

      {/* Quick add prompt */}
      <div className="rounded-2xl border-2 border-dashed border-expenzo/20 bg-expenzo/5 p-6 sm:p-8 text-center">
        <p className="text-lg font-semibold mb-2">Start tracking expenses</p>
        <p className="text-muted-foreground text-sm mb-4">
          Tap the big <strong>+ button</strong> in the menu to describe your expense!
        </p>
        <div className="inline-flex items-center gap-2 rounded-full bg-expenzo/10 px-4 py-1.5 text-sm text-expenzo font-medium">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-expenzo-accent opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-expenzo-accent"></span>
          </span>
          AI-powered parsing ready
        </div>
      </div>
    </div>
  );
}
