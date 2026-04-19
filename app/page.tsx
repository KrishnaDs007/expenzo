import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Navbar from "@/components/landing/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import HowItWorksSection from "@/components/landing/HowItWorksSection";
import SecuritySection from "@/components/landing/SecuritySection";
import CTASection from "@/components/landing/CTASection";
import Footer from "@/components/landing/Footer";

export default async function RootPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Authenticated users go straight to dashboard
  if (user) {
    redirect("/dashboard");
  }

  // Non-authenticated users see the landing page
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <FeaturesSection />
        <HowItWorksSection />
        <SecuritySection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
