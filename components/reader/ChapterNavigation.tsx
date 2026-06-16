import { cn } from "@/lib/utils";
import Link from "next/link";

type ChapterNavigationProps = {
  mangaSlug: string;
  prevChapter: number | null;
  nextChapter: number | null;
  className?: string;
  variant?: "inline" | "floating";
};

export function ChapterNavigation({
  mangaSlug,
  prevChapter,
  nextChapter,
  className,
  variant = "inline",
}: ChapterNavigationProps) {
  return (
    <div
      className={cn(
        "flex flex-wrap items-center justify-center gap-2 sm:gap-3",
        variant === "floating" &&
          "glass rounded-xl px-3 py-2 shadow-lg shadow-black/30 sm:px-4 sm:py-3",
        className,
      )}
    >
      {prevChapter !== null ? (
        <NavButton
          href={`/manga/${mangaSlug}/chapter/${prevChapter}`}
          variant="secondary"
        >
          <ChevronLeftIcon />
          <span className="hidden sm:inline">Previous</span>
        </NavButton>
      ) : (
        <NavButton disabled variant="secondary">
          <ChevronLeftIcon />
          <span className="hidden sm:inline">Previous</span>
        </NavButton>
      )}

      <NavButton href={`/manga/${mangaSlug}`} variant="ghost">
        <BookIcon />
        <span className="hidden sm:inline">Details</span>
      </NavButton>

      {nextChapter !== null ? (
        <NavButton
          href={`/manga/${mangaSlug}/chapter/${nextChapter}`}
          variant="primary"
        >
          <span className="hidden sm:inline">Next</span>
          <ChevronRightIcon />
        </NavButton>
      ) : (
        <NavButton disabled variant="primary">
          <span className="hidden sm:inline">Next</span>
          <ChevronRightIcon />
        </NavButton>
      )}
    </div>
  );
}

function NavButton({
  href,
  disabled,
  variant,
  children,
}: {
  href?: string;
  disabled?: boolean;
  variant: "primary" | "secondary" | "ghost";
  children: React.ReactNode;
}) {
  const styles = {
    primary:
      "bg-gradient-to-r from-accent-purple to-accent-pink text-white shadow-md shadow-purple-500/20 hover:brightness-110",
    secondary: "glass glass-hover text-white",
    ghost: "text-muted hover:bg-white/5 hover:text-white",
  };

  const className = cn(
    "inline-flex h-9 items-center gap-1.5 rounded-lg px-3 text-xs font-semibold transition-all sm:h-10 sm:px-4 sm:text-sm",
    disabled
      ? "cursor-not-allowed bg-white/5 text-white/25"
      : styles[variant],
  );

  if (disabled || !href) {
    return (
      <button type="button" disabled={disabled} className={className}>
        {children}
      </button>
    );
  }

  return (
    <Link href={href} className={className}>
      {children}
    </Link>
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

function BookIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 7v14" />
      <path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z" />
    </svg>
  );
}
