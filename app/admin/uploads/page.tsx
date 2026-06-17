"use client";

import { AdminShell } from "@/components/admin/AdminShell";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { Button } from "@/components/ui/Button";
import { adminStats } from "@/lib/mock/admin";
import { useState } from "react";

export default function AdminUploadsPage() {
  const [isDragging, setIsDragging] = useState(false);

  return (
    <AdminShell
      title="Upload Center"
      description="Manage file uploads and storage"
    >
      <AdminPageHeader
        title="Upload Center"
        description="Upload manga covers, chapter pages, and manage storage"
      />

      <div className="space-y-6">
        {/* Storage stats */}
        <div className="grid gap-4 sm:grid-cols-4">
          <div className="glass rounded-xl p-4">
            <p className="text-2xl font-bold text-white">{adminStats.storageUsed}</p>
            <p className="text-sm text-muted">Storage Used</p>
          </div>
          <div className="glass rounded-xl p-4">
            <p className="text-2xl font-bold text-white">{adminStats.storageUsedPercentage}%</p>
            <p className="text-sm text-muted">Capacity Used</p>
          </div>
          <div className="glass rounded-xl p-4">
            <p className="text-2xl font-bold text-white">54.2 GB</p>
            <p className="text-sm text-muted">Available</p>
          </div>
          <div className="glass rounded-xl p-4">
            <p className="text-2xl font-bold text-white">100 GB</p>
            <p className="text-sm text-muted">Total Capacity</p>
          </div>
        </div>

        {/* Upload area */}
        <div
          className={`glass relative rounded-2xl border-2 border-dashed p-12 text-center transition-all duration-300 ${
            isDragging
              ? "border-accent-purple bg-accent-purple/5"
              : "border-white/20 hover:border-white/30 hover:bg-white/5"
          }`}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setIsDragging(false);
          }}
        >
          <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-accent-purple/20 to-accent-pink/20">
            <span className="text-4xl">☁️</span>
          </div>
          <h3 className="mb-2 text-xl font-semibold text-white">
            Drag & Drop Files Here
          </h3>
          <p className="mb-6 text-muted max-w-md mx-auto">
            Upload manga covers, chapter pages, or other assets. Supports
            JPG, PNG, WEBP up to 10MB per file.
          </p>
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button variant="primary" size="md">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="12" y1="3" x2="12" y2="15" />
              </svg>
              Select Files
            </Button>
            <Button variant="secondary" size="md">
              View Upload History
            </Button>
          </div>
        </div>

        {/* Storage breakdown */}
        <div className="glass rounded-2xl p-6">
          <h3 className="mb-6 text-lg font-semibold text-white">
            Storage Breakdown
          </h3>
          <div className="space-y-4">
            <div>
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm font-medium text-white">Manga Covers</span>
                <span className="text-sm text-muted">12.4 GB (27%)</span>
              </div>
              <div className="h-2 w-full rounded-full bg-white/10">
                <div className="h-2 w-[27%] rounded-full bg-gradient-to-r from-blue-500 to-cyan-500" />
              </div>
            </div>
            <div>
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm font-medium text-white">
                  Chapter Pages
                </span>
                <span className="text-sm text-muted">28.6 GB (62%)</span>
              </div>
              <div className="h-2 w-full rounded-full bg-white/10">
                <div className="h-2 w-[62%] rounded-full bg-gradient-to-r from-purple-500 to-pink-500" />
              </div>
            </div>
            <div>
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm font-medium text-white">User Avatars</span>
                <span className="text-sm text-muted">2.8 GB (6%)</span>
              </div>
              <div className="h-2 w-full rounded-full bg-white/10">
                <div className="h-2 w-[6%] rounded-full bg-gradient-to-r from-emerald-500 to-green-500" />
              </div>
            </div>
            <div>
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm font-medium text-white">Other Assets</span>
                <span className="text-sm text-muted">2.0 GB (5%)</span>
              </div>
              <div className="h-2 w-full rounded-full bg-white/10">
                <div className="h-2 w-[5%] rounded-full bg-gradient-to-r from-amber-500 to-orange-500" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminShell>
  );
}
