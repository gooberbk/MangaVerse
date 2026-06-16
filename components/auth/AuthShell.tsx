import { AuthVisualPanel } from "@/components/auth/AuthVisualPanel";
import Link from "next/link";

type AuthShellProps = {
  children: React.ReactNode;
};

export function AuthShell({ children }: AuthShellProps) {
  return (
    <div className="relative min-h-screen">
      <div className="absolute inset-0 bg-gradient-to-br from-accent-purple/5 via-transparent to-accent-pink/5" />

      <div className="relative mx-auto flex min-h-screen max-w-6xl flex-col px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
        <Link
          href="/"
          className="mb-8 inline-flex w-fit items-center gap-2 lg:hidden"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-accent-purple to-accent-pink text-sm font-bold shadow-lg shadow-purple-500/25">
            M
          </span>
          <span className="text-lg font-bold">
            Manga<span className="gradient-text">Verse</span>
          </span>
        </Link>

        <div className="grid flex-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="flex justify-center lg:justify-end">{children}</div>
          <AuthVisualPanel />
        </div>
      </div>
    </div>
  );
}
