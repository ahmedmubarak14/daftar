"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useI18n } from "@/lib/i18n";
import { company } from "@/lib/seed";
import clsx from "clsx";

const nav = [
  { href: "/dashboard", key: "dashboard" as const, icon: HomeIcon },
  { href: "/setup", key: "setup" as const, icon: SparklesIcon },
  { href: "/log", key: "log" as const, icon: PencilIcon },
  { href: "/ledger", key: "ledger" as const, icon: BookIcon },
  { href: "/compliance", key: "compliance" as const, icon: ShieldIcon },
  { href: "/reports", key: "reports" as const, icon: BarChartIcon },
];

const navWorkspace = [
  { href: "/accountants", key: "accountants" as const, icon: UsersIcon },
  { href: "/integrations", key: "integrations" as const, icon: PlugIcon },
  { href: "/explain", key: "explain" as const, icon: HelpIcon },
];

export default function Shell({ children }: { children: React.ReactNode }) {
  const { t, b, lang, setLang } = useI18n();
  const pathname = usePathname();

  type NavItem = {
    href: string;
    key: "dashboard" | "setup" | "log" | "ledger" | "compliance" | "reports" | "explain" | "accountants" | "integrations";
    icon: React.ComponentType<{ className?: string }>;
  };
  const renderItem = (item: NavItem) => {
    const active = pathname === item.href || pathname.startsWith(item.href + "/");
    return (
      <Link
        key={item.href}
        href={item.href}
        className={clsx(
          "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition",
          active
            ? "bg-brand-100 text-brand-950 font-semibold"
            : "text-ink-600 hover:bg-ink-50 hover:text-ink-900"
        )}
      >
        <item.icon className={clsx("w-4 h-4", active ? "text-brand-800" : "text-ink-400")} />
        {t(item.key)}
      </Link>
    );
  };

  return (
    <div className="min-h-screen flex bg-canvas">
      {/* Sidebar */}
      <aside className="w-60 shrink-0 border-e border-ink-100 bg-white flex flex-col">
        <Link href="/" className="h-16 px-5 flex items-center border-b border-ink-100 hover:bg-ink-50 transition">
          <span className="text-xl font-bold tracking-tight text-ink-950">Daftar</span>
          <span className="ms-2 text-[11px] font-medium text-ink-400 uppercase tracking-wider">MVP</span>
        </Link>

        <nav className="flex-1 p-3">
          <div className="space-y-0.5">{nav.map(renderItem)}</div>
          <div className="mt-6 mb-2 px-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-ink-400">
            Workspace
          </div>
          <div className="space-y-0.5">{navWorkspace.map(renderItem)}</div>
        </nav>

        <div className="p-3 border-t border-ink-100">
          <div className="px-3 py-2 rounded-lg bg-brand-50 border border-brand-100">
            <div className="text-[11px] uppercase tracking-wider text-brand-800/70 font-semibold">{t("company")}</div>
            <div className="text-sm font-semibold text-ink-900 truncate mt-0.5">{b(company.name)}</div>
            <div className="text-[11px] text-ink-500 num-latn mt-0.5">CR {company.cr}</div>
          </div>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col">
        <header className="h-16 px-6 flex items-center justify-between border-b border-ink-100 bg-white">
          <div className="text-sm text-ink-500">
            {new Date().toLocaleDateString(lang === "ar" ? "ar-SA-u-nu-latn-ca-gregory" : "en-GB", {
              weekday: "long",
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setLang(lang === "en" ? "ar" : "en")}
              className="text-sm px-3 py-1.5 rounded-md border border-ink-200 hover:bg-ink-50 transition"
              aria-label="Toggle language"
            >
              {lang === "en" ? "العربية" : "English"}
            </button>
            <div className="w-8 h-8 rounded-full bg-brand-300 text-brand-950 grid place-items-center text-xs font-bold">
              FA
            </div>
          </div>
        </header>

        <main className="flex-1 p-6 md:p-8 overflow-y-auto bg-canvas">{children}</main>
      </div>
    </div>
  );
}

/* --- Minimal inline icons (no lucide dep to keep the demo self-contained) --- */

function Icon({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      {children}
    </svg>
  );
}

export function HomeIcon({ className }: { className?: string }) {
  return (
    <Icon className={className}>
      <path d="M3 11 12 3l9 8" />
      <path d="M5 10v10h14V10" />
    </Icon>
  );
}
export function SparklesIcon({ className }: { className?: string }) {
  return (
    <Icon className={className}>
      <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2 2M16 16l2 2M6 18l2-2M16 8l2-2" />
    </Icon>
  );
}
export function PencilIcon({ className }: { className?: string }) {
  return (
    <Icon className={className}>
      <path d="M4 20h4l10-10-4-4L4 16v4z" />
      <path d="M14 6l4 4" />
    </Icon>
  );
}
export function BookIcon({ className }: { className?: string }) {
  return (
    <Icon className={className}>
      <path d="M4 4h10a4 4 0 0 1 4 4v12H8a4 4 0 0 1-4-4V4z" />
      <path d="M4 16a4 4 0 0 1 4-4h10" />
    </Icon>
  );
}
export function ShieldIcon({ className }: { className?: string }) {
  return (
    <Icon className={className}>
      <path d="M12 3l8 3v6c0 5-4 8-8 9-4-1-8-4-8-9V6l8-3z" />
      <path d="M9 12l2 2 4-4" />
    </Icon>
  );
}
export function BarChartIcon({ className }: { className?: string }) {
  return (
    <Icon className={className}>
      <path d="M4 20V10M10 20V4M16 20v-8M22 20H2" />
    </Icon>
  );
}
export function HelpIcon({ className }: { className?: string }) {
  return (
    <Icon className={className}>
      <circle cx="12" cy="12" r="9" />
      <path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.9.4-1.5 1-1.5 2.2" />
      <circle cx="12" cy="17" r="0.5" fill="currentColor" />
    </Icon>
  );
}
export function UsersIcon({ className }: { className?: string }) {
  return (
    <Icon className={className}>
      <circle cx="9" cy="8" r="3.2" />
      <path d="M3 20c0-3.3 2.7-5.5 6-5.5s6 2.2 6 5.5" />
      <circle cx="17" cy="9" r="2.5" />
      <path d="M15 20c0-2.4 1.7-4 4-4" />
    </Icon>
  );
}
export function PlugIcon({ className }: { className?: string }) {
  return (
    <Icon className={className}>
      <path d="M9 3v5M15 3v5" />
      <rect x="7" y="8" width="10" height="6" rx="1.5" />
      <path d="M12 14v3a3 3 0 0 0 3 3h1" />
    </Icon>
  );
}
