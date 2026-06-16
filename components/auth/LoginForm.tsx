"use client";

import { AuthCard } from "@/components/auth/AuthCard";
import { AuthInput } from "@/components/auth/AuthInput";
import { PasswordInput } from "@/components/auth/PasswordInput";
import { SocialAuthButton } from "@/components/auth/SocialAuthButton";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useState } from "react";

type FormStatus = "idle" | "loading" | "success";

export function LoginForm() {
  const [rememberMe, setRememberMe] = useState(false);
  const [status, setStatus] = useState<FormStatus>("idle");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    // Demo only — no auth backend connected.
    await new Promise((resolve) => setTimeout(resolve, 1200));
    setStatus("success");
  }

  return (
    <AuthCard
      title="Welcome back"
      subtitle="Sign in to your MangaVerse account and continue your reading journey."
    >
      {status === "success" ? (
        <SuccessMessage
          title="Signed in (demo)"
          message="This is a UI preview only — no account was verified or created."
          actionHref="/browse"
          actionLabel="Browse manga"
        />
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          <AuthInput
            label="Email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            required
            disabled={status === "loading"}
          />

          <div className="space-y-2">
            <div className="flex items-center justify-between gap-2">
              <label
                htmlFor="login-password"
                className="text-sm font-medium text-white"
              >
                Password
              </label>
              <Link
                href="/forgot-password"
                className="text-xs font-medium text-accent-pink transition-colors hover:text-white"
              >
                Forgot password?
              </Link>
            </div>
            <PasswordInput
              id="login-password"
              name="password"
              label=""
              autoComplete="current-password"
              placeholder="Enter your password"
              required
              disabled={status === "loading"}
            />
          </div>

          <label className="flex cursor-pointer items-center gap-3">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(event) => setRememberMe(event.target.checked)}
              disabled={status === "loading"}
              className="h-4 w-4 rounded border-white/20 bg-white/5 text-accent-purple focus:ring-accent-purple/30 focus:ring-offset-0"
            />
            <span className="text-sm text-muted">Remember me</span>
          </label>

          <Button
            type="submit"
            size="lg"
            className="w-full"
            disabled={status === "loading"}
          >
            {status === "loading" ? "Signing in..." : "Sign in"}
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
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="font-medium text-accent-purple transition-colors hover:text-accent-pink"
            >
              Create one
            </Link>
          </p>
        </form>
      )}
    </AuthCard>
  );
}

function SuccessMessage({
  title,
  message,
  actionHref,
  actionLabel,
}: {
  title: string;
  message: string;
  actionHref: string;
  actionLabel: string;
}) {
  return (
    <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-5 py-6 text-center">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/20">
        <CheckIcon />
      </div>
      <h2 className="mt-4 text-lg font-bold text-white">{title}</h2>
      <p className="mt-2 text-sm leading-relaxed text-muted">{message}</p>
      <Link
        href={actionHref}
        className={cn(
          "mt-6 inline-flex h-11 items-center rounded-xl bg-gradient-to-r from-accent-purple to-accent-pink",
          "px-6 text-sm font-semibold text-white shadow-lg shadow-purple-500/25 transition-all hover:brightness-110",
        )}
      >
        {actionLabel}
      </Link>
    </div>
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
