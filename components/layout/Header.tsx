import Link from "next/link";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/browse", label: "Browse" },
  { href: "/genres", label: "Genres" },
  { href: "/library", label: "My Library" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="group flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-accent-purple to-accent-pink text-sm font-bold shadow-lg shadow-purple-500/25">
            M
          </span>
          <span className="text-lg font-bold tracking-tight">
            Manga<span className="gradient-text">Verse</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-lg px-4 py-2 text-sm font-medium text-muted transition-colors hover:bg-white/5 hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            type="button"
            aria-label="Search"
            className="glass glass-hover flex h-9 w-9 items-center justify-center rounded-lg text-muted hover:text-white"
          >
            <SearchIcon />
          </button>
          <Link
            href="/login"
            className={cn(
              "hidden rounded-lg px-4 py-2 text-sm font-medium text-muted transition-colors hover:text-white sm:block",
            )}
          >
            Sign In
          </Link>
          <Link
            href="/signup"
            className="rounded-lg bg-gradient-to-r from-accent-purple to-accent-pink px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-purple-500/25 transition-all hover:shadow-purple-500/40 hover:brightness-110"
          >
            Get Started
          </Link>
        </div>
      </div>
    </header>
  );
}

function SearchIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}
