import { Button } from "@/components/ui/Button";
import type { UploadAsset } from "@/lib/mock/uploads";

type AdminUploadDeleteDialogProps = {
  upload: UploadAsset | null;
  isOpen: boolean;
  isLoading: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

export function AdminUploadDeleteDialog({
  upload,
  isOpen,
  isLoading,
  onConfirm,
  onCancel,
}: AdminUploadDeleteDialogProps) {
  if (!isOpen || !upload) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="glass w-full max-w-md rounded-3xl border border-white/10 p-6 shadow-2xl shadow-black/30">
        <h3 className="text-xl font-semibold text-white">Delete asset</h3>
        <p className="mt-3 text-sm text-muted">
          Are you sure you want to remove <span className="font-medium text-white">{upload.filename}</span>? This is a UI-only action.
        </p>
        <div className="mt-6 flex gap-3">
          <Button variant="secondary" size="md" onClick={onCancel} disabled={isLoading}>
            Cancel
          </Button>
          <Button variant="primary" size="md" onClick={onConfirm} disabled={isLoading}>
            {isLoading ? "Deleting..." : "Delete Asset"}
          </Button>
        </div>
      </div>
    </div>
  );
}
