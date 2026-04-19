const features = [
  {
    icon: "🧠",
    title: "Smart NLP Input",
    description:
      "Type or talk naturally. Our AI understands 'Spent ₹50 on auto yesterday' and categorizes it instantly — no manual forms.",
  },
  {
    icon: "👥",
    title: "Group Split Logic",
    description:
      "No more messy spreadsheets. Complex group debts are simplified automatically into the fewest possible transactions.",
  },
  {
    icon: "📊",
    title: "Spending Insights",
    description:
      "Beautiful charts show category breakdowns, monthly trends, and payment method analysis at a glance.",
  },
  {
    icon: "📱",
    title: "Mobile-First PWA",
    description:
      "Install as an app on your phone. Works offline, syncs when connected. Designed for on-the-go expense tracking.",
  },
  {
    icon: "⚡",
    title: "Instant Parsing",
    description:
      "AI processes your expense in under 200ms. Type, review, save — three taps and you're done.",
  },
  {
    icon: "🔒",
    title: "Bank-Grade Security",
    description:
      "End-to-end encryption, row-level security on Supabase, and Clerk authentication keep your data safe.",
  },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="py-24 sm:py-32 bg-muted/30">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-expenzo font-semibold text-sm uppercase tracking-wider mb-3">
            Core Features
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            Designed for the Modern Spender
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Everything you need to track, split, and understand your spending — powered by AI.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <div
              key={i}
              className="group relative rounded-2xl border border-border/60 bg-card p-6 transition-all duration-300 hover:border-expenzo/30 hover:shadow-lg hover:shadow-expenzo/5 hover:-translate-y-1"
            >
              <div className="text-3xl mb-4">{feature.icon}</div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
