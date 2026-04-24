"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import {
    BarChartSquare02,
    BookOpen01,
    Edit03,
    HelpCircle,
    HomeLine,
    LayoutAlt01,
    LayoutLeft,
    MagicWand01,
    PieChart03,
    PuzzlePiece01,
    ShieldTick,
    Users01,
} from "@untitledui/icons";
import { RouterProvider } from "react-aria-components";
import type { FC } from "react";
import type { NavItemType } from "@/components/application/app-navigation/config";
import { SidebarNavigationSimple } from "@/components/application/app-navigation/sidebar-navigation/sidebar-simple";
import { SidebarNavigationSlim } from "@/components/application/app-navigation/sidebar-navigation/sidebar-slim";
import { useI18n } from "@/lib/i18n";
import { company } from "@/lib/seed";

type SidebarVariant = "simple" | "slim";

export default function Shell({ children }: { children: React.ReactNode }) {
    const { t, b, lang, setLang } = useI18n();
    const pathname = usePathname();
    const router = useRouter();

    const [variant, setVariant] = useState<SidebarVariant>("simple");

    useEffect(() => {
        const saved = localStorage.getItem("sidebar-variant");
        if (saved === "simple" || saved === "slim") setVariant(saved);
    }, []);

    const toggleVariant = () => {
        const next = variant === "simple" ? "slim" : "simple";
        setVariant(next);
        localStorage.setItem("sidebar-variant", next);
    };

    type Item = NavItemType & { icon: FC<{ className?: string }> };

    const items: Item[] = [
        { label: t("dashboard"), href: "/dashboard", icon: HomeLine },
        { label: t("setup"), href: "/setup", icon: MagicWand01 },
        { label: t("log"), href: "/log", icon: Edit03 },
        { label: t("ledger"), href: "/ledger", icon: BookOpen01 },
        { label: t("compliance"), href: "/compliance", icon: ShieldTick },
        { label: t("reports"), href: "/reports", icon: BarChartSquare02 },
        { label: t("accountants"), href: "/accountants", icon: Users01 },
        { label: t("integrations"), href: "/integrations", icon: PuzzlePiece01 },
        { label: t("explain"), href: "/explain", icon: HelpCircle },
    ];

    const activeHref =
        items
            .map((i) => i.href!)
            .sort((a, b) => b.length - a.length)
            .find((href) => pathname === href || pathname.startsWith(href + "/"));

    const companyCard = (
        <div className="rounded-xl border border-brand-100 bg-brand-50 px-3 py-2">
            <div className="text-[11px] font-semibold tracking-wider text-brand-800/70 uppercase">
                {t("company")}
            </div>
            <div className="mt-0.5 truncate text-sm font-semibold text-primary">
                {b(company.name)}
            </div>
            <div className="num-latn mt-0.5 text-[11px] text-tertiary">CR {company.cr}</div>
        </div>
    );

    return (
        <RouterProvider navigate={(path) => router.push(path)}>
            <div className="flex min-h-screen bg-canvas">
                {variant === "simple" ? (
                    <SidebarNavigationSimple
                        activeUrl={activeHref}
                        items={items}
                        featureCard={companyCard}
                        showAccountCard={false}
                    />
                ) : (
                    <SidebarNavigationSlim activeUrl={activeHref} items={items} />
                )}

                <div className="flex min-w-0 flex-1 flex-col">
                    <header className="flex h-16 items-center justify-between border-b border-ink-100 bg-white px-6">
                        <div className="text-sm text-ink-500">
                            {new Date().toLocaleDateString(
                                lang === "ar" ? "ar-SA-u-nu-latn-ca-gregory" : "en-GB",
                                { weekday: "long", day: "numeric", month: "long", year: "numeric" },
                            )}
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={toggleVariant}
                                className="grid size-9 place-items-center rounded-md border border-ink-200 text-ink-600 transition hover:bg-ink-50"
                                aria-label="Toggle sidebar layout"
                                title={variant === "simple" ? "Switch to slim rail" : "Switch to full sidebar"}
                            >
                                {variant === "simple" ? (
                                    <LayoutLeft className="size-4" />
                                ) : (
                                    <LayoutAlt01 className="size-4" />
                                )}
                            </button>
                            <button
                                onClick={() => setLang(lang === "en" ? "ar" : "en")}
                                className="rounded-md border border-ink-200 px-3 py-1.5 text-sm transition hover:bg-ink-50"
                                aria-label="Toggle language"
                            >
                                {lang === "en" ? "العربية" : "English"}
                            </button>
                            <div className="grid size-8 place-items-center rounded-full bg-brand-300 text-xs font-bold text-brand-950">
                                FA
                            </div>
                        </div>
                    </header>

                    <main className="flex-1 overflow-y-auto bg-canvas p-6 md:p-8">{children}</main>
                </div>
            </div>
        </RouterProvider>
    );
}
