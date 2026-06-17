import { mockMangas } from "./mangas";
import { mockChapters } from "./chapters";

export interface AdminStats {
  totalManga: number;
  totalChapters: number;
  monthlyReads: number;
  activeUsers: number;
  storageUsed: string;
  storageUsedPercentage: number;
}

export interface AdminActivity {
  id: string;
  type: "manga_created" | "chapter_uploaded" | "user_registered" | "settings_updated";
  message: string;
  timestamp: string;
  user?: string;
}

export interface AdminUser {
  id: string;
  username: string;
  email: string;
  role: "admin" | "moderator" | "user";
  status: "active" | "suspended" | "pending";
  joinedAt: string;
  lastActive: string;
  savedMangaCount: number;
  chaptersRead: number;
  completedManga: number;
  readingStreak: number;
  avatarGradient: string;
  recentActivity: { id: string; message: string; timestamp: string }[];
}

export interface ContentHealth {
  category: string;
  status: "healthy" | "warning" | "critical";
  count: number;
  message: string;
}

export const adminStats: AdminStats = {
  totalManga: mockMangas.length,
  totalChapters: mockChapters.length,
  monthlyReads: 284750,
  activeUsers: 12450,
  storageUsed: "45.8 GB",
  storageUsedPercentage: 45,
};

export const adminActivities: AdminActivity[] = [
  {
    id: "1",
    type: "chapter_uploaded",
    message: 'Uploaded chapter 142 for "Neon Eclipse"',
    timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
    user: "Admin",
  },
  {
    id: "2",
    type: "manga_created",
    message: 'Created new manga "Cosmic Drift"',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    user: "Admin",
  },
  {
    id: "3",
    type: "user_registered",
    message: 'New user "MangaReader2024" registered',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(),
  },
  {
    id: "4",
    type: "chapter_uploaded",
    message: 'Uploaded chapter 98 for "Crimson Horizon"',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(),
    user: "Admin",
  },
  {
    id: "5",
    type: "settings_updated",
    message: "Updated site configuration settings",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
    user: "Admin",
  },
  {
    id: "6",
    type: "chapter_uploaded",
    message: 'Uploaded chapter 76 for "Starfall Academy"',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 18).toISOString(),
    user: "Moderator",
  },
];

export const adminUsers: AdminUser[] = [
  {
    id: "1",
    username: "Admin",
    email: "admin@mangaverse.com",
    role: "admin",
    status: "active",
    joinedAt: "2024-01-01T00:00:00.000Z",
    lastActive: new Date().toISOString(),
    savedMangaCount: 124,
    chaptersRead: 982,
    completedManga: 28,
    readingStreak: 18,
    avatarGradient: "from-violet-600 via-fuchsia-500 to-rose-500",
    recentActivity: [
      { id: "a1", message: "Updated site configuration.", timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString() },
      { id: "a2", message: "Approved new moderator account.", timestamp: new Date(Date.now() - 1000 * 60 * 60).toISOString() },
    ],
  },
  {
    id: "2",
    username: "Moderator1",
    email: "mod1@mangaverse.com",
    role: "moderator",
    status: "active",
    joinedAt: "2024-02-15T00:00:00.000Z",
    lastActive: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
    savedMangaCount: 96,
    chaptersRead: 742,
    completedManga: 15,
    readingStreak: 12,
    avatarGradient: "from-blue-500 via-cyan-500 to-sky-500",
    recentActivity: [
      { id: "a3", message: "Reviewed reported content.", timestamp: new Date(Date.now() - 1000 * 60 * 90).toISOString() },
      { id: "a4", message: "Updated user permissions.", timestamp: new Date(Date.now() - 1000 * 60 * 180).toISOString() },
    ],
  },
  {
    id: "3",
    username: "MangaFan123",
    email: "fan123@example.com",
    role: "user",
    status: "active",
    joinedAt: "2024-03-20T00:00:00.000Z",
    lastActive: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    savedMangaCount: 34,
    chaptersRead: 512,
    completedManga: 8,
    readingStreak: 9,
    avatarGradient: "from-fuchsia-600 via-pink-500 to-rose-500",
    recentActivity: [
      { id: "a5", message: "Saved Neon Eclipse to library.", timestamp: new Date(Date.now() - 1000 * 60 * 45).toISOString() },
      { id: "a6", message: "Finished chapter 142 of Neon Eclipse.", timestamp: new Date(Date.now() - 1000 * 60 * 120).toISOString() },
    ],
  },
  {
    id: "4",
    username: "ReaderX",
    email: "readerx@example.com",
    role: "user",
    status: "active",
    joinedAt: "2024-04-10T00:00:00.000Z",
    lastActive: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    savedMangaCount: 21,
    chaptersRead: 388,
    completedManga: 5,
    readingStreak: 6,
    avatarGradient: "from-cyan-500 via-blue-500 to-indigo-500",
    recentActivity: [
      { id: "a7", message: "Commented on Crimson Horizon.", timestamp: new Date(Date.now() - 1000 * 60 * 80).toISOString() },
      { id: "a8", message: "Started Starfall Academy.", timestamp: new Date(Date.now() - 1000 * 60 * 160).toISOString() },
    ],
  },
  {
    id: "5",
    username: "SuspendedUser",
    email: "suspended@example.com",
    role: "user",
    status: "suspended",
    joinedAt: "2024-05-01T00:00:00.000Z",
    lastActive: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString(),
    savedMangaCount: 8,
    chaptersRead: 62,
    completedManga: 1,
    readingStreak: 0,
    avatarGradient: "from-rose-700 via-red-600 to-orange-500",
    recentActivity: [
      { id: "a9", message: "Account suspended for suspicious activity.", timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString() },
    ],
  },
];

export const contentHealth: ContentHealth[] = [
  {
    category: "Manga covers",
    status: "healthy",
    count: mockMangas.length,
    message: "All covers properly optimized",
  },
  {
    category: "Chapter pages",
    status: "warning",
    count: 12,
    message: "12 chapters need page optimization",
  },
  {
    category: "Metadata",
    status: "healthy",
    count: mockMangas.length,
    message: "All metadata complete",
  },
  {
    category: "Broken links",
    status: "healthy",
    count: 0,
    message: "No broken links detected",
  },
];

export const recentChapters = mockChapters.slice(0, 8).map((chapter) => {
  const manga = mockMangas.find((m) => m.id === chapter.mangaId);
  return {
    ...chapter,
    mangaTitle: manga?.title || "Unknown",
    mangaSlug: manga?.slug || "unknown",
    coverGradient: manga?.coverGradient || "from-slate-800 to-slate-900",
  };
});
