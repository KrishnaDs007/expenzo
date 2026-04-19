import { createClient } from "@/lib/supabase/server";
import { signOut } from "@/app/(auth)/actions";

export default async function SettingsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight">Settings</h1>

      <div className="rounded-2xl border border-border/60 bg-card overflow-hidden">
        <div className="p-5 border-b border-border/60">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-expenzo/10 text-expenzo font-bold text-xl">
              {(user?.user_metadata?.full_name?.[0] || user?.email?.[0] || 'U').toUpperCase()}
            </div>
            <div>
              <p className="font-bold text-lg">{user?.user_metadata?.full_name || 'Expenzo User'}</p>
              <p className="text-sm text-muted-foreground">{user?.email}</p>
            </div>
          </div>
        </div>
        
        <div className="p-2">
          {[
            { label: "Account Details", icon: "👤" },
            { label: "Preferences", icon: "⚙️" },
            { label: "Notifications", icon: "🔔" },
            { label: "Data Export", icon: "📄" },
          ].map((item) => (
            <button key={item.label} className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-muted/50 transition-colors">
              <div className="flex items-center gap-3">
                <span className="text-lg">{item.icon}</span>
                <span className="font-medium text-sm">{item.label}</span>
              </div>
              <span className="text-muted-foreground">→</span>
            </button>
          ))}
        </div>
      </div>

      <form action={signOut}>
        <button 
          type="submit"
          className="w-full p-4 rounded-2xl bg-destructive/10 text-destructive font-bold text-sm hover:bg-destructive/20 transition-colors"
        >
          Sign out of Expenzo
        </button>
      </form>
    </div>
  );
}
