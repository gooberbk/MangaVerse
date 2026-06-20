import { AdminMangaPageClient } from "@/components/admin/manga/AdminMangaPageClient";
import { listChapters, listMangas } from "@/lib/appwrite/mangas";
import { mapMangaDocumentsToMangas } from "@/lib/appwrite/mapping";

export default async function AdminMangaPage() {
  const [mangaDocs, chapterDocs] = await Promise.all([
    listMangas(),
    listChapters(),
  ]);
  const chapterCounts = new Map<string, number>();

  for (const chapter of chapterDocs) {
    if (typeof chapter.mangaId !== "string" || chapter.mangaId.length === 0) {
      continue;
    }

    chapterCounts.set(
      chapter.mangaId,
      (chapterCounts.get(chapter.mangaId) ?? 0) + 1,
    );
  }

  const mangas = mapMangaDocumentsToMangas(mangaDocs).map((manga) => ({
    ...manga,
    chapterCount: chapterCounts.get(manga.id) ?? manga.chapterCount,
  }));

  return <AdminMangaPageClient mangas={mangas} />;
}
