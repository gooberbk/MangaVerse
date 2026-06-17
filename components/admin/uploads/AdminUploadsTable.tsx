import type { UploadAsset } from "@/lib/mock/uploads";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

type AdminUploadsTableProps = {
  uploads: UploadAsset[];
  onPreview: (upload: UploadAsset) => void;
  onCopy: (upload: UploadAsset) => void;
  onReplace: (upload: UploadAsset) => void;
  onDelete: (upload: UploadAsset) => void;
};

export function AdminUploadsTable({ uploads, onPreview, onCopy, onReplace, onDelete }: AdminUploadsTableProps) {
  return (
    <div className="glass rounded-3xl overflow-hidden shadow-lg shadow-black/20">
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full min-w-[900px] border-separate border-spacing-0">
          <thead className="bg-white/5 text-left text-xs uppercase tracking-[0.2em] text-muted">
            <tr>
              <th className="px-6 py-4">Preview</th>
              <th className="px-6 py-4">File</th>
              <th className="px-6 py-4">Type</th>
              <th className="px-6 py-4">Manga</th>
              <th className="px-6 py-4">Chapter</th>
              <th className="px-6 py-4">Size</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Uploaded</th>
              <th className="px-6 py-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 bg-surface/40">
            {uploads.map((upload) => (
              <tr key={upload.id} className="hover:bg-white/5 transition-colors duration-200">
                <td className="px-6 py-4">
                  <div className={cn("h-14 w-14 rounded-2xl bg-gradient-to-br text-white flex items-center justify-center text-sm font-semibold", upload.previewGradient)}>
                    {upload.type.replace("_", " ")}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <p className="font-medium text-white">{upload.filename}</p>
                  <p className="text-xs text-muted">{upload.url}</p>
                </td>
                <td className="px-6 py-4 text-sm text-white">{upload.type === "chapter_page" ? "Chapter Page" : upload.type.charAt(0).toUpperCase() + upload.type.slice(1)}</td>
                <td className="px-6 py-4 text-sm text-muted">{upload.mangaId ?? "—"}</td>
                <td className="px-6 py-4 text-sm text-muted">{upload.chapterId ?? "—"}</td>
                <td className="px-6 py-4 text-sm text-muted">{upload.sizeLabel}</td>
                <td className="px-6 py-4">
                  <span className={cn(
                    "inline-flex rounded-full px-3 py-1 text-xs font-semibold",
                    upload.status === "completed"
                      ? "bg-emerald-500/15 text-emerald-300"
                      : upload.status === "pending"
                      ? "bg-amber-500/15 text-amber-300"
                      : "bg-rose-500/15 text-rose-300",
                  )}>
                    {upload.status}
                  </span>
                  {upload.reason && <p className="mt-1 text-xs text-muted">{upload.reason}</p>}
                </td>
                <td className="px-6 py-4 text-sm text-muted">{new Date(upload.uploadedAt).toLocaleDateString()}</td>
                <td className="px-6 py-4">
                  <div className="flex flex-wrap gap-2">
                    <Button variant="ghost" size="sm" onClick={() => onPreview(upload)}>Preview</Button>
                    <Button variant="ghost" size="sm" onClick={() => onCopy(upload)}>Copy URL</Button>
                    <Button variant="ghost" size="sm" onClick={() => onReplace(upload)}>Replace</Button>
                    <Button variant="ghost" size="sm" onClick={() => onDelete(upload)}>Delete</Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="lg:hidden space-y-4 p-4">
        {uploads.map((upload) => (
          <div key={upload.id} className="rounded-3xl border border-white/10 bg-surface/80 p-4">
            <div className="flex items-center gap-4">
              <div className={cn("h-14 w-14 rounded-2xl flex items-center justify-center text-sm font-semibold text-white", upload.previewGradient)}>
                {upload.type.replace("_", " ")}
              </div>
              <div className="flex-1">
                <p className="font-medium text-white">{upload.filename}</p>
                <p className="text-xs text-muted">{upload.sizeLabel} · {upload.type.replace("_", " ")}</p>
              </div>
            </div>
            <div className="mt-4 space-y-2 text-sm text-muted">
              <p>Manga: {upload.mangaId ?? "—"}</p>
              <p>Chapter: {upload.chapterId ?? "—"}</p>
              <p>Status: {upload.status}</p>
              <p>Uploaded: {new Date(upload.uploadedAt).toLocaleDateString()}</p>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <Button variant="ghost" size="sm" onClick={() => onPreview(upload)}>Preview</Button>
              <Button variant="ghost" size="sm" onClick={() => onCopy(upload)}>Copy URL</Button>
              <Button variant="ghost" size="sm" onClick={() => onReplace(upload)}>Replace</Button>
              <Button variant="ghost" size="sm" onClick={() => onDelete(upload)}>Delete</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
