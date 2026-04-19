const securityFeatures = [
  { icon: "🔐", title: "End-to-End Encryption", desc: "AES-256 encryption at rest and in transit" },
  { icon: "👤", title: "Secure Auth", desc: "Powered by Clerk with Google OAuth + Email" },
  { icon: "🗄️", title: "Row Level Security", desc: "Data isolation per user on Supabase Postgres" },
];

export default function SecuritySection() {
  return (
    <section id="security" className="py-24 sm:py-32 bg-muted/30">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-expenzo/10 mb-6">
            <span className="text-3xl">🛡️</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            Your data is safe with us
          </h2>
          <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
            We use industry-standard encryption, Clerk authentication, and Supabase Row Level Security
            to protect your financial information. Your privacy is our top priority.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
            {securityFeatures.map((item, i) => (
              <div key={i} className="rounded-xl border border-border/60 bg-card p-5">
                <div className="text-2xl mb-3">{item.icon}</div>
                <h3 className="font-semibold mb-1">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
