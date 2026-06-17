import type { UploadAsset } from "@/lib/mock/uploads";
import { Button } from "@/components/ui/Button";

type AdminUploadQueueProps = {
  uploads: UploadAsset[];
  onRetry: (upload: UploadAsset) => void;
  onRemove: (upload: UploadAsset) => void;
};

export function AdminUploadQueue({ uploads, onRetry, onRemove }: AdminUploadQueueProps) {
  return (
    <div className="glass rounded-3xl p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold text-white">Failed / pending uploads</h3>
          <p className="mt-1 text-sm text-muted">Review and manage problematic uploads.</p>
        </div>
      </div>
      <div className="space-y-4">
        {uploads.map((upload) => (
          <div key={upload.id} className="rounded-3xl border border-white/10 bg-surface/80 p-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-medium text-white">{upload.filename}</p>
                <p className="text-sm text-muted">{upload.type === "chapter_page" ? "Chapter Page" : upload.type}</p>
                <p className="text-xs text-muted">{upload.reason || "Upload requires attention"}</p>
              </div>
              <div className="flex gap-2 flex-wrap">
                <Button variant="secondary" size="sm" onClick={() => onRetry(upload)}>
                  Retry
                </Button>
                <Button variant="ghost" size="sm" onClick={() => onRemove(upload)}>
                  Remove
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
