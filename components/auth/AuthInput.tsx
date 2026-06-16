import { cn } from "@/lib/utils";

type AuthInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  hint?: string;
  error?: string;
};

export function AuthInput({
  label,
  hint,
  error,
  id,
  className,
  ...props
}: AuthInputProps) {
  const inputId = id ?? props.name;

  return (
    <div className="space-y-2">
      <label htmlFor={inputId} className="block text-sm font-medium text-white">
        {label}
      </label>
      <input
        id={inputId}
        className={cn(
          "glass w-full rounded-xl px-4 py-3 text-sm text-white",
          "placeholder:text-muted/60 outline-none transition-all duration-200",
          "focus:border-accent-purple/40 focus:ring-2 focus:ring-accent-purple/20",
          error && "border-accent-red/40 ring-1 ring-accent-red/20",
          className,
        )}
        {...props}
      />
      {hint && !error && <p className="text-xs text-muted">{hint}</p>}
      {error && <p className="text-xs text-accent-red">{error}</p>}
    </div>
  );
}
