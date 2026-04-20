"use client";

import { useState } from "react";
import { useI18n } from "@/lib/i18n";
import { Card, Pill, SectionHeading, WhyButton } from "@/components/ui";
import {
  chartOfAccounts,
  journal,
  trialBalance,
  accountByCode,
  balanceForAccount,
} from "@/lib/seed";
import { formatDate, formatSAR } from "@/lib/format";
import clsx from "clsx";

type Tab = "coa" | "journal" | "trial";

export default function LedgerPage() {
  const { t, b, lang } = useI18n();
  const [tab, setTab] = useState<Tab>("journal");

  const tb = trialBalance();
  const totalDebit = tb.reduce((s, r) => s + r.debit, 0);
  const totalCredit = tb.reduce((s, r) => s + r.credit, 0);
  const balanced = totalDebit === totalCredit;

  return (
    <div className="max-w-6xl mx-auto">
      <SectionHeading
        title={t("ledger")}
        action={
          balanced ? (
            <Pill tone="green">✓ {t("ledger_balanced")}</Pill>
          ) : (
            <Pill tone="red">! Imbalanced</Pill>
          )
        }
      />

      <div className="mb-4 flex gap-1 p-1 bg-ink-100 rounded-lg w-fit">
        {(
          [
            { k: "journal", label: t("ledger_journal") },
            { k: "coa", label: t("ledger_coa") },
            { k: "trial", label: t("ledger_trial") },
          ] as { k: Tab; label: string }[]
        ).map((x) => (
          <button
            key={x.k}
            onClick={() => setTab(x.k)}
            className={clsx(
              "px-3 py-1.5 text-sm rounded-md transition",
              tab === x.k ? "bg-white shadow-sm text-ink-900" : "text-ink-600 hover:text-ink-900"
            )}
          >
            {x.label}
          </button>
        ))}
      </div>

      {tab === "journal" && <JournalView />}
      {tab === "coa" && <CoAView />}
      {tab === "trial" && <TrialView />}
    </div>
  );

  function JournalView() {
    return (
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs uppercase text-ink-400">
                <th className="text-start py-2 font-medium">{t("ledger_date")}</th>
                <th className="text-start py-2 font-medium">ID</th>
                <th className="text-start py-2 font-medium">{t("ledger_memo")}</th>
                <th className="text-start py-2 font-medium">{t("ledger_source")}</th>
                <th className="text-end py-2 font-medium">{t("ledger_debit")}</th>
                <th className="text-end py-2 font-medium">{t("ledger_credit")}</th>
                <th className="py-2"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-100">
              {journal
                .slice()
                .sort((a, b) => b.date.localeCompare(a.date))
                .flatMap((je) =>
                  je.lines.map((line, i) => (
                    <tr key={je.id + i} className={i === 0 ? "bg-ink-50/30" : ""}>
                      <td className="py-2 text-ink-600 num-latn align-top">{i === 0 ? formatDate(je.date, lang) : ""}</td>
                      <td className="py-2 text-xs text-ink-500 num-latn align-top">{i === 0 ? je.id : ""}</td>
                      <td className="py-2 align-top">
                        {i === 0 ? (
                          <span className="text-ink-800 font-medium">{b(je.memo)}</span>
                        ) : (
                          <span className="ps-4 text-ink-600">
                            {accountByCode[line.account]
                              ? b(accountByCode[line.account].name)
                              : line.account}{" "}
                            <span className="text-xs text-ink-400 num-latn">({line.account})</span>
                          </span>
                        )}
                      </td>
                      <td className="py-2 align-top">
                        {i === 0 && <Pill tone="neutral">{je.source.kind}</Pill>}
                      </td>
                      <td className="py-2 text-end align-top num-latn text-ink-800">
                        {line.debit ? formatSAR(line.debit, lang) : ""}
                      </td>
                      <td className="py-2 text-end align-top num-latn text-ink-800">
                        {line.credit ? formatSAR(line.credit, lang) : ""}
                      </td>
                      <td className="py-2 text-end align-top">
                        {i === 0 && <WhyButton rationale={je.rationale} />}
                      </td>
                    </tr>
                  ))
                )}
            </tbody>
          </table>
        </div>
      </Card>
    );
  }

  function CoAView() {
    const grouped = new Map<string, typeof chartOfAccounts>();
    for (const a of chartOfAccounts) {
      const key = a.type;
      if (!grouped.has(key)) grouped.set(key, []);
      grouped.get(key)!.push(a);
    }
    const typeLabels: Record<string, { en: string; ar: string }> = {
      asset: { en: "Assets (1xxx)", ar: "الأصول (1xxx)" },
      liability: { en: "Liabilities (2xxx)", ar: "الخصوم (2xxx)" },
      equity: { en: "Equity (3xxx)", ar: "حقوق الملكية (3xxx)" },
      revenue: { en: "Revenue (4xxx)", ar: "الإيرادات (4xxx)" },
      expense: { en: "Expenses (6xxx)", ar: "المصروفات (6xxx)" },
    };

    return (
      <div className="space-y-4">
        {Array.from(grouped.entries()).map(([type, accs]) => (
          <Card key={type} title={typeLabels[type][lang]}>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-xs uppercase text-ink-400">
                  <th className="text-start py-2 font-medium w-20">{t("ledger_code")}</th>
                  <th className="text-start py-2 font-medium">{t("ledger_account")}</th>
                  <th className="text-start py-2 font-medium">{lang === "ar" ? "المجموعة" : "Group"}</th>
                  <th className="text-end py-2 font-medium">{t("ledger_balance")}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink-100">
                {accs.map((a) => {
                  const bal = balanceForAccount(a.code);
                  return (
                    <tr key={a.code}>
                      <td className="py-2 text-ink-500 num-latn">{a.code}</td>
                      <td className="py-2 text-ink-800">{b(a.name)}</td>
                      <td className="py-2 text-ink-500 text-xs">{b(a.group)}</td>
                      <td className="py-2 text-end num-latn text-ink-800">{formatSAR(bal, lang)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </Card>
        ))}
      </div>
    );
  }

  function TrialView() {
    return (
      <Card
        subtitle={`${t("ledger_debit")} = ${t("ledger_credit")} · ${formatSAR(totalDebit, lang)}`}
      >
        <table className="w-full text-sm">
          <thead>
            <tr className="text-xs uppercase text-ink-400">
              <th className="text-start py-2 font-medium">{t("ledger_code")}</th>
              <th className="text-start py-2 font-medium">{t("ledger_account")}</th>
              <th className="text-end py-2 font-medium">{t("ledger_debit")}</th>
              <th className="text-end py-2 font-medium">{t("ledger_credit")}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-ink-100">
            {tb.map((row) => (
              <tr key={row.code}>
                <td className="py-2 text-ink-500 num-latn">{row.code}</td>
                <td className="py-2 text-ink-800">{b(accountByCode[row.code].name)}</td>
                <td className="py-2 text-end num-latn text-ink-800">
                  {row.debit ? formatSAR(row.debit, lang) : ""}
                </td>
                <td className="py-2 text-end num-latn text-ink-800">
                  {row.credit ? formatSAR(row.credit, lang) : ""}
                </td>
              </tr>
            ))}
            <tr className="bg-ink-50 font-semibold">
              <td></td>
              <td className="py-2">{t("rep_total")}</td>
              <td className="py-2 text-end num-latn">{formatSAR(totalDebit, lang)}</td>
              <td className="py-2 text-end num-latn">{formatSAR(totalCredit, lang)}</td>
            </tr>
          </tbody>
        </table>
      </Card>
    );
  }
}
