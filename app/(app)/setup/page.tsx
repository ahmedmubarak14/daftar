"use client";

import { useI18n } from "@/lib/i18n";
import { Card, Pill, SectionHeading, StatusDot } from "@/components/ui";
import { WhyButton } from "@/components/ui";
import { company, chartOfAccounts, journal, accountByCode } from "@/lib/seed";
import { formatSAR, formatDate } from "@/lib/format";

export default function SetupPage() {
  const { t, b, lang } = useI18n();

  const setupEntries = journal.filter((j) => j.source.kind === "setup");

  const openingBalances = new Map<string, number>();
  for (const je of setupEntries) {
    for (const line of je.lines) {
      const current = openingBalances.get(line.account) ?? 0;
      openingBalances.set(line.account, current + line.debit - line.credit);
    }
  }

  const steps = [
    { key: t("setup_profile"), status: "done" as const },
    { key: t("setup_capital"), status: "done" as const },
    { key: t("setup_preincorp"), status: "done" as const },
    { key: t("setup_vat"), status: "done" as const },
    { key: t("setup_coa"), status: "done" as const },
    { key: t("setup_review"), status: "done" as const },
  ];

  return (
    <div className="max-w-5xl mx-auto">
      <SectionHeading
        title={t("setup")}
        subtitle={t("setup_complete")}
        action={
          <Pill tone="green">
            <StatusDot tone="green" />
            {t("setup_complete")}
          </Pill>
        }
      />

      {/* Stepper */}
      <Card className="mb-6">
        <ol className="grid grid-cols-2 md:grid-cols-6 gap-2">
          {steps.map((s, i) => (
            <li key={i} className="flex flex-col items-center gap-2 text-center">
              <span className="w-8 h-8 rounded-full bg-brand-600 text-white text-xs font-semibold grid place-items-center num-latn">
                ✓
              </span>
              <span className="text-xs text-ink-600">{s.key}</span>
            </li>
          ))}
        </ol>
      </Card>

      {/* Entity profile */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Card title={t("setup_profile")}>
          <dl className="grid grid-cols-2 gap-y-3 text-sm">
            <Dt>{t("setup_cr")}</Dt>
            <Dd className="num-latn">{company.cr}</Dd>
            <Dt>{t("setup_type")}</Dt>
            <Dd>{b(company.entityType)}</Dd>
            <Dt>{t("setup_incorp")}</Dt>
            <Dd className="num-latn">{formatDate(company.incorporationDate, lang)}</Dd>
            <Dt>{t("setup_fye")}</Dt>
            <Dd className="num-latn">31 Dec</Dd>
            <Dt>{t("setup_activity")}</Dt>
            <Dd>{b(company.activity)}</Dd>
          </dl>
        </Card>

        <Card title={t("setup_capital")}>
          <div className="flex items-baseline justify-between pb-3 border-b border-ink-100">
            <span className="text-sm text-ink-500">{t("setup_total_capital")}</span>
            <span className="text-lg font-semibold num-latn">{formatSAR(company.capital.total, lang)}</span>
          </div>
          <ul className="mt-4 space-y-3">
            {company.capital.founders.map((f) => (
              <li key={f.name} className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium text-ink-800">{f.name}</div>
                  <div className="text-xs text-ink-500 num-latn">{(f.share * 100).toFixed(0)}%</div>
                </div>
                <span className="text-sm num-latn text-ink-700">{formatSAR(f.contributed, lang)}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      {/* Pre-incorporation items */}
      <Card className="mb-6" title={t("setup_preincorp")}>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-xs uppercase text-ink-400">
              <th className="text-start py-2 font-medium">{t("ledger_date")}</th>
              <th className="text-start py-2 font-medium">{t("ledger_memo")}</th>
              <th className="text-start py-2 font-medium">{t("log_account")}</th>
              <th className="text-end py-2 font-medium">{t("log_amount")}</th>
              <th className="py-2"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-ink-100">
            {setupEntries.map((je) => {
              const debit = je.lines.find((l) => l.debit > 0)!;
              return (
                <tr key={je.id}>
                  <td className="py-2.5 text-ink-600 num-latn">{formatDate(je.date, lang)}</td>
                  <td className="py-2.5 text-ink-800">{b(je.memo)}</td>
                  <td className="py-2.5 text-ink-600">{b(accountByCode[debit.account].name)}</td>
                  <td className="py-2.5 text-end num-latn text-ink-800">{formatSAR(debit.debit, lang)}</td>
                  <td className="py-2.5 text-end">
                    <WhyButton rationale={je.rationale} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>

      {/* Opening balances */}
      <Card title={t("setup_opening_balances")}>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-xs uppercase text-ink-400">
              <th className="text-start py-2 font-medium">{t("ledger_code")}</th>
              <th className="text-start py-2 font-medium">{t("ledger_account")}</th>
              <th className="text-end py-2 font-medium">{t("ledger_balance")}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-ink-100">
            {Array.from(openingBalances.entries())
              .filter(([, v]) => v !== 0)
              .map(([code, v]) => {
                const acc = accountByCode[code];
                return (
                  <tr key={code}>
                    <td className="py-2.5 text-ink-500 num-latn">{code}</td>
                    <td className="py-2.5 text-ink-800">{b(acc.name)}</td>
                    <td className="py-2.5 text-end num-latn">{formatSAR(Math.abs(v), lang)}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        <div className="mt-4 pt-4 border-t border-ink-100 text-xs text-ink-500">
          {t("ledger_balanced")} · {chartOfAccounts.length} accounts
        </div>
      </Card>
    </div>
  );
}

function Dt({ children }: { children: React.ReactNode }) {
  return <dt className="text-ink-500">{children}</dt>;
}
function Dd({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <dd className={`text-ink-800 ${className}`}>{children}</dd>;
}
