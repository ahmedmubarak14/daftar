"use client";

import { useState } from "react";
import { useI18n } from "@/lib/i18n";
import { Card, Pill, SectionHeading, WhyButton } from "@/components/ui";
import {
  accountByCode,
  journal,
  pendingProposal as initialProposal,
} from "@/lib/seed";
import { formatDate, formatSAR } from "@/lib/format";
import type { ClassificationProposal } from "@/lib/types";

export default function LogPage() {
  const { t, b, lang } = useI18n();
  const [text, setText] = useState(
    "paid 8,700 SAR at Jarir for 2 MacBooks for the team"
  );
  const [proposal, setProposal] = useState<ClassificationProposal | null>(null);
  const [posted, setPosted] = useState<string[]>([]);

  const account = proposal ? accountByCode[proposal.account] : null;

  function propose() {
    // Demo: canned proposal using the seeded one.
    setProposal(initialProposal);
  }

  function confirm() {
    if (!proposal) return;
    setPosted((p) => [
      `Posted: ${proposal.vendor} — ${formatSAR(proposal.amount, lang)} → ${
        account ? b(account.name) : proposal.account
      }`,
      ...p,
    ]);
    setProposal(null);
    setText("");
  }

  return (
    <div className="max-w-5xl mx-auto">
      <SectionHeading title={t("log_title")} subtitle={t("log_hint")} />

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Input card */}
        <Card className="lg:col-span-3">
          <label className="text-xs uppercase tracking-wider text-ink-400">
            {t("log_title")}
          </label>
          <textarea
            dir="auto"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={t("log_placeholder")}
            className="mt-2 w-full min-h-[110px] rounded-md border border-ink-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-100 outline-none p-3 text-sm"
          />

          <div className="mt-3 flex items-center gap-2">
            <button
              onClick={propose}
              className="text-sm px-3 py-2 rounded-md bg-brand-600 text-white hover:bg-brand-700 transition font-medium"
            >
              {t("log_propose")}
            </button>
            <button
              className="text-sm px-3 py-2 rounded-md border border-ink-200 hover:bg-ink-50 transition text-ink-700"
              onClick={() => {
                setText("");
                setProposal(null);
              }}
            >
              {lang === "ar" ? "مسح" : "Clear"}
            </button>
            <span className="ms-auto text-xs text-ink-400">
              {lang === "ar"
                ? "أو اسحب وأفلت إيصالاً"
                : "or drag & drop a receipt"}
            </span>
          </div>

          {/* Proposal */}
          {proposal && account && (
            <div className="mt-5 rounded-lg border border-brand-200 bg-brand-50/60 p-4 start-border border-s-brand-600">
              <div className="flex items-center justify-between mb-3">
                <div className="text-sm font-semibold text-brand-800">
                  {t("log_proposed")}
                </div>
                <Pill tone={proposal.confidence === "high" ? "green" : "amber"}>
                  {t("log_confidence")}: {proposal.confidence}
                </Pill>
              </div>
              <dl className="grid grid-cols-2 md:grid-cols-3 gap-y-3 gap-x-4 text-sm">
                <Row label={t("log_vendor")} value={proposal.vendor} />
                <Row
                  label={t("log_amount")}
                  value={formatSAR(proposal.amount, lang)}
                  mono
                />
                <Row
                  label={t("log_vat")}
                  value={formatSAR(proposal.vatAmount, lang)}
                  mono
                />
                <Row label={t("log_account")} value={b(account.name)} />
                <Row
                  label={t("log_treatment")}
                  value={<Pill tone="brand">{proposal.treatment}</Pill>}
                />
                <Row
                  label={t("log_rule")}
                  value={<span className="text-xs num-latn text-ink-600">{proposal.ruleId}</span>}
                />
              </dl>

              <div className="mt-4 pt-3 border-t border-brand-200 text-sm text-ink-700 leading-relaxed">
                {b(proposal.rationale)}
              </div>

              <div className="mt-4 flex items-center gap-2">
                <button
                  onClick={confirm}
                  className="text-sm px-3 py-2 rounded-md bg-brand-600 text-white hover:bg-brand-700 font-medium"
                >
                  {t("log_confirm_post")}
                </button>
                <button className="text-sm px-3 py-2 rounded-md border border-ink-200 hover:bg-white text-ink-700">
                  {t("change")}
                </button>
                <div className="ms-auto">
                  <WhyButton rationale={proposal.rationale} />
                </div>
              </div>
            </div>
          )}

          {posted.length > 0 && (
            <div className="mt-4 space-y-1">
              {posted.map((p, i) => (
                <div
                  key={i}
                  className="text-xs text-emerald-700 bg-emerald-50 border border-emerald-100 rounded-md px-3 py-2"
                >
                  ✓ {p}
                </div>
              ))}
            </div>
          )}
        </Card>

        {/* Right rail — rule learning + tips */}
        <Card className="lg:col-span-2" title={lang === "ar" ? "قواعد تعلّمها دفتر" : "Rules Daftar learned"}>
          <ul className="space-y-3 text-sm">
            <li className="p-3 rounded-md bg-ink-50">
              <div className="font-medium text-ink-800">
                {lang === "ar" ? "جرير → معدات تقنية" : "Jarir → IT Equipment"}
              </div>
              <div className="text-xs text-ink-500 mt-1">
                {lang === "ar"
                  ? "تم تأكيد هذا التصنيف 2 مرة. سيتم التصنيف تلقائياً بعد 3."
                  : "Confirmed 2 times. Will auto-classify after 3."}
              </div>
            </li>
            <li className="p-3 rounded-md bg-ink-50">
              <div className="font-medium text-ink-800">
                {lang === "ar" ? "Google Ads → تسويق وإعلان" : "Google Ads → Marketing"}
              </div>
              <div className="text-xs text-ink-500 mt-1">
                {lang === "ar" ? "تم التأكيد 3 مرات — يصنَّف تلقائياً الآن." : "Confirmed 3 times — auto-classifying now."}
              </div>
            </li>
            <li className="p-3 rounded-md bg-ink-50">
              <div className="font-medium text-ink-800">
                {lang === "ar" ? "WorkUp → إيجار" : "WorkUp → Rent"}
              </div>
              <div className="text-xs text-ink-500 mt-1">
                {lang === "ar" ? "تم التأكيد 3 مرات — يصنَّف تلقائياً الآن." : "Confirmed 3 times — auto-classifying now."}
              </div>
            </li>
          </ul>
        </Card>
      </div>

      {/* Recent */}
      <h2 className="mt-8 mb-3 text-sm font-semibold text-ink-700">{t("log_recent")}</h2>
      <Card>
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
            {journal
              .slice()
              .sort((a, b) => b.date.localeCompare(a.date))
              .slice(0, 8)
              .map((je) => {
                const debit = je.lines.find((l) => l.debit > 0)!;
                return (
                  <tr key={je.id}>
                    <td className="py-2.5 text-ink-600 num-latn">{formatDate(je.date, lang)}</td>
                    <td className="py-2.5 text-ink-800 max-w-xs truncate">{b(je.memo)}</td>
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
    </div>
  );
}

function Row({ label, value, mono = false }: { label: string; value: React.ReactNode; mono?: boolean }) {
  return (
    <div>
      <dt className="text-xs uppercase tracking-wider text-ink-400">{label}</dt>
      <dd className={`mt-0.5 text-ink-800 ${mono ? "num-latn" : ""}`}>{value}</dd>
    </div>
  );
}
