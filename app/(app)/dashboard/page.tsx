"use client";

import Link from "next/link";
import { useState } from "react";
import { useI18n } from "@/lib/i18n";
import { Card, Pill, SectionHeading, Stat, StatusDot, WhyButton } from "@/components/ui";
import {
  company,
  obligations,
  journal,
  cashOnHand,
  runwayMonths,
  sumByType,
  accountByCode,
} from "@/lib/seed";
import { formatDate, formatSAR, daysUntil } from "@/lib/format";

const MONTH_START = "2026-04-01";

export default function DashboardPage() {
  const { t, b, lang } = useI18n();

  const cash = cashOnHand();
  const mtdRevenue = sumByType("revenue", "2026-02-01", "2026-02-28");
  const mtdExpenses = sumByType("expense", "2026-02-01", "2026-02-28");
  const netBurn = mtdExpenses - mtdRevenue;
  const runway = runwayMonths();

  return (
    <div className="max-w-6xl mx-auto">
      <SectionHeading
        title={b(company.name)}
        subtitle={t("dash_hello")}
        action={
          <Pill tone="green">
            <StatusDot tone="green" />
            {t("vat_state_not_registered")}
          </Pill>
        }
      />

      {/* Top stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <Stat label={t("cash")} value={formatSAR(cash, lang)} sub={`Al Rajhi · ${formatDate("2026-02-28", lang)}`} />
        </Card>
        <Card>
          <Stat
            label={t("runway")}
            value={
              <>
                {runway.toFixed(1)} <span className="text-base font-normal text-ink-500">{t("months")}</span>
              </>
            }
            sub={t("net_burn") + ": " + formatSAR(netBurn, lang)}
            tone={runway > 12 ? "good" : runway < 6 ? "bad" : "default"}
          />
        </Card>
        <Card>
          <Stat label={t("revenue") + " · " + t("month_to_date")} value={formatSAR(mtdRevenue, lang)} tone="good" />
        </Card>
        <Card>
          <Stat label={t("expenses") + " · " + t("month_to_date")} value={formatSAR(mtdExpenses, lang)} />
        </Card>
      </div>

      {/* Next actions + obligations */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <Card title={t("dash_next_actions")} className="lg:col-span-2">
          <div className="divide-y divide-ink-100 -mx-5">
            <ActionRow href="/log" title={t("dash_action_log")} detail={t("dash_action_log_detail")} badge="3" />
            <ActionRow href="/ledger" title={t("dash_action_bank")} detail={t("dash_action_bank_detail")} />
            <ActionRow href="/compliance" title={t("dash_action_calendar")} detail={t("dash_action_calendar_detail")} />
          </div>
        </Card>

        <Card title={t("dash_obligations")} action={<Link href="/compliance" className="text-xs text-brand-700 hover:underline">{t("view_all")}</Link>}>
          <ul className="space-y-3">
            {obligations
              .slice()
              .sort((a, b) => a.dueDate.localeCompare(b.dueDate))
              .slice(0, 4)
              .map((o) => {
                const days = daysUntil(o.dueDate);
                return (
                  <li key={o.id} className="flex items-start gap-3">
                    <StatusDot tone={o.status} />
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-ink-800 truncate">{b(o.label)}</div>
                      <div className="text-xs text-ink-500 num-latn">
                        {formatDate(o.dueDate, lang)} · {days >= 0 ? `${days} ${t("comp_days")}` : t("comp_overdue")}
                      </div>
                    </div>
                  </li>
                );
              })}
          </ul>
        </Card>
      </div>

      {/* Recent activity */}
      <Card
        title={t("dash_recent_activity")}
        action={<Link href="/ledger" className="text-xs text-brand-700 hover:underline">{t("view_all")}</Link>}
      >
        <div className="overflow-x-auto -mx-5 px-5">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs uppercase text-ink-400">
                <th className="text-start py-2 font-medium">{t("ledger_date")}</th>
                <th className="text-start py-2 font-medium">{t("ledger_memo")}</th>
                <th className="text-start py-2 font-medium">{t("ledger_account")}</th>
                <th className="text-end py-2 font-medium">{t("ledger_debit")}</th>
                <th className="text-end py-2 font-medium">{t("ledger_credit")}</th>
                <th className="py-2"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-100">
              {journal
                .slice()
                .sort((a, b) => b.date.localeCompare(a.date))
                .slice(0, 6)
                .map((je) => {
                  const debitLine = je.lines.find((l) => l.debit > 0)!;
                  const creditLine = je.lines.find((l) => l.credit > 0)!;
                  return (
                    <tr key={je.id}>
                      <td className="py-2.5 text-ink-600 num-latn">{formatDate(je.date, lang)}</td>
                      <td className="py-2.5 text-ink-800 max-w-xs truncate">{b(je.memo)}</td>
                      <td className="py-2.5 text-ink-600">{b(accountByCode[debitLine.account].name)}</td>
                      <td className="py-2.5 text-end num-latn text-ink-800">{formatSAR(debitLine.debit, lang)}</td>
                      <td className="py-2.5 text-end num-latn text-ink-600">{formatSAR(creditLine.credit, lang)}</td>
                      <td className="py-2.5 text-end">
                        <WhyButton rationale={je.rationale} context={<span className="num-latn">JE {je.id}</span>} />
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Accountants on demand */}
      <AccountantsPanel />

      {/* Integrations */}
      <IntegrationsPanel />
    </div>
  );
}

/* ─────────────────── Accountants on demand ─────────────────── */

function AccountantsPanel() {
  const { t, lang } = useI18n();
  const ar = lang === "ar";
  const [openId, setOpenId] = useState<string | null>(null);

  const accountants = [
    {
      id: "sarah",
      n: ar ? "أ. سارة الحربي" : "Sarah Al-Harbi",
      s: ar ? "محاسبة قانونية — ضريبة القيمة المضافة" : "CPA — VAT filing",
      rate: "280",
      rating: "4.9",
      tag: ar ? "SOCPA" : "SOCPA CPA",
    },
    {
      id: "khalid",
      n: ar ? "أ. خالد المطيري" : "Khalid Al-Mutairi",
      s: ar ? "مدير مالي — شركات ناشئة" : "CFO — startup growth",
      rate: "450",
      rating: "4.8",
      tag: ar ? "مدير مالي سابق" : "Ex-CFO",
    },
    {
      id: "hind",
      n: ar ? "أ. هند السبيعي" : "Hind Al-Subaie",
      s: ar ? "الزكاة وضريبة الشركات" : "Zakat & CIT",
      rate: "320",
      rating: "4.9",
      tag: ar ? "زكاة ضريبة" : "Zakat & tax",
    },
  ];

  return (
    <section id="accountants" className="mt-8 scroll-mt-6">
      <SectionHeading title={t("dash_accountants_title")} subtitle={t("dash_accountants_sub")} />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {accountants.map((a) => (
          <Card key={a.id}>
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-gradient-to-br from-accent-400 to-accent-700 grid place-items-center text-white font-bold">
                {a.n.split(" ").slice(-2).map((p) => p[0]).join("")}
              </div>
              <div className="min-w-0">
                <div className="font-semibold text-ink-900 truncate">{a.n}</div>
                <div className="text-xs text-ink-500 truncate">{a.s}</div>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between text-sm">
              <span className="text-ink-800">
                <span className="num-latn font-semibold">{a.rate} SAR</span>
                <span className="text-ink-500 ms-1">{t("dash_accountants_per_hour")}</span>
              </span>
              <Pill tone="brand">{a.tag}</Pill>
            </div>
            <div className="mt-1 text-xs text-ink-500">
              ★ <span className="num-latn">{a.rating}</span> {t("dash_accountants_rating")}
            </div>
            <button
              onClick={() => setOpenId(a.id)}
              className="mt-4 w-full px-4 py-2.5 rounded-xl bg-gradient-to-br from-accent-500 to-accent-700 text-white text-sm font-medium hover:shadow-md transition"
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
          className="fixed inset-0 z-50 bg-ink-950/30 backdrop-blur-[1px] flex items-end sm:items-center justify-center p-4"
          onClick={() => setOpenId(null)}
        >
          <div
            dir={ar ? "rtl" : "ltr"}
            className="w-full max-w-md bg-white rounded-xl shadow-xl border border-ink-100 p-5"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between">
              <h4 className="font-semibold text-ink-800">{t("dash_accountants_modal_title")}</h4>
              <button
                onClick={() => setOpenId(null)}
                className="text-ink-400 hover:text-ink-700 text-sm"
                aria-label={t("close")}
              >
                ✕
              </button>
            </div>
            <p className="mt-3 text-sm text-ink-700 leading-relaxed">{t("dash_accountants_modal_body")}</p>
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setOpenId(null)}
                className="text-sm px-3 py-1.5 rounded-md bg-ink-100 hover:bg-ink-200 text-ink-700"
              >
                {t("close")}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

/* ─────────────────── Integrations ─────────────────── */

function IntegrationsPanel() {
  const { t, lang } = useI18n();
  const ar = lang === "ar";

  const tiles = [
    { k: "W", name: "Wafeq", d: ar ? "المحاسبة العربية" : "Arabic-first accounting" },
    { k: "Q", name: "Qoyod", d: ar ? "سحابي سعودي" : "Saudi cloud books" },
    { k: "O", name: "Odoo", d: ar ? "ERP مفتوح" : "Open ERP" },
    { k: "Z", name: "Zoho Books", d: ar ? "شهير إقليمياً" : "Popular regionally" },
    { k: "Q", name: "QuickBooks", d: ar ? "عالمي" : "Global standard" },
    { k: "X", name: "Xero", d: ar ? "سحابي عالمي" : "Global cloud" },
  ];

  return (
    <section id="integrations" className="mt-10 scroll-mt-6">
      <SectionHeading title={t("dash_integrations_title")} subtitle={t("dash_integrations_sub")} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tiles.map((tile) => (
          <Card key={tile.name + tile.k}>
            <div className="flex items-center gap-3">
              <span className="inline-flex w-11 h-11 rounded-xl bg-gradient-to-br from-ink-100 to-ink-200 text-ink-800 items-center justify-center text-lg font-bold">
                {tile.k}
              </span>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-ink-900">{tile.name}</div>
                <div className="text-xs text-ink-500 truncate">{tile.d}</div>
              </div>
              <span className="text-[10px] uppercase tracking-wider text-accent-700 bg-accent-50 border border-accent-100 rounded-full px-2 py-0.5">
                {t("dash_integrations_demo_tag")}
              </span>
            </div>
            <button
              className="mt-4 w-full px-4 py-2.5 rounded-xl bg-ink-900 text-white text-sm font-medium hover:bg-ink-800 transition"
              type="button"
            >
              {t("dash_integrations_connect")}
            </button>
          </Card>
        ))}
      </div>
    </section>
  );
}

function ActionRow({
  href,
  title,
  detail,
  badge,
}: {
  href: string;
  title: string;
  detail: string;
  badge?: string;
}) {
  return (
    <Link
      href={href}
      className="flex items-center gap-4 px-5 py-3.5 hover:bg-ink-50 transition group"
    >
      <div className="flex-1">
        <div className="text-sm font-medium text-ink-800">{title}</div>
        <div className="text-xs text-ink-500 mt-0.5">{detail}</div>
      </div>
      {badge && (
        <span className="text-xs font-semibold bg-brand-100 text-brand-700 rounded-full h-6 min-w-6 px-2 grid place-items-center num-latn">
          {badge}
        </span>
      )}
      <span className="text-ink-300 group-hover:text-ink-500 transition">›</span>
    </Link>
  );
}
