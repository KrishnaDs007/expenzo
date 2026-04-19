"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface AuthFormProps {
  mode: "login" | "signup";
  onToggleMode: () => void;
}

export default function AuthForm({ mode, onToggleMode }: AuthFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // TODO: Integrate Clerk auth
    setTimeout(() => setIsLoading(false), 1500);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4">
        {mode === "signup" && (
          <div className="space-y-2">
            <label
              htmlFor="name"
              className="text-sm font-medium leading-none"
            >
              Full Name
            </label>
            <Input
              id="name"
              type="text"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="h-12 rounded-xl bg-muted/30 border-border/60 px-4 text-sm placeholder:text-muted-foreground/50 focus-visible:ring-expenzo"
              required
            />
          </div>
        )}

        <div className="space-y-2">
          <label
            htmlFor="email"
            className="text-sm font-medium leading-none"
          >
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
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label
              htmlFor="password"
              className="text-sm font-medium leading-none"
            >
              Password
            </label>
            {mode === "login" && (
              <Link
                href="#"
                className="text-xs text-expenzo hover:text-expenzo-dark transition-colors"
              >
                Forgot password?
              </Link>
            )}
          </div>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="h-12 rounded-xl bg-muted/30 border-border/60 px-4 text-sm placeholder:text-muted-foreground/50 focus-visible:ring-expenzo"
            required
          />
        </div>

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full h-12 bg-expenzo hover:bg-expenzo-dark text-white rounded-xl text-sm font-semibold shadow-md shadow-expenzo/15 transition-all hover:shadow-lg hover:shadow-expenzo/20 disabled:opacity-60"
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              {mode === "login" ? "Signing in..." : "Creating account..."}
            </span>
          ) : mode === "login" ? (
            "Sign in"
          ) : (
            "Create account"
          )}
        </Button>
      </form>

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
