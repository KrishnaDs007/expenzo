import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-expenzo text-white font-bold text-lg">
            E
          </div>
          <span className="text-xl font-bold tracking-tight">Expenzo</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link
            href="#features"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Features
          </Link>
          <Link
            href="#how-it-works"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            How it Works
          </Link>
          <Link
            href="#security"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Security
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/login">
            <Button variant="ghost" size="sm" className="text-sm">
              Log in
            </Button>
          </Link>
          <Link href="/login">
            <Button
              size="sm"
              className="bg-expenzo hover:bg-expenzo-dark text-white text-sm"
            >
              Get Started
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
