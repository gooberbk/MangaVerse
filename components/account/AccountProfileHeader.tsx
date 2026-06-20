import { AccountStatCard } from "./AccountStatCard";
import { cn } from "@/lib/utils";

type AccountProfileHeaderProps = {
  username?: string;
  email?: string;
  joinDate?: string;
  role?: string;
  className?: string;
};

export function AccountProfileHeader({
  username = "MangaFan",
  email = "mangafan@example.com",
  joinDate = "January 2024",
  role = "reader",
  className,
}: AccountProfileHeaderProps) {
  const initials = username
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div
      className={cn(
        "glass-panel rounded-2xl p-6 sm:p-8",
        className,
      )}
    >
      {/* Background gradient glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent-purple/10 via-transparent to-accent-pink/5" />
      <div className="absolute -left-20 top-0 h-48 w-48 rounded-full bg-accent-purple/20 blur-3xl" />
      <div className="absolute -right-16 bottom-0 h-40 w-40 rounded-full bg-accent-pink/15 blur-3xl" />

      <div className="relative">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:gap-8">
          {/* Avatar */}
          <div className="flex shrink-0">
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-accent-purple to-accent-pink text-2xl font-bold text-white shadow-lg shadow-purple-500/25 sm:h-24 sm:w-24 sm:text-3xl">
              {initials}
            </div>
          </div>

          {/* User info */}
          <div className="flex-1">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-2xl font-bold text-white sm:text-3xl">
                  {username}
                </h1>
                <p className="mt-1 text-sm text-muted">{email}</p>
              </div>
              <div className="inline-flex items-center rounded-full bg-white/5 px-3 py-1.5 border border-white/10">
                <span className="h-2 w-2 rounded-full bg-accent-purple mr-2" />
                <span className="text-xs font-medium text-white">
                  {formatRole(role)}
                </span>
              </div>
            </div>
            <p className="mt-3 text-xs text-muted">
              Member since {joinDate}
            </p>
          </div>
        </div>

        {/* Reading stats */}
        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <AccountStatCard label="Manga Saved" value={24} />
          <AccountStatCard label="Chapters Read" value={342} />
          <AccountStatCard label="Reading Streak" value="12 days" />
          <AccountStatCard label="Completed" value={8} />
        </div>
      </div>
    </div>
  );
}

function formatRole(role: string) {
  const normalizedRole = role.trim() || "reader";

  return `${normalizedRole.charAt(0).toUpperCase()}${normalizedRole.slice(1)} Reader`;
}
