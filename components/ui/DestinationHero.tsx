import { cn } from "@/lib/utils";

type DestinationHeroProps = {
  eyebrow: string;
  title: string;
  subtitle: string;
  glow?: "purple" | "pink" | "blue" | "amber";
  children?: React.ReactNode;
  className?: string;
};

const glowStyles = {
  purple: "from-accent-purple/15 via-transparent to-accent-pink/5",
  pink: "from-accent-pink/15 via-transparent to-accent-purple/5",
  blue: "from-accent-blue/15 via-transparent to-accent-electric/5",
  amber: "from-amber-500/15 via-transparent to-orange-500/5",
};

const orbStyles = {
  purple: { left: "bg-accent-purple/20", right: "bg-accent-pink/15" },
  pink: { left: "bg-accent-pink/20", right: "bg-accent-purple/15" },
  blue: { left: "bg-accent-blue/20", right: "bg-accent-electric/15" },
  amber: { left: "bg-amber-500/20", right: "bg-orange-500/15" },
};

export function DestinationHero({
  eyebrow,
  title,
  subtitle,
  glow = "purple",
  children,
  className,
}: DestinationHeroProps) {
  const orbs = orbStyles[glow];

  return (
    <section
      className={cn(
        "relative overflow-hidden border-b border-white/5",
        className,
      )}
    >
      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-br",
          glowStyles[glow],
        )}
      />
      <div
        className={cn(
          "absolute -left-32 top-0 h-64 w-64 rounded-full blur-3xl",
          orbs.left,
        )}
      />
      <div
        className={cn(
          "absolute -right-24 bottom-0 h-48 w-48 rounded-full blur-3xl",
          orbs.right,
        )}
      />

      <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="max-w-3xl">
          <p className="text-sm font-medium uppercase tracking-widest text-accent-purple">
            {eyebrow}
          </p>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
            {title}
          </h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            {subtitle}
          </p>
        </div>
        {children && <div className="mt-8">{children}</div>}
      </div>
    </section>
  );
}
