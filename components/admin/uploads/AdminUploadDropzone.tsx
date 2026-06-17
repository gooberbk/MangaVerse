import { useRef } from "react";
import { Button } from "@/components/ui/Button";

type AdminUploadDropzoneProps = {
  isDragging: boolean;
  onDragStart: () => void;
  onDragEnd: () => void;
  onFilesSelected: (files: FileList) => void;
  selectedFiles: File[];
};

export function AdminUploadDropzone({
  isDragging,
  onDragStart,
  onDragEnd,
  onFilesSelected,
  selectedFiles,
}: AdminUploadDropzoneProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  return (
    <div>
      <div
        className={`glass relative rounded-3xl border-2 border-dashed p-10 text-center transition-all duration-300 ${
          isDragging
            ? "border-accent-purple bg-accent-purple/10"
            : "border-white/20 hover:border-white/30 hover:bg-white/5"
        }`}
        onDragOver={(e) => {
          e.preventDefault();
          onDragStart();
        }}
        onDragLeave={onDragEnd}
        onDrop={(e) => {
          e.preventDefault();
          onDragEnd();
          if (e.dataTransfer.files.length) {
            onFilesSelected(e.dataTransfer.files);
          }
        }}
      >
        <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-accent-purple/20 to-accent-pink/20 text-4xl">
          ☁️
        </div>
        <h3 className="text-xl font-semibold text-white">Drag and drop files here</h3>
        <p className="mt-2 text-sm text-muted">
          Supported formats: JPG, PNG, WebP. Max 10MB per file.
        </p>
        <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Button
            variant="primary"
            size="md"
            type="button"
            onClick={() => fileInputRef.current?.click()}
          >
            Browse Files
          </Button>
          <Button variant="secondary" size="md" type="button">
            View Selected Queue
          </Button>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/jpeg,image/png,image/webp"
          className="hidden"
          onChange={(e) => {
            if (e.target.files) onFilesSelected(e.target.files);
          }}
        />
      </div>

      {selectedFiles.length > 0 && (
        <div className="mt-5 rounded-3xl border border-white/10 bg-surface/80 p-4">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-sm font-semibold text-white">Selected files</p>
            <p className="text-xs text-muted">{selectedFiles.length} files ready</p>
          </div>
          <div className="space-y-3">
            {selectedFiles.map((file) => (
              <div key={file.name} className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                <div>
                  <p className="text-sm font-medium text-white">{file.name}</p>
                  <p className="text-xs text-muted">{Math.round(file.size / 1024)} KB</p>
                </div>
                <span className="rounded-full bg-white/5 px-3 py-1 text-xs text-muted">Queued</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
