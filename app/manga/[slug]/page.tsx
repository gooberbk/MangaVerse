import { ChapterList } from "@/components/manga/ChapterList";
import { MangaDetailHero } from "@/components/manga/MangaDetailHero";
import { MangaInfoPanel } from "@/components/manga/MangaInfoPanel";
import { RelatedManga } from "@/components/manga/RelatedManga";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import {
  getChaptersByMangaSlug,
  getMangaBySlug as getMockMangaBySlug,
  getRelatedMangas,
  mockMangas,
} from "@/lib/mock";
import { getMangaBySlug as getAppwriteMangaBySlug, listChaptersByMangaId } from "@/lib/appwrite/mangas";
import { mapMangaDocumentToManga, mapChapterDocumentsToChapters } from "@/lib/appwrite/mapping";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type MangaDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  // Use mock slugs for static generation to ensure build stability
  // Appwrite mangas will be handled at runtime
  return mockMangas.map((manga) => ({ slug: manga.slug }));
}

export async function generateMetadata({
  params,
}: MangaDetailPageProps): Promise<Metadata> {
  const { slug } = await params;

  // Try Appwrite first, then fallback to mock
  let manga = null;
  try {
    const appwriteMangaDoc = await getAppwriteMangaBySlug(slug);
    if (appwriteMangaDoc) {
      manga = mapMangaDocumentToManga(appwriteMangaDoc);
    }
  } catch (error) {
    console.error(`Failed to get manga from Appwrite for slug "${slug}":`, error);
  }

  if (!manga) {
    manga = getMockMangaBySlug(slug);
  }

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

  // Try Appwrite first, then fallback to mock
  let manga = null;
  let fromAppwrite = false;
  try {
    const appwriteMangaDoc = await getAppwriteMangaBySlug(slug);
    if (appwriteMangaDoc) {
      manga = mapMangaDocumentToManga(appwriteMangaDoc);
      fromAppwrite = true;
    }
  } catch (error) {
    console.error(`Failed to get manga from Appwrite for slug "${slug}":`, error);
  }

  if (!manga) {
    manga = getMockMangaBySlug(slug);
  }

  if (!manga) {
    notFound();
  }

  // Get chapters - use Appwrite if manga is from Appwrite, otherwise use mock
  let chapters = [];
  if (fromAppwrite) {
    try {
      const appwriteChapters = await listChaptersByMangaId(manga.id);
      if (appwriteChapters.length > 0) {
        chapters = mapChapterDocumentsToChapters(appwriteChapters);
      } else {
        // Fallback to mock chapters if Appwrite has no chapters
        chapters = getChaptersByMangaSlug(slug);
      }
    } catch (error) {
      console.error(`Failed to get chapters from Appwrite for manga "${manga.id}":`, error);
      // Fallback to mock chapters on error
      chapters = getChaptersByMangaSlug(slug);
    }
  } else {
    chapters = getChaptersByMangaSlug(slug);
  }

  const related = getRelatedMangas(slug);
  const readableChapterNumber =
    chapters
      .map((chapter) => chapter.number)
      .filter((number) => Number.isFinite(number) && number > 0)
      .sort((a, b) => a - b)[0] ?? null;
  const mangaWithChapterCount = {
    ...manga,
    chapterCount: chapters.length > 0 ? chapters.length : manga.chapterCount,
  };

  return (
    <>
      <SiteHeader />

      <main>
        <MangaDetailHero
          manga={mangaWithChapterCount}
          readableChapterNumber={readableChapterNumber}
        />

        <div className="mx-auto max-w-7xl space-y-12 px-4 py-12 sm:space-y-16 sm:px-6 lg:px-8">
          <MangaInfoPanel manga={mangaWithChapterCount} />

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
