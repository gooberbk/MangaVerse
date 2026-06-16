"use client";

import { cn } from "@/lib/utils";

type PageWidth = "fit" | "wide";

type ReaderSettingsProps = {
  pageWidth: PageWidth;
  onPageWidthChange: (width: PageWidth) => void;
  className?: string;
};

export function ReaderSettings({
  pageWidth,
  onPageWidthChange,
  className,
}: ReaderSettingsProps) {
  return (
    <div
      className={cn(
        "glass flex flex-wrap items-center gap-3 rounded-xl px-4 py-3 sm:gap-4 sm:px-5",
        className,
      )}
    >
      <SettingGroup label="Reading mode">
        <ToggleChip active disabled>
          Vertical
        </ToggleChip>
      </SettingGroup>

      <div className="hidden h-6 w-px bg-white/10 sm:block" />

      <SettingGroup label="Page width">
        <ToggleChip
          active={pageWidth === "fit"}
          onClick={() => onPageWidthChange("fit")}
        >
          Fit
        </ToggleChip>
        <ToggleChip
          active={pageWidth === "wide"}
          onClick={() => onPageWidthChange("wide")}
        >
          Wide
        </ToggleChip>
      </SettingGroup>

      <div className="hidden h-6 w-px bg-white/10 sm:block" />

      <SettingGroup label="Theme">
        <ToggleChip active disabled>
          Dark
        </ToggleChip>
      </SettingGroup>
    </div>
  );
}

function SettingGroup({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-[10px] font-medium uppercase tracking-wider text-muted sm:text-xs">
        {label}
      </span>
      <div className="flex gap-1">{children}</div>
    </div>
  );
}

function ToggleChip({
  children,
  active = false,
  disabled = false,
  onClick,
}: {
  children: React.ReactNode;
  active?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}) {
  const className = cn(
    "rounded-lg px-2.5 py-1 text-xs font-medium transition-all sm:px-3 sm:py-1.5",
    active
      ? "bg-accent-purple/25 text-white ring-1 ring-accent-purple/40"
      : "bg-white/5 text-muted hover:bg-white/10 hover:text-white",
    disabled && "cursor-default opacity-80",
  );

  if (disabled) {
    return <span className={className}>{children}</span>;
  }

  return (
    <button type="button" onClick={onClick} className={className}>
      {children}
    </button>
  );
}
