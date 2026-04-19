"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { LayoutDashboard, ReceiptText, Users, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Expenses", href: "/expenses", icon: ReceiptText },
  { name: "Groups", href: "/groups", icon: Users },
  { name: "Settings", href: "/settings", icon: Settings },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 w-full border-t border-border/40 bg-background/90 backdrop-blur-xl z-50">
      <div className="flex items-center justify-center gap-2 sm:gap-6 max-w-md mx-auto h-16 pb-safe px-4">
        {navItems.slice(0, 2).map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center w-16 h-full gap-1 transition-colors duration-200",
                isActive ? "text-expenzo" : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Icon className={cn("w-6 h-6", isActive && "fill-expenzo/10")} />
              <span className="text-[10px] font-medium leading-none">{item.name}</span>
            </Link>
          );
        })}

        {/* Center Add Button */}
        <div className="relative flex justify-center w-20">
          <button 
            onClick={() => document.dispatchEvent(new CustomEvent('open-quick-add'))}
            className="absolute -top-10 flex items-center justify-center w-16 h-16 bg-expenzo hover:bg-expenzo-dark text-white rounded-full shadow-[0_8px_30px_rgba(10,125,164,0.4)] ring-4 ring-background transition-transform hover:scale-105 active:scale-95 z-50"
          >
            <span className="text-3xl font-light leading-none">+</span>
          </button>
        </div>

        {navItems.slice(2, 4).map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center w-16 h-full gap-1 transition-colors duration-200",
                isActive ? "text-expenzo" : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Icon className={cn("w-6 h-6", isActive && "fill-expenzo/10")} />
              <span className="text-[10px] font-medium leading-none">{item.name}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
