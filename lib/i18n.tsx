"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import type { Lang, Bilingual } from "./types";

type Ctx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: keyof typeof messages["en"]) => string;
  b: (v: Bilingual) => string;
};

const I18nContext = createContext<Ctx | null>(null);

export const messages = {
  en: {
    // Nav
    dashboard: "Dashboard",
    setup: "Guided Setup",
    log: "Log",
    ledger: "Ledger",
    compliance: "Compliance",
    reports: "Reports",
    explain: "Glossary",

    // Common
    company: "Company",
    vat_state_not_registered: "Not VAT-registered",
    vat_state_voluntary: "VAT registered (voluntary)",
    vat_state_mandatory: "VAT registered (mandatory)",
    month_to_date: "Month to date",
    year_to_date: "Year to date",
    runway: "Runway",
    months: "months",
    cash: "Cash",
    revenue: "Revenue",
    expenses: "Expenses",
    net_burn: "Net burn",
    view_all: "View all",
    why: "Why?",
    close: "Close",
    confirm: "Confirm",
    edit: "Edit",
    change: "Change",

    // Dashboard
    dash_hello: "Here's where things stand",
    dash_next_actions: "Next actions",
    dash_action_log: "Log this week's expenses",
    dash_action_log_detail: "3 receipts waiting for review",
    dash_action_bank: "Add your bank balance",
    dash_action_bank_detail: "Reconcile Al Rajhi statement",
    dash_action_calendar: "Review your regulatory calendar",
    dash_action_calendar_detail: "GOSI due in 25 days",
    dash_obligations: "Upcoming obligations",
    dash_recent_activity: "Recent activity",

    // Setup
    setup_complete: "Setup complete",
    setup_profile: "Entity profile",
    setup_capital: "Capital structure",
    setup_preincorp: "Pre-incorporation items",
    setup_vat: "VAT state",
    setup_coa: "Chart of accounts",
    setup_review: "Opening balance sheet",
    setup_cr: "CR number",
    setup_type: "Entity type",
    setup_incorp: "Incorporation date",
    setup_fye: "Fiscal year end",
    setup_activity: "Activity",
    setup_total_capital: "Total paid-in capital",
    setup_founders: "Founders",
    setup_opening_balances: "Opening balances",

    // Log
    log_title: "Log a transaction",
    log_hint: "Paste a receipt, upload a photo, or type what happened in plain English or Arabic.",
    log_placeholder: "e.g. paid 8,700 SAR at Jarir for 2 MacBooks for the team",
    log_propose: "Propose classification",
    log_proposed: "Proposed classification",
    log_vendor: "Vendor",
    log_amount: "Amount",
    log_vat: "VAT",
    log_account: "Account",
    log_treatment: "Treatment",
    log_rule: "Rule",
    log_confidence: "Confidence",
    log_confirm_post: "Confirm and post",
    log_recent: "Recently posted",

    // Ledger
    ledger_coa: "Chart of accounts",
    ledger_journal: "Journal",
    ledger_trial: "Trial balance",
    ledger_code: "Code",
    ledger_account: "Account",
    ledger_type: "Type",
    ledger_balance: "Balance",
    ledger_debit: "Debit",
    ledger_credit: "Credit",
    ledger_date: "Date",
    ledger_memo: "Memo",
    ledger_source: "Source",
    ledger_balanced: "Trial balance is balanced",

    // Compliance
    comp_vat_tracker: "VAT threshold tracker",
    comp_vat_rolling: "Rolling 12-month revenue",
    comp_vat_voluntary: "Voluntary threshold",
    comp_vat_mandatory: "Mandatory threshold",
    comp_calendar: "Regulatory calendar",
    comp_days: "days",
    comp_overdue: "Overdue",
    comp_today: "Due today",

    // Reports
    rep_pl: "Profit & Loss",
    rep_bs: "Balance Sheet",
    rep_summary: "This month in plain language",
    rep_assets: "Assets",
    rep_liabilities: "Liabilities",
    rep_equity: "Equity",
    rep_net_income: "Net income",
    rep_total: "Total",
    rep_download: "Download PDF",

    // Explain
    exp_title: "Glossary & Explanations",
    exp_search: "Search a term (e.g. ZATCA, VAT, SOCPA)",

    // Dashboard — accountants & integrations panels
    dash_accountants_title: "Accountants on demand",
    dash_accountants_sub:
      "Book a SOCPA-certified accountant by the hour for close review, VAT filing help, or a CFO sanity check.",
    dash_accountants_book: "Book a call",
    dash_accountants_modal_title: "Booking — demo only",
    dash_accountants_modal_body:
      "In the full product this opens a scheduler with the accountant's available slots and charges per-hour to your workspace. The demo stops here.",
    dash_accountants_per_hour: "/ hour",
    dash_accountants_rating: "rating",
    dash_integrations_title: "Connect your books",
    dash_integrations_sub:
      "Daftar reads from your existing accounting system so you don't re-enter data. One-way sync first, write-back in a later release.",
    dash_integrations_connect: "Connect",
    dash_integrations_demo_tag: "Demo",
  },
  ar: {
    dashboard: "الرئيسية",
    setup: "الإعداد الموجّه",
    log: "تسجيل",
    ledger: "الدفاتر",
    compliance: "الامتثال",
    reports: "التقارير",
    explain: "المصطلحات",

    company: "الشركة",
    vat_state_not_registered: "غير مسجّل في ضريبة القيمة المضافة",
    vat_state_voluntary: "مسجّل في ضريبة القيمة المضافة (طوعي)",
    vat_state_mandatory: "مسجّل في ضريبة القيمة المضافة (إلزامي)",
    month_to_date: "منذ بداية الشهر",
    year_to_date: "منذ بداية السنة",
    runway: "المدى النقدي",
    months: "شهر",
    cash: "النقد",
    revenue: "الإيرادات",
    expenses: "المصروفات",
    net_burn: "صافي الاستهلاك",
    view_all: "عرض الكل",
    why: "لماذا؟",
    close: "إغلاق",
    confirm: "تأكيد",
    edit: "تعديل",
    change: "تغيير",

    dash_hello: "هذا ملخّص وضعك الحالي",
    dash_next_actions: "الخطوات التالية",
    dash_action_log: "سجّل مصروفات هذا الأسبوع",
    dash_action_log_detail: "3 إيصالات بانتظار المراجعة",
    dash_action_bank: "أضف رصيد حسابك البنكي",
    dash_action_bank_detail: "مطابقة كشف بنك الراجحي",
    dash_action_calendar: "راجع تقويم الامتثال",
    dash_action_calendar_detail: "التأمينات الاجتماعية خلال 25 يوماً",
    dash_obligations: "الالتزامات القادمة",
    dash_recent_activity: "النشاط الأخير",

    setup_complete: "اكتمل الإعداد",
    setup_profile: "بيانات الشركة",
    setup_capital: "هيكل رأس المال",
    setup_preincorp: "مصروفات ما قبل التأسيس",
    setup_vat: "حالة ضريبة القيمة المضافة",
    setup_coa: "دليل الحسابات",
    setup_review: "الميزانية الافتتاحية",
    setup_cr: "رقم السجل التجاري",
    setup_type: "نوع الكيان",
    setup_incorp: "تاريخ التأسيس",
    setup_fye: "نهاية السنة المالية",
    setup_activity: "النشاط",
    setup_total_capital: "إجمالي رأس المال المدفوع",
    setup_founders: "المؤسسون",
    setup_opening_balances: "الأرصدة الافتتاحية",

    log_title: "تسجيل عملية",
    log_hint: "ألصق إيصالاً، ارفع صورة، أو اكتب ما حدث بلغة بسيطة عربية أو إنجليزية.",
    log_placeholder: "مثال: دفعت 8,700 ر.س في جرير لشراء جهازَي ماك بوك للفريق",
    log_propose: "اقتراح التصنيف",
    log_proposed: "التصنيف المقترح",
    log_vendor: "المورّد",
    log_amount: "المبلغ",
    log_vat: "ضريبة القيمة المضافة",
    log_account: "الحساب",
    log_treatment: "المعالجة",
    log_rule: "القاعدة",
    log_confidence: "درجة الثقة",
    log_confirm_post: "تأكيد وتسجيل",
    log_recent: "آخر القيود",

    ledger_coa: "دليل الحسابات",
    ledger_journal: "دفتر اليومية",
    ledger_trial: "ميزان المراجعة",
    ledger_code: "الرمز",
    ledger_account: "الحساب",
    ledger_type: "النوع",
    ledger_balance: "الرصيد",
    ledger_debit: "مدين",
    ledger_credit: "دائن",
    ledger_date: "التاريخ",
    ledger_memo: "البيان",
    ledger_source: "المصدر",
    ledger_balanced: "ميزان المراجعة متوازن",

    comp_vat_tracker: "متابعة حد التسجيل في ضريبة القيمة المضافة",
    comp_vat_rolling: "إيرادات آخر 12 شهراً",
    comp_vat_voluntary: "الحد الطوعي",
    comp_vat_mandatory: "الحد الإلزامي",
    comp_calendar: "التقويم التنظيمي",
    comp_days: "يوم",
    comp_overdue: "متأخّر",
    comp_today: "اليوم",

    rep_pl: "قائمة الدخل",
    rep_bs: "قائمة المركز المالي",
    rep_summary: "هذا الشهر بلغة بسيطة",
    rep_assets: "الأصول",
    rep_liabilities: "الخصوم",
    rep_equity: "حقوق الملكية",
    rep_net_income: "صافي الدخل",
    rep_total: "الإجمالي",
    rep_download: "تنزيل PDF",

    exp_title: "المصطلحات والشروحات",
    exp_search: "ابحث عن مصطلح (مثل زاتكا، ضريبة القيمة المضافة، SOCPA)",

    dash_accountants_title: "محاسبون عند الطلب",
    dash_accountants_sub:
      "احجز محاسباً معتمداً من الهيئة السعودية للمراجعين والمحاسبين بالساعة لمراجعة الإقفال، تقديم الإقرار الضريبي، أو جلسة مدير مالي استشارية.",
    dash_accountants_book: "احجز مكالمة",
    dash_accountants_modal_title: "الحجز — عرض تجريبي",
    dash_accountants_modal_body:
      "في النسخة النهائية يفتح هذا الزر شاشة الحجز ويخصم من رصيد الشركة بالساعة. هنا نتوقّف عند هذا الحد.",
    dash_accountants_per_hour: "/ ساعة",
    dash_accountants_rating: "التقييم",
    dash_integrations_title: "اربط دفاترك الحالية",
    dash_integrations_sub:
      "يقرأ دفتر من نظامك المحاسبي الحالي حتى لا تُعيد إدخال البيانات. مزامنة باتجاه واحد أولاً، وكتابة عكسية لاحقاً.",
    dash_integrations_connect: "اربط",
    dash_integrations_demo_tag: "تجريبي",
  },
} as const;

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    const saved = typeof window !== "undefined" ? (localStorage.getItem("lang") as Lang | null) : null;
    if (saved === "en" || saved === "ar") setLangState(saved);
  }, []);

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = lang;
      document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    }
  }, [lang]);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    if (typeof window !== "undefined") localStorage.setItem("lang", l);
  }, []);

  const t = useCallback(
    (key: keyof typeof messages["en"]) => messages[lang][key] ?? String(key),
    [lang]
  );
  const b = useCallback((v: Bilingual) => v[lang], [lang]);

  return <I18nContext.Provider value={{ lang, setLang, t, b }}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used inside I18nProvider");
  return ctx;
}
