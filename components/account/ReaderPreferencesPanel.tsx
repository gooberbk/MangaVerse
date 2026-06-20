"use client";

import { AccountToggle } from "./AccountToggle";
import { cn } from "@/lib/utils";

type ReaderPreferencesPanelProps = {
  className?: string;
};

export function ReaderPreferencesPanel({ className }: ReaderPreferencesPanelProps) {
  return (
    <div className={cn("glass-panel rounded-2xl p-6 sm:p-8", className)}>
      {/* Glow accent */}
      <div className="pointer-events-none absolute -left-10 -bottom-10 h-28 w-28 rounded-full bg-accent-electric/10 blur-3xl" />
      <div className="mb-6">
        <h2 className="text-xl font-bold text-white">Reader Preferences</h2>
        <p className="mt-1 text-sm text-muted">
          Customize your reading experience
        </p>
      </div>

      <div className="space-y-6">
        {/* Default reading mode */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-white">
            Default Reading Mode
          </label>
          <select className="select-premium">
            <option value="vertical">Vertical Scroll</option>
            <option value="paged">Paged (Webtoon)</option>
            <option value="single">Single Page</option>
          </select>
        </div>

        {/* Default page width */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-white">
            Default Page Width
          </label>
          <select className="select-premium">
            <option value="fit">Fit to Screen</option>
            <option value="wide">Wide</option>
            <option value="full">Full Width</option>
          </select>
        </div>

        {/* Theme preference */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-white">
            Theme Preference
          </label>
          <select className="select-premium">
            <option value="dark">Dark</option>
            <option value="light">Light</option>
            <option value="oled">OLED Black</option>
          </select>
        </div>

        {/* Toggles */}
        <div className="space-y-4 pt-2">
          <AccountToggle
            label="Auto-continue next chapter"
            description="Automatically load the next chapter when you finish reading"
            defaultChecked={true}
          />
          <AccountToggle
            label="Show progress percentage"
            description="Display reading progress in the reader"
            defaultChecked={true}
          />
        </div>
      </div>
    </div>
  );
}
