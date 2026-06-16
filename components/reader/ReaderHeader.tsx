"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";

type ReaderHeaderProps = {
  mangaSlug: string;
  mangaTitle: string;
  chapterNumber: number;
  chapterTitle: string;
  chapterNumbers: number[];
  prevChapter: number | null;
  nextChapter: number | null;
  onChapterSelect: (number: number) => void;
};

export function ReaderHeader({
  mangaSlug,
  mangaTitle,
  chapterNumber,
  chapterTitle,
  chapterNumbers,
  prevChapter,
  nextChapter,
  onChapterSelect,
}: ReaderHeaderProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-background/90 backdrop-blur-xl">
      <div className="mx-auto flex h-14 max-w-7xl items-center gap-2 px-3 sm:h-16 sm:gap-3 sm:px-4 lg:px-6">
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2 rounded-lg px-1 py-1 transition-colors hover:bg-white/5"
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-accent-purple to-accent-pink text-xs font-bold sm:h-8 sm:w-8 sm:text-sm">
            M
          </span>
          <span className="hidden text-sm font-bold sm:inline">
            Manga<span className="gradient-text">Verse</span>
          </span>
        </Link>

        <div className="min-w-0 flex-1 px-1 sm:px-2">
          <p className="truncate text-xs font-semibold text-white sm:text-sm">
            {mangaTitle}
          </p>
          <p className="truncate text-[10px] text-muted sm:text-xs">
            Ch. {chapterNumber}
            {chapterTitle ? `: ${chapterTitle}` : ""}
          </p>
        </div>

        <Link
          href={`/manga/${mangaSlug}`}
          className="glass glass-hover hidden shrink-0 rounded-lg px-3 py-1.5 text-xs font-medium text-muted transition-colors hover:text-white sm:inline-flex"
        >
          Details
        </Link>

        <label className="relative shrink-0">
          <span className="sr-only">Select chapter</span>
          <select
            value={chapterNumber}
            onChange={(event) => onChapterSelect(Number(event.target.value))}
            className="glass max-w-[5.5rem] appearance-none rounded-lg py-1.5 pl-2 pr-7 text-xs font-medium text-white outline-none transition-colors focus:border-accent-purple/40 sm:max-w-none sm:py-2 sm:pl-3 sm:pr-8 sm:text-sm"
          >
            {chapterNumbers.map((number) => (
              <option key={number} value={number} className="bg-surface">
                Ch. {number}
              </option>
            ))}
          </select>
          <ChevronDownIcon className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-muted" />
        </label>

        <div className="flex shrink-0 items-center gap-1">
          {prevChapter !== null ? (
            <NavLink
              href={`/manga/${mangaSlug}/chapter/${prevChapter}`}
              label="Previous chapter"
            >
              <ChevronLeftIcon />
            </NavLink>
          ) : (
            <NavButton disabled label="Previous chapter">
              <ChevronLeftIcon />
            </NavButton>
          )}

          {nextChapter !== null ? (
            <NavLink
              href={`/manga/${mangaSlug}/chapter/${nextChapter}`}
              label="Next chapter"
            >
              <ChevronRightIcon />
            </NavLink>
          ) : (
            <NavButton disabled label="Next chapter">
              <ChevronRightIcon />
            </NavButton>
          )}
        </div>
      </div>
    </header>
  );
}

function NavLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      aria-label={label}
      className="glass glass-hover flex h-8 w-8 items-center justify-center rounded-lg text-muted transition-colors hover:text-white sm:h-9 sm:w-9"
    >
      {children}
    </Link>
  );
}

function NavButton({
  disabled,
  label,
  children,
}: {
  disabled?: boolean;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      aria-label={label}
      className={cn(
        "flex h-8 w-8 items-center justify-center rounded-lg sm:h-9 sm:w-9",
        disabled
          ? "cursor-not-allowed text-white/20"
          : "glass glass-hover text-muted hover:text-white",
      )}
    >
      {children}
    </button>
  );
}

function ChevronLeftIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

function ChevronDownIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}
