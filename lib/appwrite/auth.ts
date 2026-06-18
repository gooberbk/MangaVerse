import { ID, type Models } from "appwrite";
import { account } from "./client";
import {
  NEXT_PUBLIC_APPWRITE_ENDPOINT,
  NEXT_PUBLIC_APPWRITE_PROJECT_ID,
} from "./config";

export type AppwriteUser = Models.User<Models.Preferences>;

const isAppwriteAuthConfigured = () =>
  Boolean(NEXT_PUBLIC_APPWRITE_ENDPOINT && NEXT_PUBLIC_APPWRITE_PROJECT_ID);

const assertAppwriteAuthConfigured = () => {
  if (!isAppwriteAuthConfigured()) {
    throw new Error(
      "Appwrite auth is not configured. Add NEXT_PUBLIC_APPWRITE_ENDPOINT and NEXT_PUBLIC_APPWRITE_PROJECT_ID to .env.local.",
    );
  }
};

export async function registerWithEmail(
  email: string,
  password: string,
  name: string,
) {
  assertAppwriteAuthConfigured();

  const user = await account.create(ID.unique(), email, password, name);
  await loginWithEmail(email, password);

  return user;
}

export async function loginWithEmail(email: string, password: string) {
  assertAppwriteAuthConfigured();

  return account.createEmailPasswordSession(email, password);
}

export async function logoutCurrentUser() {
  assertAppwriteAuthConfigured();

  return account.deleteSession("current");
}

export async function getCurrentUser() {
  if (!isAppwriteAuthConfigured()) {
    return null;
  }

  try {
    return await account.get();
  } catch {
    return null;
  }
}

export async function sendPasswordRecovery(
  email: string,
  redirectUrl =
    typeof window === "undefined"
      ? ""
      : `${window.location.origin}/reset-password`,
) {
  assertAppwriteAuthConfigured();

  // Appwrite must allow this redirect URL in the project Web platform settings.
  return account.createRecovery(email, redirectUrl);
}

export async function completePasswordRecovery(
  userId: string,
  secret: string,
  password: string,
) {
  assertAppwriteAuthConfigured();

  return account.updateRecovery(userId, secret, password);
}
