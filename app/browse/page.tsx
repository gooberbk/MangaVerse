import { BrowsePageClient } from "@/components/browse/BrowsePageClient";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import {
  getAllDemographics,
  getAllReleaseYears,
  getCatalogStats,
} from "@/lib/browse/catalog";
import { getAllGenres, mockMangas } from "@/lib/mock";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Browse Manga",
  description:
    "Discover and explore the full MangaVerse catalog. Filter by genre, status, demographic, and more.",
};

export default function BrowsePage() {
  const mangas = mockMangas;
  const genres = getAllGenres();
  const demographics = getAllDemographics();
  const years = getAllReleaseYears();
  const stats = getCatalogStats();

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
