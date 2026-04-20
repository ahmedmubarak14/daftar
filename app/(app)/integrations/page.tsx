"use client";

import { useState } from "react";
import { useI18n } from "@/lib/i18n";
import { Card, SectionHeading } from "@/components/ui";

type Tile = {
  k: string;
  name: string;
  d: string;
  region: string;
};

export default function IntegrationsPage() {
  const { t, lang } = useI18n();
  const ar = lang === "ar";
  const [connected, setConnected] = useState<string | null>(null);

  const tiles: Tile[] = [
    { k: "W", name: "Wafeq", d: ar ? "المحاسبة العربية" : "Arabic-first accounting", region: ar ? "السعودية · الإمارات" : "SA · UAE" },
    { k: "Q", name: "Qoyod", d: ar ? "سحابي سعودي" : "Saudi cloud books", region: ar ? "السعودية" : "SA" },
    { k: "O", name: "Odoo", d: ar ? "ERP مفتوح" : "Open ERP", region: ar ? "عالمي" : "Global" },
    { k: "Z", name: "Zoho Books", d: ar ? "شهير إقليميًا" : "Popular regionally", region: ar ? "الخليج · العالم" : "GCC · Global" },
    { k: "Q", name: "QuickBooks", d: ar ? "عالمي" : "Global standard", region: ar ? "عالمي" : "Global" },
    { k: "X", name: "Xero", d: ar ? "سحابي عالمي" : "Global cloud", region: ar ? "عالمي" : "Global" },
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <SectionHeading
        eyebrow={ar ? "استيراد البيانات" : "Data import"}
        title={t("dash_integrations_title")}
        subtitle={t("dash_integrations_sub")}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {tiles.map((tile) => {
          const isConnected = connected === tile.name;
          return (
            <Card key={tile.name + tile.k}>
              <div className="flex items-center gap-3">
                <span className="inline-flex w-12 h-12 rounded-xl bg-gradient-to-br from-brand-100 to-brand-300 text-brand-950 items-center justify-center text-lg font-bold">
                  {tile.k}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-ink-900">{tile.name}</div>
                  <div className="text-xs text-ink-500 truncate">{tile.d}</div>
                </div>
                <span className="text-[10px] uppercase tracking-wider text-brand-800 bg-brand-50 border border-brand-200 rounded-full px-2 py-0.5 font-semibold">
                  {t("dash_integrations_demo_tag")}
                </span>
              </div>

              <div className="mt-4 flex items-center gap-2 text-xs text-ink-500">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-ink-300" />
                {tile.region}
              </div>

              <button
                onClick={() => setConnected(isConnected ? null : tile.name)}
                className={
                  isConnected
                    ? "mt-5 w-full px-4 py-2.5 rounded-xl bg-brand-300 text-brand-950 text-sm font-semibold border border-brand-400"
                    : "mt-5 w-full px-4 py-2.5 rounded-xl bg-ink-950 hover:bg-ink-800 text-white text-sm font-semibold transition"
                }
                type="button"
              >
                {isConnected ? (ar ? "متصل · عرض تجريبي" : "Connected · demo") : t("dash_integrations_connect")}
              </button>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
