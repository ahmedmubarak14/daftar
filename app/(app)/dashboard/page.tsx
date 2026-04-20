"use client";

import Link from "next/link";
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
        eyebrow={lang === "ar" ? "لوحة التحكم · فبراير ٢٠٢٦" : "Dashboard · Feb 2026"}
        title={b(company.name)}
        subtitle={t("dash_hello")}
        action={
          <Pill tone="brand">
            <StatusDot tone="green" />
            {t("vat_state_not_registered")}
          </Pill>
        }
      />

      {/* Hero band — gradient stat strip */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-300 via-brand-400 to-brand-600 shadow-hero mb-8">
        <div className="absolute inset-0 opacity-40 mix-blend-overlay"
             style={{ backgroundImage: "radial-gradient(600px 200px at 100% 0%, rgba(255,255,255,0.7), transparent 60%)" }} />
        <div className="relative p-6 md:p-8">
          <div className="text-[11px] uppercase tracking-[0.18em] font-semibold text-brand-950/70 mb-4">
            {lang === "ar" ? "نبض الشركة" : "Company pulse"}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <Stat
              inverted
              label={t("cash")}
              value={formatSAR(cash, lang)}
              sub={`Al Rajhi · ${formatDate("2026-02-28", lang)}`}
            />
            <Stat
              inverted
              label={t("runway")}
              value={
                <>
                  {runway.toFixed(1)} <span className="text-lg font-normal text-brand-950/70">{t("months")}</span>
                </>
              }
              sub={t("net_burn") + ": " + formatSAR(netBurn, lang)}
            />
            <Stat
              inverted
              label={t("revenue") + " · " + t("month_to_date")}
              value={formatSAR(mtdRevenue, lang)}
            />
            <Stat
              inverted
              label={t("expenses") + " · " + t("month_to_date")}
              value={formatSAR(mtdExpenses, lang)}
            />
          </div>
        </div>
      </section>

      {/* Next actions + obligations */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <Card title={t("dash_next_actions")} className="lg:col-span-2">
          <div className="divide-y divide-ink-100 -mx-5">
            <ActionRow href="/log" title={t("dash_action_log")} detail={t("dash_action_log_detail")} badge="3" />
            <ActionRow href="/ledger" title={t("dash_action_bank")} detail={t("dash_action_bank_detail")} />
            <ActionRow href="/compliance" title={t("dash_action_calendar")} detail={t("dash_action_calendar_detail")} />
          </div>
        </Card>

        <Card title={t("dash_obligations")} action={<Link href="/compliance" className="text-xs text-brand-800 font-semibold hover:underline">{t("view_all")}</Link>}>
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
                      <div className="text-sm font-medium text-ink-900 truncate">{b(o.label)}</div>
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

      {/* Cross-links: workspace teasers */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
        <Link
          href="/accountants"
          className="group block rounded-2xl border border-ink-100 bg-white p-5 shadow-card hover:shadow-soft transition"
        >
          <div className="text-[11px] uppercase tracking-[0.16em] font-semibold text-brand-800/80">
            {lang === "ar" ? "احجز بالساعة" : "Book by the hour"}
          </div>
          <div className="mt-1.5 text-lg font-semibold tracking-tight text-ink-900">
            {t("dash_accountants_title")}
          </div>
          <div className="text-sm text-ink-500 mt-1">
            {t("dash_accountants_sub")}
          </div>
          <div className="mt-3 text-sm font-semibold text-brand-800 group-hover:underline">
            {lang === "ar" ? "تصفح المحاسبين ←" : "Browse accountants →"}
          </div>
        </Link>
        <Link
          href="/integrations"
          className="group block rounded-2xl border border-ink-100 bg-white p-5 shadow-card hover:shadow-soft transition"
        >
          <div className="text-[11px] uppercase tracking-[0.16em] font-semibold text-brand-800/80">
            {lang === "ar" ? "لا إدخال مزدوج" : "No double-entry"}
          </div>
          <div className="mt-1.5 text-lg font-semibold tracking-tight text-ink-900">
            {t("dash_integrations_title")}
          </div>
          <div className="text-sm text-ink-500 mt-1">
            {t("dash_integrations_sub")}
          </div>
          <div className="mt-3 text-sm font-semibold text-brand-800 group-hover:underline">
            {lang === "ar" ? "شاهد التكاملات ←" : "See integrations →"}
          </div>
        </Link>
      </div>

      {/* Recent activity */}
      <Card
        title={t("dash_recent_activity")}
        action={<Link href="/ledger" className="text-xs text-brand-800 font-semibold hover:underline">{t("view_all")}</Link>}
      >
        <div className="overflow-x-auto -mx-5 px-5">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-[11px] uppercase tracking-wider text-ink-400">
                <th className="text-start py-2 font-semibold">{t("ledger_date")}</th>
                <th className="text-start py-2 font-semibold">{t("ledger_memo")}</th>
                <th className="text-start py-2 font-semibold">{t("ledger_account")}</th>
                <th className="text-end py-2 font-semibold">{t("ledger_debit")}</th>
                <th className="text-end py-2 font-semibold">{t("ledger_credit")}</th>
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
                      <td className="py-2.5 text-ink-900 max-w-xs truncate">{b(je.memo)}</td>
                      <td className="py-2.5 text-ink-600">{b(accountByCode[debitLine.account].name)}</td>
                      <td className="py-2.5 text-end num-latn text-ink-900">{formatSAR(debitLine.debit, lang)}</td>
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
    </div>
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
      className="flex items-center gap-4 px-5 py-3.5 hover:bg-brand-50/50 transition group"
    >
      <div className="flex-1">
        <div className="text-sm font-semibold text-ink-900">{title}</div>
        <div className="text-xs text-ink-500 mt-0.5">{detail}</div>
      </div>
      {badge && (
        <span className="text-xs font-bold bg-brand-200 text-brand-950 rounded-full h-6 min-w-6 px-2 grid place-items-center num-latn">
          {badge}
        </span>
      )}
      <span className="text-ink-300 group-hover:text-brand-700 transition">›</span>
    </Link>
  );
}
