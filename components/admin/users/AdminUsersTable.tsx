"use client";

import { cn } from "@/lib/utils";
import type { AdminUser } from "@/lib/mock/admin";
import { AdminUserBadge } from "./AdminUserBadge";

type AdminUsersTableProps = {
  users: AdminUser[];
  onView: (user: AdminUser) => void;
  onEdit: (user: AdminUser) => void;
  onToggleStatus: (user: AdminUser) => void;
  onDelete: (user: AdminUser) => void;
};

export function AdminUsersTable({ users, onView, onEdit, onToggleStatus, onDelete }: AdminUsersTableProps) {
  return (
    <div className="glass rounded-3xl overflow-hidden shadow-lg shadow-black/20">
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full min-w-[1000px] text-left text-sm">
          <thead className="bg-white/5 text-xs uppercase tracking-[0.2em] text-muted">
            <tr>
              <th className="px-6 py-4">User</th>
              <th className="px-6 py-4">Email</th>
              <th className="px-6 py-4">Role</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Saved Manga</th>
              <th className="px-6 py-4">Chapters Read</th>
              <th className="px-6 py-4">Last Active</th>
              <th className="px-6 py-4">Joined</th>
              <th className="px-6 py-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 bg-surface/40">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-white/5 transition-colors duration-200">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      "flex h-11 w-11 items-center justify-center rounded-full text-sm font-semibold text-white",
                      user.avatarGradient,
                    )}>
                      {user.username
                        .split(" ")
                        .map((part) => part[0])
                        .join("")
                        .slice(0, 2)}
                    </div>
                    <div>
                      <p className="font-medium text-white">{user.username}</p>
                      <p className="text-xs text-muted">{user.role === "user" ? "Reader" : user.role}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-muted">{user.email}</td>
                <td className="px-6 py-4">
                  <AdminUserBadge type="role" value={user.role} />
                </td>
                <td className="px-6 py-4">
                  <AdminUserBadge type="status" value={user.status} />
                </td>
                <td className="px-6 py-4 text-sm text-white">{user.savedMangaCount}</td>
                <td className="px-6 py-4 text-sm text-white">{user.chaptersRead}</td>
                <td className="px-6 py-4 text-sm text-muted">{new Date(user.lastActive).toLocaleDateString()}</td>
                <td className="px-6 py-4 text-sm text-muted">{new Date(user.joinedAt).toLocaleDateString()}</td>
                <td className="px-6 py-4">
                  <div className="flex flex-wrap gap-2 justify-center">
                    <button className="text-xs text-muted hover:text-white" onClick={() => onView(user)}>View</button>
                    <button className="text-xs text-muted hover:text-white" onClick={() => onEdit(user)}>Edit</button>
                    <button className="text-xs text-muted hover:text-white" onClick={() => onToggleStatus(user)}>{user.status === "suspended" ? "Restore" : "Suspend"}</button>
                    <button className="text-xs text-rose-300 hover:text-white" onClick={() => onDelete(user)}>Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="lg:hidden space-y-4 p-4">
        {users.map((user) => (
          <div key={user.id} className="rounded-3xl border border-white/10 bg-surface/80 p-4 shadow-sm">
            <div className="flex items-center gap-4">
              <div className={cn(
                "flex h-12 w-12 items-center justify-center rounded-full text-sm font-semibold text-white",
                user.avatarGradient,
              )}>
                {user.username
                  .split(" ")
                  .map((part) => part[0])
                  .join("")
                  .slice(0, 2)}
              </div>
              <div className="flex-1">
                <p className="font-medium text-white">{user.username}</p>
                <p className="text-xs text-muted">{user.email}</p>
              </div>
              <AdminUserBadge type="status" value={user.status} />
            </div>
            <div className="mt-4 grid gap-3 text-sm text-muted sm:grid-cols-2">
              <div>Role: <span className="text-white">{user.role}</span></div>
              <div>Saved: <span className="text-white">{user.savedMangaCount}</span></div>
              <div>Chapters: <span className="text-white">{user.chaptersRead}</span></div>
              <div>Joined: <span className="text-white">{new Date(user.joinedAt).toLocaleDateString()}</span></div>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <button className="rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-muted hover:bg-white/10 hover:text-white" onClick={() => onView(user)}>View</button>
              <button className="rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-muted hover:bg-white/10 hover:text-white" onClick={() => onEdit(user)}>Edit</button>
              <button className="rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-muted hover:bg-white/10 hover:text-white" onClick={() => onToggleStatus(user)}>{user.status === "suspended" ? "Restore" : "Suspend"}</button>
              <button className="rounded-2xl border border-rose-500/30 bg-rose-500/10 px-3 py-2 text-xs text-rose-200 hover:bg-rose-500/20" onClick={() => onDelete(user)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
