"use client";

import { useState, useMemo } from "react";
import { useI18n } from "@/lib/i18n";
import { Card, SectionHeading, Pill } from "@/components/ui";

type Entry = {
  term: { en: string; ar: string };
  body: { en: string; ar: string };
  tags: ("regulatory" | "accounting" | "tax" | "entity")[];
};

const GLOSSARY: Entry[] = [
  {
    term: { en: "SOCPA", ar: "الهيئة السعودية للمحاسبين القانونيين" },
    body: {
      en: "Saudi Organization for Chartered and Professional Accountants. Issues the accounting standards used in KSA, aligned with IFRS. Daftar's chart of accounts and classification rules follow SOCPA guidance.",
      ar: "الهيئة السعودية للمحاسبين القانونيين. تُصدر المعايير المحاسبية في المملكة متوافقة مع IFRS. يتبع دفتر إرشادات SOCPA في دليل الحسابات وقواعد التصنيف.",
    },
    tags: ["regulatory", "accounting"],
  },
  {
    term: { en: "ZATCA", ar: "هيئة الزكاة والضريبة والجمارك" },
    body: {
      en: "Zakat, Tax and Customs Authority. Regulates VAT, zakat, corporate income tax, and e-invoicing (Fatoora). Daftar prepares the data; actual filings go through ZATCA's portals.",
      ar: "هيئة الزكاة والضريبة والجمارك. تنظّم ضريبة القيمة المضافة والزكاة وضريبة الدخل والفوترة الإلكترونية (فاتورة). يُجهّز دفتر البيانات، والتقديم يتم عبر منصات الهيئة.",
    },
    tags: ["regulatory", "tax"],
  },
  {
    term: { en: "VAT threshold", ar: "حد التسجيل في ضريبة القيمة المضافة" },
    body: {
      en: "Companies with taxable revenue over 375,000 SAR in any rolling 12-month window must register for VAT. Voluntary registration is available above 187,500 SAR. Daftar tracks both thresholds.",
      ar: "الشركات التي تتجاوز إيراداتها الخاضعة 375,000 ر.س خلال أي 12 شهراً يجب أن تُسجّل في ضريبة القيمة المضافة. التسجيل الطوعي متاح فوق 187,500 ر.س. يتتبع دفتر الحدّين.",
    },
    tags: ["tax"],
  },
  {
    term: { en: "Capitalize vs expense", ar: "الرسملة مقابل المصروف" },
    body: {
      en: "Items that benefit the company beyond 12 months and exceed a cost threshold (Daftar uses 5,000 SAR) are capitalized as fixed assets and depreciated over their useful life. Items consumed within the period are expensed immediately.",
      ar: "البنود التي تُفيد الشركة لأكثر من 12 شهراً وتتجاوز حد التكلفة (يستخدم دفتر 5,000 ر.س) تُرسمل كأصول ثابتة وتُستهلك على عمرها الإنتاجي. البنود المستهلكة خلال الفترة تُقيَّد كمصروف فوراً.",
    },
    tags: ["accounting"],
  },
  {
    term: { en: "Organization costs", ar: "مصروفات التأسيس" },
    body: {
      en: "Legal, licensing, and professional fees paid to incorporate the company. These are capitalized as an intangible asset (or treated per the accounting policy) rather than expensed, because they create a right to operate.",
      ar: "الأتعاب القانونية والترخيصية والمهنية المدفوعة لتأسيس الشركة. تُرسمل كأصل غير ملموس (أو تُعالج وفق السياسة المحاسبية) لأنها تخلق حق التشغيل.",
    },
    tags: ["accounting"],
  },
  {
    term: { en: "Due to founder", ar: "مستحقات للمؤسس" },
    body: {
      en: "A liability the company owes to a founder who paid business expenses from a personal account. Recorded as a credit to 'Due to Founders' and settled when the company reimburses them.",
      ar: "التزام على الشركة تجاه مؤسس دفع مصروفات تشغيلية من حسابه الشخصي. يُقيَّد دائناً في حساب 'مستحقات للمؤسسين' ويُسوّى عند السداد من الشركة.",
    },
    tags: ["accounting"],
  },
  {
    term: { en: "GOSI", ar: "التأمينات الاجتماعية" },
    body: {
      en: "General Organization for Social Insurance. Handles monthly social-insurance contributions for employees. Contributions are calculated on gross wage and split between employer and employee.",
      ar: "المؤسسة العامة للتأمينات الاجتماعية. تدير الاشتراكات الشهرية للتأمين على الموظفين. تُحتسب الاشتراكات من الأجر الإجمالي ويتحمّل كل من صاحب العمل والموظف حصة منها.",
    },
    tags: ["regulatory"],
  },
  {
    term: { en: "WPS", ar: "نظام حماية الأجور" },
    body: {
      en: "Wage Protection System. Mandates that salaries be transferred via licensed Saudi banks to ensure workers receive their wages on time. Non-compliance suspends company services.",
      ar: "نظام حماية الأجور. يُلزم بتحويل الرواتب عبر بنوك سعودية مرخصة لضمان استلام العاملين أجورهم في مواعيدها. عدم الالتزام يوقف خدمات الشركة.",
    },
    tags: ["regulatory"],
  },
  {
    term: { en: "MISA", ar: "وزارة الاستثمار" },
    body: {
      en: "Ministry of Investment of Saudi Arabia. Issues investment licenses for foreign-owned or foreign-majority entities. The license is typically capitalized as an organization cost.",
      ar: "وزارة الاستثمار. تُصدر رخص الاستثمار للكيانات المملوكة أجنبياً كلياً أو جزئياً. عادةً تُرسمل الرخصة ضمن مصروفات التأسيس.",
    },
    tags: ["regulatory", "entity"],
  },
  {
    term: { en: "CR", ar: "السجل التجاري" },
    body: {
      en: "Commercial Registration issued by the Ministry of Commerce. The core license that makes the company legally exist. Must be renewed annually.",
      ar: "السجل التجاري الصادر من وزارة التجارة. الرخصة الأساسية التي تجعل الشركة موجودة قانونياً. يُجدَّد سنوياً.",
    },
    tags: ["regulatory", "entity"],
  },
  {
    term: { en: "Prepaid expense", ar: "مصروف مدفوع مقدماً" },
    body: {
      en: "Cash paid now for a service that will be consumed later (e.g. an annual software subscription). Booked as an asset and amortized over the service period — not expensed all at once.",
      ar: "مبلغ مدفوع الآن مقابل خدمة ستُستهلك لاحقاً (مثل اشتراك سنوي). يُقيَّد كأصل ويُطفأ على فترة الخدمة — لا يُقيَّد كمصروف دفعةً واحدة.",
    },
    tags: ["accounting"],
  },
  {
    term: { en: "Double-entry", ar: "القيد المزدوج" },
    body: {
      en: "Every transaction hits at least two accounts: one debit, one credit, equal in amount. This is why your books always balance. Daftar enforces the invariant at the database level.",
      ar: "كل عملية تمسّ حسابين على الأقل: مدين ودائن، متساويين في المبلغ. هذا ما يجعل دفاترك متوازنة دائماً. يُطبّق دفتر هذا القيد على مستوى قاعدة البيانات.",
    },
    tags: ["accounting"],
  },
];

const TAG_COLORS: Record<string, "neutral" | "green" | "amber" | "brand"> = {
  regulatory: "amber",
  tax: "green",
  accounting: "brand",
  entity: "neutral",
};

export default function ExplainPage() {
  const { t, b, lang } = useI18n();
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    if (!needle) return GLOSSARY;
    return GLOSSARY.filter(
      (e) =>
        e.term.en.toLowerCase().includes(needle) ||
        e.term.ar.includes(needle) ||
        e.body.en.toLowerCase().includes(needle)
    );
  }, [q]);

  return (
    <div className="max-w-4xl mx-auto">
      <SectionHeading
        title={t("exp_title")}
        subtitle={lang === "ar" ? "كل مصطلح مراجَع من قبل محاسب قانوني معتمد" : "Every term reviewed by a SOCPA-certified accountant"}
      />

      <Card className="mb-6">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={t("exp_search")}
          className="w-full rounded-md border border-ink-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-100 outline-none p-3 text-sm"
        />
      </Card>

      <div className="space-y-3">
        {filtered.map((e, i) => (
          <Card key={i}>
            <div className="flex items-start justify-between mb-2">
              <h3 className="text-lg font-semibold text-ink-900">{b(e.term)}</h3>
              <div className="flex gap-1">
                {e.tags.map((tag) => (
                  <Pill key={tag} tone={TAG_COLORS[tag]}>
                    {tag}
                  </Pill>
                ))}
              </div>
            </div>
            <p className="text-sm text-ink-700 leading-relaxed">{b(e.body)}</p>
          </Card>
        ))}
        {filtered.length === 0 && (
          <Card>
            <div className="text-center text-ink-500 text-sm py-6">
              {lang === "ar" ? "لا توجد نتائج" : "No results"}
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
