type AdminUserStatsProps = {
  totalUsers: number;
  activeReaders: number;
  adminUsers: number;
  newThisMonth: number;
  suspendedUsers: number;
};

export function AdminUserStats({
  totalUsers,
  activeReaders,
  adminUsers,
  newThisMonth,
  suspendedUsers,
}: AdminUserStatsProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-5">
      <div className="glass rounded-3xl p-5">
        <p className="text-3xl font-semibold text-white">{totalUsers}</p>
        <p className="mt-2 text-sm text-muted">Total Users</p>
      </div>
      <div className="glass rounded-3xl p-5">
        <p className="text-3xl font-semibold text-white">{activeReaders}</p>
        <p className="mt-2 text-sm text-muted">Active Readers</p>
      </div>
      <div className="glass rounded-3xl p-5">
        <p className="text-3xl font-semibold text-white">{adminUsers}</p>
        <p className="mt-2 text-sm text-muted">Admin Users</p>
      </div>
      <div className="glass rounded-3xl p-5">
        <p className="text-3xl font-semibold text-white">{newThisMonth}</p>
        <p className="mt-2 text-sm text-muted">New This Month</p>
      </div>
      <div className="glass rounded-3xl p-5">
        <p className="text-3xl font-semibold text-white">{suspendedUsers}</p>
        <p className="mt-2 text-sm text-muted">Suspended Users</p>
      </div>
    </div>
  );
}
