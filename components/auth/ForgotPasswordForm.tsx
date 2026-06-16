"use client";

import { AuthCard } from "@/components/auth/AuthCard";
import { AuthInput } from "@/components/auth/AuthInput";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useState } from "react";

type FormStatus = "idle" | "loading" | "success";

export function ForgotPasswordForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [email, setEmail] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    setEmail(String(formData.get("email") ?? ""));
    setStatus("loading");
    // Demo only — no reset email is sent.
    await new Promise((resolve) => setTimeout(resolve, 1100));
    setStatus("success");
  }

  return (
    <AuthCard
      title="Reset password"
      subtitle="Enter your email and we'll send you a link to reset your password."
    >
      {status === "success" ? (
        <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-5 py-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/20">
            <MailIcon />
          </div>
          <h2 className="mt-4 text-lg font-bold text-white">Check your inbox</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            If an account exists for{" "}
            <span className="font-medium text-white">{email || "your email"}</span>
            , a reset link would be sent. This is a demo — no email was sent.
          </p>
          <Link
            href="/login"
            className={cn(
              "mt-6 inline-flex h-11 items-center rounded-xl bg-gradient-to-r from-accent-purple to-accent-pink",
              "px-6 text-sm font-semibold text-white shadow-lg shadow-purple-500/25 transition-all hover:brightness-110",
            )}
          >
            Back to sign in
          </Link>
        </div>
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

          <Button
            type="submit"
            size="lg"
            className="w-full"
            disabled={status === "loading"}
          >
            {status === "loading" ? "Sending link..." : "Send reset link"}
          </Button>

          <p className="text-center text-sm text-muted">
            Remember your password?{" "}
            <Link
              href="/login"
              className="font-medium text-accent-purple transition-colors hover:text-accent-pink"
            >
              Back to sign in
            </Link>
          </p>
        </form>
      )}
    </AuthCard>
  );
}

function MailIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-emerald-400"
    >
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}
