"use client";

import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  getCurrentUser,
  loginWithEmail,
  logoutCurrentUser,
  registerWithEmail,
  type AppwriteUser,
} from "@/lib/appwrite/auth";

type AuthContextValue = {
  user: AppwriteUser | null;
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
  const [loading, setLoading] = useState(true);

  const refreshUser = useCallback(async () => {
    setLoading(true);

    try {
      const currentUser = await getCurrentUser();
      setUser(currentUser);
      return currentUser;
    } finally {
      setLoading(false);
    }
  }, []);

  const login = useCallback(
    async (email: string, password: string) => {
      setLoading(true);

      try {
        await loginWithEmail(email, password);
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
        await registerWithEmail(email, password, name);
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
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void refreshUser();
  }, [refreshUser]);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (window.location.pathname !== "/account") {
        return;
      }

      const target = event.target;
      const trigger =
        target instanceof Element
          ? target.closest<HTMLButtonElement | HTMLAnchorElement>("button, a")
          : null;

      if (!trigger || !/log\s*out|logout|sign\s*out/i.test(trigger.textContent ?? "")) {
        return;
      }

      event.preventDefault();
      event.stopPropagation();

      void handleAccountLogout(trigger, logout);
    };

    document.addEventListener("click", handleClick, true);

    return () => {
      document.removeEventListener("click", handleClick, true);
    };
  }, [logout]);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      loading,
      refreshUser,
      login,
      register,
      logout,
    }),
    [loading, login, logout, refreshUser, register, user],
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

async function handleAccountLogout(
  trigger: HTMLButtonElement | HTMLAnchorElement,
  logout: AuthContextValue["logout"],
) {
  const previousLabel = trigger.textContent;
  setElementDisabled(trigger, true);
  trigger.textContent = "Logging out...";

  try {
    await logout();
    window.location.assign("/login");
  } catch (error) {
    trigger.textContent = getErrorMessage(error);
    setElementDisabled(trigger, false);

    window.setTimeout(() => {
      trigger.textContent = previousLabel;
    }, 2500);
  }
}

function setElementDisabled(
  element: HTMLButtonElement | HTMLInputElement | HTMLAnchorElement,
  disabled: boolean,
) {
  if (element instanceof HTMLAnchorElement) {
    element.setAttribute("aria-disabled", String(disabled));
    return;
  }

  if (!element.dataset.label && element.textContent) {
    element.dataset.label = element.textContent;
  }

  element.disabled = disabled;
  element.setAttribute("aria-busy", String(disabled));
}

function getErrorMessage(error: unknown) {
  if (error instanceof Error) {
    return error.message;
  }

  return "Something went wrong. Please try again.";
}
