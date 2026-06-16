import { MangaGrid } from "@/components/browse/MangaGrid";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { PopularTopRanking } from "@/components/popular/PopularTopRanking";
import { DestinationHero } from "@/components/ui/DestinationHero";
import { StatBadge } from "@/components/ui/StatBadge";
import { formatViews } from "@/lib/utils";
import { getPopularMangas } from "@/lib/mock";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Popular This Week",
  description:
    "Top manga series ranked by views, bookmarks, and ratings on MangaVerse.",
};

export default function PopularPage() {
  const mangas = getPopularMangas();
  const topFive = mangas.slice(0, 5);
  const topManga = mangas[0];

  return (
    <>
      <SiteHeader />

      <main>
        <DestinationHero
          eyebrow="Trending Now"
          title="Popular This Week"
          subtitle="The series everyone is reading. Ranked by views, bookmarks, and community ratings across the platform."
          glow="amber"
        >
          {topManga && (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
              <StatBadge label="#1 Series" value={topManga.title} />
              <StatBadge
                label="Top Views"
                value={formatViews(topManga.views)}
              />
              <StatBadge label="Ranked Titles" value={mangas.length} />
            </div>
          )}
        </DestinationHero>

        <div className="mx-auto max-w-7xl space-y-12 px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
          <section className="space-y-6">
            <div>
              <h2 className="text-lg font-bold text-white sm:text-xl">
                Top 5 This Week
              </h2>
              <p className="mt-1 text-sm text-muted">
                The highest-ranked series by readership
              </p>
            </div>
            <PopularTopRanking mangas={topFive} />
          </section>

          <section className="space-y-6">
            <div>
              <h2 className="text-lg font-bold text-white sm:text-xl">
                Full Rankings
              </h2>
              <p className="mt-1 text-sm text-muted">
                Every series in popularity order
              </p>
            </div>
            <MangaGrid mangas={mangas} />
          </section>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
