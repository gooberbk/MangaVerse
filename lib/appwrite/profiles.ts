import { Permission, Role, type Models } from "appwrite";
import { databases } from "./client";
import {
  APPWRITE_COLLECTIONS,
  APPWRITE_DATABASE_ID,
} from "./config";
import type { AppwriteUser } from "./auth";

export type UserProfile = Models.Document & {
  userId: string;
  name: string;
  email: string;
  role: "reader" | string;
  avatarUrl?: string | null;
};

const assertProfilesConfigured = () => {
  if (!APPWRITE_DATABASE_ID || !APPWRITE_COLLECTIONS.users) {
    throw new Error(
      "Appwrite profiles are not configured. Add NEXT_PUBLIC_APPWRITE_DATABASE_ID and NEXT_PUBLIC_APPWRITE_USERS_COLLECTION_ID to .env.local.",
    );
  }
};

export async function createUserProfile(
  user: AppwriteUser,
  name: string,
): Promise<UserProfile | null> {
  assertProfilesConfigured();

  try {
    return await databases.createDocument<UserProfile>(
      APPWRITE_DATABASE_ID,
      APPWRITE_COLLECTIONS.users,
      user.$id,
      {
        userId: user.$id,
        name,
        email: user.email,
        role: "reader",
      },
      [
        Permission.read(Role.user(user.$id)),
        Permission.update(Role.user(user.$id)),
      ],
    );
  } catch (error) {
    if (isDuplicateProfileError(error)) {
      return getUserProfile(user.$id);
    }

    throw error;
  }
}

export async function getUserProfile(
  userId: string,
): Promise<UserProfile | null> {
  assertProfilesConfigured();

  try {
    return await databases.getDocument<UserProfile>(
      APPWRITE_DATABASE_ID,
      APPWRITE_COLLECTIONS.users,
      userId,
    );
  } catch (error) {
    if (isMissingProfileError(error)) {
      return null;
    }

    throw error;
  }
}

function isDuplicateProfileError(error: unknown) {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    Number((error as { code: unknown }).code) === 409
  );
}

function isMissingProfileError(error: unknown) {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    Number((error as { code: unknown }).code) === 404
  );
}
