import { Button } from "@/components/ui/Button";

type AdminMangaEmptyStateProps = {
  onResetFilters: () => void;
};

export function AdminMangaEmptyState({ onResetFilters }: AdminMangaEmptyStateProps) {
  return (
    <div className="glass rounded-2xl p-12 text-center shadow-lg shadow-black/20">
      {/* Background gradient accent */}
      <div className="absolute inset-0 rounded-2xl -right-6 -top-6 h-24 w-24 rounded-full bg-gradient-to-br from-accent-purple/20 to-accent-pink/20 blur-2xl pointer-events-none" />

      <div className="relative">
        <div className="mb-4 flex justify-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-white/10 to-white/5 text-5xl backdrop-blur-sm">
            🔍
          </div>
        </div>
        <h3 className="mb-2 text-xl font-semibold text-white">No Manga Found</h3>
        <p className="mb-6 text-muted max-w-sm mx-auto">
          No manga matches your current filters. Try adjusting your search criteria or reset the filters to see all titles.
        </p>
        <Button variant="primary" size="md" onClick={onResetFilters}>
          Reset Filters
        </Button>
      </div>
    </div>
  );
}
