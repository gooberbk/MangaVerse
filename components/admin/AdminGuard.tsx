"use client";

import { useAuth } from "@/components/auth/AuthProvider";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { type ReactNode, useEffect } from "react";

// Temporary MVP admin gate. Replace this with server-controlled Appwrite
// labels/roles before production, and do not rely on editable profile.role.
// Add your authenticated admin email here, for example: ["you@example.com"].
const ADMIN_EMAILS: readonly string[] = ["mdgoober@gmail.com"];

type AdminGuardProps = {
  children: ReactNode;
};

export function AdminGuard({ children }: AdminGuardProps) {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [loading, router, user]);

  if (loading) {
    return (
      <AdminGateState
        eyebrow="Admin"
        title="Checking access"
        message="Verifying your MangaVerse admin session."
      />
    );
  }

  if (!user) {
    return (
      <AdminGateState
        eyebrow="Admin"
        title="Redirecting to sign in"
        message="Sign in with an allowed admin account to open the dashboard."
        actionHref="/login"
        actionLabel="Sign In"
      />
    );
  }

  if (!isAdminEmail(user.email)) {
    return (
      <AdminGateState
        eyebrow="Access denied"
        title="Admin access required"
        message="This account is signed in, but it is not on the temporary MangaVerse admin allowlist."
        actionHref="/"
        actionLabel="Back to Site"
      />
    );
  }

  return <>{children}</>;
}

function isAdminEmail(email?: string) {
  if (!email) return false;

  const normalizedEmail = email.trim().toLowerCase();
  return ADMIN_EMAILS.some(
    (adminEmail) => adminEmail.trim().toLowerCase() === normalizedEmail,
  );
}

function AdminGateState({
  eyebrow,
  title,
  message,
  actionHref,
  actionLabel,
}: {
  eyebrow: string;
  title: string;
  message: string;
  actionHref?: string;
  actionLabel?: string;
}) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4 py-16 text-white">
      <section className="glass max-w-lg rounded-2xl p-6 text-center shadow-2xl shadow-black/30 sm:p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-accent-purple">
          {eyebrow}
        </p>
        <h1 className="mt-3 text-3xl font-black tracking-tight">{title}</h1>
        <p className="mt-3 text-sm leading-6 text-muted">{message}</p>

        {actionHref && actionLabel && (
          <Link
            href={actionHref}
            className="mt-6 inline-flex h-11 items-center justify-center rounded-xl bg-gradient-to-r from-accent-purple to-accent-pink px-5 text-sm font-semibold text-white shadow-lg shadow-purple-500/25 transition-all hover:brightness-110"
          >
            {actionLabel}
          </Link>
        )}
      </section>
    </main>
  );
}
