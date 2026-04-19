const steps = [
  {
    step: "01",
    title: "Type Naturally",
    description: "Enter your expense in plain language. No dropdowns, no categories to pick.",
    example: '"Paid 120 for auto with Ramesh"',
  },
  {
    step: "02",
    title: "AI Parses Instantly",
    description: "Our AI extracts amount, category, payment method, date, and split info in milliseconds.",
    example: "₹120 • Auto • Cash • Split with Ramesh",
  },
  {
    step: "03",
    title: "Review & Save",
    description: "Quick preview lets you edit anything. One tap to save. Done.",
    example: "Saved to your expense feed ✓",
  },
];

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-expenzo-accent font-semibold text-sm uppercase tracking-wider mb-3">
            How it Works
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            Three Steps. Zero Friction.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <div key={i} className="relative">
              <div className="text-6xl font-black text-expenzo/10 mb-4">
                {step.step}
              </div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                {step.description}
              </p>
              <div className="rounded-xl bg-muted/60 border border-border/50 px-4 py-3">
                <p className="text-sm font-mono text-foreground/80">{step.example}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
