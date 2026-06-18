"use client";

import Link from "next/link";
import { type FormEvent, useState } from "react";
import { sendPasswordRecovery } from "@/lib/appwrite/auth";

export function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setSuccessMessage("");
    setIsSubmitting(true);

    try {
      // Appwrite must allow this URL in the project Web platform settings.
      await sendPasswordRecovery(email);
      setSuccessMessage("Password recovery email sent. Check your inbox.");
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
          htmlFor="forgot-password-email"
          className="text-sm font-medium text-white"
        >
          Email
        </label>
        <input
          id="forgot-password-email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="h-12 w-full rounded-xl border border-white/10 bg-white/5 px-4 text-sm text-white outline-none transition-colors placeholder:text-muted/60 focus:border-accent-purple"
          placeholder="you@example.com"
        />
      </div>

      {error && (
        <p className="text-sm font-medium text-rose-400" role="alert">
          {error}
        </p>
      )}

      {successMessage && (
        <p className="text-sm font-medium text-emerald-400" role="status">
          {successMessage}
        </p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex h-12 w-full items-center justify-center rounded-xl bg-gradient-to-r from-accent-purple to-accent-pink px-5 text-sm font-semibold text-white shadow-lg shadow-purple-500/25 transition-all duration-200 hover:brightness-110 disabled:pointer-events-none disabled:opacity-60"
      >
        {isSubmitting ? "Sending..." : "Send recovery email"}
      </button>

      <p className="text-center text-sm text-muted">
        Remembered your password?{" "}
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

  return "Unable to send password recovery email. Please try again.";
}

export default ForgotPasswordForm;
