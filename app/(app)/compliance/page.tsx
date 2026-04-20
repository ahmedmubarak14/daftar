"use client";

import { useI18n } from "@/lib/i18n";
import { Card, Pill, SectionHeading, StatusDot, WhyButton } from "@/components/ui";
import { obligations, sumByType } from "@/lib/seed";
import { formatDate, formatSAR, daysUntil } from "@/lib/format";
import clsx from "clsx";

const VOLUNTARY = 187_500_00; // halalas
const MANDATORY = 375_000_00;

export default function CompliancePage() {
  const { t, b, lang } = useI18n();

  // Demo: rolling 12-month revenue = all revenue so far
  const rolling = sumByType("revenue");
  const pctVoluntary = Math.min((rolling / VOLUNTARY) * 100, 100);
  const pctMandatory = Math.min((rolling / MANDATORY) * 100, 100);

  return (
    <div className="max-w-5xl mx-auto">
      <SectionHeading
        title={t("compliance")}
        subtitle={lang === "ar" ? "دفتر يُحضّر — أنت أو محاسبك يُقدّم عبر زاتكا" : "Daftar prepares — you or your accountant file via ZATCA"}
      />

      {/* VAT tracker */}
      <Card title={t("comp_vat_tracker")} className="mb-6">
        <div className="mb-3 flex items-baseline justify-between">
          <div>
            <div className="text-xs uppercase tracking-wider text-ink-400">{t("comp_vat_rolling")}</div>
            <div className="mt-1 text-2xl font-semibold num-latn">{formatSAR(rolling, lang)}</div>
          </div>
          <Pill tone="green">
            <StatusDot tone="green" />
            {lang === "ar" ? "تحت الحد" : "Below threshold"}
          </Pill>
        </div>

        <div className="mt-6 space-y-4">
          <Threshold
            label={t("comp_vat_voluntary")}
            amount={VOLUNTARY}
            rolling={rolling}
            pct={pctVoluntary}
            color="bg-brand-400"
            note={lang === "ar" ? "التسجيل الطوعي متاح عند تجاوز هذا الحد" : "Voluntary registration available above this"}
            lang={lang}
          />
          <Threshold
            label={t("comp_vat_mandatory")}
            amount={MANDATORY}
            rolling={rolling}
            pct={pctMandatory}
            color="bg-amber-500"
            note={lang === "ar" ? "التسجيل إلزامي خلال 30 يوماً من تجاوز هذا الحد" : "Registration mandatory within 30 days of crossing"}
            lang={lang}
          />
        </div>
      </Card>

      {/* Regulatory calendar */}
      <Card title={t("comp_calendar")}>
        <ul className="divide-y divide-ink-100 -mx-5">
          {obligations
            .slice()
            .sort((a, b) => a.dueDate.localeCompare(b.dueDate))
            .map((o) => {
              const days = daysUntil(o.dueDate);
              const label =
                days < 0 ? t("comp_overdue") : days === 0 ? t("comp_today") : `${days} ${t("comp_days")}`;
              return (
                <li key={o.id} className="px-5 py-4 flex items-start gap-4">
                  <div className="mt-1">
                    <StatusDot tone={o.status} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <div className="font-medium text-ink-800">{b(o.label)}</div>
                      <Pill tone="neutral">{o.kind.toUpperCase()}</Pill>
                    </div>
                    <div className="text-xs text-ink-500 mt-0.5 num-latn">
                      {formatDate(o.dueDate, lang)} · {label}
                    </div>
                    <p className="mt-2 text-sm text-ink-600 leading-relaxed">{b(o.detail)}</p>
                  </div>
                  <div>
                    <WhyButton
                      rationale={o.detail}
                      context={<span className="num-latn">Due {formatDate(o.dueDate, lang)}</span>}
                    />
                  </div>
                </li>
              );
            })}
        </ul>
      </Card>

      <div className="mt-6 text-xs text-ink-500 leading-relaxed">
        {lang === "ar"
          ? "ملاحظة: في هذا الإصدار، دفتر يُجهّز البيانات ويُذكّرك بالمواعيد. التقديم الفعلي يتم عبر منصات زاتكا والتأمينات الاجتماعية. التكامل المباشر يأتي في الإصدار الثاني."
          : "Note: in this MVP, Daftar prepares your data and reminds you. Actual filing happens via ZATCA and GOSI portals. Direct integration ships in v2."}
      </div>
    </div>
  );
}

function Threshold({
  label,
  amount,
  rolling,
  pct,
  color,
  note,
  lang,
}: {
  label: string;
  amount: number;
  rolling: number;
  pct: number;
  color: string;
  note: string;
  lang: "en" | "ar";
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between text-sm">
        <span className="text-ink-700">{label}</span>
        <span className="num-latn text-ink-600">
          {formatSAR(rolling, lang)} / {formatSAR(amount, lang)}
        </span>
      </div>
      <div className="mt-1.5 h-2 rounded-full bg-ink-100 overflow-hidden">
        <div
          className={clsx("h-full transition-all", color)}
          style={{ width: `${pct}%` }}
        />
      </div>
      <div className="mt-1 text-xs text-ink-500">{note}</div>
    </div>
  );
}
