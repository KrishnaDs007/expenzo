import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { signOut } from "@/app/(auth)/actions";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Top header */}
      <header className="sticky top-0 z-40 border-b border-border/40 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-expenzo text-white font-bold text-sm">
              E
            </div>
            <span className="text-lg font-bold tracking-tight">Expenzo</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium leading-none">
                {user.user_metadata?.full_name || user.email?.split("@")[0]}
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                {user.email}
              </p>
            </div>

            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-expenzo/10 text-expenzo font-semibold text-sm">
              {(user.user_metadata?.full_name?.[0] || user.email?.[0] || "U").toUpperCase()}
            </div>

            <form action={signOut}>
              <button
                type="submit"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors px-3 py-1.5 rounded-lg hover:bg-muted"
              >
                Sign out
              </button>
            </form>
          </div>
        </div>
      </header>

      {/* Page content */}
      <main className="flex-1 mx-auto w-full max-w-6xl px-4 sm:px-6 py-6">
        {children}
      </main>

      {/* Bottom nav placeholder */}
      <nav className="sticky bottom-0 border-t border-border/40 bg-background/90 backdrop-blur-xl sm:hidden">
        <div className="flex items-center justify-around h-14 text-xs text-muted-foreground">
          <a href="/dashboard" className="flex flex-col items-center gap-1 text-expenzo">
            <span className="text-lg">📊</span>
            <span>Dashboard</span>
          </a>
          <a href="/expenses" className="flex flex-col items-center gap-1">
            <span className="text-lg">💸</span>
            <span>Expenses</span>
          </a>
          <a href="/groups" className="flex flex-col items-center gap-1">
            <span className="text-lg">👥</span>
            <span>Groups</span>
          </a>
          <a href="/settings" className="flex flex-col items-center gap-1">
            <span className="text-lg">⚙️</span>
            <span>Settings</span>
          </a>
        </div>
      </nav>
    </div>
  );
}
