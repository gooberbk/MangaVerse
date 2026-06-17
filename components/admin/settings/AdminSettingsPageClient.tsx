"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AdminShell } from "@/components/admin/AdminShell";
import { Button } from "@/components/ui/Button";
import { AdminSettingsPanel } from "./AdminSettingsPanel";
import { AdminSettingsToggle } from "./AdminSettingsToggle";
import { AdminSettingsSelect } from "./AdminSettingsSelect";
import { AdminSettingsField } from "./AdminSettingsField";
import { AdminSettingsDangerZone } from "./AdminSettingsDangerZone";
import { AdminSettingsSuccessToast } from "./AdminSettingsSuccessToast";
import { AdminSettingsResetDialog } from "./AdminSettingsResetDialog";
import { AdminSettingsFormatChips } from "./AdminSettingsFormatChips";
import { defaultAdminSettings } from "@/lib/mock/admin-settings";
import type { AdminSettings } from "@/lib/mock/admin-settings";

const languageOptions = [
  { value: "en", label: "English" },
  { value: "es", label: "Spanish" },
  { value: "fr", label: "French" },
  { value: "de", label: "German" },
  { value: "ja", label: "Japanese" },
] as const;

const visibilityOptions = [
  { value: "public", label: "Public" },
  { value: "private", label: "Private" },
  { value: "draft", label: "Draft" },
] as const;

const readingModeOptions = [
  { value: "vertical", label: "Vertical scroll" },
  { value: "paged", label: "Paged reader" },
] as const;

const readerWidthOptions = [
  { value: "fit", label: "Fit to screen" },
  { value: "wide", label: "Wide canvas" },
] as const;

const sizeOptions = [
  { value: "2", label: "2 MB" },
  { value: "5", label: "5 MB" },
  { value: "10", label: "10 MB" },
  { value: "20", label: "20 MB" },
] as const;

const storageThresholdOptions = [
  { value: "50", label: "50 GB" },
  { value: "75", label: "75 GB" },
  { value: "80", label: "80 GB" },
  { value: "90", label: "90 GB" },
] as const;

const cacheModeOptions = [
  { value: "local", label: "Local cache" },
  { value: "cdn", label: "CDN cache" },
  { value: "hybrid", label: "Hybrid cache" },
] as const;

const sessionTimeoutOptions = [
  { value: "15", label: "15 minutes" },
  { value: "30", label: "30 minutes" },
  { value: "60", label: "60 minutes" },
  { value: "120", label: "120 minutes" },
] as const;

const auditRetentionOptions = [
  { value: "30", label: "30 days" },
  { value: "90", label: "90 days" },
  { value: "180", label: "180 days" },
  { value: "365", label: "365 days" },
] as const;

const uploadFormatOptions = [
  { value: "jpg", label: "JPG" },
  { value: "png", label: "PNG" },
  { value: "webp", label: "WebP" },
] as const;

function createDefaultSettings(): AdminSettings {
  return {
    siteIdentity: { ...defaultAdminSettings.siteIdentity },
    contentRules: {
      ...defaultAdminSettings.contentRules,
      allowedUploadFormats: [...defaultAdminSettings.contentRules.allowedUploadFormats],
    },
    readerExperience: { ...defaultAdminSettings.readerExperience },
    storageOptimization: { ...defaultAdminSettings.storageOptimization },
    adminSecurity: { ...defaultAdminSettings.adminSecurity },
  };
}

function formatUploadFormat(format: string) {
  if (format === "webp") return "WebP";
  return format.toUpperCase();
}

function formatCacheMode(mode: AdminSettings["storageOptimization"]["cdnMode"]) {
  const option = cacheModeOptions.find((item) => item.value === mode);
  return option?.label ?? "Local cache";
}

function toNumber(value: string, fallback: number) {
  return Number.parseInt(value, 10) || fallback;
}

export function AdminSettingsPageClient() {
  const [settings, setSettings] = useState<AdminSettings>(() => createDefaultSettings());
  const [showSuccess, setShowSuccess] = useState(false);
  const [toastMessage, setToastMessage] = useState("Settings saved successfully.");
  const [isSaving, setIsSaving] = useState(false);
  const [isClearingCache, setIsClearingCache] = useState(false);
  const [showResetDialog, setShowResetDialog] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (toastTimer.current) {
        clearTimeout(toastTimer.current);
      }
    };
  }, []);

  const showToast = useCallback((message: string) => {
    if (toastTimer.current) {
      clearTimeout(toastTimer.current);
    }

    setToastMessage(message);
    setShowSuccess(true);
    toastTimer.current = setTimeout(() => setShowSuccess(false), 3000);
  }, []);

  const updateSection = useCallback(
    function updateSection<K extends keyof AdminSettings>(
      section: K,
      patch: Partial<AdminSettings[K]>,
    ) {
      setSettings((previous) => ({
        ...previous,
        [section]: {
          ...previous[section],
          ...patch,
        },
      }));
    },
    [],
  );

  const featureStates = useMemo(
    () => [
      settings.siteIdentity.maintenanceMode,
      settings.siteIdentity.announcementBannerEnabled,
      settings.contentRules.allowComments,
      settings.contentRules.requireModeration,
      settings.contentRules.allowGuestReading,
      settings.readerExperience.showPageNumbers,
      settings.readerExperience.autoNextChapter,
      settings.readerExperience.enableContinueReading,
      settings.readerExperience.enableRecommendations,
      settings.storageOptimization.autoConvertToWebP,
      settings.storageOptimization.generateThumbnails,
      settings.storageOptimization.compressChapterPages,
      settings.storageOptimization.keepOriginalFiles,
      settings.adminSecurity.require2FA,
      settings.adminSecurity.allowRoleManagement,
    ],
    [settings],
  );

  const enabledFeatureCount = featureStates.filter(Boolean).length;

  const overviewCards = [
    {
      label: "Enabled controls",
      value: `${enabledFeatureCount}/${featureStates.length}`,
      detail: "Local admin draft",
      accent: "from-accent-purple to-accent-pink",
    },
    {
      label: "Public access",
      value: settings.contentRules.allowGuestReading ? "Guest reading" : "Members only",
      detail: `${settings.contentRules.minimumReaderAge}+ minimum age`,
      accent: "from-sky-400 to-cyan-300",
    },
    {
      label: "Storage policy",
      value: formatCacheMode(settings.storageOptimization.cdnMode),
      detail: `${settings.storageOptimization.storageWarningThresholdGB} GB warning`,
      accent: "from-emerald-400 to-teal-300",
    },
    {
      label: "Upload formats",
      value: settings.contentRules.allowedUploadFormats.map(formatUploadFormat).join(", "),
      detail: `${settings.contentRules.maxCoverSizeMB} MB covers`,
      accent: "from-amber-300 to-pink-400",
    },
  ];

  const handleFormatToggle = useCallback((format: string) => {
    setSettings((previous) => {
      const currentFormats = previous.contentRules.allowedUploadFormats;
      const nextFormats = currentFormats.includes(format)
        ? currentFormats.length > 1
          ? currentFormats.filter((item) => item !== format)
          : currentFormats
        : [...currentFormats, format];

      return {
        ...previous,
        contentRules: {
          ...previous.contentRules,
          allowedUploadFormats: nextFormats,
        },
      };
    });
  }, []);

  const handleSave = useCallback(async () => {
    setIsSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    setIsSaving(false);
    showToast("Settings saved successfully.");
  }, [showToast]);

  const handleResetConfirm = useCallback(async () => {
    setIsResetting(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    setSettings(createDefaultSettings());
    setIsResetting(false);
    setShowResetDialog(false);
    showToast("Default settings restored locally.");
  }, [showToast]);

  const handleClearCache = useCallback(async () => {
    setIsClearingCache(true);
    await new Promise((resolve) => setTimeout(resolve, 600));
    setIsClearingCache(false);
    showToast("Cache cleared in this UI preview.");
  }, [showToast]);

  return (
    <AdminShell
      title="Admin Settings"
      description="Tune the UI-only MangaVerse control center."
    >
      <div className="space-y-6">
        <section className="glass relative overflow-hidden rounded-2xl p-5 shadow-2xl shadow-black/25 sm:p-6">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-accent-purple via-accent-pink to-accent-blue" />

          <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent-purple">
                Platform controls
              </p>
              <h1 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
                Admin Settings
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-muted sm:text-base">
                Configure site identity, reader behavior, upload policy, and admin controls in a local-only dashboard preview.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row lg:shrink-0">
              <Button
                variant="secondary"
                size="md"
                onClick={() => setShowResetDialog(true)}
                disabled={isSaving || isResetting}
                className="w-full sm:w-auto"
              >
                Reset Defaults
              </Button>
              <Button
                variant="primary"
                size="md"
                onClick={handleSave}
                disabled={isSaving || isResetting}
                className="w-full sm:w-auto"
              >
                {isSaving ? (
                  <>
                    <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    Saving...
                  </>
                ) : (
                  "Save Changes"
                )}
              </Button>
            </div>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {overviewCards.map((card) => (
              <div
                key={card.label}
                className="relative overflow-hidden rounded-xl border border-white/10 bg-black/20 p-4"
              >
                <div className={`mb-4 h-1 w-12 rounded-full bg-gradient-to-r ${card.accent}`} />
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">
                  {card.label}
                </p>
                <p className="mt-2 truncate text-lg font-semibold text-white">
                  {card.value}
                </p>
                <p className="mt-1 text-xs text-muted">{card.detail}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="grid gap-6 xl:grid-cols-[minmax(0,1.05fr)_minmax(360px,0.85fr)]">
          <div className="space-y-6">
            <AdminSettingsPanel
              title="Site Identity"
              description="Core public-facing identity and temporary site messaging."
              accent="purple"
            >
              <div className="grid gap-4 md:grid-cols-2">
                <AdminSettingsField
                  label="Site name"
                  value={settings.siteIdentity.siteName}
                  onChange={(siteName) => updateSection("siteIdentity", { siteName })}
                  placeholder="MangaVerse"
                />
                <AdminSettingsField
                  label="Default language"
                  value={settings.siteIdentity.defaultLanguage}
                  onChange={(defaultLanguage) => updateSection("siteIdentity", { defaultLanguage })}
                  asSelect
                  options={languageOptions}
                />
                <div className="md:col-span-2">
                  <AdminSettingsField
                    label="Tagline"
                    value={settings.siteIdentity.siteTagline}
                    onChange={(siteTagline) => updateSection("siteIdentity", { siteTagline })}
                    placeholder="Your premium manga reading experience"
                    multiline
                    rows={2}
                  />
                </div>
                <AdminSettingsField
                  label="Public URL"
                  type="url"
                  value={settings.siteIdentity.publicUrl}
                  onChange={(publicUrl) => updateSection("siteIdentity", { publicUrl })}
                  placeholder="https://mangaverse.com"
                />
                <AdminSettingsField
                  label="Support email"
                  type="email"
                  value={settings.siteIdentity.supportEmail}
                  onChange={(supportEmail) => updateSection("siteIdentity", { supportEmail })}
                  placeholder="support@mangaverse.com"
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <AdminSettingsToggle
                  label="Maintenance mode"
                  description="Pause the public reader experience."
                  checked={settings.siteIdentity.maintenanceMode}
                  onChange={(maintenanceMode) => updateSection("siteIdentity", { maintenanceMode })}
                />
                <AdminSettingsToggle
                  label="Announcement banner"
                  description="Show a top banner across public pages."
                  checked={settings.siteIdentity.announcementBannerEnabled}
                  onChange={(announcementBannerEnabled) =>
                    updateSection("siteIdentity", { announcementBannerEnabled })
                  }
                />
              </div>

              <AdminSettingsField
                label="Announcement message"
                value={settings.siteIdentity.announcementMessage}
                onChange={(announcementMessage) => updateSection("siteIdentity", { announcementMessage })}
                placeholder="Welcome to MangaVerse!"
                multiline
                rows={2}
                disabled={!settings.siteIdentity.announcementBannerEnabled}
              />
            </AdminSettingsPanel>

            <AdminSettingsPanel
              title="Content Rules"
              description="Moderation defaults, reader eligibility, and accepted media rules."
              accent="pink"
            >
              <div className="grid gap-4 lg:grid-cols-3">
                <AdminSettingsToggle
                  label="Allow comments"
                  description="Readers can comment on manga and chapters."
                  checked={settings.contentRules.allowComments}
                  onChange={(allowComments) => updateSection("contentRules", { allowComments })}
                />
                <AdminSettingsToggle
                  label="Require moderation"
                  description="New public content waits for review."
                  checked={settings.contentRules.requireModeration}
                  onChange={(requireModeration) => updateSection("contentRules", { requireModeration })}
                />
                <AdminSettingsToggle
                  label="Allow guest reading"
                  description="Visitors can read without an account."
                  checked={settings.contentRules.allowGuestReading}
                  onChange={(allowGuestReading) => updateSection("contentRules", { allowGuestReading })}
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <AdminSettingsSelect
                  label="Minimum reader age"
                  value={String(settings.contentRules.minimumReaderAge)}
                  onChange={(value) =>
                    updateSection("contentRules", { minimumReaderAge: toNumber(value, 13) })
                  }
                  options={[
                    { value: "13", label: "13+" },
                    { value: "16", label: "16+" },
                    { value: "18", label: "18+" },
                  ]}
                />
                <AdminSettingsSelect
                  label="Default manga visibility"
                  value={settings.contentRules.defaultMangaVisibility}
                  onChange={(defaultMangaVisibility) =>
                    updateSection("contentRules", {
                      defaultMangaVisibility:
                        defaultMangaVisibility as AdminSettings["contentRules"]["defaultMangaVisibility"],
                    })
                  }
                  options={visibilityOptions}
                />
              </div>

              <AdminSettingsFormatChips
                label="Allowed upload formats"
                description="Accepted cover and chapter image types."
                options={uploadFormatOptions}
                selected={settings.contentRules.allowedUploadFormats}
                onToggle={handleFormatToggle}
              />

              <div className="grid gap-4 md:grid-cols-2">
                <AdminSettingsSelect
                  label="Max cover size"
                  value={String(settings.contentRules.maxCoverSizeMB)}
                  onChange={(value) =>
                    updateSection("contentRules", { maxCoverSizeMB: toNumber(value, 5) })
                  }
                  options={sizeOptions}
                />
                <AdminSettingsSelect
                  label="Max chapter page size"
                  value={String(settings.contentRules.maxChapterPageSizeMB)}
                  onChange={(value) =>
                    updateSection("contentRules", { maxChapterPageSizeMB: toNumber(value, 10) })
                  }
                  options={sizeOptions}
                />
              </div>
            </AdminSettingsPanel>

            <AdminSettingsPanel
              title="Reader Experience"
              description="Default reading behavior for manga chapters and recommendations."
              accent="blue"
            >
              <div className="grid gap-4 md:grid-cols-2">
                <AdminSettingsSelect
                  label="Reading mode"
                  value={settings.readerExperience.defaultReadingMode}
                  onChange={(defaultReadingMode) =>
                    updateSection("readerExperience", {
                      defaultReadingMode:
                        defaultReadingMode as AdminSettings["readerExperience"]["defaultReadingMode"],
                    })
                  }
                  options={readingModeOptions}
                />
                <AdminSettingsSelect
                  label="Reader width"
                  value={settings.readerExperience.defaultReaderWidth}
                  onChange={(defaultReaderWidth) =>
                    updateSection("readerExperience", {
                      defaultReaderWidth:
                        defaultReaderWidth as AdminSettings["readerExperience"]["defaultReaderWidth"],
                    })
                  }
                  options={readerWidthOptions}
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <AdminSettingsToggle
                  label="Show page numbers"
                  description="Display page progress inside the reader."
                  checked={settings.readerExperience.showPageNumbers}
                  onChange={(showPageNumbers) => updateSection("readerExperience", { showPageNumbers })}
                />
                <AdminSettingsToggle
                  label="Auto-next chapter"
                  description="Advance when a reader reaches the end."
                  checked={settings.readerExperience.autoNextChapter}
                  onChange={(autoNextChapter) => updateSection("readerExperience", { autoNextChapter })}
                />
                <AdminSettingsToggle
                  label="Continue reading"
                  description="Keep reader progress surfaced in the UI."
                  checked={settings.readerExperience.enableContinueReading}
                  onChange={(enableContinueReading) =>
                    updateSection("readerExperience", { enableContinueReading })
                  }
                />
                <AdminSettingsToggle
                  label="Recommendations"
                  description="Show related manga after reading sessions."
                  checked={settings.readerExperience.enableRecommendations}
                  onChange={(enableRecommendations) =>
                    updateSection("readerExperience", { enableRecommendations })
                  }
                />
              </div>
            </AdminSettingsPanel>
          </div>

          <div className="space-y-6">
            <AdminSettingsPanel
              title="Storage & Optimization"
              description="Image processing, originals policy, and cache behavior."
              accent="emerald"
            >
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-1 2xl:grid-cols-2">
                <AdminSettingsToggle
                  label="Convert uploads to WebP"
                  description="Normalize incoming media to WebP."
                  checked={settings.storageOptimization.autoConvertToWebP}
                  onChange={(autoConvertToWebP) =>
                    updateSection("storageOptimization", { autoConvertToWebP })
                  }
                />
                <AdminSettingsToggle
                  label="Generate thumbnails"
                  description="Create compact preview images."
                  checked={settings.storageOptimization.generateThumbnails}
                  onChange={(generateThumbnails) =>
                    updateSection("storageOptimization", { generateThumbnails })
                  }
                />
                <AdminSettingsToggle
                  label="Compress pages"
                  description="Optimize chapter pages for loading."
                  checked={settings.storageOptimization.compressChapterPages}
                  onChange={(compressChapterPages) =>
                    updateSection("storageOptimization", { compressChapterPages })
                  }
                />
                <AdminSettingsToggle
                  label="Keep originals"
                  description="Retain source files after processing."
                  checked={settings.storageOptimization.keepOriginalFiles}
                  onChange={(keepOriginalFiles) =>
                    updateSection("storageOptimization", { keepOriginalFiles })
                  }
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <AdminSettingsSelect
                  label="Storage warning threshold"
                  value={String(settings.storageOptimization.storageWarningThresholdGB)}
                  onChange={(value) =>
                    updateSection("storageOptimization", {
                      storageWarningThresholdGB: toNumber(value, 80),
                    })
                  }
                  options={storageThresholdOptions}
                />
                <AdminSettingsSelect
                  label="CDN/cache mode"
                  value={settings.storageOptimization.cdnMode}
                  onChange={(cdnMode) =>
                    updateSection("storageOptimization", {
                      cdnMode: cdnMode as AdminSettings["storageOptimization"]["cdnMode"],
                    })
                  }
                  options={cacheModeOptions}
                />
              </div>

              <div className="rounded-xl border border-emerald-400/20 bg-emerald-400/5 p-4">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-sm font-semibold text-white">Optimization pipeline</span>
                  <span className="rounded-full border border-emerald-300/20 bg-emerald-300/10 px-3 py-1 text-xs font-semibold text-emerald-200">
                    {settings.storageOptimization.compressChapterPages ? "Active" : "Paused"}
                  </span>
                </div>
                <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-emerald-400 via-cyan-300 to-accent-blue"
                    style={{
                      width: `${settings.storageOptimization.storageWarningThresholdGB}%`,
                    }}
                  />
                </div>
              </div>
            </AdminSettingsPanel>

            <AdminSettingsPanel
              title="Admin Security"
              description="Session rules, elevated controls, and local maintenance actions."
              accent="amber"
            >
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-1 2xl:grid-cols-2">
                <AdminSettingsToggle
                  label="Require admin 2FA"
                  description="Require a second factor for admins."
                  checked={settings.adminSecurity.require2FA}
                  onChange={(require2FA) => updateSection("adminSecurity", { require2FA })}
                />
                <AdminSettingsToggle
                  label="Allow role management"
                  description="Admins can edit user roles."
                  checked={settings.adminSecurity.allowRoleManagement}
                  onChange={(allowRoleManagement) =>
                    updateSection("adminSecurity", { allowRoleManagement })
                  }
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <AdminSettingsSelect
                  label="Session timeout"
                  value={String(settings.adminSecurity.sessionTimeoutMinutes)}
                  onChange={(value) =>
                    updateSection("adminSecurity", {
                      sessionTimeoutMinutes: toNumber(value, 60),
                    })
                  }
                  options={sessionTimeoutOptions}
                />
                <AdminSettingsSelect
                  label="Audit log retention"
                  value={String(settings.adminSecurity.auditLogRetentionDays)}
                  onChange={(value) =>
                    updateSection("adminSecurity", {
                      auditLogRetentionDays: toNumber(value, 90),
                    })
                  }
                  options={auditRetentionOptions}
                />
              </div>

              <AdminSettingsDangerZone
                title="Security actions"
                description="Local-only admin maintenance controls."
                actions={[
                  {
                    label: "Clear cache",
                    description: "Run a UI-only cache refresh for this preview.",
                    actionLabel: isClearingCache ? "Clearing..." : "Clear Cache",
                    onClick: handleClearCache,
                    loading: isClearingCache,
                  },
                  {
                    label: "Reset settings confirmation",
                    description: "Open a confirmation before restoring mock defaults.",
                    actionLabel: "Reset Settings",
                    onClick: () => setShowResetDialog(true),
                    tone: "danger",
                  },
                ]}
              />
            </AdminSettingsPanel>
          </div>
        </div>
      </div>

      <AdminSettingsSuccessToast message={toastMessage} visible={showSuccess} />

      <AdminSettingsResetDialog
        isOpen={showResetDialog}
        isLoading={isResetting}
        onConfirm={handleResetConfirm}
        onCancel={() => setShowResetDialog(false)}
      />
    </AdminShell>
  );
}
