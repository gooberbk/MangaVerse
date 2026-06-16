"use client";

import { HeaderSearch } from "@/components/layout/HeaderSearch";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/browse", label: "Browse" },
  { href: "/latest", label: "Latest" },
  { href: "/popular", label: "Popular" },
  { href: "/genres", label: "Genres" },
] as const;

function isNavLinkActive(href: string, pathname: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteHeader() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  function closeMobileMenu() {
    setMobileOpen(false);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex shrink-0 items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-accent-purple to-accent-pink text-sm font-bold shadow-lg shadow-purple-500/25">
            M
          </span>
          <span className="text-lg font-bold tracking-tight">
            Manga<span className="gradient-text">Verse</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-0.5 lg:flex">
          {navLinks.map((link) => {
            const active = isNavLinkActive(link.href, pathname);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200",
                  active
                    ? "bg-white/10 text-white shadow-inner shadow-purple-500/10 ring-1 ring-white/10"
                    : "text-muted hover:bg-white/5 hover:text-white",
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden flex-1 md:block md:max-w-xs lg:max-w-sm xl:max-w-md">
          <HeaderSearch />
        </div>

        <div className="ml-auto flex items-center gap-2 sm:gap-3">
          <Link
            href="/library"
            className="hidden rounded-lg px-3 py-2 text-sm font-medium text-muted transition-colors hover:bg-white/5 hover:text-white sm:block"
          >
            Library
          </Link>
          <Link
            href="/account"
            className="hidden rounded-lg px-3 py-2 text-sm font-medium text-muted transition-colors hover:bg-white/5 hover:text-white sm:block"
          >
            Account
          </Link>
          <Link
            href="/browse"
            className="rounded-xl bg-gradient-to-r from-accent-purple to-accent-pink px-3 py-2 text-sm font-semibold text-white shadow-lg shadow-purple-500/25 transition-all hover:shadow-purple-500/40 hover:brightness-110 sm:px-4"
          >
            Start Reading
          </Link>
          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((open) => !open)}
            className="glass glass-hover flex h-9 w-9 items-center justify-center rounded-lg text-muted lg:hidden"
          >
            {mobileOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-white/5 bg-surface/95 px-4 py-4 backdrop-blur-xl lg:hidden">
          <HeaderSearch
            className="mb-4"
            inputClassName="py-2.5"
            onNavigate={closeMobileMenu}
            autoFocus
          />

          <nav className="flex flex-col gap-1">
            {navLinks.map((link) => {
              const active = isNavLinkActive(link.href, pathname);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={closeMobileMenu}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200",
                    active
                      ? "bg-white/10 text-white ring-1 ring-white/10"
                      : "text-muted hover:bg-white/5 hover:text-white",
                  )}
                >
                  {link.label}
                </Link>
              );
            })}

            <Link
              href="/library"
              onClick={closeMobileMenu}
              className="mt-2 rounded-xl px-3 py-2.5 text-sm font-medium text-muted transition-colors hover:bg-white/5 hover:text-white"
            >
              Library
            </Link>
            <Link
              href="/account"
              onClick={closeMobileMenu}
              className="rounded-xl px-3 py-2.5 text-sm font-medium text-muted transition-colors hover:bg-white/5 hover:text-white"
            >
              Account
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}

function MenuIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 5h16" />
      <path d="M4 12h16" />
      <path d="M4 19h16" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}
