import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-expenzo/5 via-background to-expenzo-accent/5" />
        <div className="absolute top-20 left-1/2 -translate-x-1/2 h-[600px] w-[600px] rounded-full bg-expenzo/10 blur-3xl" />
        <div className="absolute top-40 right-10 h-[400px] w-[400px] rounded-full bg-expenzo-accent/8 blur-3xl" />
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pt-20 pb-24 sm:pt-28 sm:pb-32">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-expenzo/20 bg-expenzo/5 px-4 py-1.5 text-sm text-expenzo-dark mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-expenzo-accent opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-expenzo-accent"></span>
            </span>
            AI-Powered • No forms needed
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] mb-6">
            Expense Tracking,{" "}
            <span className="bg-gradient-to-r from-expenzo via-expenzo-light to-expenzo-accent bg-clip-text text-transparent">
              Reimagined by AI
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            Just type what you spent in plain language. Our AI parses, categorizes, and tracks it
            instantly. Split group expenses, see spending trends — zero friction.
          </p>

          {/* Demo input */}
          <div className="relative max-w-lg mx-auto mb-10">
            <div className="flex items-center gap-2 rounded-2xl border-2 border-expenzo/20 bg-card/80 backdrop-blur-sm px-4 py-3 shadow-lg shadow-expenzo/5">
              <div className="flex-1 text-left">
                <p className="text-sm text-muted-foreground/80 mb-0.5">Try typing...</p>
                <p className="text-[15px] font-medium">
                  &ldquo;Paid 850 for pizza with Amit on gpay yesterday&rdquo;
                </p>
              </div>
              <Button size="sm" className="bg-expenzo hover:bg-expenzo-dark text-white rounded-xl px-5 shrink-0">
                Add
              </Button>
            </div>

            {/* Parsed result preview */}
            <div className="mt-3 mx-4 rounded-xl border border-border bg-card p-4 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <div className="h-1.5 w-1.5 rounded-full bg-expenzo-accent animate-pulse"></div>
                <span className="text-xs font-medium text-expenzo-accent">AI Parsed</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
                <div>
                  <p className="text-muted-foreground text-xs">Amount</p>
                  <p className="font-semibold">₹850</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-xs">Category</p>
                  <p className="font-semibold">🍕 Food</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-xs">Payment</p>
                  <p className="font-semibold">GPay</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-xs">Split</p>
                  <p className="font-semibold">with Amit</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/login">
              <Button
                size="lg"
                className="bg-expenzo hover:bg-expenzo-dark text-white h-12 px-8 rounded-xl text-base shadow-lg shadow-expenzo/20 transition-all hover:shadow-xl hover:shadow-expenzo/30 hover:-translate-y-0.5"
              >
                Start Tracking Free
              </Button>
            </Link>
            <p className="text-xs text-muted-foreground">
              No credit card required • 10,000 free parses/month
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
