/**
 * Admin Settings Mock Data
 * UI-only defaults for the admin settings preview.
 */

export interface SiteIdentitySettings {
  siteName: string;
  siteTagline: string;
  publicUrl: string;
  supportEmail: string;
  defaultLanguage: string;
  maintenanceMode: boolean;
  announcementBannerEnabled: boolean;
  announcementMessage: string;
}

export interface ContentRulesSettings {
  allowComments: boolean;
  requireModeration: boolean;
  allowGuestReading: boolean;
  minimumReaderAge: number;
  defaultMangaVisibility: "public" | "private" | "draft";
  allowedUploadFormats: string[];
  maxCoverSizeMB: number;
  maxChapterPageSizeMB: number;
}

export interface ReaderExperienceSettings {
  defaultReadingMode: "vertical" | "paged";
  defaultReaderWidth: "fit" | "wide";
  showPageNumbers: boolean;
  autoNextChapter: boolean;
  enableContinueReading: boolean;
  enableRecommendations: boolean;
}

export interface StorageOptimizationSettings {
  autoConvertToWebP: boolean;
  generateThumbnails: boolean;
  compressChapterPages: boolean;
  keepOriginalFiles: boolean;
  storageWarningThresholdGB: number;
  cdnMode: "local" | "cdn" | "hybrid";
}

export interface AdminSecuritySettings {
  require2FA: boolean;
  sessionTimeoutMinutes: number;
  allowRoleManagement: boolean;
  auditLogRetentionDays: number;
}

export interface AdminSettings {
  siteIdentity: SiteIdentitySettings;
  contentRules: ContentRulesSettings;
  readerExperience: ReaderExperienceSettings;
  storageOptimization: StorageOptimizationSettings;
  adminSecurity: AdminSecuritySettings;
}

// Default settings
export const defaultAdminSettings: AdminSettings = {
  siteIdentity: {
    siteName: "MangaVerse",
    siteTagline: "Your premium manga reading experience",
    publicUrl: "https://mangaverse.com",
    supportEmail: "support@mangaverse.com",
    defaultLanguage: "en",
    maintenanceMode: false,
    announcementBannerEnabled: false,
    announcementMessage: "Welcome to MangaVerse!",
  },
  contentRules: {
    allowComments: true,
    requireModeration: true,
    allowGuestReading: false,
    minimumReaderAge: 13,
    defaultMangaVisibility: "public",
    allowedUploadFormats: ["jpg", "png", "webp"],
    maxCoverSizeMB: 5,
    maxChapterPageSizeMB: 10,
  },
  readerExperience: {
    defaultReadingMode: "vertical",
    defaultReaderWidth: "fit",
    showPageNumbers: true,
    autoNextChapter: false,
    enableContinueReading: true,
    enableRecommendations: true,
  },
  storageOptimization: {
    autoConvertToWebP: true,
    generateThumbnails: true,
    compressChapterPages: true,
    keepOriginalFiles: false,
    storageWarningThresholdGB: 80,
    cdnMode: "hybrid",
  },
  adminSecurity: {
    require2FA: false,
    sessionTimeoutMinutes: 60,
    allowRoleManagement: true,
    auditLogRetentionDays: 90,
  },
};

/**
 * Statistics about current settings
 */
export interface AdminSettingsStats {
  totalToggleSettings: number;
  enabledFeatures: number;
  disabledFeatures: number;
  storageUsedGB: number;
  storageQuotaGB: number;
  lastModified: string;
  modifiedBy: string;
}

export const defaultAdminSettingsStats: AdminSettingsStats = {
  totalToggleSettings: 15,
  enabledFeatures: 10,
  disabledFeatures: 5,
  storageUsedGB: 45,
  storageQuotaGB: 100,
  lastModified: "2026-06-15T14:30:00Z",
  modifiedBy: "Admin",
};
