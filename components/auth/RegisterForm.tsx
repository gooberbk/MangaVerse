"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { type FormEvent, useState } from "react";
import { useAuth } from "./AuthProvider";

export function RegisterForm() {
  const router = useRouter();
  const { register } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setIsSubmitting(true);

    try {
      await register(email, password, name);
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
        <label
          htmlFor="register-name"
          className="text-sm font-medium text-white"
        >
          Name
        </label>
        <input
          id="register-name"
          type="text"
          autoComplete="name"
          required
          value={name}
          onChange={(event) => setName(event.target.value)}
          className="h-12 w-full rounded-xl border border-white/10 bg-white/5 px-4 text-sm text-white outline-none transition-colors placeholder:text-muted/60 focus:border-accent-purple"
          placeholder="Manga fan"
        />
      </div>

      <div className="space-y-2">
        <label
          htmlFor="register-email"
          className="text-sm font-medium text-white"
        >
          Email
        </label>
        <input
          id="register-email"
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
        <label
          htmlFor="register-password"
          className="text-sm font-medium text-white"
        >
          Password
        </label>
        <input
          id="register-password"
          type="password"
          autoComplete="new-password"
          required
          minLength={8}
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="h-12 w-full rounded-xl border border-white/10 bg-white/5 px-4 text-sm text-white outline-none transition-colors placeholder:text-muted/60 focus:border-accent-purple"
          placeholder="Create a password"
        />
      </div>

      <div className="space-y-2">
        <label
          htmlFor="register-confirm-password"
          className="text-sm font-medium text-white"
        >
          Confirm password
        </label>
        <input
          id="register-confirm-password"
          type="password"
          autoComplete="new-password"
          required
          minLength={8}
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
          className="h-12 w-full rounded-xl border border-white/10 bg-white/5 px-4 text-sm text-white outline-none transition-colors placeholder:text-muted/60 focus:border-accent-purple"
          placeholder="Confirm your password"
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
        {isSubmitting ? "Creating account..." : "Create account"}
      </button>

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
  );
}

function getAuthErrorMessage(error: unknown) {
  if (error instanceof Error) {
    return error.message;
  }

  return "Unable to create your account. Please try again.";
}

export default RegisterForm;
