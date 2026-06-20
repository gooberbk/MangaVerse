import { AdminChaptersPageClient } from "@/components/admin/chapters/AdminChaptersPageClient";
import { listChapters, listMangas } from "@/lib/appwrite/mangas";
import {
  mapChapterDocumentToChapter,
  mapMangaDocumentsToMangas,
} from "@/lib/appwrite/mapping";

export default async function AdminChaptersPage() {
  const [mangaDocs, chapterDocs] = await Promise.all([
    listMangas(),
    listChapters(),
  ]);
  const mangas = mapMangaDocumentsToMangas(mangaDocs);
  const mangaById = new Map(mangas.map((manga) => [manga.id, manga]));
  const chapters = chapterDocs.map((doc) => {
    const chapter = mapChapterDocumentToChapter(doc);
    const manga = mangaById.get(chapter.mangaId);

    return {
      ...chapter,
      mangaTitle: manga?.title ?? "Unknown",
      mangaSlug: manga?.slug,
      coverGradient:
        manga?.coverGradient ?? "from-slate-700 via-slate-600 to-slate-500",
      status: doc.isPublished === false ? "draft" : "published",
    };
  });

  return <AdminChaptersPageClient chapters={chapters} mangas={mangas} />;
}
