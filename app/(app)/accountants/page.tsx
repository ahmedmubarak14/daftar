"use client";

import { useState } from "react";
import { useI18n } from "@/lib/i18n";
import { Card, Pill, SectionHeading } from "@/components/ui";

type Accountant = {
  id: string;
  n: string;
  s: string;
  rate: string;
  rating: string;
  tag: string;
  blurb: string;
};

export default function AccountantsPage() {
  const { t, lang } = useI18n();
  const ar = lang === "ar";
  const [openId, setOpenId] = useState<string | null>(null);

  const accountants: Accountant[] = [
    {
      id: "sarah",
      n: ar ? "أ. سارة الحربي" : "Sarah Al-Harbi",
      s: ar ? "محاسبة قانونية — ضريبة القيمة المضافة" : "CPA — VAT filing",
      rate: "280",
      rating: "4.9",
      tag: ar ? "SOCPA" : "SOCPA CPA",
      blurb: ar
        ? "خبرة 8 سنوات في إقرارات ZATCA للشركات الناشئة."
        : "8 years of ZATCA filing experience for Saudi startups.",
    },
    {
      id: "khalid",
      n: ar ? "أ. خالد المطيري" : "Khalid Al-Mutairi",
      s: ar ? "مدير مالي — شركات ناشئة" : "CFO — startup growth",
      rate: "450",
      rating: "4.8",
      tag: ar ? "مدير مالي سابق" : "Ex-CFO",
      blurb: ar
        ? "سبق وشغل منصب مدير مالي لشركتين مدعومتين من STV."
        : "Former CFO at two STV-backed companies.",
    },
    {
      id: "hind",
      n: ar ? "أ. هند السبيعي" : "Hind Al-Subaie",
      s: ar ? "الزكاة وضريبة الشركات" : "Zakat & CIT",
      rate: "320",
      rating: "4.9",
      tag: ar ? "زكاة ضريبة" : "Zakat & tax",
      blurb: ar
        ? "متخصصة في الزكاة وضريبة الشركات لأصحاب الأعمال السعوديين والأجانب."
        : "Zakat & corporate-tax specialist for Saudi and foreign-owned entities.",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <SectionHeading
        eyebrow={ar ? "فريق مرن" : "Flexible team"}
        title={t("dash_accountants_title")}
        subtitle={t("dash_accountants_sub")}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {accountants.map((a) => (
          <Card key={a.id}>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-brand-300 to-brand-500 grid place-items-center text-brand-950 font-bold">
                {a.n.split(" ").slice(-2).map((p) => p[0]).join("")}
              </div>
              <div className="min-w-0">
                <div className="font-semibold text-ink-900 truncate">{a.n}</div>
                <div className="text-xs text-ink-500 truncate">{a.s}</div>
              </div>
            </div>

            <p className="mt-4 text-sm text-ink-600 leading-relaxed">{a.blurb}</p>

            <div className="mt-4 flex items-center justify-between text-sm">
              <span className="text-ink-900">
                <span className="num-latn font-semibold text-xl">{a.rate} SAR</span>
                <span className="text-ink-500 text-xs ms-1">{t("dash_accountants_per_hour")}</span>
              </span>
              <Pill tone="brand">{a.tag}</Pill>
            </div>
            <div className="mt-1 text-xs text-ink-500">
              ★ <span className="num-latn">{a.rating}</span> {t("dash_accountants_rating")}
            </div>

            <button
              onClick={() => setOpenId(a.id)}
              className="mt-5 w-full px-4 py-2.5 rounded-xl bg-brand-300 hover:bg-brand-400 text-brand-950 text-sm font-semibold transition shadow-card hover:shadow-soft"
            >
              {t("dash_accountants_book")}
            </button>
          </Card>
        ))}
      </div>

      {openId && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-ink-950/40 backdrop-blur-[2px] flex items-end sm:items-center justify-center p-4"
          onClick={() => setOpenId(null)}
        >
          <div
            dir={ar ? "rtl" : "ltr"}
            className="w-full max-w-md bg-white rounded-2xl shadow-hero border border-ink-100 p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between">
              <h4 className="font-semibold text-ink-900">{t("dash_accountants_modal_title")}</h4>
              <button
                onClick={() => setOpenId(null)}
                className="text-ink-400 hover:text-ink-700 text-lg leading-none"
                aria-label={t("close")}
              >
                ×
              </button>
            </div>
            <p className="mt-3 text-sm text-ink-700 leading-relaxed">{t("dash_accountants_modal_body")}</p>
            <div className="mt-5 flex justify-end">
              <button
                onClick={() => setOpenId(null)}
                className="text-sm px-4 py-2 rounded-lg bg-ink-100 hover:bg-ink-200 text-ink-800 font-medium"
              >
                {t("close")}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
