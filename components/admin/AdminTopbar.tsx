"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";

type AdminTopbarProps = {
  title: string;
  description?: string;
};

export function AdminTopbar({ title, description }: AdminTopbarProps) {
  return (
    <header className="border-b border-white/10 bg-surface/50 backdrop-blur-xl">
      <div className="flex items-center justify-between py-4 pl-16 pr-4 lg:px-8">
        <div className="min-w-0 flex flex-col gap-1">
          <h1 className="truncate text-xl font-bold text-white sm:text-2xl">{title}</h1>
          {description && (
            <p className="hidden text-sm text-muted sm:block">{description}</p>
          )}
        </div>

        <div className="flex shrink-0 items-center gap-2 sm:gap-4">
          <div className="hidden md:flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2">
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
              className="text-muted"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
            <input
              type="text"
              placeholder="Preview search"
              disabled
              className="w-32 bg-transparent text-sm text-white placeholder:text-muted/50 focus:outline-none lg:w-48"
            />
          </div>

          <Link href="/admin/manga">
            <Button variant="primary" size="md">
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
              >
                <path d="M5 12h14" />
                <path d="M12 5v14" />
              </svg>
              Manga List
            </Button>
          </Link>

          {/* Admin Profile Badge */}
          <div className="hidden items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-3 py-2 sm:flex">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-accent-purple to-accent-pink text-sm font-bold text-white">
              A
            </div>
            <div className="hidden lg:block">
              <p className="text-sm font-medium text-white">Admin</p>
              <p className="text-xs text-muted">Super Admin</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
