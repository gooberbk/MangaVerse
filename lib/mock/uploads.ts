import { mockChapters } from "./chapters";

export type UploadAssetType = "cover" | "chapter_page" | "avatar" | "banner";
export type UploadStatus = "completed" | "pending" | "failed";

export type UploadAsset = {
  id: string;
  filename: string;
  type: UploadAssetType;
  mangaId?: string;
  chapterId?: string;
  sizeMB: number;
  sizeLabel: string;
  status: UploadStatus;
  uploadedAt: string;
  visibility: "public" | "private";
  url: string;
  previewGradient: string;
  reason?: string;
};

const chapterFor = (mangaId: string, chapterNumber: number) => {
  return mockChapters.find(
    (chapter) => chapter.mangaId === mangaId && chapter.number === chapterNumber,
  );
};

export const mockUploads: UploadAsset[] = [
  {
    id: "u1",
    filename: "neon-eclipse-cover.webp",
    type: "cover",
    mangaId: "1",
    sizeMB: 1.8,
    sizeLabel: "1.8 MB",
    status: "completed",
    uploadedAt: "2026-06-14T10:20:00.000Z",
    visibility: "public",
    url: "https://assets.mangaverse.com/uploads/neon-eclipse-cover.webp",
    previewGradient: "from-violet-600 via-fuchsia-500 to-rose-500",
  },
  {
    id: "u2",
    filename: "crimson-horizon-chapter-98-01.png",
    type: "chapter_page",
    mangaId: "2",
    chapterId: chapterFor("2", 98)?.id,
    sizeMB: 3.4,
    sizeLabel: "3.4 MB",
    status: "completed",
    uploadedAt: "2026-06-13T15:04:00.000Z",
    visibility: "private",
    url: "https://assets.mangaverse.com/uploads/crimson-horizon-chapter-98-01.png",
    previewGradient: "from-red-700 via-rose-600 to-orange-500",
  },
  {
    id: "u3",
    filename: "admin-avatar-01.jpeg",
    type: "avatar",
    sizeMB: 0.9,
    sizeLabel: "0.9 MB",
    status: "completed",
    uploadedAt: "2026-06-12T08:12:00.000Z",
    visibility: "public",
    url: "https://assets.mangaverse.com/uploads/admin-avatar-01.jpeg",
    previewGradient: "from-slate-700 via-slate-500 to-slate-400",
  },
  {
    id: "u4",
    filename: "starfall-academy-chapter-76-03.webp",
    type: "chapter_page",
    mangaId: "3",
    chapterId: chapterFor("3", 76)?.id,
    sizeMB: 2.5,
    sizeLabel: "2.5 MB",
    status: "pending",
    uploadedAt: "2026-06-16T09:45:00.000Z",
    visibility: "private",
    url: "https://assets.mangaverse.com/uploads/starfall-academy-chapter-76-03.webp",
    previewGradient: "from-blue-600 via-indigo-500 to-violet-600",
    reason: "Awaiting optimization",
  },
  {
    id: "u5",
    filename: "midnight-bloom-banner.png",
    type: "banner",
    mangaId: "4",
    sizeMB: 4.1,
    sizeLabel: "4.1 MB",
    status: "failed",
    uploadedAt: "2026-06-15T22:35:00.000Z",
    visibility: "public",
    url: "https://assets.mangaverse.com/uploads/midnight-bloom-banner.png",
    previewGradient: "from-purple-800 via-pink-600 to-fuchsia-400",
    reason: "File exceeded 10MB after optimization",
  },
  {
    id: "u6",
    filename: "iron-veil-cover.png",
    type: "cover",
    mangaId: "5",
    sizeMB: 2.0,
    sizeLabel: "2.0 MB",
    status: "completed",
    uploadedAt: "2026-06-11T13:18:00.000Z",
    visibility: "public",
    url: "https://assets.mangaverse.com/uploads/iron-veil-cover.png",
    previewGradient: "from-slate-700 via-blue-800 to-cyan-500",
  },
  {
    id: "u7",
    filename: "garden-of-lies-avatar.webp",
    type: "avatar",
    sizeMB: 1.2,
    sizeLabel: "1.2 MB",
    status: "pending",
    uploadedAt: "2026-06-16T13:22:00.000Z",
    visibility: "private",
    url: "https://assets.mangaverse.com/uploads/garden-of-lies-avatar.webp",
    previewGradient: "from-emerald-700 via-teal-600 to-blue-700",
    reason: "Waiting for thumbnail generation",
  },
  {
    id: "u8",
    filename: "void-walkers-chapter-87-02.png",
    type: "chapter_page",
    mangaId: "9",
    chapterId: chapterFor("9", 87)?.id,
    sizeMB: 3.2,
    sizeLabel: "3.2 MB",
    status: "completed",
    uploadedAt: "2026-06-10T17:01:00.000Z",
    visibility: "public",
    url: "https://assets.mangaverse.com/uploads/void-walkers-chapter-87-02.png",
    previewGradient: "from-indigo-900 via-violet-700 to-fuchsia-600",
  },
  {
    id: "u9",
    filename: "echoes-of-ash-cover.jpg",
    type: "cover",
    mangaId: "6",
    sizeMB: 1.4,
    sizeLabel: "1.4 MB",
    status: "completed",
    uploadedAt: "2026-06-14T07:30:00.000Z",
    visibility: "public",
    url: "https://assets.mangaverse.com/uploads/echoes-of-ash-cover.jpg",
    previewGradient: "from-amber-700 via-red-800 to-stone-900",
  },
];
