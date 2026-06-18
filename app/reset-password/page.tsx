"use client";

import Link from "next/link";
import { type FormEvent, useEffect, useState } from "react";
import { completePasswordRecovery } from "@/lib/appwrite/auth";

type RecoveryParams = {
  userId: string;
  secret: string;
};

export default function ResetPasswordPage() {
  const [recoveryParams, setRecoveryParams] = useState<RecoveryParams | null>(
    null,
  );
  const [hasCheckedParams, setHasCheckedParams] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const userId = params.get("userId") ?? "";
    const secret = params.get("secret") ?? "";

    if (userId && secret) {
      setRecoveryParams({ userId, secret });
    }

    setHasCheckedParams(true);
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    if (!recoveryParams) {
      setError("This recovery link is missing required information.");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setIsSubmitting(true);

    try {
      await completePasswordRecovery(
        recoveryParams.userId,
        recoveryParams.secret,
        password,
      );
      setIsComplete(true);
      setPassword("");
      setConfirmPassword("");
    } catch (submitError) {
      setError(getResetPasswordErrorMessage(submitError));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-background px-4 py-10 text-white">
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] w-full max-w-6xl items-center justify-center">
        <section className="grid w-full overflow-hidden rounded-3xl border border-white/10 bg-surface/70 shadow-2xl shadow-black/30 backdrop-blur-xl lg:grid-cols-[1.1fr_0.9fr]">
          <div className="hidden min-h-[620px] flex-col justify-between bg-gradient-to-br from-accent-purple/30 via-accent-pink/20 to-background p-10 lg:flex">
            <Link href="/" className="inline-flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-accent-purple to-accent-pink text-lg font-bold">
                M
              </span>
              <span>
                <span className="block text-lg font-bold">MangaVerse</span>
                <span className="text-sm text-muted">Account recovery</span>
              </span>
            </Link>

            <div className="space-y-5">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-accent-pink">
                Secure reset
              </p>
              <h1 className="max-w-md text-5xl font-black leading-tight">
                Return to your library with a fresh password.
              </h1>
              <p className="max-w-md text-base leading-7 text-muted">
                Complete the Appwrite recovery flow from your email link, then
                sign back in to continue reading.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-5 text-sm text-muted">
              Recovery links are single-use and may expire. Request a new link
              if this one no longer works.
            </div>
          </div>

          <div className="flex min-h-[620px] items-center justify-center p-6 sm:p-10">
            <div className="w-full max-w-md">
              <div className="mb-8 space-y-3">
                <Link
                  href="/"
                  className="inline-flex items-center gap-3 lg:hidden"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-accent-purple to-accent-pink text-base font-bold">
                    M
                  </span>
                  <span className="text-lg font-bold">MangaVerse</span>
                </Link>
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-accent-purple">
                  Password reset
                </p>
                <h2 className="text-3xl font-black">Create a new password</h2>
                <p className="text-sm leading-6 text-muted">
                  Choose a strong password to finish recovering your account.
                </p>
              </div>

              {!hasCheckedParams && (
                <div className="rounded-2xl border border-white/10 bg-white/5 p-5 text-sm text-muted">
                  Checking recovery link...
                </div>
              )}

              {hasCheckedParams && !recoveryParams && (
                <div className="space-y-5 rounded-2xl border border-rose-400/20 bg-rose-500/10 p-5">
                  <div className="space-y-2">
                    <h3 className="text-lg font-bold text-white">
                      Invalid recovery link
                    </h3>
                    <p className="text-sm leading-6 text-muted">
                      This password recovery link is missing required Appwrite
                      recovery details. Request a fresh link and try again.
                    </p>
                  </div>
                  <Link
                    href="/forgot-password"
                    className="inline-flex h-11 w-full items-center justify-center rounded-xl bg-gradient-to-r from-accent-purple to-accent-pink px-5 text-sm font-semibold text-white shadow-lg shadow-purple-500/25 transition-all duration-200 hover:brightness-110"
                  >
                    Request new recovery email
                  </Link>
                </div>
              )}

              {hasCheckedParams && recoveryParams && isComplete && (
                <div className="space-y-5 rounded-2xl border border-emerald-400/20 bg-emerald-500/10 p-5">
                  <div className="space-y-2">
                    <h3 className="text-lg font-bold text-white">
                      Password updated
                    </h3>
                    <p className="text-sm leading-6 text-muted">
                      Your password has been reset. You can now sign in with
                      your new password.
                    </p>
                  </div>
                  <Link
                    href="/login"
                    className="inline-flex h-11 w-full items-center justify-center rounded-xl bg-gradient-to-r from-accent-purple to-accent-pink px-5 text-sm font-semibold text-white shadow-lg shadow-purple-500/25 transition-all duration-200 hover:brightness-110"
                  >
                    Go to sign in
                  </Link>
                </div>
              )}

              {hasCheckedParams && recoveryParams && !isComplete && (
                <form className="space-y-5" onSubmit={handleSubmit}>
                  <div className="space-y-2">
                    <label
                      htmlFor="reset-password"
                      className="text-sm font-medium text-white"
                    >
                      New password
                    </label>
                    <input
                      id="reset-password"
                      type="password"
                      autoComplete="new-password"
                      required
                      minLength={8}
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      className="h-12 w-full rounded-xl border border-white/10 bg-white/5 px-4 text-sm text-white outline-none transition-colors placeholder:text-muted/60 focus:border-accent-purple"
                      placeholder="Enter a new password"
                    />
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="reset-confirm-password"
                      className="text-sm font-medium text-white"
                    >
                      Confirm new password
                    </label>
                    <input
                      id="reset-confirm-password"
                      type="password"
                      autoComplete="new-password"
                      required
                      minLength={8}
                      value={confirmPassword}
                      onChange={(event) =>
                        setConfirmPassword(event.target.value)
                      }
                      className="h-12 w-full rounded-xl border border-white/10 bg-white/5 px-4 text-sm text-white outline-none transition-colors placeholder:text-muted/60 focus:border-accent-purple"
                      placeholder="Confirm your new password"
                    />
                  </div>

                  {error && (
                    <p className="text-sm font-medium text-rose-400" role="alert">
                      {error}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex h-12 w-full items-center justify-center rounded-xl bg-gradient-to-r from-accent-purple to-accent-pink px-5 text-sm font-semibold text-white shadow-lg shadow-purple-500/25 transition-all duration-200 hover:brightness-110 disabled:pointer-events-none disabled:opacity-60"
                  >
                    {isSubmitting ? "Updating password..." : "Update password"}
                  </button>

                  <p className="text-center text-sm text-muted">
                    Need a new link?{" "}
                    <Link
                      href="/forgot-password"
                      className="font-medium text-accent-purple transition-colors hover:text-accent-pink"
                    >
                      Request recovery
                    </Link>
                  </p>
                </form>
              )}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

function getResetPasswordErrorMessage(error: unknown) {
  if (error instanceof Error) {
    return error.message;
  }

  return "Unable to reset your password. Please request a new recovery link.";
}
