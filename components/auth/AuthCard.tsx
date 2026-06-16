import { cn } from "@/lib/utils";

type AuthCardProps = {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  className?: string;
};

export function AuthCard({ title, subtitle, children, className }: AuthCardProps) {
  return (
    <div
      className={cn(
        "glass w-full max-w-md rounded-2xl p-6 shadow-2xl shadow-purple-500/5 sm:p-8",
        className,
      )}
    >
      <div className="mb-8">
        <h1 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
          {title}
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-muted sm:text-base">
          {subtitle}
        </p>
      </div>
      {children}
    </div>
  );
}
