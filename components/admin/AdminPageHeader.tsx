import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

type AdminPageHeaderProps = {
  title: string;
  description?: string;
  action?: {
    label: string;
    href: string;
  };
  className?: string;
};

export function AdminPageHeader({
  title,
  description,
  action,
  className,
}: AdminPageHeaderProps) {
  return (
    <div
      className={cn(
        "mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between",
        className,
      )}
    >
      <div>
        <h2 className="text-2xl font-bold text-white">{title}</h2>
        {description && (
          <p className="mt-1 text-muted">{description}</p>
        )}
      </div>

      {action && (
        <Button variant="primary" size="md" asChild>
          <a href={action.href}>{action.label}</a>
        </Button>
      )}
    </div>
  );
}
