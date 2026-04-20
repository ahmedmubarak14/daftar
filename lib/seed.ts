import type {
  Account,
  Company,
  JournalEntry,
  Obligation,
  ClassificationProposal,
} from "./types";

// ---------- Company (PRD persona: Faisal's SaaS LLC) ----------

export const company: Company = {
  name: { en: "Mithaq Technologies LLC", ar: "شركة ميثاق للتقنية" },
  cr: "1010987654",
  entityType: { en: "Limited Liability Company", ar: "شركة ذات مسؤولية محدودة" },
  incorporationDate: "2025-12-15",
  fiscalYearEnd: "12-31",
  activity: { en: "Software (SaaS)", ar: "برمجيات (SaaS)" },
  vatState: "not_registered",
  capital: {
    total: 30_000_000, // 300,000 SAR
    founders: [
      { name: "Faisal Al-Harbi", share: 0.5, contributed: 15_000_000 },
      { name: "Noura Al-Qahtani", share: 0.25, contributed: 7_500_000 },
      { name: "Omar Al-Dossari", share: 0.25, contributed: 7_500_000 },
    ],
  },
};

// ---------- Chart of Accounts (SOCPA-aligned numbering) ----------

export const chartOfAccounts: Account[] = [
  // 1xxx Assets
  { code: "1010", name: { en: "Cash on Hand", ar: "النقدية في الصندوق" }, type: "asset", group: { en: "Current Assets", ar: "الأصول المتداولة" } },
  { code: "1020", name: { en: "Bank — Al Rajhi", ar: "بنك — الراجحي" }, type: "asset", group: { en: "Current Assets", ar: "الأصول المتداولة" } },
  { code: "1200", name: { en: "Accounts Receivable", ar: "الذمم المدينة" }, type: "asset", group: { en: "Current Assets", ar: "الأصول المتداولة" } },
  { code: "1300", name: { en: "Prepaid Expenses", ar: "المصروفات المدفوعة مقدماً" }, type: "asset", group: { en: "Current Assets", ar: "الأصول المتداولة" } },
  { code: "1310", name: { en: "Input VAT Recoverable", ar: "ضريبة القيمة المضافة القابلة للاسترداد" }, type: "asset", group: { en: "Current Assets", ar: "الأصول المتداولة" } },
  { code: "1500", name: { en: "IT Equipment", ar: "معدات تقنية" }, type: "asset", group: { en: "Fixed Assets", ar: "الأصول الثابتة" } },
  { code: "1510", name: { en: "Accumulated Depreciation — IT", ar: "مجمع الإهلاك — معدات" }, type: "asset", group: { en: "Fixed Assets", ar: "الأصول الثابتة" } },
  { code: "1700", name: { en: "Organization Costs", ar: "مصروفات التأسيس" }, type: "asset", group: { en: "Intangible Assets", ar: "الأصول غير الملموسة" } },

  // 2xxx Liabilities
  { code: "2100", name: { en: "Accounts Payable", ar: "الذمم الدائنة" }, type: "liability", group: { en: "Current Liabilities", ar: "الخصوم المتداولة" } },
  { code: "2200", name: { en: "Due to Founders", ar: "مستحقات للمؤسسين" }, type: "liability", group: { en: "Current Liabilities", ar: "الخصوم المتداولة" } },
  { code: "2300", name: { en: "Output VAT Payable", ar: "ضريبة القيمة المضافة المستحقة" }, type: "liability", group: { en: "Current Liabilities", ar: "الخصوم المتداولة" } },

  // 3xxx Equity
  { code: "3100", name: { en: "Paid-in Capital", ar: "رأس المال المدفوع" }, type: "equity", group: { en: "Equity", ar: "حقوق الملكية" } },
  { code: "3900", name: { en: "Retained Earnings", ar: "الأرباح المحتجزة" }, type: "equity", group: { en: "Equity", ar: "حقوق الملكية" } },

  // 4xxx Revenue
  { code: "4100", name: { en: "Subscription Revenue", ar: "إيرادات الاشتراكات" }, type: "revenue", group: { en: "Revenue", ar: "الإيرادات" } },

  // 6xxx Opex
  { code: "6100", name: { en: "Salaries & Wages", ar: "الرواتب والأجور" }, type: "expense", group: { en: "Operating Expenses", ar: "المصروفات التشغيلية" } },
  { code: "6110", name: { en: "Contractor & Professional Fees", ar: "أتعاب المقاولين والاستشاريين" }, type: "expense", group: { en: "Operating Expenses", ar: "المصروفات التشغيلية" } },
  { code: "6200", name: { en: "Software Subscriptions", ar: "اشتراكات البرمجيات" }, type: "expense", group: { en: "Operating Expenses", ar: "المصروفات التشغيلية" } },
  { code: "6300", name: { en: "Office Supplies", ar: "اللوازم المكتبية" }, type: "expense", group: { en: "Operating Expenses", ar: "المصروفات التشغيلية" } },
  { code: "6400", name: { en: "Marketing & Advertising", ar: "التسويق والإعلان" }, type: "expense", group: { en: "Operating Expenses", ar: "المصروفات التشغيلية" } },
  { code: "6500", name: { en: "Depreciation Expense", ar: "مصروف الإهلاك" }, type: "expense", group: { en: "Operating Expenses", ar: "المصروفات التشغيلية" } },
  { code: "6600", name: { en: "Rent", ar: "الإيجار" }, type: "expense", group: { en: "Operating Expenses", ar: "المصروفات التشغيلية" } },
  { code: "6700", name: { en: "Meals & Entertainment", ar: "الضيافة" }, type: "expense", group: { en: "Operating Expenses", ar: "المصروفات التشغيلية" } },
];

// ---------- Journal entries (setup + 2 months of activity) ----------

function entry(
  id: string,
  date: string,
  memoEn: string,
  memoAr: string,
  source: JournalEntry["source"],
  lines: JournalEntry["lines"],
  ruleId: string,
  rationaleEn: string,
  rationaleAr: string,
  vatAmount?: number
): JournalEntry {
  return {
    id,
    date,
    memo: { en: memoEn, ar: memoAr },
    source,
    lines,
    ruleId,
    rationale: { en: rationaleEn, ar: rationaleAr },
    vatAmount,
  };
}

export const journal: JournalEntry[] = [
  // Setup: paid-in capital
  entry(
    "JE-0001",
    "2025-12-15",
    "Founder capital contributions (3 founders)",
    "مساهمات رأس المال من المؤسسين (3 مؤسسين)",
    { kind: "setup" },
    [
      { account: "1020", debit: 30_000_000, credit: 0 },
      { account: "3100", debit: 0, credit: 30_000_000 },
    ],
    "capital.paid_in",
    "Cash contributed by founders, credited to paid-in capital per AOA.",
    "نقد من المؤسسين، يُقيَّد في رأس المال المدفوع وفقاً لعقد التأسيس."
  ),

  // Setup: MISA license (pre-incorp)
  entry(
    "JE-0002",
    "2025-12-01",
    "MISA investment license (paid by Faisal, pre-incorporation)",
    "رخصة الاستثمار من وزارة الاستثمار (دفعها فيصل قبل التأسيس)",
    { kind: "setup" },
    [
      { account: "1700", debit: 1_200_000, credit: 0 }, // Organization costs
      { account: "2200", debit: 0, credit: 1_200_000 }, // Due to founder
    ],
    "preincorp.misa_license",
    "MISA license represents a right to operate; capitalized as organization cost and owed back to founder who paid it.",
    "رخصة وزارة الاستثمار تمثل حق التشغيل؛ تُرسمل كمصروف تأسيس ومستحقة للمؤسس الذي دفعها."
  ),

  // Setup: laptops (capex)
  entry(
    "JE-0003",
    "2025-12-18",
    "Jarir — 2 MacBook Pro laptops",
    "جرير — جهازا ماك بوك برو",
    { kind: "receipt", ref: "R-12-18-JRIR" },
    [
      { account: "1500", debit: 850_000, credit: 0 }, // IT Equipment
      { account: "1020", debit: 0, credit: 850_000 },
    ],
    "capex.it_equipment",
    "Unit cost 4,250 SAR, useful life 4 years — capitalized to IT Equipment, depreciated straight-line.",
    "تكلفة الوحدة 4,250 ر.س، عمر إنتاجي 4 سنوات — تُرسمل كمعدات تقنية وتُستهلك بالقسط الثابت."
  ),

  // Setup: founder reimbursement — legal fees
  entry(
    "JE-0004",
    "2025-11-20",
    "Legal fees for AOA drafting (paid by Noura, pre-incorporation)",
    "أتعاب قانونية لصياغة عقد التأسيس (دفعتها نورة قبل التأسيس)",
    { kind: "setup" },
    [
      { account: "1700", debit: 450_000, credit: 0 },
      { account: "2200", debit: 0, credit: 450_000 },
    ],
    "preincorp.legal_fees",
    "Legal fees tied to company formation are capitalized as organization costs.",
    "الأتعاب القانونية المتعلقة بتأسيس الشركة تُرسمل كمصروفات تأسيس."
  ),

  // Jan: Zoho annual subscription (prepaid)
  entry(
    "JE-0005",
    "2026-01-05",
    "Zoho Mail annual subscription",
    "اشتراك زوهو السنوي",
    { kind: "receipt", ref: "R-01-05-ZOHO" },
    [
      { account: "1300", debit: 500_000, credit: 0 }, // Prepaid
      { account: "1020", debit: 0, credit: 500_000 },
    ],
    "prepaid.annual_software",
    "Annual subscription paid upfront — benefit extends 12 months, so recorded as prepaid and amortized monthly.",
    "اشتراك سنوي مدفوع مقدماً — المنفعة تمتد 12 شهراً، فيُقيَّد كمدفوع مقدماً ويُطفأ شهرياً."
  ),

  // Jan: Freelance dev (paid by Omar personally, to reimburse)
  entry(
    "JE-0006",
    "2026-01-22",
    "Freelance developer — January sprint (paid by Omar's card)",
    "مطور مستقل — عمل يناير (دفع بطاقة عمر الشخصية)",
    { kind: "manual" },
    [
      { account: "6110", debit: 800_000, credit: 0 },
      { account: "2200", debit: 0, credit: 800_000 },
    ],
    "founder.reimbursable",
    "Service received by the company but paid from a founder's personal card — expense the service, owe the founder.",
    "خدمة استلمتها الشركة ودفعها المؤسس من بطاقته — تُقيَّد كمصروف مع دَين للمؤسس."
  ),

  // Jan: Office supplies
  entry(
    "JE-0007",
    "2026-01-28",
    "Office supplies — notebooks, pens, whiteboard markers",
    "لوازم مكتبية — دفاتر، أقلام، أقلام سبورة",
    { kind: "receipt", ref: "R-01-28-EXTR" },
    [
      { account: "6300", debit: 25_000, credit: 0 },
      { account: "1020", debit: 0, credit: 25_000 },
    ],
    "expense.consumables",
    "Below capitalization threshold and consumed within the period — expensed directly.",
    "أقل من حد الرسملة ومستهلك خلال الفترة — يُقيَّد مصروفاً مباشراً."
  ),

  // Feb: first revenue
  entry(
    "JE-0008",
    "2026-02-10",
    "Invoice INV-001 — Pilot customer (Al Nahdi)",
    "فاتورة INV-001 — عميل تجريبي (النهدي)",
    { kind: "invoice", ref: "INV-001" },
    [
      { account: "1200", debit: 1_200_000, credit: 0 },
      { account: "4100", debit: 0, credit: 1_200_000 },
    ],
    "revenue.invoice",
    "Sales invoice issued; revenue recognized on issuance (service performed). VAT not applicable — company below threshold.",
    "فاتورة مبيعات صادرة؛ يُعترف بالإيراد عند الإصدار. ضريبة القيمة المضافة غير مطبقة — الشركة تحت حد التسجيل."
  ),

  // Feb: Salaries
  entry(
    "JE-0009",
    "2026-02-25",
    "February salaries (2 founders as employees)",
    "رواتب فبراير (مؤسسان كموظفين)",
    { kind: "manual" },
    [
      { account: "6100", debit: 2_400_000, credit: 0 },
      { account: "1020", debit: 0, credit: 2_400_000 },
    ],
    "expense.payroll",
    "Monthly salary run. GOSI contribution tracked separately under compliance.",
    "صرف رواتب شهري. اشتراكات التأمينات الاجتماعية تُتابع ضمن الالتزامات."
  ),

  // Feb: Google Ads
  entry(
    "JE-0010",
    "2026-02-18",
    "Google Ads — February campaign",
    "إعلانات قوقل — حملة فبراير",
    { kind: "receipt", ref: "R-02-18-GOOG" },
    [
      { account: "6400", debit: 350_000, credit: 0 },
      { account: "1020", debit: 0, credit: 350_000 },
    ],
    "expense.marketing",
    "Advertising spend — expensed in the period incurred.",
    "إنفاق إعلاني — يُقيَّد مصروفاً في فترة وقوعه."
  ),

  // Feb: Co-working rent
  entry(
    "JE-0011",
    "2026-02-01",
    "Co-working space — February rent",
    "مساحة عمل مشتركة — إيجار فبراير",
    { kind: "receipt", ref: "R-02-01-WRKP" },
    [
      { account: "6600", debit: 300_000, credit: 0 },
      { account: "1020", debit: 0, credit: 300_000 },
    ],
    "expense.rent",
    "Monthly rent — expensed as incurred.",
    "إيجار شهري — يُقيَّد مصروفاً عند الاستحقاق."
  ),

  // Feb: prepaid amortization for Zoho (1/12)
  entry(
    "JE-0012",
    "2026-02-28",
    "Zoho subscription — February amortization",
    "اشتراك زوهو — إطفاء فبراير",
    { kind: "manual" },
    [
      { account: "6200", debit: 41_667, credit: 0 },
      { account: "1300", debit: 0, credit: 41_667 },
    ],
    "prepaid.amortize",
    "1/12 of the annual prepaid Zoho subscription is recognized as expense this month.",
    "1/12 من اشتراك زوهو السنوي المدفوع مقدماً يُعترف به كمصروف هذا الشهر."
  ),

  // Feb: MacBook depreciation (1/48)
  entry(
    "JE-0013",
    "2026-02-28",
    "IT Equipment depreciation — February",
    "إهلاك المعدات التقنية — فبراير",
    { kind: "manual" },
    [
      { account: "6500", debit: 17_708, credit: 0 },
      { account: "1510", debit: 0, credit: 17_708 },
    ],
    "depreciation.it_equipment",
    "MacBooks depreciated straight-line over 48 months — 1/48 recognized this period.",
    "تُستهلك الماك بوكات بالقسط الثابت على 48 شهراً — يُعترف بـ 1/48 هذه الفترة."
  ),
];

// ---------- Obligations / regulatory calendar ----------

export const obligations: Obligation[] = [
  {
    id: "OBL-VAT",
    kind: "vat",
    label: { en: "VAT — not yet required", ar: "ضريبة القيمة المضافة — غير مطلوبة بعد" },
    dueDate: "2027-01-31",
    status: "green",
    detail: {
      en: "Rolling 12-month revenue is below the 375,000 SAR mandatory threshold. Voluntary registration possible above 187,500 SAR.",
      ar: "إيرادات آخر 12 شهراً تحت حد التسجيل الإلزامي (375,000 ر.س). التسجيل الطوعي متاح فوق 187,500 ر.س.",
    },
  },
  {
    id: "OBL-GOSI",
    kind: "gosi",
    label: { en: "GOSI — April contribution", ar: "التأمينات الاجتماعية — اشتراك أبريل" },
    dueDate: "2026-05-15",
    status: "amber",
    detail: {
      en: "Monthly GOSI contribution due 15 days after month end. Connect payroll in v2 to auto-prepare.",
      ar: "الاشتراك الشهري مستحق خلال 15 يوماً من نهاية الشهر. ربط الرواتب في الإصدار الثاني للإعداد التلقائي.",
    },
  },
  {
    id: "OBL-WPS",
    kind: "wps",
    label: { en: "WPS — April salary transfer", ar: "نظام حماية الأجور — تحويل رواتب أبريل" },
    dueDate: "2026-05-03",
    status: "amber",
    detail: {
      en: "Salaries must be transferred via a WPS-licensed bank within 3 days of month end.",
      ar: "يجب تحويل الرواتب عبر بنك مرخص في نظام حماية الأجور خلال 3 أيام من نهاية الشهر.",
    },
  },
  {
    id: "OBL-ZAKAT",
    kind: "zakat",
    label: { en: "Zakat & CIT return (annual)", ar: "إقرار الزكاة وضريبة الدخل (سنوي)" },
    dueDate: "2027-04-30",
    status: "green",
    detail: {
      en: "Annual return is due within 120 days of fiscal year end (31 Dec). Daftar will prepare the file — you or your accountant submit via ZATCA.",
      ar: "الإقرار السنوي مستحق خلال 120 يوماً من نهاية السنة المالية (31 ديسمبر). يُجهّز دفتر الملف — أنت أو محاسبك تُقدّمه عبر زاتكا.",
    },
  },
  {
    id: "OBL-CR",
    kind: "cr_renewal",
    label: { en: "Commercial Registration renewal", ar: "تجديد السجل التجاري" },
    dueDate: "2026-12-15",
    status: "green",
    detail: {
      en: "CR must be renewed annually on its anniversary. Ministry of Commerce sends a reminder; Daftar mirrors it.",
      ar: "يُجدَّد السجل التجاري سنوياً في تاريخ إصداره. وزارة التجارة تُرسل تذكيراً؛ دفتر يُعكسه.",
    },
  },
  {
    id: "OBL-MISA",
    kind: "misa",
    label: { en: "MISA license renewal", ar: "تجديد رخصة وزارة الاستثمار" },
    dueDate: "2026-12-01",
    status: "green",
    detail: {
      en: "MISA investment license renews annually. Cost is re-capitalized to Organization Costs on renewal.",
      ar: "رخصة وزارة الاستثمار تُجدَّد سنوياً. تُرسمل التكلفة ضمن مصروفات التأسيس عند التجديد.",
    },
  },
];

// ---------- A pending classification proposal (for the Log page demo) ----------

export const pendingProposal: ClassificationProposal = {
  vendor: "Jarir Bookstore",
  amount: 870_000, // 8,700 SAR total
  vatAmount: 113_478, // 15% VAT portion, demo only
  account: "1500",
  treatment: "capital",
  ruleId: "capex.it_equipment",
  rationale: {
    en: "Unit cost 4,350 SAR exceeds the 5,000 SAR capitalization threshold only in aggregate — but matches prior rule 'IT Equipment' from your Dec purchase. Treating as fixed asset, 48-month straight-line.",
    ar: "تكلفة الوحدة 4,350 ر.س لا تتجاوز حد الرسملة 5,000 ر.س منفردة، لكنها تطابق قاعدة 'معدات تقنية' من عملية ديسمبر. تُعامَل كأصل ثابت، قسط ثابت على 48 شهراً.",
  },
  confidence: "high",
};

// ---------- Derived ----------

export const accountByCode = Object.fromEntries(
  chartOfAccounts.map((a) => [a.code, a])
);

export function trialBalance(): { code: string; debit: number; credit: number }[] {
  const map = new Map<string, { debit: number; credit: number }>();
  for (const a of chartOfAccounts) map.set(a.code, { debit: 0, credit: 0 });
  for (const je of journal) {
    for (const line of je.lines) {
      const row = map.get(line.account) ?? { debit: 0, credit: 0 };
      row.debit += line.debit;
      row.credit += line.credit;
      map.set(line.account, row);
    }
  }
  return Array.from(map.entries())
    .map(([code, v]) => ({ code, ...v }))
    .filter((r) => r.debit || r.credit);
}

export function balanceForAccount(code: string): number {
  const acc = accountByCode[code];
  if (!acc) return 0;
  let d = 0;
  let c = 0;
  for (const je of journal) {
    for (const line of je.lines) {
      if (line.account === code) {
        d += line.debit;
        c += line.credit;
      }
    }
  }
  // assets & expenses: debit-normal; liabilities, equity, revenue: credit-normal
  return ["asset", "expense"].includes(acc.type) ? d - c : c - d;
}

export function sumByType(type: Account["type"], from?: string, to?: string): number {
  let total = 0;
  for (const je of journal) {
    if (from && je.date < from) continue;
    if (to && je.date > to) continue;
    for (const line of je.lines) {
      const acc = accountByCode[line.account];
      if (!acc || acc.type !== type) continue;
      // For P&L types (revenue/expense), credit/debit convention applies
      if (type === "revenue") total += line.credit - line.debit;
      else if (type === "expense") total += line.debit - line.credit;
      else if (type === "asset") total += line.debit - line.credit;
      else total += line.credit - line.debit;
    }
  }
  return total;
}

// Cash position = bank + cash on hand
export function cashOnHand(): number {
  return balanceForAccount("1010") + balanceForAccount("1020");
}

// Crude runway: cash / trailing avg monthly net burn
export function runwayMonths(): number {
  const cash = cashOnHand();
  const feb = sumByType("expense", "2026-02-01", "2026-02-28") - sumByType("revenue", "2026-02-01", "2026-02-28");
  const jan = sumByType("expense", "2026-01-01", "2026-01-31") - sumByType("revenue", "2026-01-01", "2026-01-31");
  const avgBurn = Math.max((feb + jan) / 2, 1);
  return cash / avgBurn;
}
