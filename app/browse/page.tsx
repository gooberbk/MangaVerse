import { BrowsePageClient } from "@/components/browse/BrowsePageClient";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import {
  getAllDemographics,
  getAllReleaseYears,
  getCatalogStats,
} from "@/lib/browse/catalog";
import { getAllGenres, mockMangas } from "@/lib/mock";
import { listMangas } from "@/lib/appwrite/mangas";
import { mapMangaDocumentsToMangas } from "@/lib/appwrite/mapping";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Browse Manga",
  description:
    "Discover and explore the full MangaVerse catalog. Filter by genre, status, demographic, and more.",
};

async function getMangas() {
  try {
    const docs = await listMangas();
    if (docs.length > 0) {
      return mapMangaDocumentsToMangas(docs);
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
