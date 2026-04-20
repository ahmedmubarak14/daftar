"use client";

import Link from "next/link";
import { useI18n } from "@/lib/i18n";

export default function Landing() {
  const { lang, setLang } = useI18n();
  const ar = lang === "ar";

  return (
    <div className="min-h-screen bg-[#fafaf8] text-ink-900">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-[#fafaf8]/80 backdrop-blur border-b border-ink-100">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="inline-flex w-8 h-8 rounded-lg bg-brand-600 text-white items-center justify-center font-bold text-sm">
              د
            </span>
            <span className="font-semibold tracking-tight text-lg">Daftar</span>
            <span className="text-[10px] text-ink-400 border border-ink-200 rounded-full px-1.5 py-0.5 num-latn">
              MVP
            </span>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm text-ink-600">
            <a href="#features" className="hover:text-ink-900">
              {ar ? "المميزات" : "Features"}
            </a>
            <a href="#integrations" className="hover:text-ink-900">
              {ar ? "التكاملات" : "Integrations"}
            </a>
            <a href="#experts" className="hover:text-ink-900">
              {ar ? "المحاسبون" : "Experts"}
            </a>
            <a href="#pricing" className="hover:text-ink-900">
              {ar ? "الأسعار" : "Pricing"}
            </a>
          </nav>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setLang(ar ? "en" : "ar")}
              className="text-sm px-3 py-1.5 rounded-md border border-ink-200 hover:bg-white transition"
            >
              {ar ? "English" : "العربية"}
            </button>
            <Link
              href="/dashboard"
              className="text-sm px-3 py-1.5 rounded-md bg-brand-600 text-white hover:bg-brand-700 transition font-medium"
            >
              {ar ? "افتح التجربة" : "Open the demo"}
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 -z-10"
          style={{
            backgroundImage:
              "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(70,116,97,0.12), transparent 60%)",
          }}
        />
        <div className="max-w-6xl mx-auto px-6 pt-20 pb-16 md:pt-28 md:pb-24 text-center">
          <div className="inline-flex items-center gap-2 text-xs font-medium text-brand-800 bg-brand-50 border border-brand-100 rounded-full px-3 py-1.5 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-600 inline-block" />
            {ar
              ? "لمؤسسي الشركات الناشئة في السعودية"
              : "For Saudi startup founders"}
          </div>
          <h1 className="text-4xl md:text-6xl font-semibold tracking-tight leading-[1.1]">
            {ar ? (
              <>
                محاسبك الذكي
                <br />
                <span className="text-brand-700">في صندوق واحد</span>
              </>
            ) : (
              <>
                Your CFO and accountant
                <br />
                <span className="text-brand-700">in a box</span>
              </>
            )}
          </h1>
          <p className="mt-6 text-lg md:text-xl text-ink-600 max-w-2xl mx-auto leading-relaxed">
            {ar
              ? "أسّس شركتك يوم الاثنين، واحصل على دفاتر نظيفة متوافقة مع SOCPA وزاتكا وجاهزة للمستثمرين يوم الجمعة — دون توظيف محاسب ودون تعلّم المحاسبة."
              : "Incorporate on Monday, have clean, SOCPA-aligned, ZATCA-ready, investor-grade books by Friday — without hiring anyone and without learning accounting first."}
          </p>
          <div className="mt-10 flex items-center justify-center gap-3">
            <Link
              href="/dashboard"
              className="px-5 py-3 rounded-md bg-brand-600 text-white hover:bg-brand-700 transition font-medium shadow-sm"
            >
              {ar ? "افتح تجربة المنتج ←" : "Open the demo →"}
            </Link>
            <a
              href="#features"
              className="px-5 py-3 rounded-md border border-ink-200 hover:bg-white transition text-ink-800 font-medium"
            >
              {ar ? "شاهد المميزات" : "See features"}
            </a>
          </div>

          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto text-start">
            <HeroStat
              value={ar ? "< 15 دقيقة" : "< 15 min"}
              label={ar ? "إعداد كامل للشركة" : "full company setup"}
            />
            <HeroStat
              value="SOCPA"
              label={ar ? "دليل حسابات متوافق" : "aligned chart of accounts"}
            />
            <HeroStat
              value="AR + EN"
              label={ar ? "واجهة ثنائية اللغة" : "bilingual, RTL-first"}
            />
            <HeroStat
              value={ar ? "30 ثانية" : "30 sec"}
              label={ar ? "لتسجيل أي عملية" : "to log any transaction"}
            />
          </div>
        </div>
      </section>

      {/* Problem */}
      <section id="problem" className="border-t border-ink-100 bg-white">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <div className="max-w-2xl">
            <div className="text-xs uppercase tracking-wider text-brand-700 font-semibold mb-3">
              {ar ? "المشكلة" : "The problem"}
            </div>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
              {ar
                ? "أغلب المؤسسين يصلون لأول جولة استثمار بدفاتر تحتاج إعادة بناء كاملة."
                : "Most founders reach their first funding round with books that need a full rebuild."}
            </h2>
            <p className="mt-4 text-ink-600 leading-relaxed">
              {ar
                ? "المحاسب المستقل يُعاملك كمُدخِل بيانات، وبرامج المحاسبة الجاهزة تفترض أنك تعرف المحاسبة أصلاً، والمواعيد التنظيمية في زاتكا والتأمينات الاجتماعية تختفي فجأة من تقويمك."
                : "Freelance accountants treat you like a data-entry clerk. Off-the-shelf software assumes you already know accounting. ZATCA and GOSI deadlines disappear from your calendar until it's too late."}
            </p>
          </div>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">
            <ProblemCard
              title={ar ? "3,000–8,000 ر.س شهرياً" : "3,000–8,000 SAR / mo"}
              body={
                ar
                  ? "تكلفة المحاسب المستقل، وتبقى تابعاً وبطيئاً ومحتاراً."
                  : "For a freelance accountant — and you're still dependent, slow, and confused."
              }
            />
            <ProblemCard
              title={ar ? "رأس مال أم مصروف؟" : "Capital or expense?"}
              body={
                ar
                  ? "رخصة وزارة الاستثمار، رسوم التسجيل، الأجهزة، الاشتراكات — تصنيفات خاطئة تُكلّف شهوراً من التنظيف."
                  : "MISA license, trademark, laptops, annual subscriptions — one misclassification costs months of cleanup."
              }
            />
            <ProblemCard
              title={ar ? "دفع شخصي أم من الشركة؟" : "Personal card or company?"}
              body={
                ar
                  ? "المؤسسون يخلطون أموالهم الشخصية بأموال الشركة، والحسابات تصبح غير قابلة للتدقيق."
                  : "Founders mix personal and company money. By the time an auditor looks, the books aren't auditable."
              }
            />
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="border-t border-ink-100">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <div className="text-xs uppercase tracking-wider text-brand-700 font-semibold mb-3">
            {ar ? "كيف يعمل دفتر" : "What Daftar does"}
          </div>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight max-w-3xl">
            {ar
              ? "ست وحدات تعمل معاً. اكتب بلغة بسيطة، نحن نتكفل بالباقي."
              : "Six modules working together. You write plain language. We do the accounting."}
          </h2>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <FeatureCard
              icon="✦"
              title={ar ? "إعداد موجّه" : "Guided setup"}
              body={
                ar
                  ? "معالج يأخذك من السجل التجاري إلى ميزانية افتتاحية متوازنة في أقل من 15 دقيقة، مع تصنيف مصروفات ما قبل التأسيس تلقائياً."
                  : "A wizard that takes you from CR number to a balanced opening balance sheet in under 15 minutes — with pre-incorporation costs classified for you."
              }
            />
            <FeatureCard
              icon="✎"
              title={ar ? "تسجيل بلغة بسيطة" : "Log in plain language"}
              body={
                ar
                  ? "اكتب «دفعت 8,700 ر.س في جرير لجهازَي ماك بوك» — يظهر قيد مزدوج صحيح مع شرح لماذا تمت معالجته رأسمالياً."
                  : "Type \"paid 8,700 SAR at Jarir for two MacBooks\" — get a correct double-entry posting with an explanation of why it's capex."
              }
            />
            <FeatureCard
              icon="⊡"
              title={ar ? "دليل حسابات SOCPA" : "SOCPA chart of accounts"}
              body={
                ar
                  ? "ترقيم متوافق مع المعايير السعودية (1xxx للأصول، 2xxx للخصوم، 6xxx للمصروفات)، قابل للتصدير ومفهوم للمدققين."
                  : "SOCPA-aligned numbering (1xxx assets, 2xxx liabilities, 6xxx opex). Exportable and legible to any auditor."
              }
            />
            <FeatureCard
              icon="▦"
              title={ar ? "متابعة ضريبة القيمة المضافة" : "VAT threshold tracker"}
              body={
                ar
                  ? "نتتبع إيراداتك خلال آخر 12 شهراً مقابل الحد الطوعي (187,500) والإلزامي (375,000) ونخبرك متى يجب التسجيل."
                  : "Rolling 12-month revenue tracked against both the 187,500 and 375,000 SAR thresholds. We tell you when to register."
              }
            />
            <FeatureCard
              icon="⎔"
              title={ar ? "تقويم الامتثال" : "Regulatory calendar"}
              body={
                ar
                  ? "زاتكا، الزكاة، التأمينات الاجتماعية، حماية الأجور، تجديد السجل التجاري والرخصة — كلها في مكان واحد مع تذكيرات قبل الموعد."
                  : "ZATCA, Zakat, GOSI, WPS, CR & MISA renewals — all in one view with reminders 14, 7, and 1 days before each deadline."
              }
            />
            <FeatureCard
              icon="◉"
              title={ar ? "لماذا؟ — شرح فوري" : "Why? — inline explanations"}
              body={
                ar
                  ? "كل قيد، كل تصنيف، كل رقم له زر «لماذا؟» يفتح شرحاً بسيطاً بالعربية أو الإنجليزية. تتعلّم أثناء العمل."
                  : "Every posting, classification, and number has a 'Why?' button that opens a one-paragraph explanation in Arabic or English. Learn as you go."
              }
            />
          </div>
        </div>
      </section>

      {/* Preview mockup */}
      <section id="preview" className="border-t border-ink-100 bg-gradient-to-b from-white to-[#fafaf8]">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="text-xs uppercase tracking-wider text-brand-700 font-semibold mb-3">
              {ar ? "نظرة داخل المنتج" : "Inside the product"}
            </div>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
              {ar
                ? "لوحة تحكم بسيطة، دفاتر متوازنة دائماً."
                : "A simple dashboard. Books that always balance."}
            </h2>
          </div>

          <DashboardMockup ar={ar} />

          <div className="mt-10 text-center">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-md bg-brand-600 text-white hover:bg-brand-700 transition font-medium"
            >
              {ar ? "جرّب المنتج الآن" : "Try the full demo"}
              <span>{ar ? "←" : "→"}</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Integrations */}
      <section id="integrations" className="border-t border-ink-100 bg-white">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <div className="max-w-2xl">
            <div className="text-xs uppercase tracking-wider text-brand-700 font-semibold mb-3">
              {ar ? "التكاملات" : "Integrations"}
            </div>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
              {ar
                ? "يعمل مع الأدوات التي تستخدمها بالفعل."
                : "Works with the tools you already use."}
            </h2>
            <p className="mt-4 text-ink-600 leading-relaxed">
              {ar
                ? "استورد من نظامك الحالي، أو صدّر إليه، أو شغّل دفتر بالتوازي. لا حاجة لاعتماد كامل من اليوم الأول."
                : "Import from your current system, export to it, or run Daftar in parallel. No need to go all-in on day one."}
            </p>
          </div>

          <div className="mt-10">
            <div className="text-xs font-semibold text-ink-500 uppercase tracking-wider mb-4">
              {ar ? "برامج المحاسبة" : "Accounting systems"}
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
              <IntegrationTile name="Wafeq" status={ar ? "متاح" : "Available"} available />
              <IntegrationTile nameAr="قيود" name="Qoyod" status={ar ? "متاح" : "Available"} available />
              <IntegrationTile name="Zoho Books" status={ar ? "متاح" : "Available"} available />
              <IntegrationTile name="Odoo" status={ar ? "قريباً" : "Soon"} />
              <IntegrationTile name="QuickBooks" status={ar ? "قريباً" : "Soon"} />
              <IntegrationTile name="Xero" status={ar ? "قريباً" : "Soon"} />
            </div>
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4">
            <IntegrationCategory
              title={ar ? "البنوك" : "Banks"}
              items={["Al Rajhi", "SNB", "Riyad Bank", "STC Pay", "Mada"]}
              note={ar ? "عبر SAMA Open Banking — v2" : "via SAMA Open Banking — v2"}
              ar={ar}
            />
            <IntegrationCategory
              title={ar ? "البوابات والمتاجر" : "Payments & e-commerce"}
              items={["Moyasar", "HyperPay", "Tap", "Salla", "Zid"]}
              note={ar ? "متاحة في المرحلة التالية" : "Coming in the next phase"}
              ar={ar}
            />
            <IntegrationCategory
              title={ar ? "الرواتب والامتثال" : "Payroll & compliance"}
              items={["ZATCA Fatoora", "GOSI", "WPS", "Mudad", "Qiwa"]}
              note={ar ? "التقديم المباشر — v2" : "Direct filing — v2"}
              ar={ar}
            />
            <IntegrationCategory
              title={ar ? "المنتجية" : "Productivity"}
              items={["Google Drive", "Slack", "Notion", "Email (IMAP)"]}
              note={ar ? "للمرفقات والتنبيهات" : "For attachments and alerts"}
              ar={ar}
            />
          </div>

          <div className="mt-8 rounded-xl bg-brand-50/60 border border-brand-100 p-5 flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-brand-600 text-white grid place-items-center text-lg shrink-0">
              ⇄
            </div>
            <div>
              <div className="font-semibold text-ink-900">
                {ar ? "الانتقال من نظام آخر؟" : "Migrating from another system?"}
              </div>
              <p className="mt-1 text-sm text-ink-600 leading-relaxed">
                {ar
                  ? "نستورد دليل الحسابات، أرصدة الافتتاح، وآخر 12 شهر من القيود من وافق أو قيود أو زوهو أو Odoo أو QuickBooks. الأصل يبقى كما هو — نحن نُعيد البناء بشكل متوافق مع SOCPA."
                  : "We import your chart of accounts, opening balances, and last 12 months of journals from Wafeq, Qoyod, Zoho, Odoo, or QuickBooks. Your original books stay intact — we rebuild in a SOCPA-clean way alongside."}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Experts / Accountant on demand */}
      <section id="experts" className="border-t border-ink-100 bg-gradient-to-b from-[#fafaf8] to-white">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <div className="max-w-2xl">
            <div className="text-xs uppercase tracking-wider text-brand-700 font-semibold mb-3">
              {ar ? "محاسبون عند الطلب" : "Accountants on demand"}
            </div>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
              {ar
                ? "تحتاج محاسباً بجانبك؟ احجز ساعة. يرى نفس دفاترك."
                : "Need a human in the loop? Book an hour. They see the same books you do."}
            </h2>
            <p className="mt-4 text-ink-600 leading-relaxed">
              {ar
                ? "كل المحاسبين معتمدون من SOCPA ومُراجَعون من فريق دفتر. احجز مكالمة 30 دقيقة أو أسند مهمة كاملة. الدفع حسب الاستخدام — بدون عقد شهري."
                : "Every accountant is SOCPA-certified and vetted by Daftar. Book a 30-minute call or hand off a full task. Pay as you go — no monthly retainer."}
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">
            <ExpertCard
              initials="LA"
              name={ar ? "ليلى السبيعي" : "Layla Al-Subaie"}
              title={ar ? "خبيرة زاتكا وضريبة القيمة المضافة" : "ZATCA & VAT specialist"}
              years={ar ? "12 سنة خبرة" : "12 years experience"}
              badges={
                ar ? ["ضريبة القيمة المضافة", "الزكاة", "الفوترة الإلكترونية"] : ["VAT", "Zakat", "E-invoicing"]
              }
              rate={350}
              rating="4.9"
              reviews={142}
              ar={ar}
            />
            <ExpertCard
              initials="AG"
              name={ar ? "عبدالله الغامدي" : "Abdullah Al-Ghamdi"}
              title={ar ? "تنظيف دفاتر ما قبل التدقيق، سابقاً في Big 4" : "Audit-ready cleanup, ex-Big 4"}
              years={ar ? "15 سنة خبرة" : "15 years experience"}
              badges={
                ar ? ["تدقيق", "جولات استثمارية", "IFRS"] : ["Audit", "Due diligence", "IFRS"]
              }
              rate={500}
              rating="5.0"
              reviews={87}
              popular
              ar={ar}
            />
            <ExpertCard
              initials="HO"
              name={ar ? "هند العمري" : "Hind Al-Omari"}
              title={ar ? "الشركات الناشئة التقنية" : "Tech startups & fundraising"}
              years={ar ? "8 سنوات خبرة" : "8 years experience"}
              badges={
                ar
                  ? ["شركات SaaS", "نماذج مالية", "قوائم للمستثمرين"]
                  : ["SaaS", "Financial models", "Investor decks"]
              }
              rate={400}
              rating="4.8"
              reviews={63}
              ar={ar}
            />
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            <TaskCard
              title={ar ? "مكالمة سريعة" : "Quick call"}
              price={ar ? "من 175 ر.س" : "From SAR 175"}
              desc={
                ar
                  ? "30 دقيقة لسؤال محدد. يرى المحاسب دفاترك مباشرة."
                  : "30 minutes for a specific question. They see your books live."
              }
            />
            <TaskCard
              title={ar ? "إغلاق شهري" : "Monthly close review"}
              price={ar ? "من 750 ر.س" : "From SAR 750"}
              desc={
                ar
                  ? "محاسب يراجع إغلاق الشهر، يوقّع على التصنيفات، ويُجهّز التقرير."
                  : "An accountant reviews the month's close, signs off on classifications, and preps the report."
              }
            />
            <TaskCard
              title={ar ? "جاهزية التدقيق" : "Audit-ready package"}
              price={ar ? "من 3,500 ر.س" : "From SAR 3,500"}
              desc={
                ar
                  ? "تنظيف كامل لآخر 12 شهر قبل جولة استثمار أو تدقيق مستقل."
                  : "Full 12-month cleanup before a funding round or external audit."
              }
            />
          </div>

          <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-xl border border-ink-100 bg-white p-5">
            <div className="text-sm text-ink-600">
              {ar
                ? "أكثر من 20 محاسب معتمد في الشبكة · متوسط وقت الرد أقل من ساعة"
                : "20+ vetted accountants in the network · average response under 1 hour"}
            </div>
            <button className="shrink-0 text-sm px-4 py-2 rounded-md border border-ink-200 hover:bg-ink-50 text-ink-800 font-medium">
              {ar ? "تصفح جميع المحاسبين ←" : "Browse all accountants →"}
            </button>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="border-t border-ink-100 bg-white">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="text-xs uppercase tracking-wider text-brand-700 font-semibold mb-3">
              {ar ? "الأسعار" : "Pricing"}
            </div>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
              {ar ? "أرخص 4 إلى 10 أضعاف من المحاسب." : "4–10× cheaper than an accountant."}
            </h2>
            <p className="mt-3 text-ink-600">
              {ar
                ? "مجاني 6 أشهر لشركاء التجربة. بعد ذلك، ثلاث باقات بسيطة."
                : "Free for 6 months for design partners. After that, three simple tiers."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
            <PriceCard
              name={ar ? "بداية" : "Starter"}
              price="149"
              unit={ar ? "ر.س / شهر" : "SAR / mo"}
              features={
                ar
                  ? ["حتى 50 عملية شهرياً", "مستخدم واحد", "ملائم لما قبل الإيرادات"]
                  : ["Up to 50 transactions / month", "1 user", "Pre-revenue or < 100k SAR annual"]
              }
            />
            <PriceCard
              name={ar ? "نمو" : "Growth"}
              price="449"
              unit={ar ? "ر.س / شهر" : "SAR / mo"}
              popular
              features={
                ar
                  ? [
                      "حتى 500 عملية شهرياً",
                      "3 مستخدمين",
                      "متابعة VAT كاملة",
                      "تقارير شهرية",
                    ]
                  : [
                      "Up to 500 transactions / month",
                      "3 users",
                      "Full VAT tracker",
                      "Monthly reports",
                    ]
              }
            />
            <PriceCard
              name={ar ? "توسع" : "Scale"}
              price="899"
              unit={ar ? "ر.س / شهر" : "SAR / mo"}
              features={
                ar
                  ? [
                      "عمليات غير محدودة",
                      "مستخدمون غير محدودين",
                      "حزمة تصدير للمحاسب",
                      "دعم أولوية",
                    ]
                  : [
                      "Unlimited transactions",
                      "Unlimited users",
                      "Accountant export package",
                      "Priority support",
                    ]
              }
            />
          </div>
          <div className="mt-6 text-center text-xs text-ink-500">
            {ar ? "الدفع السنوي يوفّر شهرين." : "Annual billing: 2 months free."}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-ink-100 bg-brand-700 text-white">
        <div className="max-w-4xl mx-auto px-6 py-16 text-center">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
            {ar
              ? "جاهز ترى دفاتر شركتك بدون فوضى؟"
              : "Ready to see your books without the mess?"}
          </h2>
          <p className="mt-4 text-brand-100 max-w-xl mx-auto">
            {ar
              ? "التجربة الحالية تعمل ببيانات وهمية لشركة تجريبية اسمها «ميثاق للتقنية». ادخل وتصفّحها."
              : "The demo runs against a seeded company called Mithaq Technologies. Poke around — everything is interactive."}
          </p>
          <div className="mt-8">
            <Link
              href="/dashboard"
              className="inline-block px-6 py-3 rounded-md bg-white text-brand-800 hover:bg-brand-50 transition font-semibold"
            >
              {ar ? "افتح التجربة" : "Open the demo"}
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-ink-100">
        <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-ink-500">
          <div className="flex items-center gap-2">
            <span className="inline-flex w-6 h-6 rounded-md bg-brand-600 text-white items-center justify-center font-bold text-[10px]">
              د
            </span>
            <span>Daftar · MVP demo</span>
          </div>
          <div className="text-xs">
            {ar
              ? "مبني على Next.js. البيانات المعروضة وهمية وللعرض التجريبي فقط."
              : "Built with Next.js. All data shown is seeded for demo purposes only."}
          </div>
        </div>
      </footer>
    </div>
  );
}

/* ---------------- Building blocks ---------------- */

function HeroStat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <div className="text-lg font-semibold text-ink-900 num-latn">{value}</div>
      <div className="text-xs text-ink-500 mt-1">{label}</div>
    </div>
  );
}

function ProblemCard({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-xl border border-ink-100 p-5 bg-[#fafaf8]">
      <div className="text-base font-semibold text-ink-900">{title}</div>
      <p className="mt-2 text-sm text-ink-600 leading-relaxed">{body}</p>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  body,
}: {
  icon: string;
  title: string;
  body: string;
}) {
  return (
    <div className="rounded-xl border border-ink-100 bg-white p-5 hover:shadow-card transition">
      <div className="w-9 h-9 rounded-lg bg-brand-50 text-brand-700 grid place-items-center text-lg mb-4">
        {icon}
      </div>
      <div className="text-base font-semibold text-ink-900">{title}</div>
      <p className="mt-2 text-sm text-ink-600 leading-relaxed">{body}</p>
    </div>
  );
}

function PriceCard({
  name,
  price,
  unit,
  features,
  popular = false,
}: {
  name: string;
  price: string;
  unit: string;
  features: string[];
  popular?: boolean;
}) {
  return (
    <div
      className={`rounded-xl border p-6 flex flex-col ${
        popular
          ? "border-brand-600 bg-brand-50/40 shadow-card"
          : "border-ink-100 bg-white"
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="text-sm font-semibold text-ink-900">{name}</div>
        {popular && (
          <span className="text-[10px] font-semibold uppercase tracking-wider bg-brand-600 text-white rounded-full px-2 py-0.5">
            Popular
          </span>
        )}
      </div>
      <div className="mt-4 flex items-baseline gap-1">
        <span className="text-4xl font-semibold num-latn">{price}</span>
        <span className="text-sm text-ink-500">{unit}</span>
      </div>
      <ul className="mt-6 space-y-2 text-sm text-ink-700 flex-1">
        {features.map((f, i) => (
          <li key={i} className="flex items-start gap-2">
            <span className="mt-1 text-brand-600">✓</span>
            <span>{f}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function IntegrationTile({
  name,
  nameAr,
  status,
  available = false,
}: {
  name: string;
  nameAr?: string;
  status: string;
  available?: boolean;
}) {
  return (
    <div
      className={`rounded-xl border p-4 transition ${
        available
          ? "border-ink-100 bg-white hover:shadow-card hover:border-brand-200"
          : "border-dashed border-ink-200 bg-[#fafaf8]"
      }`}
    >
      <div className="flex items-baseline justify-between gap-2">
        <div className="font-semibold text-ink-900 text-sm truncate">
          {nameAr ? (
            <span>
              {nameAr} <span className="text-ink-400 text-xs font-normal">· {name}</span>
            </span>
          ) : (
            name
          )}
        </div>
      </div>
      <div
        className={`mt-2 inline-flex items-center gap-1 text-[10px] font-medium rounded-full px-2 py-0.5 ${
          available
            ? "bg-emerald-50 text-emerald-700 border border-emerald-100"
            : "bg-ink-100 text-ink-500"
        }`}
      >
        {available && <span className="w-1 h-1 rounded-full bg-emerald-500" />}
        {status}
      </div>
    </div>
  );
}

function IntegrationCategory({
  title,
  items,
  note,
  ar,
}: {
  title: string;
  items: string[];
  note: string;
  ar: boolean;
}) {
  return (
    <div className="rounded-xl border border-ink-100 bg-[#fafaf8] p-5">
      <div className="flex items-baseline justify-between mb-3">
        <div className="text-sm font-semibold text-ink-900">{title}</div>
        <div className="text-[10px] text-ink-500 uppercase tracking-wider">{note}</div>
      </div>
      <div className="flex flex-wrap gap-2">
        {items.map((item) => (
          <span
            key={item}
            className="text-xs text-ink-700 bg-white border border-ink-200 rounded-md px-2.5 py-1 num-latn"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

function ExpertCard({
  initials,
  name,
  title,
  years,
  badges,
  rate,
  rating,
  reviews,
  popular = false,
  ar,
}: {
  initials: string;
  name: string;
  title: string;
  years: string;
  badges: string[];
  rate: number;
  rating: string;
  reviews: number;
  popular?: boolean;
  ar: boolean;
}) {
  return (
    <div
      className={`rounded-xl p-5 flex flex-col ${
        popular
          ? "border-2 border-brand-600 bg-white shadow-card"
          : "border border-ink-100 bg-white"
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-brand-100 text-brand-800 grid place-items-center font-semibold">
            {initials}
          </div>
          <div>
            <div className="font-semibold text-ink-900">{name}</div>
            <div className="text-xs text-ink-500 num-latn">
              ★ {rating} · {reviews} {ar ? "تقييم" : "reviews"}
            </div>
          </div>
        </div>
        {popular && (
          <span className="text-[10px] font-semibold uppercase tracking-wider bg-brand-600 text-white rounded-full px-2 py-0.5">
            {ar ? "موصى به" : "Top rated"}
          </span>
        )}
      </div>

      <div className="mt-4 text-sm text-ink-700">{title}</div>
      <div className="mt-1 text-xs text-ink-500">{years}</div>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {badges.map((b) => (
          <span
            key={b}
            className="text-[11px] font-medium text-brand-800 bg-brand-50 border border-brand-100 rounded-full px-2 py-0.5"
          >
            {b}
          </span>
        ))}
      </div>

      <div className="mt-5 pt-5 border-t border-ink-100 flex items-baseline justify-between">
        <div>
          <span className="text-2xl font-semibold num-latn text-ink-900">{rate}</span>
          <span className="text-sm text-ink-500 ms-1">
            {ar ? "ر.س / ساعة" : "SAR / hr"}
          </span>
        </div>
        <button
          className={`text-sm px-3 py-2 rounded-md font-medium ${
            popular
              ? "bg-brand-600 text-white hover:bg-brand-700"
              : "border border-ink-200 hover:bg-ink-50 text-ink-800"
          }`}
        >
          {ar ? "احجز مكالمة" : "Book a call"}
        </button>
      </div>
    </div>
  );
}

function TaskCard({
  title,
  price,
  desc,
}: {
  title: string;
  price: string;
  desc: string;
}) {
  return (
    <div className="rounded-xl border border-ink-100 bg-white p-5">
      <div className="flex items-baseline justify-between">
        <div className="font-semibold text-ink-900">{title}</div>
        <div className="text-xs font-semibold text-brand-700 num-latn">{price}</div>
      </div>
      <p className="mt-2 text-sm text-ink-600 leading-relaxed">{desc}</p>
    </div>
  );
}

function DashboardMockup({ ar }: { ar: boolean }) {
  return (
    <div className="rounded-2xl border border-ink-100 shadow-card bg-white overflow-hidden">
      {/* Mock browser chrome */}
      <div className="h-10 bg-ink-50 border-b border-ink-100 flex items-center px-4 gap-2">
        <span className="w-3 h-3 rounded-full bg-rose-300" />
        <span className="w-3 h-3 rounded-full bg-amber-300" />
        <span className="w-3 h-3 rounded-full bg-emerald-300" />
        <div className="ms-4 text-xs text-ink-400 num-latn">
          daftar.app/dashboard
        </div>
      </div>
      <div className="grid grid-cols-[200px_1fr]">
        {/* Fake sidebar */}
        <div className="bg-[#fafaf8] border-e border-ink-100 p-4">
          <div className="flex items-center gap-2 mb-6">
            <span className="inline-flex w-7 h-7 rounded-md bg-brand-600 text-white items-center justify-center font-bold text-xs">
              د
            </span>
            <span className="font-semibold text-sm">Daftar</span>
          </div>
          <div className="space-y-1 text-xs">
            {[
              { label: ar ? "الرئيسية" : "Dashboard", active: true },
              { label: ar ? "الإعداد" : "Setup" },
              { label: ar ? "تسجيل" : "Log" },
              { label: ar ? "الدفاتر" : "Ledger" },
              { label: ar ? "الامتثال" : "Compliance" },
              { label: ar ? "التقارير" : "Reports" },
            ].map((n, i) => (
              <div
                key={i}
                className={`px-2 py-1.5 rounded ${
                  n.active
                    ? "bg-brand-50 text-brand-800 font-medium"
                    : "text-ink-500"
                }`}
              >
                {n.label}
              </div>
            ))}
          </div>
        </div>
        {/* Fake main content */}
        <div className="p-6 bg-white">
          <div className="flex items-baseline justify-between mb-6">
            <div>
              <div className="text-lg font-semibold">
                {ar ? "شركة ميثاق للتقنية" : "Mithaq Technologies LLC"}
              </div>
              <div className="text-xs text-ink-500">
                {ar ? "هذا ملخّص وضعك الحالي" : "Here's where things stand"}
              </div>
            </div>
            <span className="text-[10px] font-medium text-emerald-700 bg-emerald-50 border border-emerald-100 rounded-full px-2 py-0.5 inline-flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              {ar ? "غير مسجّل في الضريبة" : "Not VAT-registered"}
            </span>
          </div>
          <div className="grid grid-cols-4 gap-3">
            <MockStat
              label={ar ? "النقد" : "Cash"}
              value={ar ? "286,125 ر.س" : "SAR 286,125"}
            />
            <MockStat
              label={ar ? "المدى النقدي" : "Runway"}
              value={ar ? "8.2 شهر" : "8.2 mo"}
              tone="good"
            />
            <MockStat
              label={ar ? "إيرادات الشهر" : "Revenue · MTD"}
              value={ar ? "12,000 ر.س" : "SAR 12,000"}
              tone="good"
            />
            <MockStat
              label={ar ? "مصروفات الشهر" : "Expenses · MTD"}
              value={ar ? "47,500 ر.س" : "SAR 47,500"}
            />
          </div>

          <div className="grid grid-cols-3 gap-3 mt-4">
            <div className="col-span-2 rounded-lg border border-ink-100 p-4">
              <div className="text-xs font-semibold text-ink-700 mb-3">
                {ar ? "النشاط الأخير" : "Recent activity"}
              </div>
              <div className="space-y-2 text-xs">
                <MockRow
                  date="28 Feb"
                  memo={ar ? "إهلاك المعدات — فبراير" : "IT depreciation — Feb"}
                  amt={ar ? "177 ر.س" : "SAR 177"}
                />
                <MockRow
                  date="25 Feb"
                  memo={ar ? "رواتب فبراير" : "February salaries"}
                  amt={ar ? "24,000 ر.س" : "SAR 24,000"}
                />
                <MockRow
                  date="18 Feb"
                  memo={ar ? "إعلانات قوقل" : "Google Ads"}
                  amt={ar ? "3,500 ر.س" : "SAR 3,500"}
                />
                <MockRow
                  date="10 Feb"
                  memo={ar ? "فاتورة INV-001 — النهدي" : "Invoice INV-001 — Al Nahdi"}
                  amt={ar ? "12,000 ر.س" : "SAR 12,000"}
                  good
                />
              </div>
            </div>
            <div className="rounded-lg border border-ink-100 p-4">
              <div className="text-xs font-semibold text-ink-700 mb-3">
                {ar ? "الالتزامات القادمة" : "Obligations"}
              </div>
              <div className="space-y-2 text-xs">
                <MockObligation
                  dot="amber"
                  label={ar ? "حماية الأجور" : "WPS"}
                  days={ar ? "12 يوم" : "12 days"}
                />
                <MockObligation
                  dot="amber"
                  label={ar ? "التأمينات" : "GOSI"}
                  days={ar ? "25 يوم" : "25 days"}
                />
                <MockObligation
                  dot="green"
                  label={ar ? "تجديد السجل" : "CR renewal"}
                  days={ar ? "8 أشهر" : "8 mo"}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MockStat({
  label,
  value,
  tone = "default",
}: {
  label: string;
  value: string;
  tone?: "default" | "good";
}) {
  return (
    <div className="rounded-lg border border-ink-100 p-3">
      <div className="text-[10px] uppercase tracking-wider text-ink-400">{label}</div>
      <div
        className={`mt-1 text-base font-semibold num-latn ${
          tone === "good" ? "text-brand-700" : "text-ink-900"
        }`}
      >
        {value}
      </div>
    </div>
  );
}

function MockRow({
  date,
  memo,
  amt,
  good = false,
}: {
  date: string;
  memo: string;
  amt: string;
  good?: boolean;
}) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <span className="text-ink-400 num-latn w-14">{date}</span>
        <span className="text-ink-700 truncate">{memo}</span>
      </div>
      <span
        className={`num-latn ${good ? "text-brand-700 font-medium" : "text-ink-600"}`}
      >
        {amt}
      </span>
    </div>
  );
}

function MockObligation({
  dot,
  label,
  days,
}: {
  dot: "green" | "amber" | "red";
  label: string;
  days: string;
}) {
  const color =
    dot === "green"
      ? "bg-emerald-500"
      : dot === "amber"
      ? "bg-amber-500"
      : "bg-rose-500";
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <span className={`w-1.5 h-1.5 rounded-full ${color}`} />
        <span className="text-ink-700">{label}</span>
      </div>
      <span className="text-ink-400 num-latn">{days}</span>
    </div>
  );
}
