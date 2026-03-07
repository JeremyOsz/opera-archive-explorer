import Link from 'next/link';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/app/lib/utils';

interface SiteHeaderLink {
  href: string;
  label: string;
  icon?: LucideIcon;
  active?: boolean;
}

interface SiteHeaderProps {
  tagline: string;
  links: SiteHeaderLink[];
  meta?: React.ReactNode;
}

export default function SiteHeader({ tagline, links, meta }: SiteHeaderProps) {
  return (
    <header className="border-b border-border bg-card">
      <div className="border-b border-border/80 bg-card">
        <div className="container mx-auto px-4 py-6 sm:py-7">
          <Link href="/" className="block text-center">
            <p className="text-[0.62rem] font-semibold uppercase tracking-[0.26em] text-muted-foreground">
              Opera Archive Collection
            </p>
            <span className="mt-2 block text-3xl font-black uppercase leading-none tracking-[-0.04em] text-foreground sm:text-5xl">
              Opera Archive Explorer
            </span>
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="flex flex-col gap-4 py-4 lg:flex-row lg:items-center lg:justify-between">
          <p className="text-sm text-muted-foreground">{tagline}</p>

          <nav className="flex flex-wrap items-center gap-2" aria-label="Primary">
            {links.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={`${link.href}-${link.label}`}
                  href={link.href}
                  aria-current={link.active ? 'page' : undefined}
                  className={cn(
                    'inline-flex items-center gap-2 rounded-[2px] border px-3 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.12em] transition-colors',
                    link.active
                      ? 'border-foreground bg-foreground text-background'
                      : 'border-transparent text-foreground hover:border-border hover:bg-secondary'
                  )}
                >
                  {Icon ? <Icon className="h-3.5 w-3.5" /> : null}
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {meta ? (
          <div className="border-t border-border/80 py-3 text-sm text-muted-foreground">{meta}</div>
        ) : null}
      </div>
    </header>
  );
}
