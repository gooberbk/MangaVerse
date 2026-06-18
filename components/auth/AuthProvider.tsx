"use client";

import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  getCurrentUser,
  loginWithEmail,
  logoutCurrentUser,
  registerWithEmail,
  type AppwriteUser,
} from "@/lib/appwrite/auth";
import {
  getUserProfile,
  type UserProfile,
} from "@/lib/appwrite/profiles";

type AuthContextValue = {
  user: AppwriteUser | null;
  profile: UserProfile | null;
  loading: boolean;
  refreshUser: () => Promise<AppwriteUser | null>;
  login: (email: string, password: string) => Promise<AppwriteUser | null>;
  register: (
    email: string,
    password: string,
    name: string,
  ) => Promise<AppwriteUser | null>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

type AuthProviderProps = {
  children: ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<AppwriteUser | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const authMutationCountRef = useRef(0);

  const refreshUser = useCallback(async () => {
    setLoading(true);

    try {
      const currentUser = await getCurrentUser();
      setUser(currentUser);

      if (!currentUser) {
        setProfile(null);
        return null;
      }

      if (authMutationCountRef.current > 0) {
        setProfile(null);
        return currentUser;
      }

      try {
        setProfile(await getUserProfile(currentUser.$id));
      } catch (profileError) {
        console.warn(
          "Unable to load Appwrite profile for the current user.",
          getProfileErrorSummary(profileError),
        );
        setProfile(null);
      }

      return currentUser;
    } finally {
      setLoading(false);
    }
  }, []);

  const login = useCallback(
    async (email: string, password: string) => {
      setLoading(true);

      try {
        try {
          authMutationCountRef.current += 1;
          await loginWithEmail(email, password);
        } finally {
          authMutationCountRef.current -= 1;
        }

        return await refreshUser();
      } finally {
        setLoading(false);
      }
    },
    [refreshUser],
  );

  const register = useCallback(
    async (email: string, password: string, name: string) => {
      setLoading(true);

      try {
        try {
          authMutationCountRef.current += 1;
          await registerWithEmail(email, password, name);
        } finally {
          authMutationCountRef.current -= 1;
        }

        return await refreshUser();
      } finally {
        setLoading(false);
      }
    },
    [refreshUser],
  );

  const logout = useCallback(async () => {
    setLoading(true);

    try {
      await logoutCurrentUser();
      setUser(null);
      setProfile(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void refreshUser();
  }, [refreshUser]);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      profile,
      loading,
      refreshUser,
      login,
      register,
      logout,
    }),
    [loading, login, logout, profile, refreshUser, register, user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const value = useContext(AuthContext);

  if (!value) {
    throw new Error("useAuth must be used within AuthProvider.");
  }

  return value;
}

function getProfileErrorSummary(error: unknown) {
  if (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    typeof (error as { code: unknown }).code !== "undefined"
  ) {
    return { code: Number((error as { code: unknown }).code) };
  }

  return { code: "unknown" };
}
