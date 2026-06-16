import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import Link from "next/link";

export default function GenreNotFound() {
  return (
    <>
      <SiteHeader />

      <main className="relative flex min-h-[70vh] items-center justify-center overflow-hidden px-4 py-20">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-900/20 via-background to-fuchsia-900/10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(168,85,247,0.12),transparent_60%)]" />

        <div className="glass relative max-w-lg rounded-2xl px-8 py-12 text-center shadow-2xl shadow-purple-500/10">
          <p className="text-sm font-semibold uppercase tracking-widest text-accent-purple">
            404
          </p>
          <h1 className="mt-3 text-3xl font-extrabold text-white sm:text-4xl">
            Genre Not Found
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">
            This genre doesn&apos;t exist in the MangaVerse catalog. Check the
            spelling or browse all available genres.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/genres"
              className="inline-flex h-11 items-center rounded-xl bg-gradient-to-r from-accent-purple to-accent-pink px-6 text-sm font-semibold text-white shadow-lg shadow-purple-500/30 transition-all hover:shadow-purple-500/50 hover:brightness-110"
            >
              All Genres
            </Link>
            <Link
              href="/browse"
              className="glass glass-hover inline-flex h-11 items-center rounded-xl px-6 text-sm font-semibold text-white"
            >
              Browse Manga
            </Link>
          </div>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
