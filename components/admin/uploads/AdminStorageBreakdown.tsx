type StorageBucket = {
  label: string;
  size: string;
  percent: number;
  accent: string;
};

type AdminStorageBreakdownProps = {
  buckets: StorageBucket[];
};

export function AdminStorageBreakdown({ buckets }: AdminStorageBreakdownProps) {
  return (
    <div className="glass rounded-3xl p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold text-white">Storage breakdown</h3>
          <p className="mt-1 text-sm text-muted">Track usage across upload buckets.</p>
        </div>
      </div>
      <div className="space-y-4">
        {buckets.map((bucket) => (
          <div key={bucket.label}>
            <div className="mb-2 flex items-center justify-between text-sm text-white">
              <span>{bucket.label}</span>
              <span className="text-muted">{bucket.size}</span>
            </div>
            <div className="h-3 w-full rounded-full bg-white/10">
              <div
                className={`h-3 rounded-full ${bucket.accent}`}
                style={{ width: `${bucket.percent}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
