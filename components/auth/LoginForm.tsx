"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { type FormEvent, useState } from "react";
import { useAuth } from "./AuthProvider";

export function LoginForm() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      await login(email, password);
      router.push("/library");
    } catch (submitError) {
      setError(getAuthErrorMessage(submitError));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <div className="space-y-2">
        <label htmlFor="login-email" className="text-sm font-medium text-white">
          Email
        </label>
        <input
          id="login-email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="h-12 w-full rounded-xl border border-white/10 bg-white/5 px-4 text-sm text-white outline-none transition-colors placeholder:text-muted/60 focus:border-accent-purple"
          placeholder="you@example.com"
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between gap-4">
          <label
            htmlFor="login-password"
            className="text-sm font-medium text-white"
          >
            Password
          </label>
          <Link
            href="/forgot-password"
            className="text-xs font-medium text-accent-purple transition-colors hover:text-accent-pink"
          >
            Forgot password?
          </Link>
        </div>
        <input
          id="login-password"
          type="password"
          autoComplete="current-password"
          required
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="h-12 w-full rounded-xl border border-white/10 bg-white/5 px-4 text-sm text-white outline-none transition-colors placeholder:text-muted/60 focus:border-accent-purple"
          placeholder="Enter your password"
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
        {isSubmitting ? "Signing in..." : "Sign in"}
      </button>

      <p className="text-center text-sm text-muted">
        New to MangaVerse?{" "}
        <Link
          href="/register"
          className="font-medium text-accent-purple transition-colors hover:text-accent-pink"
        >
          Create an account
        </Link>
      </p>
    </form>
  );
}

function getAuthErrorMessage(error: unknown) {
  if (error instanceof Error) {
    return error.message;
  }

  return "Unable to sign in. Please try again.";
}

export default LoginForm;
