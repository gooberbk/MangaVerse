"use client";

import { AdminShell } from "@/components/admin/AdminShell";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { Button } from "@/components/ui/Button";
import { useState } from "react";

type ToggleSettingProps = {
  label: string;
  description: string;
  enabled: boolean;
  onToggle: () => void;
};

function ToggleSetting({
  label,
  description,
  enabled,
  onToggle,
}: ToggleSettingProps) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-white/5 bg-white/5 p-4">
      <div className="flex flex-col gap-1">
        <span className="font-medium text-white">{label}</span>
        <span className="text-sm text-muted">{description}</span>
      </div>
      <button
        onClick={onToggle}
        className={`relative h-6 w-11 rounded-full transition-colors duration-200 ${
          enabled ? "bg-accent-purple" : "bg-white/20"
        }`}
      >
        <span
          className={`absolute top-1 h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
            enabled ? "translate-x-6" : "translate-x-1"
          }`}
        />
      </button>
    </div>
  );
}

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState({
    siteName: "MangaVerse",
    siteDescription: "Your premium manga reading experience",
    requireEmailVerification: true,
    allowUserRegistration: true,
    enableComments: true,
    autoImageOptimization: true,
    enableAnalytics: true,
    maintenanceMode: false,
  });

  const [showSuccess, setShowSuccess] = useState(false);

  function handleSave() {
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  }

  return (
    <AdminShell
      title="Settings"
      description="Configure site settings and preferences"
    >
      <AdminPageHeader
        title="Site Settings"
        description="Manage your platform configuration and content rules"
        action={{ label: "Save Changes", href: "#" }}
      />

      <div className="space-y-6">
        {/* Site Information */}
        <div className="glass rounded-2xl p-6 shadow-lg shadow-black/20">
          <h3 className="mb-6 text-lg font-semibold text-white">
            Site Information
          </h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-white">
                Site Name
              </label>
              <input
                type="text"
                value={settings.siteName}
                onChange={(e) =>
                  setSettings({ ...settings, siteName: e.target.value })
                }
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-muted/50 transition-colors focus:border-accent-purple/50 focus:outline-none focus:ring-2 focus:ring-accent-purple/20"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-white">
                Site Description
              </label>
              <textarea
                value={settings.siteDescription}
                onChange={(e) =>
                  setSettings({ ...settings, siteDescription: e.target.value })
                }
                rows={3}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-muted/50 transition-colors focus:border-accent-purple/50 focus:outline-none focus:ring-2 focus:ring-accent-purple/20"
              />
            </div>
          </div>
        </div>

        {/* Content Rules */}
        <div className="glass rounded-2xl p-6 shadow-lg shadow-black/20">
          <h3 className="mb-6 text-lg font-semibold text-white">
            Content Rules
          </h3>
          <div className="space-y-4">
            <ToggleSetting
              label="Require Email Verification"
              description="Users must verify their email before accessing content"
              enabled={settings.requireEmailVerification}
              onToggle={() =>
                setSettings({
                  ...settings,
                  requireEmailVerification: !settings.requireEmailVerification,
                })
              }
            />
            <ToggleSetting
              label="Allow User Registration"
              description="Allow new users to register accounts"
              enabled={settings.allowUserRegistration}
              onToggle={() =>
                setSettings({
                  ...settings,
                  allowUserRegistration: !settings.allowUserRegistration,
                })
              }
            />
            <ToggleSetting
              label="Enable Comments"
              description="Allow users to comment on manga and chapters"
              enabled={settings.enableComments}
              onToggle={() =>
                setSettings({
                  ...settings,
                  enableComments: !settings.enableComments,
                })
              }
            />
          </div>
        </div>

        {/* Storage & Performance */}
        <div className="glass rounded-2xl p-6 shadow-lg shadow-black/20">
          <h3 className="mb-6 text-lg font-semibold text-white">
            Storage & Performance
          </h3>
          <div className="space-y-4">
            <ToggleSetting
              label="Auto Image Optimization"
              description="Automatically optimize uploaded images for web"
              enabled={settings.autoImageOptimization}
              onToggle={() =>
                setSettings({
                  ...settings,
                  autoImageOptimization: !settings.autoImageOptimization,
                })
              }
            />
            <ToggleSetting
              label="Enable Analytics"
              description="Track user engagement and site performance"
              enabled={settings.enableAnalytics}
              onToggle={() =>
                setSettings({
                  ...settings,
                  enableAnalytics: !settings.enableAnalytics,
                })
              }
            />
            <ToggleSetting
              label="Maintenance Mode"
              description="Take the site offline for maintenance"
              enabled={settings.maintenanceMode}
              onToggle={() =>
                setSettings({
                  ...settings,
                  maintenanceMode: !settings.maintenanceMode,
                })
              }
            />
          </div>
        </div>

        {/* Save button */}
        <div className="flex items-center gap-4">
          <Button variant="primary" size="md" onClick={handleSave}>
            Save Changes
          </Button>
          {showSuccess && (
            <div className="flex items-center gap-2 text-sm text-emerald-400">
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
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <path d="m9 11 3 3L22 4" />
              </svg>
              Settings saved successfully
            </div>
          )}
        </div>
      </div>
    </AdminShell>
  );
}
