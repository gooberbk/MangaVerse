import { Button } from "@/components/ui/Button";

type AdminPlaceholderPanelProps = {
  icon: string;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick?: () => void;
  };
};

export function AdminPlaceholderPanel({
  icon,
  title,
  description,
  action,
}: AdminPlaceholderPanelProps) {
  return (
    <div className="glass rounded-2xl p-12 text-center shadow-lg shadow-black/20">
      <div className="mb-4 flex justify-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-white/10 to-white/5 text-5xl backdrop-blur-sm">
          {icon}
        </div>
      </div>
      <h3 className="mb-2 text-xl font-semibold text-white">{title}</h3>
      <p className="mb-6 text-muted max-w-sm mx-auto">{description}</p>
      {action && (
        <Button variant="primary" size="md" onClick={action.onClick}>
          {action.label}
        </Button>
      )}
    </div>
  );
}
