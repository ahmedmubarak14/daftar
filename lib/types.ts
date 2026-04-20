// Core domain types for the Daftar demo.
// Money is represented as integer halalas (SAR * 100) to match the PRD's
// "no floats in the money path" rule, but the demo seed uses small enough
// numbers that JS numbers are safe (< 2^53).

export type Lang = "en" | "ar";

export type Bilingual = { en: string; ar: string };

export type AccountType =
  | "asset"
  | "liability"
  | "equity"
  | "revenue"
  | "expense";

export interface Account {
  code: string; // e.g. "1100" (SOCPA-aligned numbering)
  name: Bilingual;
  type: AccountType;
  group: Bilingual; // e.g. "Current Assets" / "الأصول المتداولة"
}

export interface JournalLine {
  account: string; // account code
  debit: number; // halalas
  credit: number; // halalas
}

export interface JournalEntry {
  id: string;
  date: string; // ISO
  memo: Bilingual;
  source: { kind: "receipt" | "manual" | "setup" | "invoice"; ref?: string };
  lines: JournalLine[];
  ruleId?: string; // which rule posted this
  vatAmount?: number; // halalas, if any
  rationale: Bilingual; // one-line "why this posting"
}

export interface Obligation {
  id: string;
  kind: "vat" | "zakat" | "gosi" | "cr_renewal" | "misa" | "baladiya" | "wps";
  label: Bilingual;
  dueDate: string; // ISO
  status: "green" | "amber" | "red";
  detail: Bilingual;
}

export interface ClassificationProposal {
  vendor: string;
  amount: number; // halalas
  vatAmount: number; // halalas
  account: string; // account code
  treatment: "expense" | "capital" | "prepaid" | "personal" | "founder_loan";
  ruleId: string;
  rationale: Bilingual;
  confidence: "high" | "medium" | "low";
}

export interface Company {
  name: Bilingual;
  cr: string;
  entityType: Bilingual;
  incorporationDate: string;
  fiscalYearEnd: string;
  activity: Bilingual;
  vatState: "not_registered" | "voluntary" | "mandatory";
  capital: {
    total: number; // halalas
    founders: { name: string; share: number; contributed: number }[]; // share is 0..1
  };
}
