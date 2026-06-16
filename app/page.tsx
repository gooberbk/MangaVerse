import { BrowseByGenre } from "@/components/home/BrowseByGenre";
import { HeroSection } from "@/components/home/HeroSection";
import { LatestUpdates } from "@/components/home/LatestUpdates";
import { PopularRanking } from "@/components/home/PopularRanking";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { MangaRail } from "@/components/manga/MangaRail";
import {
  featuredManga,
  getAllGenres,
  getLatestUpdates,
  getPopularThisWeek,
  getTrendingMangas,
} from "@/lib/mock";

export default function HomePage() {
  const trending = getTrendingMangas();
  const latest = getLatestUpdates();
  const popular = getPopularThisWeek();
  const genres = getAllGenres();

  return (
    <>
      <SiteHeader />

      <main>
        <HeroSection manga={featuredManga} />

        <div className="mx-auto max-w-7xl space-y-16 py-12 sm:space-y-20">
          <MangaRail
            title="Trending Now"
            subtitle="What everyone is reading this week"
            mangas={trending}
            viewAllHref="/popular"
          />

          <LatestUpdates mangas={latest} />

          <BrowseByGenre genres={genres} />

          <PopularRanking mangas={popular} />
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
