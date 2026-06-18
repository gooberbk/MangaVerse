"use client";

import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

type AccountSettingsPanelProps = {
  displayName?: string;
  email?: string;
  className?: string;
};

export function AccountSettingsPanel({
  displayName: initialDisplayName = "MangaFan",
  email: initialEmail = "mangafan@example.com",
  className,
}: AccountSettingsPanelProps) {
  const [displayName, setDisplayName] = useState(initialDisplayName);
  const [email, setEmail] = useState(initialEmail);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    setDisplayName(initialDisplayName);
    setEmail(initialEmail);
  }, [initialDisplayName, initialEmail]);

  function handleSave() {
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  }

  return (
    <div className={cn("glass rounded-2xl p-6 shadow-lg shadow-black/20 sm:p-8", className)}>
      <div className="mb-6">
        <h2 className="text-xl font-bold text-white">Account Settings</h2>
        <p className="mt-1 text-sm text-muted">
          Update your account information and preferences
        </p>
      </div>

      <div className="space-y-6">
        {/* Display name */}
        <div className="space-y-2">
          <label htmlFor="displayName" className="block text-sm font-medium text-white">
            Display Name
          </label>
          <input
            id="displayName"
            type="text"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-muted/50 transition-colors focus:border-accent-purple/50 focus:outline-none focus:ring-2 focus:ring-accent-purple/20"
            placeholder="Enter your display name"
          />
        </div>

        {/* Email */}
        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-medium text-white">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-muted/50 transition-colors focus:border-accent-purple/50 focus:outline-none focus:ring-2 focus:ring-accent-purple/20"
            placeholder="Enter your email"
          />
        </div>

        {/* Password */}
        <div className="space-y-2">
          <label htmlFor="password" className="block text-sm font-medium text-white">
            Password
          </label>
          <div className="flex gap-3">
            <input
              id="password"
              type="password"
              value="••••••••"
              readOnly
              className="flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-muted transition-colors focus:border-accent-purple/50 focus:outline-none focus:ring-2 focus:ring-accent-purple/20"
            />
            <Button variant="secondary" size="md">
              Change
            </Button>
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
              Changes saved successfully
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
