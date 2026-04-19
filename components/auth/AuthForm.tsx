"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type AuthStep = "email" | "otp";

interface AuthFormProps {
  mode: "login" | "signup";
  onToggleMode: () => void;
}

export default function AuthForm({ mode, onToggleMode }: AuthFormProps) {
  const router = useRouter();
  const [step, setStep] = useState<AuthStep>("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setMessage("");

    const supabase = createClient();

    const { error: authError } = await supabase.auth.signInWithOtp({
      email,
      options: {
        // For signup, this will create the user if they don't exist
        shouldCreateUser: mode === "signup",
      },
    });

    if (authError) {
      setError(authError.message);
    } else {
      setMessage(`Verification code sent to ${email}`);
      setStep("otp");
    }
    setIsLoading(false);
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const supabase = createClient();

    const { error: verifyError } = await supabase.auth.verifyOtp({
      email,
      token: otp,
      type: "email",
    });

    if (verifyError) {
      setError(verifyError.message);
      setIsLoading(false);
    } else {
      router.push("/");
      router.refresh();
    }
  };

  return (
    <>
      {step === "email" ? (
        <form onSubmit={handleSendOTP} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium leading-none">
              Email address
            </label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-12 rounded-xl bg-muted/30 border-border/60 px-4 text-sm placeholder:text-muted-foreground/50 focus-visible:ring-expenzo"
              required
              disabled={isLoading}
            />
          </div>

          {error && (
            <p className="text-sm text-destructive bg-destructive/10 rounded-lg px-3 py-2">
              {error}
            </p>
          )}

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full h-12 bg-expenzo hover:bg-expenzo-dark text-white rounded-xl text-sm font-semibold shadow-md shadow-expenzo/15 transition-all hover:shadow-lg hover:shadow-expenzo/20 disabled:opacity-60"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Sending code...
              </span>
            ) : (
              "Send verification code"
            )}
          </Button>
        </form>
      ) : (
        <form onSubmit={handleVerifyOTP} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="otp" className="text-sm font-medium leading-none">
              Verification code
            </label>
            <p className="text-xs text-muted-foreground">
              Enter the 6-digit code sent to{" "}
              <span className="font-medium text-foreground">{email}</span>
            </p>
            <Input
              id="otp"
              type="text"
              placeholder="123456"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
              className="h-12 rounded-xl bg-muted/30 border-border/60 px-4 text-center text-lg font-mono tracking-[0.5em] placeholder:tracking-[0.5em] placeholder:text-muted-foreground/50 focus-visible:ring-expenzo"
              required
              maxLength={6}
              disabled={isLoading}
              autoFocus
            />
          </div>

          {message && (
            <p className="text-sm text-expenzo-accent bg-expenzo-accent/10 rounded-lg px-3 py-2">
              {message}
            </p>
          )}

          {error && (
            <p className="text-sm text-destructive bg-destructive/10 rounded-lg px-3 py-2">
              {error}
            </p>
          )}

          <Button
            type="submit"
            disabled={isLoading || otp.length !== 6}
            className="w-full h-12 bg-expenzo hover:bg-expenzo-dark text-white rounded-xl text-sm font-semibold shadow-md shadow-expenzo/15 transition-all hover:shadow-lg hover:shadow-expenzo/20 disabled:opacity-60"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Verifying...
              </span>
            ) : (
              "Verify & continue"
            )}
          </Button>

          <button
            type="button"
            onClick={() => {
              setStep("email");
              setOtp("");
              setError("");
              setMessage("");
            }}
            className="w-full text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            ← Use a different email
          </button>
        </form>
      )}

      <p className="text-center text-sm text-muted-foreground">
        {mode === "login" ? (
          <>
            Don&apos;t have an account?{" "}
            <button
              type="button"
              onClick={onToggleMode}
              className="text-expenzo hover:text-expenzo-dark font-medium transition-colors"
            >
              Sign up
            </button>
          </>
        ) : (
          <>
            Already have an account?{" "}
            <button
              type="button"
              onClick={onToggleMode}
              className="text-expenzo hover:text-expenzo-dark font-medium transition-colors"
            >
              Sign in
            </button>
          </>
        )}
      </p>
    </>
  );
}
