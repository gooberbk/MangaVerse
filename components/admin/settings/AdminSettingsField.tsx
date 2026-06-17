import React from "react";
import { cn } from "@/lib/utils";

interface AdminSettingsFieldProps {
  label: string;
  description?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: "text" | "email" | "number" | "url";
  disabled?: boolean;
  multiline?: boolean;
  rows?: number;
  asSelect?: boolean;
  options?: readonly { value: string; label: string }[];
}

export function AdminSettingsField({
  label,
  description,
  value,
  onChange,
  placeholder,
  type = "text",
  disabled = false,
  multiline = false,
  rows = 3,
  asSelect = false,
  options = [],
}: AdminSettingsFieldProps) {
  const inputClassName =
    "w-full rounded-xl border border-white/10 bg-white/[0.06] px-4 py-3 text-sm text-white placeholder:text-muted/50 shadow-inner shadow-black/10 transition-colors focus:border-accent-purple/50 focus:outline-none focus:ring-2 focus:ring-accent-purple/20 disabled:cursor-not-allowed disabled:opacity-50";

  return (
    <label className="block rounded-xl border border-white/10 bg-black/15 p-4">
      <span className="block text-sm font-semibold text-white">{label}</span>
      {description && <span className="mt-1 block text-xs leading-5 text-muted">{description}</span>}
      <span className="mt-3 block">
        {asSelect ? (
          <span className="relative block">
            <select
              value={value}
              onChange={(event) => onChange(event.target.value)}
              disabled={disabled}
              className={cn(inputClassName, "appearance-none pr-10")}
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
        ) : multiline ? (
        <textarea
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          rows={rows}
          className={cn(inputClassName, "resize-none")}
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          className={inputClassName}
        />
      )}
      </span>
    </label>
  );
}
