"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { LayoutAlt01, LayoutLeft } from "@untitledui/icons";
import { RouterProvider } from "react-aria-components";
import { SidebarNavigationSimpleDemo } from "@/components/application/app-navigation/sidebar-navigation/sidebar-simple.demo";
import { SidebarNavigationSlimDemo } from "@/components/application/app-navigation/sidebar-navigation/sidebar-slim.demo";
import { useI18n } from "@/lib/i18n";

type SidebarVariant = "simple" | "slim";

export default function Shell({ children }: { children: React.ReactNode }) {
    const { lang, setLang } = useI18n();
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

    return (
        <RouterProvider navigate={(path) => router.push(path)}>
            <div className="flex min-h-screen bg-canvas">
                {variant === "simple" ? <SidebarNavigationSimpleDemo /> : <SidebarNavigationSlimDemo />}

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
