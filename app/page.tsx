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
  listChapters,
  getPopularMangas,
} from "@/lib/appwrite/mangas";
import { mapMangaDocumentsToMangas } from "@/lib/appwrite/mapping";
import type { Manga } from "@/types/manga";

function buildChapterCountMap(chapters: { mangaId?: unknown }[]) {
  const counts = new Map<string, number>();

  for (const chapter of chapters) {
    if (typeof chapter.mangaId !== "string" || chapter.mangaId.length === 0) {
      continue;
    }

    counts.set(chapter.mangaId, (counts.get(chapter.mangaId) ?? 0) + 1);
  }

  return counts;
}

function applyChapterCounts(mangas: Manga[], counts: Map<string, number>) {
  return mangas.map((manga) => ({
    ...manga,
    chapterCount: counts.get(manga.id) ?? manga.chapterCount,
  }));
}

async function getTrendingMangas() {
  try {
    const docs = await getFeaturedMangas();
    if (docs.length > 0) {
      const mangas = mapMangaDocumentsToMangas(docs);
      const trending = mangas.filter((m) => m.isTrending);
      return trending.length > 0 ? trending : mangas.slice(0, 6);
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
  const [trendingData, latestData, popularData, featuredData, chapterDocs] = await Promise.all([
    getTrendingMangas(),
    getLatestUpdates(),
    getPopularThisWeek(),
    getFeaturedManga(),
    listChapters(),
  ]);
  const chapterCounts = buildChapterCountMap(chapterDocs);
  const trending = applyChapterCounts(trendingData, chapterCounts);
  const latest = applyChapterCounts(latestData, chapterCounts);
  const popular = applyChapterCounts(popularData, chapterCounts);
  const featured = applyChapterCounts([featuredData], chapterCounts)[0];
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
