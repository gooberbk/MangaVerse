import Link from "next/link";

type LibraryEmptyStateProps = {
  title: string;
  message: string;
};

export function LibraryEmptyState({ title, message }: LibraryEmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-white/[0.02] px-6 py-16 text-center backdrop-blur-sm">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-accent-purple/20 to-accent-pink/20 ring-1 ring-white/10">
        <BookmarkIcon />
      </div>
      <h3 className="mt-5 text-lg font-bold text-white">{title}</h3>
      <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted">
        {message}
      </p>
      <Link
        href="/browse"
        className="mt-6 inline-flex h-11 items-center rounded-xl bg-gradient-to-r from-accent-purple to-accent-pink px-6 text-sm font-semibold text-white shadow-lg shadow-purple-500/25 transition-all hover:brightness-110"
      >
        Browse Manga
      </Link>
    </div>
  );
}

function BookmarkIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-accent-purple"
    >
      <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
    </svg>
  );
}
