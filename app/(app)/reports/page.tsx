"use client";

import { useI18n } from "@/lib/i18n";
import { Card, Pill, SectionHeading } from "@/components/ui";
import {
  chartOfAccounts,
  journal,
  sumByType,
  balanceForAccount,
  accountByCode,
} from "@/lib/seed";
import { formatSAR } from "@/lib/format";
import type { Account, Bilingual } from "@/lib/types";

const FEB_START = "2026-02-01";
const FEB_END = "2026-02-28";

function amountInWindow(code: string, from: string, to: string): number {
  const acc = accountByCode[code];
  if (!acc) return 0;
  let d = 0;
  let c = 0;
  for (const je of journal) {
    if (je.date < from || je.date > to) continue;
    for (const line of je.lines) {
      if (line.account !== code) continue;
      d += line.debit;
      c += line.credit;
    }
  }
  return acc.type === "expense" || acc.type === "asset" ? d - c : c - d;
}

export default function ReportsPage() {
  const { t, b, lang } = useI18n();

  const revenue = sumByType("revenue", FEB_START, FEB_END);
  const expenses = sumByType("expense", FEB_START, FEB_END);
  const netIncome = revenue - expenses;

  const ytdRevenue = sumByType("revenue", "2026-01-01", FEB_END);
  const ytdExpenses = sumByType("expense", "2026-01-01", FEB_END);

  const expenseAccounts = chartOfAccounts.filter((a) => a.type === "expense");
  const expenseLines = expenseAccounts
    .map((a) => ({
      account: a,
      month: amountInWindow(a.code, FEB_START, FEB_END),
      ytd: amountInWindow(a.code, "2026-01-01", FEB_END),
    }))
    .filter((x) => x.month || x.ytd);

  const assets = chartOfAccounts.filter((a) => a.type === "asset");
  const liabilities = chartOfAccounts.filter((a) => a.type === "liability");
  const equity = chartOfAccounts.filter((a) => a.type === "equity");

  const topExpense = expenseLines.reduce(
    (best, x) => (x.month > best.month ? x : best),
    expenseLines[0]
  );
  const topExpensePct =
    expenses && topExpense ? Math.round((topExpense.month / expenses) * 100) : 0;

  const summary =
    lang === "ar"
      ? `أنفقت ${formatSAR(expenses, "ar")} هذا الشهر، وأكبر بند كان ${b(topExpense.account.name)} بنسبة ${topExpensePct}٪. الإيرادات ${formatSAR(revenue, "ar")}. صافي ${netIncome >= 0 ? "الربح" : "الخسارة"} ${formatSAR(Math.abs(netIncome), "ar")}.`
      : `You spent ${formatSAR(expenses, "en")} this month. Largest category was ${b(topExpense.account.name)} at ${topExpensePct}%. Revenue was ${formatSAR(revenue, "en")}. Net ${netIncome >= 0 ? "income" : "loss"} was ${formatSAR(Math.abs(netIncome), "en")}.`;

  return (
    <div className="max-w-5xl mx-auto">
      <SectionHeading
        title={t("reports")}
        subtitle="February 2026"
        action={
          <button className="text-sm px-3 py-2 rounded-md border border-ink-200 hover:bg-ink-50 transition text-ink-700">
            {t("rep_download")}
          </button>
        }
      />

      <Card title={t("rep_summary")} className="mb-6" action={<Pill tone="brand">AI summary</Pill>}>
        <p className="text-ink-800 leading-relaxed">{summary}</p>
      </Card>

      <Card title={t("rep_pl")} className="mb-6">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-xs uppercase text-ink-400">
              <th className="text-start py-2 font-medium">{t("log_account")}</th>
              <th className="text-end py-2 font-medium">{t("month_to_date")}</th>
              <th className="text-end py-2 font-medium">{t("year_to_date")}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-ink-100">
            <tr className="bg-ink-50/50">
              <td className="py-2 font-semibold text-ink-700">{t("revenue")}</td>
              <td className="py-2 text-end num-latn">{formatSAR(revenue, lang)}</td>
              <td className="py-2 text-end num-latn">{formatSAR(ytdRevenue, lang)}</td>
            </tr>
            <tr>
              <td className="py-2 font-semibold text-ink-700 pt-4">{t("expenses")}</td>
              <td></td>
              <td></td>
            </tr>
            {expenseLines.map((x) => (
              <tr key={x.account.code}>
                <td className="py-2 ps-4 text-ink-700">{b(x.account.name)}</td>
                <td className="py-2 text-end num-latn text-ink-800">
                  {formatSAR(x.month, lang)}
                </td>
                <td className="py-2 text-end num-latn text-ink-600">
                  {formatSAR(x.ytd, lang)}
                </td>
              </tr>
            ))}
            <tr className="bg-ink-50 font-semibold">
              <td className="py-2">
                {t("rep_total")} {t("expenses")}
              </td>
              <td className="py-2 text-end num-latn">{formatSAR(expenses, lang)}</td>
              <td className="py-2 text-end num-latn">{formatSAR(ytdExpenses, lang)}</td>
            </tr>
            <tr
              className={`border-t-2 border-ink-300 font-semibold ${
                netIncome >= 0 ? "text-emerald-700" : "text-rose-700"
              }`}
            >
              <td className="py-3">{t("rep_net_income")}</td>
              <td className="py-3 text-end num-latn">{formatSAR(netIncome, lang)}</td>
              <td className="py-3 text-end num-latn">
                {formatSAR(ytdRevenue - ytdExpenses, lang)}
              </td>
            </tr>
          </tbody>
        </table>
      </Card>

      <Card title={t("rep_bs")}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-sm font-semibold text-ink-700 mb-2">{t("rep_assets")}</h4>
            <BSTable accs={assets} lang={lang} b={b} />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-ink-700 mb-2">{t("rep_liabilities")}</h4>
            <BSTable accs={liabilities} lang={lang} b={b} />
            <h4 className="text-sm font-semibold text-ink-700 mb-2 mt-6">{t("rep_equity")}</h4>
            <BSTable accs={equity} lang={lang} b={b} />
            <div className="mt-2 text-xs text-ink-500 italic">
              {lang === "ar" ? "الأرباح المحتجزة الحالية" : "Current retained earnings"}:{" "}
              <span className="num-latn">
                {formatSAR(ytdRevenue - ytdExpenses, lang)}
              </span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

function BSTable({
  accs,
  lang,
  b,
}: {
  accs: Account[];
  lang: "en" | "ar";
  b: (v: Bilingual) => string;
}) {
  const rows = accs
    .map((a) => ({ a, bal: balanceForAccount(a.code) }))
    .filter((r) => r.bal !== 0);
  const total = rows.reduce((s, r) => s + r.bal, 0);
  return (
    <table className="w-full text-sm">
      <tbody className="divide-y divide-ink-100">
        {rows.map((r) => (
          <tr key={r.a.code}>
            <td className="py-2 text-ink-700">{b(r.a.name)}</td>
            <td className="py-2 text-end num-latn">{formatSAR(Math.abs(r.bal), lang)}</td>
          </tr>
        ))}
        <tr className="bg-ink-50 font-semibold">
          <td className="py-2">Total</td>
          <td className="py-2 text-end num-latn">{formatSAR(Math.abs(total), lang)}</td>
        </tr>
      </tbody>
    </table>
  );
}
