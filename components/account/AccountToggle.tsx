"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";

type AccountToggleProps = {
  label: string;
  description?: string;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  className?: string;
};

export function AccountToggle({
  label,
  description,
  defaultChecked = false,
  onChange,
  className,
}: AccountToggleProps) {
  const [checked, setChecked] = useState(defaultChecked);

  function handleChange() {
    const newChecked = !checked;
    setChecked(newChecked);
    onChange?.(newChecked);
  }

  return (
    <div className={cn("flex items-center justify-between gap-4", className)}>
      <div className="flex-1">
        <p className="text-sm font-medium text-white">{label}</p>
        {description && (
          <p className="mt-0.5 text-xs text-muted">{description}</p>
        )}
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={handleChange}
        className={cn(
          "relative h-6 w-11 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-accent-purple/50 focus:ring-offset-2 focus:ring-offset-background",
          checked
            ? "bg-gradient-to-r from-accent-purple to-accent-pink"
            : "bg-white/10",
        )}
      >
        <span
          className={cn(
            "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg transition-transform duration-200",
            checked ? "translate-x-6" : "translate-x-0.5",
          )}
        />
      </button>
    </div>
  );
}
