import { Button } from "@/components/ui/Button";

type AdminChapterEmptyStateProps = {
  onReset: () => void;
};

export function AdminChapterEmptyState({ onReset }: AdminChapterEmptyStateProps) {
  return (
    <div className="glass rounded-2xl p-12 text-center shadow-lg shadow-black/20">
      <div className="mb-4 flex justify-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-white/10 to-white/5 text-5xl backdrop-blur-sm">📖</div>
      </div>
      <h3 className="mb-2 text-xl font-semibold text-white">No Chapters Found</h3>
      <p className="mb-6 text-muted max-w-sm mx-auto">No chapters match your current filters. Try expanding your search or reset the filters to see all chapters.</p>
      <Button variant="primary" size="md" onClick={onReset}>Reset Filters</Button>
    </div>
  );
}
