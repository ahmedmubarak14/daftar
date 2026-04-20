import type { Lang } from "./types";

// Money stored in halalas (SAR * 100). Formatters convert to SAR for display.

export function formatSAR(halalas: number, lang: Lang = "en"): string {
  const sar = halalas / 100;
  const formatted = new Intl.NumberFormat(lang === "ar" ? "ar-SA-u-nu-latn" : "en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(sar);
  return lang === "ar" ? `${formatted} ر.س` : `SAR ${formatted}`;
}

export function formatNumber(n: number, lang: Lang = "en"): string {
  return new Intl.NumberFormat(lang === "ar" ? "ar-SA-u-nu-latn" : "en-US").format(n);
}

export function formatDate(iso: string, lang: Lang = "en"): string {
  const d = new Date(iso);
  return new Intl.DateTimeFormat(lang === "ar" ? "ar-SA-u-nu-latn-ca-gregory" : "en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(d);
}

export function daysUntil(iso: string, from = new Date()): number {
  const due = new Date(iso).getTime();
  const ms = due - from.getTime();
  return Math.ceil(ms / (1000 * 60 * 60 * 24));
}
