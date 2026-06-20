import { BrowsePageClient } from "@/components/browse/BrowsePageClient";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import {
  getAllDemographics,
  getAllReleaseYears,
  getCatalogStats,
} from "@/lib/browse/catalog";
import { getAllGenres, mockMangas } from "@/lib/mock";
import { listChapters, listMangas } from "@/lib/appwrite/mangas";
import { mapMangaDocumentsToMangas } from "@/lib/appwrite/mapping";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Browse Manga",
  description:
    "Discover and explore the full MangaVerse catalog. Filter by genre, status, demographic, and more.",
};

async function getMangas() {
  try {
    const [docs, chapters] = await Promise.all([listMangas(), listChapters()]);
    if (docs.length > 0) {
      const chapterCounts = new Map<string, number>();

      for (const chapter of chapters) {
        if (typeof chapter.mangaId !== "string" || chapter.mangaId.length === 0) {
          continue;
        }

        chapterCounts.set(
          chapter.mangaId,
          (chapterCounts.get(chapter.mangaId) ?? 0) + 1,
        );
      }

      return mapMangaDocumentsToMangas(docs).map((manga) => ({
        ...manga,
        chapterCount: chapterCounts.get(manga.id) ?? manga.chapterCount,
      }));
    }
  } catch (error) {
    console.error("Failed to fetch mangas from Appwrite:", error);
  }
  return mockMangas;
}

export default async function BrowsePage() {
  const mangas = await getMangas();
  const genres = getAllGenres();
  const demographics = getAllDemographics(mangas);
  const years = getAllReleaseYears(mangas);
  const stats = getCatalogStats(mangas);

  return (
    <>
      <SiteHeader />

      <main>
        <BrowsePageClient
          mangas={mangas}
          genres={genres}
          demographics={demographics}
          years={years}
          stats={stats}
        />
      </main>

      <SiteFooter />
    </>
  );
}
