"use client";

import clsx from "clsx";
import { useState } from "react";
import { useI18n } from "@/lib/i18n";
import type { Bilingual } from "@/lib/types";

export function Card({
  children,
  className,
  title,
  subtitle,
  action,
  padding = "default",
}: {
  children: React.ReactNode;
  className?: string;
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  action?: React.ReactNode;
  padding?: "default" | "tight" | "none";
}) {
  return (
    <section
      className={clsx(
        "bg-white border border-ink-100 rounded-2xl shadow-card hover:shadow-soft transition-shadow",
        className
      )}
    >
      {(title || action) && (
        <header className="px-5 pt-4 pb-3 flex items-center justify-between border-b border-ink-100">
          <div>
            {title && <h3 className="font-semibold text-ink-900 tracking-tight">{title}</h3>}
            {subtitle && <p className="text-xs text-ink-500 mt-0.5">{subtitle}</p>}
          </div>
          {action}
        </header>
      )}
      <div
        className={clsx(
          padding === "none" && "",
          padding === "tight" && "p-4",
          padding === "default" && "p-5"
        )}
      >
        {children}
      </div>
    </section>
  );
}

export function Stat({
  label,
  value,
  sub,
  tone = "default",
  inverted = false,
}: {
  label: React.ReactNode;
  value: React.ReactNode;
  sub?: React.ReactNode;
  tone?: "default" | "good" | "bad";
  /** Use this when the stat sits on a dark/gradient background. */
  inverted?: boolean;
}) {
  return (
    <div>
      <div
        className={clsx(
          "text-[11px] uppercase tracking-[0.16em] font-semibold",
          inverted ? "text-brand-950/70" : "text-ink-400"
        )}
      >
        {label}
      </div>
      <div
        className={clsx(
          "mt-1.5 text-3xl font-semibold num-latn tracking-tight",
          !inverted && tone === "good" && "text-brand-700",
          !inverted && tone === "bad" && "text-rose-600",
          !inverted && tone === "default" && "text-ink-900",
          inverted && "text-brand-950"
        )}
      >
        {value}
      </div>
      {sub && (
        <div className={clsx("text-xs mt-1.5", inverted ? "text-brand-950/70" : "text-ink-500")}>
          {sub}
        </div>
      )}
    </div>
  );
}

export function Pill({
  tone = "neutral",
  children,
}: {
  tone?: "neutral" | "green" | "amber" | "red" | "brand";
  children: React.ReactNode;
}) {
  const map = {
    neutral: "bg-ink-100 text-ink-700",
    green: "bg-emerald-50 text-emerald-700 border border-emerald-100",
    amber: "bg-amber-50 text-amber-700 border border-amber-100",
    red: "bg-rose-50 text-rose-700 border border-rose-100",
    brand: "bg-brand-50 text-brand-700 border border-brand-100",
  } as const;
  return (
    <span className={clsx("inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full", map[tone])}>
      {children}
    </span>
  );
}

export function StatusDot({ tone }: { tone: "green" | "amber" | "red" }) {
  const color =
    tone === "green" ? "bg-emerald-500" : tone === "amber" ? "bg-amber-500" : "bg-rose-500";
  return <span className={clsx("dot", color)} />;
}

export function WhyButton({
  rationale,
  context,
}: {
  rationale: Bilingual;
  context?: React.ReactNode;
}) {
  const { t, b, lang } = useI18n();
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="text-xs text-brand-700 hover:text-brand-900 underline-offset-2 hover:underline"
      >
        {t("why")}
      </button>
      {open && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-ink-950/30 backdrop-blur-[1px] flex items-end sm:items-center justify-center p-4"
          onClick={() => setOpen(false)}
        >
          <div
            dir={lang === "ar" ? "rtl" : "ltr"}
            className="w-full max-w-md bg-white rounded-xl shadow-xl border border-ink-100 p-5"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between">
              <h4 className="font-semibold text-ink-800">{t("why")}</h4>
              <button
                onClick={() => setOpen(false)}
                className="text-ink-400 hover:text-ink-700 text-sm"
                aria-label={t("close")}
              >
                ✕
              </button>
            </div>
            <p className="mt-3 text-sm text-ink-700 leading-relaxed">{b(rationale)}</p>
            {context && <div className="mt-4 text-xs text-ink-500 border-t border-ink-100 pt-3">{context}</div>}
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setOpen(false)}
                className="text-sm px-3 py-1.5 rounded-md bg-ink-100 hover:bg-ink-200 text-ink-700"
              >
                {t("close")}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  action,
}: {
  eyebrow?: React.ReactNode;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  action?: React.ReactNode;
}) {
  return (
    <div className="mb-6 flex items-end justify-between gap-4">
      <div>
        {eyebrow && (
          <div className="text-[11px] uppercase tracking-[0.18em] font-semibold text-ink-400 mb-2">
            {eyebrow}
          </div>
        )}
        <h1 className="text-[28px] leading-tight font-semibold tracking-tight text-ink-900">
          {title}
        </h1>
        {subtitle && <p className="text-sm text-ink-500 mt-1.5">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}
