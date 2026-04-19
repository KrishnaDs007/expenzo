import { createClient } from "@/lib/supabase/server";

export default async function GroupsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // Mock
  const groups = [
    { id: 1, name: "Goa Trip", members: 4, youOwe: "₹0", youAreOwed: "₹2,450" },
    { id: 2, name: "Apartment Rent", members: 3, youOwe: "₹12,000", youAreOwed: "₹0" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Groups</h1>
        <button className="text-sm font-medium text-expenzo hover:text-expenzo-dark transition-colors">
          + Create Group
        </button>
      </div>

      <div className="grid gap-4">
        {groups.map((group) => (
          <div key={group.id} className="p-5 rounded-2xl border border-border/60 bg-card hover:border-expenzo/30 transition-all cursor-pointer">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-semibold text-lg">{group.name}</h3>
                <p className="text-xs text-muted-foreground mt-0.5">{group.members} members</p>
              </div>
              <div className="flex -space-x-2">
                {[...Array(Math.min(group.members, 3))].map((_, i) => (
                  <div key={i} className="w-8 h-8 rounded-full bg-muted border-2 border-card flex items-center justify-center text-xs font-bold text-muted-foreground">
                    👤
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex gap-4 p-3 bg-muted/40 rounded-xl">
              <div className="flex-1">
                <p className="text-[10px] uppercase font-bold text-muted-foreground mb-0.5">You Owe</p>
                <p className="font-semibold text-destructive">{group.youOwe}</p>
              </div>
              <div className="w-px bg-border/60" />
              <div className="flex-1">
                <p className="text-[10px] uppercase font-bold text-muted-foreground mb-0.5">You are owed</p>
                <p className="font-semibold text-expenzo-accent">{group.youAreOwed}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
