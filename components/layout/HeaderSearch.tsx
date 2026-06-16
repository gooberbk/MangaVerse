"use client";

import { searchMangas } from "@/lib/search/manga";
import { cn, formatRating } from "@/lib/utils";
import type { Manga } from "@/types/manga";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useId, useRef, useState } from "react";

type HeaderSearchProps = {
  className?: string;
  inputClassName?: string;
  onNavigate?: () => void;
  autoFocus?: boolean;
};

export function HeaderSearch({
  className,
  inputClassName,
  onNavigate,
  autoFocus = false,
}: HeaderSearchProps) {
  const router = useRouter();
  const listboxId = useId();
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [highlightIndex, setHighlightIndex] = useState(-1);

  const results = searchMangas(query);
  const hasQuery = query.trim().length > 0;
  const showDropdown = isOpen && hasQuery;

  const closeDropdown = useCallback(() => {
    setIsOpen(false);
    setHighlightIndex(-1);
  }, []);

  const handleNavigate = useCallback(() => {
    closeDropdown();
    setQuery("");
    onNavigate?.();
  }, [closeDropdown, onNavigate]);

  useEffect(() => {
    function handlePointerDown(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        closeDropdown();
      }
    }

    document.addEventListener("mousedown", handlePointerDown);
    return () => document.removeEventListener("mousedown", handlePointerDown);
  }, [closeDropdown]);

  useEffect(() => {
    setHighlightIndex(results.length > 0 ? 0 : -1);
  }, [query, results.length]);

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (!showDropdown) {
      if (event.key === "ArrowDown" && hasQuery) {
        setIsOpen(true);
      }
      return;
    }

    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        setHighlightIndex((index) =>
          index < results.length - 1 ? index + 1 : 0,
        );
        break;
      case "ArrowUp":
        event.preventDefault();
        setHighlightIndex((index) =>
          index > 0 ? index - 1 : results.length - 1,
        );
        break;
      case "Enter":
        event.preventDefault();
        if (highlightIndex >= 0 && results[highlightIndex]) {
          router.push(`/manga/${results[highlightIndex].slug}`);
          handleNavigate();
        }
        break;
      case "Escape":
        event.preventDefault();
        closeDropdown();
        inputRef.current?.blur();
        break;
    }
  }

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      <label className="relative block">
        <span className="sr-only">Search manga by title, genre, or author</span>
        <SearchIcon className="pointer-events-none absolute left-3 top-1/2 z-10 -translate-y-1/2 text-muted" />
        <input
          ref={inputRef}
          type="search"
          role="combobox"
          aria-expanded={showDropdown}
          aria-controls={listboxId}
          aria-autocomplete="list"
          autoFocus={autoFocus}
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder="Search manga, genre, author..."
          className={cn(
            "glass w-full rounded-xl py-2 pl-10 pr-4 text-sm text-white",
            "placeholder:text-muted/70 outline-none transition-all duration-200",
            "focus:border-accent-purple/40 focus:ring-2 focus:ring-accent-purple/20",
            inputClassName,
          )}
        />
      </label>

      {showDropdown && (
        <div
          className={cn(
            "absolute left-0 right-0 top-[calc(100%+0.5rem)] z-50 overflow-hidden",
            "rounded-2xl border border-white/10 bg-surface/95 shadow-2xl shadow-black/40 backdrop-blur-xl",
            "transition-all duration-200",
          )}
        >
          {results.length > 0 ? (
            <ul
              id={listboxId}
              role="listbox"
              className="max-h-[min(24rem,70vh)] overflow-y-auto p-2"
            >
              {results.map((manga, index) => (
                <li key={manga.id} role="option" aria-selected={index === highlightIndex}>
                  <SearchResultItem
                    manga={manga}
                    isHighlighted={index === highlightIndex}
                    onNavigate={handleNavigate}
                    onHover={() => setHighlightIndex(index)}
                  />
                </li>
              ))}
            </ul>
          ) : (
            <div className="px-4 py-8 text-center">
              <p className="text-sm font-medium text-white">No manga found</p>
              <p className="mt-1 text-xs text-muted">
                Try a different title, genre, or author
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function SearchResultItem({
  manga,
  isHighlighted,
  onNavigate,
  onHover,
}: {
  manga: Manga;
  isHighlighted: boolean;
  onNavigate: () => void;
  onHover: () => void;
}) {
  return (
    <Link
      href={`/manga/${manga.slug}`}
      onClick={onNavigate}
      onMouseEnter={onHover}
      className={cn(
        "group flex items-center gap-3 rounded-xl p-2.5 transition-all duration-150",
        isHighlighted
          ? "bg-white/10 ring-1 ring-accent-purple/30"
          : "hover:bg-white/[0.06]",
      )}
    >
      <div
        className={cn(
          "h-12 w-9 shrink-0 rounded-lg bg-gradient-to-br shadow-md ring-1 ring-white/10",
          manga.coverGradient,
        )}
      />
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-white transition-colors group-hover:text-accent-pink">
          {manga.title}
        </p>
        <p className="mt-0.5 truncate text-xs text-muted">
          {manga.genres.slice(0, 3).join(" · ")}
        </p>
      </div>
      <div className="flex shrink-0 items-center gap-1 rounded-lg bg-white/5 px-2 py-1 text-xs font-bold text-amber-400">
        <StarIcon />
        {formatRating(manga.rating.average)}
      </div>
    </Link>
  );
}

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="11"
      height="11"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}
