"use client";

import { useMemo, useState, useCallback } from "react";
import { AdminShell } from "@/components/admin/AdminShell";
import { Button } from "@/components/ui/Button";
import { AdminUploadStats } from "./AdminUploadStats";
import { AdminUploadTabs } from "./AdminUploadTabs";
import { AdminUploadDropzone } from "./AdminUploadDropzone";
import { AdminUploadOptionsPanel } from "./AdminUploadOptionsPanel";
import { AdminUploadsTable } from "./AdminUploadsTable";
import { AdminStorageBreakdown } from "./AdminStorageBreakdown";
import { AdminUploadQueue } from "./AdminUploadQueue";
import { AdminUploadEmptyState } from "./AdminUploadEmptyState";
import { AdminUploadDeleteDialog } from "./AdminUploadDeleteDialog";
import { mockUploads, type UploadAsset } from "@/lib/mock/uploads";
import { mockMangas } from "@/lib/mock/mangas";

export function AdminUploadsPageClient() {
  const [activeTab, setActiveTab] = useState("all");
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [selectedMangaId, setSelectedMangaId] = useState(mockMangas[0]?.id ?? "");
  const [selectedChapter, setSelectedChapter] = useState("98");
  const [assetType, setAssetType] = useState<"cover" | "chapter_page" | "avatar" | "banner">("cover");
  const [autoOptimize, setAutoOptimize] = useState(true);
  const [convertWebP, setConvertWebP] = useState(true);
  const [generateThumbnails, setGenerateThumbnails] = useState(true);
  const [visibility, setVisibility] = useState<"public" | "private">("public");
  const [uploads] = useState<UploadAsset[]>(mockUploads);
  const [deleteTarget, setDeleteTarget] = useState<UploadAsset | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const filteredUploads = useMemo(() => {
    if (activeTab === "all") return uploads;
    if (activeTab === "covers") return uploads.filter((upload) => upload.type === "cover");
    if (activeTab === "chapter_pages") return uploads.filter((upload) => upload.type === "chapter_page");
    if (activeTab === "avatars") return uploads.filter((upload) => upload.type === "avatar");
    return uploads.filter((upload) => upload.status !== "completed");
  }, [activeTab, uploads]);

  const queueUploads = useMemo(
    () => uploads.filter((upload) => upload.status === "failed" || upload.status === "pending"),
    [uploads],
  );

  const stats = useMemo(() => {
    const totalFiles = uploads.length;
    const coverImages = uploads.filter((upload) => upload.type === "cover").length;
    const chapterPages = uploads.filter((upload) => upload.type === "chapter_page").length;
    const storageUsed = `${uploads.reduce((sum, upload) => sum + upload.sizeMB, 0).toFixed(1)} GB`;
    const pendingItems = queueUploads.length;
    return { totalFiles, coverImages, chapterPages, storageUsed, pendingItems };
  }, [uploads, queueUploads.length]);

  const filteredQueue = useMemo(() => queueUploads, [queueUploads]);

  const handleFilesSelected = useCallback((files: FileList) => {
    setSelectedFiles((prev) => [...prev, ...Array.from(files)]);
  }, []);

  const handleTabChange = useCallback((tab: string) => {
    setActiveTab(tab);
  }, []);

  const handleSaveUpload = useCallback(() => {
    alert("Preview data only — Appwrite Storage upload is not connected yet.");
    setSelectedFiles([]);
  }, []);

  const handlePreview = useCallback((upload: UploadAsset) => {
    alert(`Preview UI-only: ${upload.filename}`);
  }, []);

  const handleCopy = useCallback((upload: UploadAsset) => {
    navigator.clipboard.writeText(upload.url).catch(() => {});
    alert(`Copied URL: ${upload.url}`);
  }, []);

  const handleReplace = useCallback((upload: UploadAsset) => {
    alert(`Replace UI-only for ${upload.filename}`);
  }, []);

  const handleDelete = useCallback((upload: UploadAsset) => {
    setDeleteTarget(upload);
  }, []);

  const handleConfirmDelete = useCallback(async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    await new Promise((resolve) => setTimeout(resolve, 400));
    alert("Preview data only — Appwrite Storage delete is not connected yet.");
    setDeleteTarget(null);
    setIsDeleting(false);
  }, [deleteTarget]);

  const handleRetry = useCallback((upload: UploadAsset) => {
    alert(`Retry is preview-only for ${upload.filename}.`);
  }, []);

  const handleRemoveQueue = useCallback((upload: UploadAsset) => {
    alert(`Queue removal is preview-only for ${upload.filename}.`);
  }, []);

  const storageBuckets = useMemo(
    () => [
      { label: "Covers bucket", size: "13.2 GB", percent: 28, accent: "bg-gradient-to-r from-blue-500 to-cyan-500" },
      { label: "Chapter pages bucket", size: "29.0 GB", percent: 61, accent: "bg-gradient-to-r from-purple-500 to-pink-500" },
      { label: "Avatars bucket", size: "3.4 GB", percent: 7, accent: "bg-gradient-to-r from-emerald-500 to-green-500" },
      { label: "Temporary uploads", size: "1.8 GB", percent: 4, accent: "bg-gradient-to-r from-amber-500 to-orange-500" },
    ],
    [],
  );

  return (
    <AdminShell title="Upload Center" description="Manage media assets and storage for your manga library.">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Upload Center</h1>
          <p className="mt-2 text-muted max-w-2xl">
            Manage manga covers, chapter pages, avatars, and temporary media assets in one premium dashboard.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button variant="primary" size="md" onClick={() => alert("Upload Files is UI-only.")}>Upload Files</Button>
          <Button variant="secondary" size="md" onClick={() => alert("Storage Settings is UI-only.")}>Storage Settings</Button>
        </div>
      </div>

      <div className="space-y-6">
        <div className="rounded-xl border border-amber-400/20 bg-amber-400/10 px-4 py-3 text-sm text-amber-100">
          <span className="font-semibold">Preview data only</span>
          <span className="text-amber-100/80">
            {" "}
            - Appwrite Storage upload is not connected yet.
          </span>
        </div>

        <AdminUploadStats {...stats} />
        <AdminUploadTabs activeTab={activeTab} onChange={handleTabChange} />

        <div className="grid gap-6 xl:grid-cols-[1.4fr_0.9fr]">
          <div className="space-y-6">
            <AdminUploadDropzone
              isDragging={isDragging}
              onDragStart={() => setIsDragging(true)}
              onDragEnd={() => setIsDragging(false)}
              onFilesSelected={handleFilesSelected}
              selectedFiles={selectedFiles}
            />
            <AdminUploadOptionsPanel
              mangas={mockMangas}
              selectedMangaId={selectedMangaId}
              selectedChapter={selectedChapter}
              assetType={assetType}
              autoOptimize={autoOptimize}
              convertWebP={convertWebP}
              generateThumbnails={generateThumbnails}
              visibility={visibility}
              onChange={(field, value) => {
                if (field === "selectedMangaId") setSelectedMangaId(value as string);
                if (field === "selectedChapter") setSelectedChapter(value as string);
                if (field === "assetType") setAssetType(value as "cover" | "chapter_page" | "avatar" | "banner");
                if (field === "visibility") setVisibility(value as "public" | "private");
                if (field === "autoOptimize") setAutoOptimize(value as boolean);
                if (field === "convertWebP") setConvertWebP(value as boolean);
                if (field === "generateThumbnails") setGenerateThumbnails(value as boolean);
              }}
              onSave={handleSaveUpload}
            />

            {filteredUploads.length > 0 ? (
              <AdminUploadsTable
                uploads={filteredUploads}
                onPreview={handlePreview}
                onCopy={handleCopy}
                onReplace={handleReplace}
                onDelete={handleDelete}
              />
            ) : (
              <AdminUploadEmptyState
                message="No uploads match this filter. Switch tabs or upload new assets to populate this view."
                onReset={() => setActiveTab("all")}
              />
            )}
          </div>

          <div className="space-y-6">
            <AdminStorageBreakdown buckets={storageBuckets} />
            <AdminUploadQueue uploads={filteredQueue} onRetry={handleRetry} onRemove={handleRemoveQueue} />
          </div>
        </div>
      </div>

      <AdminUploadDeleteDialog
        upload={deleteTarget}
        isOpen={!!deleteTarget}
        isLoading={isDeleting}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </AdminShell>
  );
}
