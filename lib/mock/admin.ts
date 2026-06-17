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
  },
  {
    id: "2",
    username: "Moderator1",
    email: "mod1@mangaverse.com",
    role: "moderator",
    status: "active",
    joinedAt: "2024-02-15T00:00:00.000Z",
    lastActive: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
  },
  {
    id: "3",
    username: "MangaFan123",
    email: "fan123@example.com",
    role: "user",
    status: "active",
    joinedAt: "2024-03-20T00:00:00.000Z",
    lastActive: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
  },
  {
    id: "4",
    username: "ReaderX",
    email: "readerx@example.com",
    role: "user",
    status: "active",
    joinedAt: "2024-04-10T00:00:00.000Z",
    lastActive: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
  },
  {
    id: "5",
    username: "SuspendedUser",
    email: "suspended@example.com",
    role: "user",
    status: "suspended",
    joinedAt: "2024-05-01T00:00:00.000Z",
    lastActive: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString(),
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
