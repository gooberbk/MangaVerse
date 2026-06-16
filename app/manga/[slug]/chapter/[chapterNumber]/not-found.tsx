import Link from "next/link";

export default function ChapterNotFound() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-4 py-20">
      <div className="absolute inset-0 bg-gradient-to-br from-violet-900/20 via-background to-indigo-900/10" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.1),transparent_60%)]" />

      <div className="glass relative max-w-lg rounded-2xl px-8 py-12 text-center shadow-2xl shadow-purple-500/10">
        <p className="text-sm font-semibold uppercase tracking-widest text-accent-purple">
          404
        </p>
        <h1 className="mt-3 text-3xl font-extrabold text-white sm:text-4xl">
          Chapter Not Found
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">
          This chapter isn&apos;t available in the MangaVerse library. Check the
          chapter number or return to the series page.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex h-11 items-center rounded-xl bg-gradient-to-r from-accent-purple to-accent-pink px-6 text-sm font-semibold text-white shadow-lg shadow-purple-500/30 transition-all hover:shadow-purple-500/50 hover:brightness-110"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
