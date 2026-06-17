type UploadStatsProps = {
  totalFiles: number;
  coverImages: number;
  chapterPages: number;
  storageUsed: string;
  pendingItems: number;
};

export function AdminUploadStats({
  totalFiles,
  coverImages,
  chapterPages,
  storageUsed,
  pendingItems,
}: UploadStatsProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-5">
      <div className="glass rounded-3xl p-5">
        <p className="text-3xl font-semibold text-white">{totalFiles}</p>
        <p className="mt-2 text-sm text-muted">Total Files</p>
      </div>
      <div className="glass rounded-3xl p-5">
        <p className="text-3xl font-semibold text-white">{coverImages}</p>
        <p className="mt-2 text-sm text-muted">Cover Images</p>
      </div>
      <div className="glass rounded-3xl p-5">
        <p className="text-3xl font-semibold text-white">{chapterPages}</p>
        <p className="mt-2 text-sm text-muted">Chapter Pages</p>
      </div>
      <div className="glass rounded-3xl p-5">
        <p className="text-3xl font-semibold text-white">{storageUsed}</p>
        <p className="mt-2 text-sm text-muted">Storage Used</p>
      </div>
      <div className="glass rounded-3xl p-5">
        <p className="text-3xl font-semibold text-white">{pendingItems}</p>
        <p className="mt-2 text-sm text-muted">Failed/Pending</p>
      </div>
    </div>
  );
}
