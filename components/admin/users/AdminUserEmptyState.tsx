import { Button } from "@/components/ui/Button";

type AdminUserEmptyStateProps = {
  message: string;
  onReset: () => void;
};

export function AdminUserEmptyState({ message, onReset }: AdminUserEmptyStateProps) {
  return (
    <div className="glass rounded-3xl border border-dashed border-white/10 p-10 text-center shadow-lg shadow-black/10">
      <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-accent-purple to-accent-pink text-4xl text-white">
        �
      </div>
      <h3 className="text-2xl font-semibold text-white">No users match this filter</h3>
      <p className="mt-3 text-sm text-muted max-w-md mx-auto">{message}</p>
      <div className="mt-6">
        <Button variant="primary" size="md" onClick={onReset}>
          Reset Filters
        </Button>
      </div>
    </div>
  );
}
