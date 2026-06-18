import { BrowseByGenre } from "@/components/home/BrowseByGenre";
import { HeroSection } from "@/components/home/HeroSection";
import { LatestUpdates } from "@/components/home/LatestUpdates";
import { PopularRanking } from "@/components/home/PopularRanking";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { MangaRail } from "@/components/manga/MangaRail";
import {
  featuredManga as mockFeaturedManga,
  getAllGenres,
  getLatestUpdates as mockGetLatestUpdates,
  getPopularThisWeek as mockGetPopularThisWeek,
  getTrendingMangas as mockGetTrendingMangas,
} from "@/lib/mock";
import {
  getFeaturedMangas,
  getLatestMangas,
  getPopularMangas,
} from "@/lib/appwrite/mangas";
import { mapMangaDocumentsToMangas } from "@/lib/appwrite/mapping";

async function getTrendingMangas() {
  try {
    const docs = await getFeaturedMangas();
    if (docs.length > 0) {
      return mapMangaDocumentsToMangas(docs).filter((m) => m.isTrending);
    }
  } catch (error) {
    console.error("Failed to fetch trending mangas from Appwrite:", error);
  }
  return mockGetTrendingMangas();
}

async function getLatestUpdates() {
  try {
    const docs = await getLatestMangas();
    if (docs.length > 0) {
      return mapMangaDocumentsToMangas(docs).slice(0, 6);
    }
  } catch (error) {
    console.error("Failed to fetch latest updates from Appwrite:", error);
  }
  return mockGetLatestUpdates();
}

async function getPopularThisWeek() {
  try {
    const docs = await getPopularMangas();
    if (docs.length > 0) {
      return mapMangaDocumentsToMangas(docs).slice(0, 5);
    }
  } catch (error) {
    console.error("Failed to fetch popular mangas from Appwrite:", error);
  }
  return mockGetPopularThisWeek();
}

async function getFeaturedManga() {
  try {
    const docs = await getFeaturedMangas();
    if (docs.length > 0) {
      const mangas = mapMangaDocumentsToMangas(docs);
      return mangas.find((m) => m.isFeatured) || mangas[0];
    }
  } catch (error) {
    console.error("Failed to fetch featured manga from Appwrite:", error);
  }
  return mockFeaturedManga;
}

export default async function HomePage() {
  const [trending, latest, popular, featured] = await Promise.all([
    getTrendingMangas(),
    getLatestUpdates(),
    getPopularThisWeek(),
    getFeaturedManga(),
  ]);
  const genres = getAllGenres();

  return (
    <>
      <SiteHeader />

      <main>
        <HeroSection manga={featured} />

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
