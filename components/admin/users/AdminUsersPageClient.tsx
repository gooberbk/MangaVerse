"use client";

import { useMemo, useState, useCallback } from "react";
import { AdminShell } from "@/components/admin/AdminShell";
import { Button } from "@/components/ui/Button";
import { AdminUserStats } from "./AdminUserStats";
import { AdminUserFilters, type UserFilters } from "./AdminUserFilters";
import { AdminUsersTable } from "./AdminUsersTable";
import { AdminUserDeleteDialog } from "./AdminUserDeleteDialog";
import { AdminUserDetailsPanel } from "./AdminUserDetailsPanel";
import { AdminUserEmptyState } from "./AdminUserEmptyState";
import { adminUsers } from "@/lib/mock/admin";
import type { AdminUser } from "@/lib/mock/admin";

const initialFilters: UserFilters = {
  search: "",
  role: "all",
  status: "all",
  sortBy: "newest",
};

export function AdminUsersPageClient() {
  const [users, setUsers] = useState<AdminUser[]>(adminUsers);
  const [filters, setFilters] = useState<UserFilters>(initialFilters);
  const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<AdminUser | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const stats = useMemo(() => {
    const totalUsers = users.length;
    const activeReaders = users.filter((user) => user.status === "active").length;
    const adminUsers = users.filter((user) => user.role === "admin").length;
    const suspendedUsers = users.filter((user) => user.status === "suspended").length;
    const newThisMonth = users.filter(
      (user) => new Date(user.joinedAt) >= new Date(Date.now() - 1000 * 60 * 60 * 24 * 30),
    ).length;

    return { totalUsers, activeReaders, adminUsers, suspendedUsers, newThisMonth };
  }, [users]);

  const filteredUsers = useMemo(() => {
    return users
      .filter((user) => {
        if (filters.role !== "all" && user.role !== filters.role) return false;
        if (filters.status !== "all" && user.status !== filters.status) return false;

        const query = filters.search.trim().toLowerCase();
        if (!query) return true;

        return [user.username, user.email, user.role, user.status]
          .join(" ")
          .toLowerCase()
          .includes(query);
      })
      .sort((a, b) => {
        switch (filters.sortBy) {
          case "active":
            return new Date(b.lastActive).getTime() - new Date(a.lastActive).getTime();
          case "chapters":
            return b.chaptersRead - a.chaptersRead;
          case "name":
            return a.username.localeCompare(b.username);
          case "newest":
          default:
            return new Date(b.joinedAt).getTime() - new Date(a.joinedAt).getTime();
        }
      });
  }, [users, filters]);

  const handleViewUser = useCallback((user: AdminUser) => {
    setSelectedUser(user);
  }, []);

  const handleEditUser = useCallback((user: AdminUser) => {
    setSelectedUser(user);
    alert("Edit user is UI-only. This would open an edit form in a full implementation.");
  }, []);

  const handleToggleStatus = useCallback((user: AdminUser) => {
    setUsers((prev) =>
      prev.map((item) =>
        item.id === user.id
          ? {
              ...item,
              status: item.status === "suspended" ? "active" : "suspended",
            }
          : item,
      ),
    );
  }, []);

  const handleDeleteUser = useCallback((user: AdminUser) => {
    setDeleteTarget(user);
  }, []);

  const handleConfirmDelete = useCallback(async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    await new Promise((resolve) => setTimeout(resolve, 400));
    setUsers((prev) => prev.filter((user) => user.id !== deleteTarget.id));
    setDeleteTarget(null);
    setSelectedUser((prev) => (prev?.id === deleteTarget.id ? null : prev));
    setIsDeleting(false);
  }, [deleteTarget]);

  const handleResetFilters = useCallback(() => {
    setFilters(initialFilters);
  }, []);

  const handleCreateUser = useCallback(() => {
    alert("Invite user is UI-only in this admin mock interface.");
  }, []);

  return (
    <AdminShell title="User Management" description="Manage users, permissions, and account status">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">User Management</h1>
          <p className="mt-2 text-muted max-w-2xl">
            Manage user accounts, monitor activity, and handle status changes from the admin dashboard.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button variant="secondary" size="md" onClick={handleCreateUser} className="text-sm">
            Invite User
          </Button>
          <Button variant="primary" size="md" onClick={handleCreateUser} className="text-sm">
            Add User
          </Button>
        </div>
      </div>

      <div className="space-y-6">
        <AdminUserStats {...stats} />
        <AdminUserFilters filters={filters} onFiltersChange={setFilters} />

        <div className="grid gap-6 xl:grid-cols-[1.4fr_0.9fr]">
          <div className="space-y-6">
            {filteredUsers.length > 0 ? (
              <AdminUsersTable
                users={filteredUsers}
                onView={handleViewUser}
                onEdit={handleEditUser}
                onToggleStatus={handleToggleStatus}
                onDelete={handleDeleteUser}
              />
            ) : (
              <AdminUserEmptyState
                message="Try clearing filters or adjusting your search to find users."
                onReset={handleResetFilters}
              />
            )}
          </div>

          <AdminUserDetailsPanel user={selectedUser} />
        </div>
      </div>

      <AdminUserDeleteDialog
        user={deleteTarget}
        isOpen={!!deleteTarget}
        isLoading={isDeleting}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </AdminShell>
  );
}
