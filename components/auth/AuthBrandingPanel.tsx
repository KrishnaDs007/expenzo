import Link from "next/link";

export default function AuthBrandingPanel() {
  return (
    <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-expenzo via-expenzo-dark to-[#043c50]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-expenzo-accent/20 via-transparent to-transparent" />

      {/* Decorative circles */}
      <div className="absolute top-20 -left-20 h-80 w-80 rounded-full border border-white/5" />
      <div className="absolute top-40 -left-10 h-60 w-60 rounded-full border border-white/5" />
      <div className="absolute bottom-20 right-10 h-72 w-72 rounded-full border border-white/10" />
      <div className="absolute -bottom-10 right-40 h-40 w-40 rounded-full bg-expenzo-accent/10 blur-2xl" />

      <div className="relative z-10 flex flex-col justify-between p-12">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15 backdrop-blur-sm text-white font-bold text-lg border border-white/10">
            E
          </div>
          <span className="text-2xl font-bold text-white tracking-tight">Expenzo</span>
        </Link>

        <div className="space-y-8">
          <div>
            <h2 className="text-4xl font-bold text-white leading-tight mb-4">
              Track expenses
              <br />
              with your voice.
            </h2>
            <p className="text-white/70 text-lg leading-relaxed max-w-md">
              Just say or type what you spent. Our AI handles the rest — categories,
              splits, and trends, all automatic.
            </p>
          </div>

          {/* Feature pills */}
          <div className="flex flex-wrap gap-3">
            {["AI Parsing", "Group Splits", "Spending Charts", "Mobile PWA"].map(
              (tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center rounded-full bg-white/10 backdrop-blur-sm border border-white/10 px-4 py-1.5 text-sm text-white/90"
                >
                  {tag}
                </span>
              )
            )}
          </div>
        </div>

        <p className="text-white/40 text-sm">
          © {new Date().getFullYear()} Expenzo. All rights reserved.
        </p>
      </div>
    </div>
  );
}
