"use client";

import { AuthCard } from "@/components/auth/AuthCard";
import { AuthInput } from "@/components/auth/AuthInput";
import { PasswordInput } from "@/components/auth/PasswordInput";
import { SocialAuthButton } from "@/components/auth/SocialAuthButton";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useState } from "react";

type FormStatus = "idle" | "loading" | "success" | "error";

export function RegisterForm() {
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [status, setStatus] = useState<FormStatus>("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    const formData = new FormData(event.currentTarget);
    const password = String(formData.get("password") ?? "");
    const confirmPassword = String(formData.get("confirmPassword") ?? "");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setStatus("error");
      return;
    }

    if (!termsAccepted) {
      setError("Please accept the terms to continue.");
      setStatus("error");
      return;
    }

    setStatus("loading");
    // Demo only — no auth backend connected.
    await new Promise((resolve) => setTimeout(resolve, 1400));
    setStatus("success");
  }

  return (
    <AuthCard
      title="Create account"
      subtitle="Join MangaVerse and start building your personal reading library."
    >
      {status === "success" ? (
        <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-5 py-6 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/20">
            <CheckIcon />
          </div>
          <h2 className="mt-4 text-lg font-bold text-white">
            Account created (demo)
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            This is a UI preview only — no account was saved or verified.
          </p>
          <Link
            href="/login"
            className={cn(
              "mt-6 inline-flex h-11 items-center rounded-xl bg-gradient-to-r from-accent-purple to-accent-pink",
              "px-6 text-sm font-semibold text-white shadow-lg shadow-purple-500/25 transition-all hover:brightness-110",
            )}
          >
            Go to sign in
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          <AuthInput
            label="Full name"
            name="name"
            type="text"
            autoComplete="name"
            placeholder="Your name"
            required
            disabled={status === "loading"}
          />

          <AuthInput
            label="Email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            required
            disabled={status === "loading"}
          />

          <PasswordInput
            label="Password"
            name="password"
            autoComplete="new-password"
            placeholder="Create a password"
            hint="At least 8 characters recommended"
            required
            disabled={status === "loading"}
          />

          <PasswordInput
            label="Confirm password"
            name="confirmPassword"
            autoComplete="new-password"
            placeholder="Confirm your password"
            required
            disabled={status === "loading"}
          />

          <label className="flex cursor-pointer items-start gap-3">
            <input
              type="checkbox"
              checked={termsAccepted}
              onChange={(event) => setTermsAccepted(event.target.checked)}
              disabled={status === "loading"}
              className="mt-0.5 h-4 w-4 shrink-0 rounded border-white/20 bg-white/5 text-accent-purple focus:ring-accent-purple/30 focus:ring-offset-0"
            />
            <span className="text-sm leading-relaxed text-muted">
              I agree to the{" "}
              <span className="text-white/80">Terms of Service</span> and{" "}
              <span className="text-white/80">Privacy Policy</span>
            </span>
          </label>

          {error && (
            <p className="rounded-lg border border-accent-red/20 bg-accent-red/10 px-3 py-2 text-sm text-accent-red">
              {error}
            </p>
          )}

          <Button
            type="submit"
            size="lg"
            className="w-full"
            disabled={status === "loading"}
          >
            {status === "loading" ? "Creating account..." : "Create account"}
          </Button>

          <div className="relative py-2">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10" />
            </div>
            <div className="relative flex justify-center text-xs uppercase tracking-wider">
              <span className="bg-surface/80 px-3 text-muted">or</span>
            </div>
          </div>

          <SocialAuthButton />

          <p className="text-center text-sm text-muted">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-medium text-accent-purple transition-colors hover:text-accent-pink"
            >
              Sign in
            </Link>
          </p>
        </form>
      )}
    </AuthCard>
  );
}

function CheckIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-emerald-400"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}
