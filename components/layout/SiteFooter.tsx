import Link from "next/link";

const footerLinks = {
  discover: [
    { href: "/browse", label: "Browse" },
    { href: "/latest", label: "Latest" },
    { href: "/popular", label: "Popular" },
    { href: "/genres", label: "Genres" },
  ],
  company: [
    { href: "/about", label: "About" },
    { href: "/careers", label: "Careers" },
    { href: "/press", label: "Press" },
    { href: "/contact", label: "Contact" },
  ],
  legal: [
    { href: "/terms", label: "Terms" },
    { href: "/privacy", label: "Privacy" },
    { href: "/cookies", label: "Cookies" },
  ],
};

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-white/5 bg-surface/50">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-accent-purple to-accent-pink text-sm font-bold">
                M
              </span>
              <span className="text-lg font-bold">
                Manga<span className="gradient-text">Verse</span>
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
              Your premium destination for discovering and reading manga. Built
              for fans, designed for immersion.
            </p>
          </div>

          <FooterColumn title="Discover" links={footerLinks.discover} />
          <FooterColumn title="Company" links={footerLinks.company} />
          <FooterColumn title="Legal" links={footerLinks.legal} />
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 sm:flex-row">
          <p className="text-sm text-muted">
            &copy; {new Date().getFullYear()} MangaVerse. All rights reserved.
          </p>
          <p className="text-xs text-muted/60">
            Fictional content only — no copyrighted material used.
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { href: string; label: string }[];
}) {
  return (
    <div>
      <h3 className="text-sm font-semibold text-white">{title}</h3>
      <ul className="mt-4 space-y-3">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-sm text-muted transition-colors hover:text-white"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
