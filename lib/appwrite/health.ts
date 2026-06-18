import {
  APPWRITE_ENV_KEYS,
  APPWRITE_ENV_VALUES,
  type AppwriteEnvKey,
} from "./config";

export type AppwriteConfigHealth = {
  isConfigured: boolean;
  missing: AppwriteEnvKey[];
  configured: Record<AppwriteEnvKey, boolean>;
};

export function getAppwriteConfigHealth(): AppwriteConfigHealth {
  const configured = APPWRITE_ENV_KEYS.reduce(
    (result, key) => {
      result[key] = Boolean(APPWRITE_ENV_VALUES[key]);
      return result;
    },
    {} as Record<AppwriteEnvKey, boolean>,
  );

  const missing = APPWRITE_ENV_KEYS.filter((key) => !configured[key]);

  return {
    isConfigured: missing.length === 0,
    missing,
    configured,
  };
}
