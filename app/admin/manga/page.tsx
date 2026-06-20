import { AdminMangaPageClient } from "@/components/admin/manga/AdminMangaPageClient";
import { listMangas } from "@/lib/appwrite/mangas";
import { mapMangaDocumentsToMangas } from "@/lib/appwrite/mapping";

export default async function AdminMangaPage() {
  const mangaDocs = await listMangas();
  const mangas = mapMangaDocumentsToMangas(mangaDocs);

  return <AdminMangaPageClient mangas={mangas} />;
}
