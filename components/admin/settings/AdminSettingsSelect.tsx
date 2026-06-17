import React from "react";

interface AdminSettingsSelectProps {
  label: string;
  description?: string;
  value: string;
  onChange: (value: string) => void;
  options: readonly { value: string; label: string }[];
  disabled?: boolean;
}

export function AdminSettingsSelect({
  label,
  description,
  value,
  onChange,
  options,
  disabled = false,
}: AdminSettingsSelectProps) {
  return (
    <label className="block rounded-xl border border-white/10 bg-black/15 p-4">
      <span className="block text-sm font-semibold text-white">{label}</span>
      {description && <span className="mt-1 block text-xs leading-5 text-muted">{description}</span>}
      <span className="relative mt-3 block">
        <select
          value={value}
          onChange={(event) => onChange(event.target.value)}
          disabled={disabled}
          className="w-full appearance-none rounded-xl border border-white/10 bg-white/[0.06] px-4 py-3 pr-10 text-sm text-white shadow-inner shadow-black/10 transition-colors focus:border-accent-purple/50 focus:outline-none focus:ring-2 focus:ring-accent-purple/20 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {options.map((option) => (
            <option key={option.value} value={option.value} className="bg-surface">
              {option.label}
            </option>
          ))}
        </select>
        <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-xs text-muted">
          v
        </span>
      </span>
    </label>
  );
}
