"use client";

import { useState } from "react";
import AuthBrandingPanel from "@/components/auth/AuthBrandingPanel";
import GoogleOAuthButton from "@/components/auth/GoogleOAuthButton";
import AuthForm from "@/components/auth/AuthForm";

export default function SignupPage() {
  const [mode, setMode] = useState<"login" | "signup">("signup");

  return (
    <div className="flex min-h-screen">
      <AuthBrandingPanel />

      {/* Right panel — form */}
      <div className="flex flex-1 items-center justify-center px-4 py-12 sm:px-6 lg:px-8 bg-background">
        <div className="w-full max-w-md space-y-8">
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center justify-center gap-2 mb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-expenzo text-white font-bold text-lg">
              E
            </div>
            <span className="text-2xl font-bold tracking-tight">Expenzo</span>
          </div>

          <div className="text-center lg:text-left">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
              {mode === "signup" ? "Create your account" : "Welcome back"}
            </h1>
            <p className="mt-2 text-muted-foreground">
              {mode === "signup"
                ? "Start tracking expenses with AI in seconds"
                : "Sign in to continue tracking your expenses"}
            </p>
          </div>

          <GoogleOAuthButton />

          <AuthForm
            mode={mode}
            onToggleMode={() => setMode(mode === "signup" ? "login" : "signup")}
          />
        </div>
      </div>
    </div>
  );
}
