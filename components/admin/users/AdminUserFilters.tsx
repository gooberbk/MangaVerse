export type UserFilters = {
  search: string;
  role: "all" | "admin" | "moderator" | "user";
  status: "all" | "active" | "suspended" | "pending";
  sortBy: "newest" | "active" | "chapters" | "name";
};

type AdminUserFiltersProps = {
  filters: UserFilters;
  onFiltersChange: (filters: UserFilters) => void;
};

export function AdminUserFilters({ filters, onFiltersChange }: AdminUserFiltersProps) {
  return (
    <div className="glass rounded-3xl p-5 shadow-lg shadow-black/10">
      <div className="grid gap-4 lg:grid-cols-[1.7fr_1fr_1fr_1fr]">
        <input
          type="text"
          placeholder="Search by name, email, role, or status..."
          value={filters.search}
          onChange={(e) => onFiltersChange({ ...filters, search: e.target.value })}
          className="w-full rounded-3xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-accent-purple/30"
        />
        <select
          value={filters.role}
          onChange={(e) => onFiltersChange({ ...filters, role: e.target.value as UserFilters["role"] })}
          className="w-full rounded-3xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white"
        >
          <option value="all">All Roles</option>
          <option value="admin">Admin</option>
          <option value="moderator">Moderator</option>
          <option value="user">Reader</option>
        </select>
        <select
          value={filters.status}
          onChange={(e) => onFiltersChange({ ...filters, status: e.target.value as UserFilters["status"] })}
          className="w-full rounded-3xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white"
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="suspended">Suspended</option>
          <option value="pending">Pending</option>
        </select>
        <select
          value={filters.sortBy}
          onChange={(e) => onFiltersChange({ ...filters, sortBy: e.target.value as UserFilters["sortBy"] })}
          className="w-full rounded-3xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white"
        >
          <option value="newest">Newest Joined</option>
          <option value="active">Most Active</option>
          <option value="chapters">Most Chapters Read</option>
          <option value="name">Name A-Z</option>
        </select>
      </div>
    </div>
  );
}
