import { AdminShell } from "@/components/admin/AdminShell";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { AdminTablePreview } from "@/components/admin/AdminTablePreview";
import { adminUsers } from "@/lib/mock/admin";
import { cn } from "@/lib/utils";
import { formatUpdatedDate } from "@/lib/utils";

const userTableColumns = [
  { key: "user", label: "User", width: "w-1/4" },
  { key: "email", label: "Email", width: "w-1/4" },
  { key: "role", label: "Role", width: "w-1/6" },
  { key: "status", label: "Status", width: "w-1/6" },
  { key: "lastActive", label: "Last Active", width: "w-1/6" },
];

const roleColors: Record<string, string> = {
  admin: "bg-purple-500/20 text-purple-300 border-purple-500/30",
  moderator: "bg-blue-500/20 text-blue-300 border-blue-500/30",
  user: "bg-gray-500/20 text-gray-300 border-gray-500/30",
};

const statusColors: Record<string, string> = {
  active: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  suspended: "bg-rose-500/20 text-rose-300 border-rose-500/30",
  pending: "bg-amber-500/20 text-amber-300 border-amber-500/30",
};

const userTableData = adminUsers.map((user) => ({
  user: (
    <div className="flex items-center gap-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-accent-purple to-accent-pink font-bold text-white">
        {user.username[0].toUpperCase()}
      </div>
      <span className="font-medium text-white">{user.username}</span>
    </div>
  ),
  email: user.email,
  role: (
    <span
      className={cn(
        "inline-flex rounded-full px-2 py-1 text-xs font-medium border",
        roleColors[user.role],
      )}
    >
      {user.role}
    </span>
  ),
  status: (
    <span
      className={cn(
        "inline-flex rounded-full px-2 py-1 text-xs font-medium border",
        statusColors[user.status],
      )}
    >
      {user.status}
    </span>
  ),
  lastActive: formatUpdatedDate(user.lastActive),
}));

export default function AdminUsersPage() {
  return (
    <AdminShell title="User Management" description="Manage users and permissions">
      <AdminPageHeader
        title="Users"
        description="View and manage all registered users"
        action={{ label: "Invite User", href: "#" }}
      />

      <div className="space-y-6">
        {/* Stats row */}
        <div className="grid gap-4 sm:grid-cols-4">
          <div className="glass rounded-xl p-4">
            <p className="text-2xl font-bold text-white">{adminUsers.length}</p>
            <p className="text-sm text-muted">Total Users</p>
          </div>
          <div className="glass rounded-xl p-4">
            <p className="text-2xl font-bold text-white">
              {adminUsers.filter((u) => u.status === "active").length}
            </p>
            <p className="text-sm text-muted">Active Users</p>
          </div>
          <div className="glass rounded-xl p-4">
            <p className="text-2xl font-bold text-white">
              {adminUsers.filter((u) => u.role === "admin").length}
            </p>
            <p className="text-sm text-muted">Admins</p>
          </div>
          <div className="glass rounded-xl p-4">
            <p className="text-2xl font-bold text-white">
              {adminUsers.filter((u) => u.status === "suspended").length}
            </p>
            <p className="text-sm text-muted">Suspended</p>
          </div>
        </div>

        {/* User table */}
        <AdminTablePreview columns={userTableColumns} data={userTableData} />
      </div>
    </AdminShell>
  );
}
