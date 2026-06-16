import { ChapterList } from "@/components/manga/ChapterList";
import { MangaDetailHero } from "@/components/manga/MangaDetailHero";
import { MangaInfoPanel } from "@/components/manga/MangaInfoPanel";
import { RelatedManga } from "@/components/manga/RelatedManga";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import {
  getChaptersByMangaSlug,
  getMangaBySlug,
  getRelatedMangas,
  mockMangas,
} from "@/lib/mock";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type MangaDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return mockMangas.map((manga) => ({ slug: manga.slug }));
}

export async function generateMetadata({
  params,
}: MangaDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const manga = getMangaBySlug(slug);

  if (!manga) {
    return { title: "Manga Not Found" };
  }

  return {
    title: manga.title,
    description: manga.description,
  };
}

export default async function MangaDetailPage({ params }: MangaDetailPageProps) {
  const { slug } = await params;
  const manga = getMangaBySlug(slug);

  if (!manga) {
    notFound();
  }

  const chapters = getChaptersByMangaSlug(slug);
  const related = getRelatedMangas(slug);
  const latestChapterNumber =
    chapters[0]?.number ?? manga.chapterCount;

  return (
    <>
      <SiteHeader />

      <main>
        <MangaDetailHero
          manga={manga}
          latestChapterNumber={latestChapterNumber}
        />

        <div className="mx-auto max-w-7xl space-y-12 px-4 py-12 sm:space-y-16 sm:px-6 lg:px-8">
          <MangaInfoPanel manga={manga} />

          <ChapterList
            mangaSlug={manga.slug}
            coverGradient={manga.coverGradient}
            chapters={chapters}
          />

          <RelatedManga mangas={related} />
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
