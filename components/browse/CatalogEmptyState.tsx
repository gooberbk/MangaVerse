import { Button } from "@/components/ui/Button";

type CatalogEmptyStateProps = {
  onReset: () => void;
};

export function CatalogEmptyState({ onReset }: CatalogEmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-white/[0.02] px-6 py-20 text-center backdrop-blur-sm">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-accent-purple/20 to-accent-pink/20 ring-1 ring-white/10">
        <SearchOffIcon />
      </div>

      <h3 className="mt-6 text-xl font-bold text-white">No manga found</h3>
      <p className="mt-2 max-w-md text-sm leading-relaxed text-muted">
        Nothing matches your current filters. Try adjusting your search or
        clearing filters to explore the full catalog.
      </p>

      <Button
        type="button"
        variant="secondary"
        onClick={onReset}
        className="mt-8"
      >
        Reset all filters
      </Button>
    </div>
  );
}

function SearchOffIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-accent-purple"
    >
      <path d="M12 12H3" />
      <path d="M16 6H3" />
      <path d="M10 18H3" />
      <path d="m21 21-4.3-4.3" />
      <path d="M17 10a7 7 0 0 0-7-7" />
    </svg>
  );
}
