import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function CTASection() {
  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden">
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-expenzo via-expenzo-dark to-expenzo" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-expenzo-accent/20 via-transparent to-transparent" />

          <div className="relative px-8 py-16 sm:px-16 sm:py-20 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-4">
              Ready to take control?
            </h2>
            <p className="text-white/80 text-lg max-w-xl mx-auto mb-8">
              Join thousands of users who manage their finances smarter with Expenzo.
              No credit card required. Cancel anytime.
            </p>
            <Link href="/login">
              <Button
                size="lg"
                className="bg-white text-expenzo-dark hover:bg-white/90 h-12 px-8 rounded-xl text-base font-semibold shadow-xl transition-all hover:-translate-y-0.5"
              >
                Get Started Free
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
