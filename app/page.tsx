"use client";

import Link from "next/link";
import { useState } from "react";
import { useI18n } from "@/lib/i18n";

/* ============================================================================
   Daftar landing — Montera-inspired layout
   - Off-white canvas, deep charcoal text, orange/red gradient accents
   - Bilingual EN/AR via useI18n; RTL-safe via logical spacing (ms/me/ps/pe)
   - All Saudi-specific content preserved (SOCPA / ZATCA / integrations / experts)
   ========================================================================== */

export default function Landing() {
  const { lang, setLang } = useI18n();
  const ar = lang === "ar";

  return (
    <div className="landing min-h-screen text-ink-900">
      <TopNav ar={ar} onToggle={() => setLang(ar ? "en" : "ar")} />
      <Hero ar={ar} />
      <TrustedStrip ar={ar} />
      <LimitlessAccess ar={ar} />
      <FutureWereBuilding ar={ar} />
      <InstantReady ar={ar} />
      <AllInOne ar={ar} />
      <GoGlobal ar={ar} />
      <BusinessEngine ar={ar} />
      <Integrations ar={ar} />
      <Experts ar={ar} />
      <Testimonials ar={ar} />
      <FinalCTA ar={ar} />
      <Footer ar={ar} onToggle={() => setLang(ar ? "en" : "ar")} />
    </div>
  );
}

/* ─────────────────────── Nav ─────────────────────── */

function TopNav({ ar, onToggle }: { ar: boolean; onToggle: () => void }) {
  return (
    <header className="sticky top-0 z-40 bg-canvas/80 backdrop-blur border-b border-ink-100">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="inline-flex w-8 h-8 rounded-lg bg-gradient-to-br from-accent-500 to-accent-700 text-white items-center justify-center font-bold text-sm">
            د
          </span>
          <span className="font-semibold tracking-tight text-lg">Daftar</span>
          <span className="text-[10px] text-ink-400 border border-ink-200 rounded-full px-1.5 py-0.5 num-latn">
            MVP
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-7 text-sm text-ink-600">
          <a href="#product" className="hover:text-ink-900 transition">
            {ar ? "المنتج" : "Product"}
          </a>
          <a href="#integrations" className="hover:text-ink-900 transition">
            {ar ? "التكاملات" : "Integrations"}
          </a>
          <a href="#experts" className="hover:text-ink-900 transition">
            {ar ? "المحاسبون" : "Experts"}
          </a>
          <a href="#testimonials" className="hover:text-ink-900 transition">
            {ar ? "آراء المؤسسين" : "Founders"}
          </a>
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={onToggle}
            className="text-sm px-3 py-1.5 rounded-md border border-ink-200 hover:bg-white transition"
          >
            {ar ? "English" : "العربية"}
          </button>
          <Link
            href="/dashboard"
            className="text-sm px-4 py-2 rounded-lg bg-ink-900 text-white hover:bg-ink-800 transition font-medium"
          >
            {ar ? "افتح التجربة" : "Open demo"}
          </Link>
        </div>
      </div>
    </header>
  );
}

/* ─────────────────────── Hero ─────────────────────── */

function Hero({ ar }: { ar: boolean }) {
  return (
    <section className="hero-glow">
      <div className="max-w-6xl mx-auto px-6 pt-24 pb-24 md:pt-32 md:pb-28 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-ink-200 bg-white px-3 py-1 text-xs text-ink-600 shadow-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-accent-500" />
          {ar
            ? "🇸🇦 مصمّم للمؤسسين والشركات الناشئة في المملكة"
            : "🇸🇦 Built for Saudi founders and SMEs"}
        </div>

        <h1 className="mt-6 text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight leading-[1.05]">
          {ar ? (
            <>
              المدير المالي والمحاسب
              <br />
              <span className="bg-gradient-to-r from-accent-500 via-accent-600 to-accent-700 bg-clip-text text-transparent">
                في علبة واحدة
              </span>
            </>
          ) : (
            <>
              Your CFO and accountant
              <br />
              <span className="bg-gradient-to-r from-accent-500 via-accent-600 to-accent-700 bg-clip-text text-transparent">
                in a box
              </span>
            </>
          )}
        </h1>

        <p className="mt-6 text-lg md:text-xl text-ink-600 max-w-2xl mx-auto leading-relaxed">
          {ar
            ? "إعداد موجّه متوافق مع الهيئة السعودية للمراجعين والمحاسبين، قيد مزدوج تلقائي، متابعة حدود الضريبة، تقويم تنظيمي، وإقفال شهري — بلغتين وبلا تعقيد."
            : "SOCPA-aligned guided setup, automated double-entry bookkeeping, a VAT threshold tracker, regulatory calendar, and monthly close — in Arabic and English, without the jargon."}
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/dashboard"
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-br from-accent-500 to-accent-700 text-white font-medium shadow-lg shadow-accent-500/20 hover:shadow-accent-500/40 transition"
          >
            {ar ? "افتح التجربة الحيّة" : "Open the live demo"}
          </Link>
          <a
            href="#experts"
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-white border border-ink-200 text-ink-800 font-medium hover:border-ink-300 transition"
          >
            {ar ? "تحدّث إلى محاسب" : "Talk to an accountant"}
          </a>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs text-ink-500">
          <span className="inline-flex items-center gap-1.5">
            <span className="w-1 h-1 rounded-full bg-ink-400" />
            {ar ? "ثنائي اللغة عربي / إنجليزي" : "Bilingual AR / EN"}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="w-1 h-1 rounded-full bg-ink-400" />
            {ar ? "متوافق مع SOCPA" : "SOCPA-aligned"}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="w-1 h-1 rounded-full bg-ink-400" />
            {ar ? "جاهز لـ ZATCA" : "ZATCA-ready"}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="w-1 h-1 rounded-full bg-ink-400" />
            <span className="num-latn">13 seeded entries · trial balance = 0</span>
          </span>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────── Trusted strip (marquee) ─────────────────── */

function TrustedStrip({ ar }: { ar: boolean }) {
  const items = [
    "Riyadh",
    "Jeddah",
    "Dammam",
    "Khobar",
    "Dhahran",
    "Neom",
    "Qiddiya",
    "Diriyah",
    "AlUla",
    "Medina",
  ];
  return (
    <section className="py-10 border-y border-ink-100 bg-white/50">
      <p className="eyebrow text-center mb-6">
        {ar
          ? "مصمّم للعاملين في الرياض وجدة والدمام"
          : "Built for operators across Riyadh, Jeddah, Dammam"}
      </p>
      <div className="overflow-hidden">
        <div className="marquee-track flex gap-12 whitespace-nowrap">
          {[...items, ...items].map((c, i) => (
            <span
              key={i}
              className="text-ink-400 text-lg font-semibold tracking-wide select-none"
            >
              · {c}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────── Limitless Access (2×2) ─────────────────── */

function LimitlessAccess({ ar }: { ar: boolean }) {
  const cards = [
    {
      icon: "◎",
      title: ar ? "إعداد موجّه" : "Guided setup",
      body: ar
        ? "أدخِل بيانات الشركة، هيكل رأس المال، ومصروفات ما قبل التأسيس — تحصل على ميزانية افتتاحية متوازنة في أقل من 15 دقيقة."
        : "Enter entity profile, capital structure, and pre-incorporation items — get a balanced opening balance sheet in under 15 minutes.",
    },
    {
      icon: "✎",
      title: ar ? "تسجيل بلغة بسيطة" : "Plain-language logging",
      body: ar
        ? "اكتب ما حدث كما لو تحدثت لمحاسب. المحرّك يقترح تصنيفاً مع تبرير، ولا يُقيَّد شيء دون موافقتك."
        : "Type what happened in plain language. The engine proposes a classification with rationale — nothing posts without your OK.",
    },
    {
      icon: "≡",
      title: ar ? "دفاتر متوافقة مع SOCPA" : "SOCPA-aligned ledger",
      body: ar
        ? "دليل حسابات جاهز بحسب نوع النشاط، قيد مزدوج محمي على مستوى قاعدة البيانات، وميزان مراجعة دائماً متوازن."
        : "Activity-aware chart of accounts, double-entry invariant enforced at the DB, trial balance always at zero.",
    },
    {
      icon: "✓",
      title: ar ? "إقفال شهري" : "Monthly close",
      body: ar
        ? "قائمة تحقق ذكية تلتقط العمليات غير المصنّفة، الإيصالات المكرّرة، ومستحقات المؤسسين قبل الإقفال."
        : "A close checklist that flags unclassified transactions, duplicate receipts, and pending founder reimbursements before you close.",
    },
  ];

  return (
    <section id="product" className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <p className="eyebrow">{ar ? "الوصول بلا قيود" : "Limitless access"}</p>
        <h2 className="mt-3 text-4xl md:text-5xl font-semibold tracking-tight max-w-3xl">
          {ar
            ? "كل ما يفعله محاسب مبتدئ، ببرنامج واحد."
            : "Everything a junior accountant does, in one product."}
        </h2>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-5">
          {cards.map((c) => (
            <div
              key={c.title}
              className="group bg-white border border-ink-100 rounded-2xl p-8 shadow-sm hover:shadow-md hover:border-ink-200 transition"
            >
              <div className="inline-flex w-11 h-11 rounded-xl bg-gradient-to-br from-accent-500 to-accent-700 text-white text-xl items-center justify-center">
                {c.icon}
              </div>
              <h3 className="mt-5 text-xl font-semibold">{c.title}</h3>
              <p className="mt-2 text-ink-600 leading-relaxed">{c.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────── Future We're Building (6 staggered) ─────────────────── */

function FutureWereBuilding({ ar }: { ar: boolean }) {
  const items = [
    {
      t: ar ? "متابعة حد الضريبة" : "VAT threshold tracker",
      d: ar
        ? "إيرادات آخر 12 شهراً مقابل حدَّي 187.5 ألف و 375 ألف ر.س، مع مؤشر حالة واضح."
        : "Rolling 12-month revenue vs the 187.5k and 375k SAR thresholds, with a clear status indicator.",
    },
    {
      t: ar ? "التقويم التنظيمي" : "Regulatory calendar",
      d: ar
        ? "ضريبة القيمة المضافة، الزكاة، التأمينات، نظام حماية الأجور، تجديد السجل التجاري و MISA — كلها في مكان واحد."
        : "VAT, Zakat, GOSI, WPS, CR and MISA renewals — unified in one view.",
    },
    {
      t: ar ? "تقارير ثنائية اللغة" : "Bilingual reports",
      d: ar
        ? "قائمة الدخل والمركز المالي وملخص شهري بلغة واضحة، بعربية وإنجليزية من نفس البيانات."
        : "P&L, balance sheet, and a plain-language monthly summary in Arabic and English from the same ledger.",
    },
    {
      t: ar ? 'زر "لماذا؟"' : "Why-explainer",
      d: ar
        ? "كل قيد وتصنيف وسطر تقرير مربوط بشرح مرجعيّ يشير إلى SOCPA أو ZATCA."
        : "Every journal entry, classification, and report line links to a referenced explanation citing SOCPA or ZATCA.",
    },
    {
      t: ar ? "مستحقات المؤسسين" : "Founder reimbursements",
      d: ar
        ? "سير منفصل لتسجيل ما دفعه المؤسس قبل التأسيس أو من ماله الخاص، مع تتبّع المستحقات."
        : "A separate flow for pre-incorporation and founder-paid items — tracked as Due to Founders until settled.",
    },
    {
      t: ar ? "دفاتر مقفلة على التوازن" : "Trial-balance-locked ledger",
      d: ar
        ? "لا يمكن لأي عملية أن تكسر ميزان المراجعة — القاعدة مفروضة على مستوى قاعدة البيانات."
        : "Nothing can post that breaks the trial balance — the invariant is enforced at the database layer.",
    },
  ];

  return (
    <section className="py-24 bg-white/70 border-y border-ink-100">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <p className="eyebrow">{ar ? "ما نبنيه الآن" : "Future we're building"}</p>
            <h2 className="mt-3 text-4xl md:text-5xl font-semibold tracking-tight max-w-2xl">
              {ar
                ? "الأساسيات المملة التي تبقي دفاترك نظيفة."
                : "The boring fundamentals that keep your books clean."}
            </h2>
          </div>
          <p className="text-ink-600 max-w-md">
            {ar
              ? "ستّ ميزات تعمل خلف الكواليس حتى لا تُضطر للتفكير فيها."
              : "Six features working quietly in the background so you don't have to think about them."}
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((it, i) => (
            <div
              key={it.t}
              className={`rounded-2xl p-7 border ${
                i % 3 === 1
                  ? "bg-ink-900 text-white border-ink-900 md:translate-y-4"
                  : "bg-white border-ink-100"
              }`}
            >
              <div
                className={`text-xs font-semibold ${
                  i % 3 === 1 ? "text-accent-300" : "text-accent-600"
                }`}
              >
                {String(i + 1).padStart(2, "0")}
              </div>
              <h3 className="mt-3 text-lg font-semibold">{it.t}</h3>
              <p
                className={`mt-2 leading-relaxed ${
                  i % 3 === 1 ? "text-ink-200" : "text-ink-600"
                }`}
              >
                {it.d}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────── Instant, Ad-Ready (gradient) ─────────────────── */

function InstantReady({ ar }: { ar: boolean }) {
  const cards = [
    {
      t: ar ? "مخرجات جاهزة لـ ZATCA" : "ZATCA-ready outputs",
      d: ar
        ? "رمز QR للمرحلة الثانية، تفاصيل الضريبة، وعرض الإقرار الضريبي قبل التقديم."
        : "Phase-2 QR, VAT detail, and a filing preview before submission.",
    },
    {
      t: ar ? "قائمة دخل بلغتين" : "Bilingual P&L",
      d: ar
        ? "نفس الأرقام، تعريف عربي وإنجليزي من نفس الدفاتر، قابلة للتصدير PDF/CSV."
        : "Same numbers, Arabic and English labels from one ledger, exportable PDF/CSV.",
    },
    {
      t: ar ? "ميزانية افتتاحية في دقائق" : "Opening BS in minutes",
      d: ar
        ? "أدخل المؤسسين ورأس المال ومصروفات ما قبل التأسيس — ونخرج بميزانية متوازنة."
        : "Enter founders, capital, and pre-incorporation items — we output a balanced BS.",
    },
    {
      t: ar ? "أثر تدقيق لكل قيد" : "Audit trail per entry",
      d: ar
        ? "كل قيد مرتبط بمصدر، بقاعدة، بنسخة القاعدة، وبالمبرّر النصي."
        : "Every entry links back to its source, rule, rule version, and rationale.",
    },
  ];

  return (
    <section className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="rounded-3xl overflow-hidden relative bg-gradient-to-br from-accent-500 via-accent-600 to-accent-800 text-white p-10 md:p-16">
          <div className="absolute inset-0 opacity-20 pointer-events-none [background-image:radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:24px_24px]" />
          <div className="relative">
            <p className="eyebrow !text-white/80">
              {ar ? "جاهز من اليوم الأول" : "Instant, ready from day one"}
            </p>
            <h2 className="mt-3 text-4xl md:text-5xl font-semibold tracking-tight max-w-3xl">
              {ar
                ? "لن تنتظر ميزانية ثانية حتى تبدأ تمسك دفاترك كما يجب."
                : "You won't need a second founding round before your books look right."}
            </h2>

            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {cards.map((c) => (
                <div
                  key={c.t}
                  className="rounded-2xl bg-white/10 backdrop-blur border border-white/20 p-5 hover:bg-white/15 transition"
                >
                  <h3 className="font-semibold text-white">{c.t}</h3>
                  <p className="mt-2 text-sm text-white/80 leading-relaxed">{c.d}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────── All-in-One (3×3 icon grid) ─────────────────── */

function AllInOne({ ar }: { ar: boolean }) {
  const cells = [
    { ic: "◳", t: ar ? "دليل حسابات SOCPA" : "SOCPA CoA" },
    { ic: "▦", t: ar ? "رمز ZATCA" : "ZATCA QR" },
    { ic: "◉", t: ar ? "التأمينات الاجتماعية" : "GOSI" },
    { ic: "◈", t: ar ? "حماية الأجور" : "WPS" },
    { ic: "☪", t: ar ? "الزكاة" : "Zakat" },
    { ic: "⎔", t: ar ? "تجديد السجل و MISA" : "CR / MISA renewals" },
    { ic: "▤", t: ar ? "رأس المال مقابل المصروفات" : "Capex vs opex" },
    { ic: "⟳", t: ar ? "إطفاء المدفوعات المقدمة" : "Prepaid amortization" },
    { ic: "∑", t: ar ? "عرض الإقرار الضريبي" : "VAT return preview" },
  ];
  return (
    <section className="py-24 bg-white/70 border-y border-ink-100">
      <div className="max-w-6xl mx-auto px-6">
        <p className="eyebrow">{ar ? "كل شيء في مكان واحد" : "All-in-one"}</p>
        <h2 className="mt-3 text-4xl md:text-5xl font-semibold tracking-tight max-w-3xl">
          {ar
            ? "الأدوات التي تحتاجها السنتان الأوليان من الشركة."
            : "Everything the first two years of a company need."}
        </h2>
        <div className="mt-12 grid grid-cols-2 md:grid-cols-3 gap-4">
          {cells.map((c) => (
            <div
              key={c.t}
              className="bg-white border border-ink-100 rounded-2xl p-6 flex items-center gap-4 hover:border-accent-300 hover:shadow-sm transition"
            >
              <span className="inline-flex w-11 h-11 rounded-xl bg-accent-50 text-accent-700 items-center justify-center text-xl">
                {c.ic}
              </span>
              <span className="font-medium text-ink-800">{c.t}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────── Go Global / Scale (two-column) ─────────────────── */

function GoGlobal({ ar }: { ar: boolean }) {
  return (
    <section className="py-24">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <p className="eyebrow">{ar ? "مصمّم لواقع السوق السعودي" : "Wired for Saudi reality"}</p>
          <h2 className="mt-3 text-4xl md:text-5xl font-semibold tracking-tight">
            {ar
              ? "لا تحتاج إلى ترجمة قواعد محاسبية أجنبية."
              : "You shouldn't need to translate foreign accounting rules."}
          </h2>
          <p className="mt-4 text-lg text-ink-600 leading-relaxed">
            {ar
              ? "دفتر مبني من الصفر حول SOCPA و ZATCA والهيئات السعودية، ويفهم مصطلحات مثل المرابحة والمقاصّة ومستحقات المؤسسين وتكاليف التأسيس — دون أن تحتاج لشرح ذلك للنظام."
              : "Daftar is built from scratch around SOCPA, ZATCA, and Saudi regulators. It understands founder reimbursements, organization costs, pre-incorporation items, and in-kind capital — without you explaining them."}
          </p>
          <div className="mt-6 flex items-center gap-3">
            <Link
              href="/ledger"
              className="px-5 py-3 rounded-xl bg-ink-900 text-white font-medium hover:bg-ink-800 transition"
            >
              {ar ? "شاهد الدفاتر" : "See the ledger"}
            </Link>
            <Link
              href="/compliance"
              className="px-5 py-3 rounded-xl bg-white border border-ink-200 font-medium hover:border-ink-300 transition"
            >
              {ar ? "التقويم التنظيمي" : "Regulatory calendar"}
            </Link>
          </div>
        </div>
        <MiniDashboard ar={ar} />
      </div>
    </section>
  );
}

/* ─────────────────── Business Engine (dashboard preview) ─────────────────── */

function BusinessEngine({ ar }: { ar: boolean }) {
  return (
    <section className="py-24 bg-white/70 border-y border-ink-100">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <p className="eyebrow">{ar ? "محرّك أعمالك" : "Your business engine"}</p>
        <h2 className="mt-3 text-4xl md:text-5xl font-semibold tracking-tight max-w-3xl mx-auto">
          {ar
            ? "دفاتر تفهم نفسها بنفسها — وتشرحها لك."
            : "A ledger that understands itself — and explains itself to you."}
        </h2>
        <p className="mt-4 text-ink-600 max-w-2xl mx-auto">
          {ar
            ? "افتح التجربة الحيّة وتنقّل بين لوحة التحكم والدفاتر والإقفال الشهري ببيانات شركة وهمية كاملة."
            : "Open the live demo and move between the dashboard, ledger, and monthly close on a fully seeded mock company."}
        </p>

        <div className="mt-10 mx-auto max-w-5xl">
          <DashboardPreview ar={ar} />
        </div>

        <Link
          href="/dashboard"
          className="inline-block mt-10 px-6 py-3 rounded-xl bg-gradient-to-br from-accent-500 to-accent-700 text-white font-medium shadow-lg shadow-accent-500/20 hover:shadow-accent-500/40 transition"
        >
          {ar ? "افتح التجربة الحيّة" : "Open the live demo →"}
        </Link>
      </div>
    </section>
  );
}

/* ─────────────────── Integrations (restyled) ─────────────────── */

function Integrations({ ar }: { ar: boolean }) {
  const tiles = [
    { key: "W", name: "Wafeq", d: ar ? "المحاسبة العربية" : "Arabic-first accounting" },
    { key: "Q", name: "Qoyod", d: ar ? "سحابي سعودي" : "Saudi cloud books" },
    { key: "O", name: "Odoo", d: ar ? "ERP مفتوح" : "Open ERP" },
    { key: "Z", name: "Zoho Books", d: ar ? "شهير إقليمياً" : "Popular regionally" },
    { key: "Q", name: "QuickBooks", d: ar ? "عالمي" : "Global standard" },
    { key: "X", name: "Xero", d: ar ? "سحابي عالمي" : "Global cloud" },
  ];

  return (
    <section id="integrations" className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <p className="eyebrow">{ar ? "تكاملات" : "Integrations"}</p>
            <h2 className="mt-3 text-4xl md:text-5xl font-semibold tracking-tight max-w-2xl">
              {ar
                ? "يقرأ من دفاترك الحالية. لا تُعيد إدخال البيانات."
                : "Reads from your existing books. No re-entry."}
            </h2>
          </div>
          <Link
            href="/dashboard#integrations"
            className="inline-flex items-center gap-1 text-sm font-medium text-accent-700 hover:text-accent-900"
          >
            {ar ? "اربطها من اللوحة →" : "Connect from dashboard →"}
          </Link>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {tiles.map((t) => (
            <div
              key={t.name}
              className="group bg-white border border-ink-100 rounded-2xl p-6 flex items-center gap-4 hover:border-accent-300 hover:shadow-sm transition"
            >
              <span className="inline-flex w-12 h-12 rounded-xl bg-gradient-to-br from-ink-100 to-ink-200 text-ink-800 items-center justify-center text-lg font-bold">
                {t.key}
              </span>
              <div className="flex-1">
                <div className="font-semibold">{t.name}</div>
                <div className="text-xs text-ink-500">{t.d}</div>
              </div>
              <span className="text-xs font-medium text-accent-700 opacity-0 group-hover:opacity-100 transition">
                →
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────── Experts (restyled) ─────────────────── */

function Experts({ ar }: { ar: boolean }) {
  const experts = [
    {
      n: ar ? "أ. سارة الحربي" : "Sarah Al-Harbi",
      s: ar ? "محاسبة قانونية — ضريبة القيمة المضافة" : "CPA — VAT filing",
      r: "280",
      tag: ar ? "محاسبة قانونية" : "SOCPA CPA",
    },
    {
      n: ar ? "أ. خالد المطيري" : "Khalid Al-Mutairi",
      s: ar ? "مدير مالي — نمو الشركات الناشئة" : "CFO — startup growth",
      r: "450",
      tag: ar ? "مدير مالي سابق" : "Ex-CFO",
    },
    {
      n: ar ? "أ. هند السبيعي" : "Hind Al-Subaie",
      s: ar ? "الزكاة وضريبة الشركات" : "Zakat & CIT",
      r: "320",
      tag: ar ? "زكاة ضريبة" : "Zakat & tax",
    },
  ];

  return (
    <section id="experts" className="py-24 bg-white/70 border-y border-ink-100">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <p className="eyebrow">{ar ? "محاسبون عند الطلب" : "Accountants on demand"}</p>
            <h2 className="mt-3 text-4xl md:text-5xl font-semibold tracking-tight max-w-2xl">
              {ar
                ? "احجز محاسباً بالساعة دون عقد شهري."
                : "Book an accountant by the hour — no retainer."}
            </h2>
          </div>
          <Link
            href="/dashboard#accountants"
            className="inline-flex items-center gap-1 text-sm font-medium text-accent-700 hover:text-accent-900"
          >
            {ar ? "احجز من اللوحة →" : "Book from dashboard →"}
          </Link>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-5">
          {experts.map((e) => (
            <div
              key={e.n}
              className="bg-white border border-ink-100 rounded-2xl p-7 hover:border-ink-200 hover:shadow-sm transition"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent-400 to-accent-700 grid place-items-center text-white font-bold">
                  {e.n.split(" ").slice(-2).map((p) => p[0]).join("")}
                </div>
                <div>
                  <div className="font-semibold">{e.n}</div>
                  <div className="text-xs text-ink-500">{e.s}</div>
                </div>
              </div>
              <div className="mt-5 flex items-center justify-between text-sm">
                <span className="inline-flex items-center gap-1 text-ink-700">
                  <span className="num-latn font-semibold">{e.r} SAR</span>
                  <span className="text-ink-500">
                    {ar ? "/ ساعة" : "/ hour"}
                  </span>
                </span>
                <span className="text-xs text-accent-700 bg-accent-50 border border-accent-100 rounded-full px-2 py-0.5">
                  {e.tag}
                </span>
              </div>
              <Link
                href="/dashboard#accountants"
                className="mt-5 block text-center w-full px-4 py-2.5 rounded-xl bg-ink-900 text-white text-sm font-medium hover:bg-ink-800 transition"
              >
                {ar ? "احجز مكالمة" : "Book a call"}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────── Testimonials ─────────────────── */

function Testimonials({ ar }: { ar: boolean }) {
  const quotes = [
    {
      q: ar
        ? "أول مرة أفهم ميزانيتي الافتتاحية بنفسي دون الحاجة لمحاسب يشرحها لي."
        : "First time I've ever understood my own opening balance sheet without an accountant translating.",
      n: ar ? "فيصل · مؤسس SaaS" : "Faisal · SaaS founder",
    },
    {
      q: ar
        ? "زر \"لماذا؟\" وحده يستحق السعر. كل قيد له تبرير واضح."
        : "The 'why?' button alone is worth the price. Every entry justifies itself.",
      n: ar ? "نورة · مؤسسة مشاركة" : "Noura · co-founder",
    },
    {
      q: ar
        ? "التقويم التنظيمي وفّر عليّ نسيان استحقاق التأمينات ثلاث مرات."
        : "The regulatory calendar has saved me from forgetting GOSI three times.",
      n: ar ? "عمر · مشغّل" : "Omar · operator",
    },
    {
      q: ar
        ? "ثنائية اللغة ليست إضافة — هي الأساس. فريقي يعمل بالعربي وأنا بالإنجليزي."
        : "Bilingual isn't a feature, it's a foundation. My team reads Arabic, I read English.",
      n: ar ? "ريم · مديرة عمليات" : "Reem · COO",
    },
    {
      q: ar
        ? "أخيراً أداة لا تتعامل معي كأنني محاسب محترف."
        : "Finally a tool that doesn't assume I'm a trained accountant.",
      n: ar ? "سلمان · مؤسس" : "Salman · founder",
    },
    {
      q: ar
        ? "ميزان المراجعة دائماً متوازن. لا عراك يوم الإقفال."
        : "The trial balance is always at zero. No month-end scramble.",
      n: ar ? "لينا · مديرة مالية" : "Lina · finance lead",
    },
  ];

  return (
    <section id="testimonials" className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <p className="eyebrow">{ar ? "آراء المؤسسين" : "What founders say"}</p>
        <h2 className="mt-3 text-4xl md:text-5xl font-semibold tracking-tight max-w-3xl">
          {ar ? "من مؤسسين كانوا يُمسكون دفاترهم على Excel." : "From founders who used to run on Excel."}
        </h2>

        <div className="mt-10 overflow-hidden">
          <div className="flex gap-5 overflow-x-auto snap-x snap-mandatory pb-4 -mx-6 px-6">
            {quotes.map((q, i) => (
              <figure
                key={i}
                className="snap-start shrink-0 w-[320px] md:w-[380px] bg-white border border-ink-100 rounded-2xl p-7 shadow-sm"
              >
                <blockquote className="text-ink-800 leading-relaxed">"{q.q}"</blockquote>
                <figcaption className="mt-5 flex items-center justify-between">
                  <span className="text-sm text-ink-500">— {q.n}</span>
                  <span className="text-[10px] uppercase tracking-wider text-ink-400">
                    {ar ? "شخصية توضيحية" : "Illustrative persona"}
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────── Final CTA ─────────────────── */

function FinalCTA({ ar }: { ar: boolean }) {
  return (
    <section className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-accent-500 via-accent-600 to-accent-800 text-white p-12 md:p-20 text-center">
          <div className="absolute inset-0 opacity-20 pointer-events-none [background-image:radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:24px_24px]" />
          <div className="relative">
            <h2 className="text-4xl md:text-6xl font-semibold tracking-tight max-w-3xl mx-auto leading-[1.05]">
              {ar
                ? "افتح دفاتر شركتك الوهمية — وجرّبها الآن."
                : "Open the mock company's books — try the demo now."}
            </h2>
            <p className="mt-5 text-white/80 max-w-xl mx-auto text-lg">
              {ar
                ? "بلا تسجيل دخول، بلا بطاقة، بلا انتظار. تجربة كاملة تعمل في متصفحك."
                : "No login, no card, no waiting. A full experience running in your browser."}
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/dashboard"
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-white text-ink-900 font-semibold hover:bg-ink-100 transition"
              >
                {ar ? "افتح التجربة الحيّة" : "Open the live demo"}
              </Link>
              <Link
                href="/explain"
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-white/10 border border-white/30 text-white font-medium hover:bg-white/20 transition"
              >
                {ar ? "استعرض المصطلحات" : "Browse the glossary"}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────── Footer ─────────────────── */

function Footer({ ar, onToggle }: { ar: boolean; onToggle: () => void }) {
  return (
    <footer className="border-t border-ink-100 bg-white/60 pt-16 pb-10">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-5 gap-8">
        <div className="col-span-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex w-8 h-8 rounded-lg bg-gradient-to-br from-accent-500 to-accent-700 text-white items-center justify-center font-bold text-sm">
              د
            </span>
            <span className="font-semibold tracking-tight text-lg">Daftar</span>
          </div>
          <p className="mt-3 text-sm text-ink-600 max-w-xs">
            {ar
              ? "المدير المالي والمحاسب في علبة — للمؤسسين السعوديين."
              : "Your CFO and accountant in a box — for Saudi founders."}
          </p>
          <button
            onClick={onToggle}
            className="mt-4 text-xs px-2.5 py-1 rounded-md border border-ink-200 hover:bg-white transition"
          >
            {ar ? "English" : "العربية"}
          </button>
        </div>

        <FooterCol
          title={ar ? "المنتج" : "Product"}
          links={[
            { href: "/dashboard", label: ar ? "اللوحة" : "Dashboard" },
            { href: "/ledger", label: ar ? "الدفاتر" : "Ledger" },
            { href: "/compliance", label: ar ? "الامتثال" : "Compliance" },
            { href: "/reports", label: ar ? "التقارير" : "Reports" },
          ]}
        />
        <FooterCol
          title={ar ? "تعمّق" : "Deeper"}
          links={[
            { href: "/setup", label: ar ? "الإعداد" : "Guided setup" },
            { href: "/log", label: ar ? "التسجيل" : "Log" },
            { href: "/explain", label: ar ? "المصطلحات" : "Glossary" },
          ]}
        />
        <FooterCol
          title={ar ? "الشركة" : "Company"}
          links={[
            { href: "#experts", label: ar ? "محاسبون" : "Experts" },
            { href: "#integrations", label: ar ? "تكاملات" : "Integrations" },
            { href: "https://github.com/ahmedmubarak14/daftar", label: "GitHub" },
          ]}
        />
      </div>
      <div className="max-w-6xl mx-auto px-6 mt-10 pt-6 border-t border-ink-100 flex flex-col md:flex-row justify-between gap-3 text-xs text-ink-500">
        <span className="num-latn">© 2026 Daftar · MVP demo</span>
        <span>
          {ar
            ? "بيانات العرض وهمية — لا يوجد نظام خلفي حقيقي."
            : "Demo data only — no real backend is attached."}
        </span>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  links,
}: {
  title: string;
  links: { href: string; label: string }[];
}) {
  return (
    <div>
      <div className="eyebrow mb-3">{title}</div>
      <ul className="space-y-2 text-sm">
        {links.map((l) => (
          <li key={l.href + l.label}>
            {l.href.startsWith("http") || l.href.startsWith("#") ? (
              <a href={l.href} className="text-ink-700 hover:text-ink-900 transition">
                {l.label}
              </a>
            ) : (
              <Link href={l.href} className="text-ink-700 hover:text-ink-900 transition">
                {l.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ─────────────────── Dashboard mockups (decorative) ─────────────────── */

function MiniDashboard({ ar }: { ar: boolean }) {
  return (
    <div className="relative">
      <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-accent-500/20 via-transparent to-accent-700/20 blur-xl" />
      <div className="relative bg-white rounded-2xl border border-ink-100 shadow-xl p-5">
        <div className="flex items-center justify-between pb-3 border-b border-ink-100">
          <div className="flex items-center gap-2 text-xs text-ink-500">
            <span className="w-2 h-2 rounded-full bg-rose-400" />
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
          </div>
          <span className="text-xs text-ink-400 num-latn">mithaq.daftar.sa</span>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-3">
          <MiniStat label={ar ? "النقد" : "Cash"} value="273,450" tone="ink" />
          <MiniStat label={ar ? "المدى" : "Runway"} value="14.2" suffix={ar ? "شهر" : "mo"} tone="accent" />
        </div>
        <div className="mt-4 space-y-2">
          {[
            { l: ar ? "إيرادات" : "Revenue", v: "18,750", t: "good" },
            { l: ar ? "مصروفات" : "Expenses", v: "27,900", t: "neutral" },
            { l: ar ? "ضريبة القيمة المضافة" : "VAT tracker", v: "112k / 187.5k", t: "neutral" },
          ].map((r) => (
            <div
              key={r.l}
              className="flex items-center justify-between rounded-lg bg-ink-50 px-3 py-2 text-xs"
            >
              <span className="text-ink-600">{r.l}</span>
              <span className="num-latn font-semibold text-ink-900">{r.v}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function MiniStat({
  label,
  value,
  suffix,
  tone,
}: {
  label: string;
  value: string;
  suffix?: string;
  tone: "ink" | "accent";
}) {
  return (
    <div
      className={`rounded-xl p-3 ${
        tone === "accent"
          ? "bg-gradient-to-br from-accent-500 to-accent-700 text-white"
          : "bg-ink-50 text-ink-900"
      }`}
    >
      <div
        className={`text-[10px] uppercase tracking-wider ${
          tone === "accent" ? "text-white/70" : "text-ink-400"
        }`}
      >
        {label}
      </div>
      <div className="mt-1 text-lg font-semibold num-latn">
        {value}
        {suffix && <span className="text-xs font-normal opacity-70 ms-1">{suffix}</span>}
      </div>
    </div>
  );
}

function DashboardPreview({ ar }: { ar: boolean }) {
  return (
    <div className="rounded-2xl border border-ink-100 bg-white shadow-2xl overflow-hidden">
      <div className="flex items-center justify-between px-5 py-3 border-b border-ink-100 bg-canvas-50">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-rose-400" />
          <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
        </div>
        <span className="text-xs text-ink-400 num-latn">
          ahmedmubarak14.github.io/daftar/dashboard
        </span>
        <span className="text-xs text-accent-700 bg-accent-50 border border-accent-100 rounded-full px-2 py-0.5">
          {ar ? "مباشر" : "live"}
        </span>
      </div>
      <div className="grid grid-cols-12">
        <aside className="col-span-3 bg-canvas-50 border-e border-ink-100 p-4 hidden md:block">
          {[
            ar ? "الرئيسية" : "Dashboard",
            ar ? "الإعداد" : "Setup",
            ar ? "تسجيل" : "Log",
            ar ? "الدفاتر" : "Ledger",
            ar ? "الامتثال" : "Compliance",
            ar ? "التقارير" : "Reports",
            ar ? "المصطلحات" : "Glossary",
          ].map((l, i) => (
            <div
              key={l}
              className={`px-3 py-2 rounded-lg text-sm mb-1 ${
                i === 0 ? "bg-white border border-ink-100 text-ink-900 font-medium" : "text-ink-600"
              }`}
            >
              {l}
            </div>
          ))}
        </aside>
        <main className="col-span-12 md:col-span-9 p-6 text-left" dir="ltr">
          <div className="text-xs uppercase tracking-wider text-ink-400">
            Mithaq Technologies LLC
          </div>
          <div className="text-xl font-semibold mt-1">Here's where things stand</div>
          <div className="mt-5 grid grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              { l: "Cash", v: "273,450 SAR" },
              { l: "Runway", v: "14.2 mo", accent: true },
              { l: "Revenue · MTD", v: "18,750" },
              { l: "Expenses · MTD", v: "27,900" },
            ].map((s) => (
              <div
                key={s.l}
                className={`rounded-xl p-3 border ${
                  s.accent
                    ? "bg-gradient-to-br from-accent-500 to-accent-700 border-accent-600 text-white"
                    : "bg-canvas-50 border-ink-100"
                }`}
              >
                <div
                  className={`text-[10px] uppercase tracking-wider ${
                    s.accent ? "text-white/70" : "text-ink-400"
                  }`}
                >
                  {s.l}
                </div>
                <div className="mt-1 text-lg font-semibold num-latn">{s.v}</div>
              </div>
            ))}
          </div>
          <div className="mt-5 grid grid-cols-1 lg:grid-cols-3 gap-3">
            <div className="lg:col-span-2 rounded-xl border border-ink-100 p-4">
              <div className="text-sm font-semibold mb-2">Next actions</div>
              {[
                "Log this week's expenses",
                "Add your bank balance",
                "Review regulatory calendar",
              ].map((a) => (
                <div
                  key={a}
                  className="flex items-center justify-between py-2 border-b border-ink-100 last:border-0 text-sm"
                >
                  <span className="text-ink-700">{a}</span>
                  <span className="text-ink-300">›</span>
                </div>
              ))}
            </div>
            <div className="rounded-xl border border-ink-100 p-4">
              <div className="text-sm font-semibold mb-2">Upcoming obligations</div>
              {[
                { l: "GOSI · Mar", d: "25 days", t: "emerald" },
                { l: "VAT Q1", d: "42 days", t: "amber" },
                { l: "CR renewal", d: "118 days", t: "emerald" },
              ].map((o) => (
                <div key={o.l} className="flex items-center gap-2 py-1.5 text-xs">
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      o.t === "emerald" ? "bg-emerald-500" : "bg-amber-500"
                    }`}
                  />
                  <span className="text-ink-700 flex-1">{o.l}</span>
                  <span className="text-ink-400 num-latn">{o.d}</span>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
